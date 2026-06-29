import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 显式指定工作区根目录，消除"多个 lockfile"警告
  outputFileTracingRoot: path.resolve(__dirname),
  // node-llama-cpp 有原生 C++ 绑定，不能被 webpack 打包
  serverExternalPackages: ["node-llama-cpp"],
};

export default nextConfig;
