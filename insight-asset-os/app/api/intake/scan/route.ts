import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getSetting, VAULT_PATH_KEY, getLLMConfig } from "@/lib/db/queries";
import { scanDirectory, intakeFiles } from "@/lib/core/intake";
import { runPipeline } from "@/lib/core/pipeline";
import type { PipelineSteps } from "@/lib/core/pipeline";
import fs from "fs";

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

export async function POST() {
  ensureDb();
  const vaultPath = getSetting(VAULT_PATH_KEY);
  if (!vaultPath) {
    return NextResponse.json({ ok: false, error: "请先在设置中配置 Vault 文件夹路径" }, { status: 400 });
  }
  if (!fs.existsSync(vaultPath)) {
    return NextResponse.json({ ok: false, error: `路径不存在: ${vaultPath}` }, { status: 400 });
  }
  const llmConfig = getLLMConfig();
  if (!llmConfig.apiKey) {
    return NextResponse.json({ ok: false, error: "请先在设置中配置 LLM API Key" }, { status: 400 });
  }

  // 复用 lib/core/intake 的扫描和采集逻辑
  const scanned = scanDirectory(vaultPath);
  if (scanned.length === 0) {
    return NextResponse.json({ ok: false, error: "未找到支持的文件（md/txt/pdf/docx/html）" }, { status: 400 });
  }

  const kernel = getSetting("insight_kernel") ?? undefined;
  const intakeResults = await intakeFiles(
    scanned.map(f => f.path),
    llmConfig,
    kernel
  );

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

  const okCount = fullResults.filter(r => r.ok).length;
  return NextResponse.json({ ok: true, total: scanned.length, success: okCount, results: fullResults });
}
