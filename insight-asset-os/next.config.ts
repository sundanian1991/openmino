import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 显式指定工作区根目录，消除"多个 lockfile"警告
  outputFileTracingRoot: path.resolve(__dirname),
  // standalone 模式：Next.js 自动追踪依赖，生成精简的独立运行时
  // 产物在 .next/standalone/，包含最小化 node_modules + server.js
  output: "standalone",
  // 原生 C++ 绑定的包不能被 webpack 打包
  serverExternalPackages: [
    "node-llama-cpp",
    "onnxruntime-node",
    "ppu-paddle-ocr",
    "ppu-ocv",
    "@napi-rs/canvas",
  ],
};

export default nextConfig;
