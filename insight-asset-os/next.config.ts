import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 显式指定工作区根目录，消除"多个 lockfile"警告
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
