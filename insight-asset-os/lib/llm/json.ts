/**
 * 从 LLM 输出中提取 JSON。容错处理：
 * - 去掉 ```json ... ``` 代码块包裹
 * - 提取第一个 {...} 块
 * - 解析失败抛错（调用方决定重试或降级）
 */
export function extractJson<T = unknown>(raw: string): T {
  let text = raw.trim();

  // 去掉 markdown 代码块
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }

  // 尝试直接解析
  try {
    return JSON.parse(text) as T;
  } catch {
    // 回退：提取第一个 {...} 块
    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      return JSON.parse(braceMatch[0]) as T;
    }
    throw new Error(`无法从 LLM 输出提取 JSON: ${raw.slice(0, 100)}`);
  }
}
