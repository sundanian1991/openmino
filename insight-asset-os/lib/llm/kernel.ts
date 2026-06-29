/**
 * 将用户手填的 Insight Kernel（个人判断立场）注入到 system prompt。
 * Kernel 会被追加到基础 prompt 之后，让所有 LLM 输出带上个人判断风格。
 */
export function injectKernel(
  basePrompt: string,
  kernel: string | null | undefined
): string {
  if (!kernel || !kernel.trim()) return basePrompt;
  return `${basePrompt}

## 个人判断立场（Insight Kernel）
${kernel.trim()}

请在输出中保持与上述立场一致的个人判断风格。`;
}
