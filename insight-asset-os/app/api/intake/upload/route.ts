import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getSetting, VAULT_PATH_KEY, getLLMConfig } from "@/lib/db/queries";
import { intakeBuffer, type IntakeResult } from "@/lib/core/intake";
import { runPipeline } from "@/lib/core/pipeline";
import type { PipelineSteps } from "@/lib/core/pipeline";
import { detectType } from "@/lib/indexer";

export const dynamic = "force-dynamic";

export interface IntakeStepResult {
  path: string;
  name: string;
  ok: boolean;
  assetId?: number;
  title?: string;
  error?: string;
  pipeline?: PipelineSteps;
  pipelineErrors?: string[];
}

/**
 * 接收浏览器通过 webkitdirectory 上传的文件夹内容（多个文件）。
 * 浏览器侧用 append("files", file, file.webkitRelativePath) 把相对路径
 * 编码进 filename，这里用 file.name 取回，作为 source_path 落库。
 */
export async function POST(req: Request) {
  ensureDb();
  const llmConfig = getLLMConfig();
  if (!llmConfig.apiKey) {
    return NextResponse.json(
      { ok: false, error: "请先在设置中配置 LLM API Key" },
      { status: 400 }
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json(
      { ok: false, error: "请求不是有效的 FormData" },
      { status: 400 }
    );
  }

  const files = form.getAll("files").filter(
    (f): f is File => f instanceof File
  );
  if (files.length === 0) {
    return NextResponse.json(
      { ok: false, error: "未收到任何文件" },
      { status: 400 }
    );
  }

  // 仅保留受支持类型，跳过 .DS_Store 等噪音
  const supported = files.filter((f) => detectType(f.name));
  if (supported.length === 0) {
    return NextResponse.json(
      { ok: false, error: "未找到支持的文件（md/txt/pdf/docx/html）" },
      { status: 400 }
    );
  }

  const kernel = getSetting("insight_kernel") ?? undefined;

  // 顺序处理，避免并发触发 LLM 限流
  const intakeResults: IntakeResult[] = [];
  for (const file of supported) {
    const buf = Buffer.from(await file.arrayBuffer());
    // file.name 在前端被设为 webkitRelativePath（如 "notes/sub/a.md"）
    const relativePath = file.name;
    const baseName = relativePath.includes("/")
      ? relativePath.split("/").pop()!
      : relativePath;
    const result = await intakeBuffer(baseName, buf, relativePath, llmConfig, kernel);
    intakeResults.push(result);
  }

  // 一体化管线：对每张成功采集的卡片自动执行 升级 → 分类 → 关联
  const fullResults: IntakeStepResult[] = [];
  for (const r of intakeResults) {
    const result: IntakeStepResult = { ...r, pipeline: undefined };
    if (r.ok && r.assetId) {
      try {
        const pipelineResult = await runPipeline(r.assetId, llmConfig, kernel);
        result.pipeline = pipelineResult.steps;
        result.pipelineErrors = pipelineResult.errors.length > 0 ? pipelineResult.errors : undefined;
      } catch {
        result.pipeline = { extract: "ok", upgrade: "fail", classify: "fail", relate: "fail" };
        result.pipelineErrors = ["管线执行异常"];
      }
    }
    fullResults.push(result);
  }

  const okCount = fullResults.filter((r) => r.ok).length;
  return NextResponse.json({
    ok: true,
    total: supported.length,
    success: okCount,
    results: fullResults,
  });
}
