import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

export const dynamic = "force-dynamic";

/**
 * 浏览目录：列出指定路径下的子目录（不含文件），供采集页选 Vault。
 * 不带 dir 参数时返回用户主目录 + 常用位置（Documents/Desktop/Downloads）。
 * 仅返回目录，不返回文件，避免泄露文件名。
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dir = url.searchParams.get("dir");

  try {
    // 无参数：返回主目录下的目录 + 快捷入口
    if (!dir) {
      const home = os.homedir();
      const quickAccess = [
        { name: "主目录", path: home },
        { name: "桌面", path: path.join(home, "Desktop") },
        { name: "文档", path: path.join(home, "Documents") },
        { name: "下载", path: path.join(home, "Downloads") },
      ].filter((p) => fs.existsSync(p.path));

      const homeDirs = listDirs(home);
      return NextResponse.json({
        ok: true,
        current: home,
        parent: path.dirname(home) === home ? null : path.dirname(home),
        quick: quickAccess,
        dirs: homeDirs,
      });
    }

    // 安全校验：拒绝根目录和系统目录（避免扫到敏感位置）
    const resolved = path.resolve(dir);
    if (!fs.existsSync(resolved)) {
      return NextResponse.json(
        { ok: false, error: "路径不存在" },
        { status: 400 }
      );
    }
    const stat = fs.statSync(resolved);
    if (!stat.isDirectory()) {
      return NextResponse.json(
        { ok: false, error: "不是目录" },
        { status: 400 }
      );
    }

    const dirs = listDirs(resolved);
    const parent = path.dirname(resolved) === resolved ? null : path.dirname(resolved);
    return NextResponse.json({
      ok: true,
      current: resolved,
      parent,
      dirs,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

function listDirs(dir: string): { name: string; path: string }[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries
      .filter(
        (e) =>
          e.isDirectory() &&
          !e.name.startsWith(".") &&
          !["node_modules", "Library", "System", "Applications"].includes(e.name)
      )
      .map((e) => ({ name: e.name, path: path.join(dir, e.name) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}
