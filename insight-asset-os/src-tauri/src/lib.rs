use std::process::{Command, Child};
use std::sync::Mutex;
use std::time::Duration;
use std::thread;
use tauri::Manager;

struct ServerState(Mutex<Option<Child>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .manage(ServerState(Mutex::new(None)))
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // 定位 standalone server 目录
      let server_dir = get_server_dir(app);
      let server_js = server_dir.join("server.js");

      log::info!("Next.js server dir: {:?}", server_dir);

      if !server_js.exists() {
        let msg = format!(
          "找不到 Next.js 服务器文件。\n路径: {:?}\n\n请重新打包应用。",
          server_js
        );
        show_error(&msg);
        return Ok(());
      }

      // 定位 node 可执行文件
      let node_bin = find_node().unwrap_or_else(|| {
        log::warn!("未找到 node，尝试 PATH 中的 node");
        "node".to_string()
      });

      // 启动 standalone server
      let child_result = Command::new(&node_bin)
        .arg("server.js")
        .env("PORT", "3456")
        .env("QWEN3_EMBEDDING_PATH", get_embedding_model_path())
        .current_dir(&server_dir)
        .spawn();

      match child_result {
        Ok(child) => {
          log::info!("Next.js server started (PID: {})", child.id());

          // 保存子进程句柄
          let state = app.state::<ServerState>();
          *state.0.lock().unwrap() = Some(child);

          // 后台等待服务器就绪后导航窗口
          let app_handle = app.handle().clone();
          thread::spawn(move || {
            let client = reqwest::blocking::Client::builder()
              .timeout(Duration::from_secs(2))
              .build()
              .unwrap();
            for _ in 0..60 {
              if client.get("http://localhost:3456").send().is_ok() {
                log::info!("Next.js server is ready, navigating window");
                // 在主线程上执行导航
                if let Some(window) = app_handle.get_webview_window("main") {
                  let _ = window.eval("window.location.href = 'http://localhost:3456'");
                }
                break;
              }
              thread::sleep(Duration::from_millis(500));
            }
          });
        }
        Err(e) => {
          let msg = format!(
            "启动 Next.js 服务器失败。\n错误: {}\n\n请确认已安装 Node.js。",
            e
          );
          show_error(&msg);
        }
      }

      Ok(())
    })
    .on_window_event(|window, event| {
      if let tauri::WindowEvent::Destroyed = event {
        let app = window.app_handle();
        let child_opt = {
          let state = app.state::<ServerState>();
          let mut guard = state.0.lock().unwrap();
          guard.take()
        };
        if let Some(mut child) = child_opt {
          let _ = child.kill();
          log::info!("Next.js server stopped");
        }
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

/// 获取 standalone server 目录
fn get_server_dir(app: &tauri::App) -> std::path::PathBuf {
  if cfg!(debug_assertions) {
    // 开发模式：直接用项目根目录
    let manifest_dir = env!("CARGO_MANIFEST_DIR");
    std::path::PathBuf::from(manifest_dir)
      .parent()
      .unwrap()
      .join("dist")
      .join("standalone-bundle")
  } else {
    // 生产模式：resource 目录下的 standalone-bundle
    app.path()
      .resource_dir()
      .unwrap_or_else(|_| std::path::PathBuf::from("."))
      .join("standalone-bundle")
  }
}

/// 查找 node 可执行文件
fn find_node() -> Option<String> {
  // 常见安装路径
  let candidates = [
    "/usr/local/bin/node",
    "/opt/homebrew/bin/node",
    "/usr/bin/node",
  ];
  for path in &candidates {
    if std::path::Path::new(path).exists() {
      return Some(path.to_string());
    }
  }
  None
}

/// 获取 Qwen3 Embedding 模型路径
fn get_embedding_model_path() -> String {
  if let Ok(home) = std::env::var("HOME") {
    format!(
      "{}/Library/Application Support/ai.linkly.desktop/data/models/Qwen3-Embedding-0.6B-Q8_0.gguf",
      home
    )
  } else {
    String::new()
  }
}

/// 显示错误对话框（不 panic）
fn show_error(msg: &str) {
  log::error!("{}", msg);
  // 用 macOS 原生对话框，避免 panic
  #[cfg(target_os = "macos")]
  {
    use std::process::Command as SysCommand;
    let _ = SysCommand::new("osascript")
      .arg("-e")
      .arg(format!(r#"display dialog "{}" with title "Insight Asset OS" buttons {{"退出"}} default button "退出" with icon stop"#, msg.replace('"', "\\\"")))
      .spawn();
  }
}
