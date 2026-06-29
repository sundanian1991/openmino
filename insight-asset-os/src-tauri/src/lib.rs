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

      // 启动 Next.js 生产服务器
      let server_dir = get_server_dir(app);
      log::info!("Starting Next.js server from: {:?}", server_dir);

      let child = Command::new("node")
        .arg("node_modules/next/dist/bin/next")
        .arg("start")
        .arg("-p")
        .arg("3456")
        .current_dir(&server_dir)
        .spawn()
        .expect("Failed to start Next.js server");

      // 保存子进程句柄
      let state: tauri::State<ServerState> = app.state();
      *state.0.lock().unwrap() = Some(child);

      // 等待服务器就绪（轮询 localhost:3456）
      thread::spawn(|| {
        let client = reqwest::blocking::Client::new();
        for _ in 0..60 {
          if client.get("http://localhost:3456").send().is_ok() {
            log::info!("Next.js server is ready");
            break;
          }
          thread::sleep(Duration::from_secs(1));
        }
      });

      Ok(())
    })
    .on_window_event(|window, event| {
      // 窗口关闭时杀掉子进程
      if let tauri::WindowEvent::Destroyed = event {
        let app = window.app_handle();
        let child_opt = {
          let state = app.state::<ServerState>();
          let mut guard = state.0.lock().unwrap();
          let taken = guard.take();
          taken
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

/// 获取 Next.js 项目根目录
/// 开发模式：CARGO_MANIFEST_DIR/../（项目根）
/// 生产模式：app 资源目录
fn get_server_dir(app: &tauri::App) -> std::path::PathBuf {
  if cfg!(debug_assertions) {
    // 开发模式：src-tauri 的上级目录
    let manifest_dir = env!("CARGO_MANIFEST_DIR");
    std::path::PathBuf::from(manifest_dir)
      .parent()
      .unwrap()
      .to_path_buf()
  } else {
    // 生产模式：使用 app 资源目录
    app.path().resource_dir().unwrap_or_else(|_| std::path::PathBuf::from("."))
  }
}
