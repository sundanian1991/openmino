/**
 * Tool Input Repair Layer
 *
 * 修复开源模型（DeepSeek、Qwen、GLM 等）工具调用的 4 类高频错误模式。
 * 放在工具调用入口处，JSON Schema 校验之前执行。
 *
 * 错误模式：
 * 1. 可选字段传 null → 应直接省略
 * 2. 数组序列化为 JSON 字符串 → 应为原生数组
 * 3. 数组占位符用 {} 包装 → 应为数组
 * 4. 裸字符串替代数组 → 应包装为数组
 * 5. Markdown 链接格式路径 → 应提取真实路径
 */

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

// 修复函数类型：接收参数和 schema，返回修复后的参数
type RepairFn = (args: JsonObject, schema?: JsonObject) => JsonObject;

// ── 修复器注册表 ──────────────────────────────────────────

const REPAIRS: RepairFn[] = [
  // 1. 可选字段传 null → 删除该字段
  (args, schema) => {
    if (!schema?.properties) return args;
    const required = new Set(schema.required ?? []);
    const result = { ...args };
    for (const key of Object.keys(result)) {
      if (result[key] === null && !required.has(key)) {
        delete result[key];
      }
    }
    return result;
  },

  // 2. JSON 字符串伪装数组 → 解析
  (args) => {
    const result = { ...args };
    for (const [key, value] of Object.entries(result)) {
      if (typeof value !== 'string') continue;
      const trimmed = value.trim();
      if (!trimmed.startsWith('[')) continue;
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) result[key] = parsed;
      } catch { /* 不是合法 JSON，跳过 */ }
    }
    return result;
  },

  // 3. {} 包装单参数占位数组 → 展开为数组
  (args, schema) => {
    if (!schema?.properties) return args;
    const result = { ...args };
    for (const [key, value] of Object.entries(result)) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) continue;
      const propSchema = schema.properties[key] as JsonObject | undefined;
      if (!propSchema) continue;
      if (propSchema.type === 'array' || propSchema.items) {
        result[key] = [value];
      }
    }
    return result;
  },

  // 4. 裸字符串替代数组 → 包装为单元素数组
  (args, schema) => {
    if (!schema?.properties) return args;
    const result = { ...args };
    for (const [key, value] of Object.entries(result)) {
      if (typeof value !== 'string') continue;
      const propSchema = schema.properties[key] as JsonObject | undefined;
      if (!propSchema) continue;
      if (propSchema.type === 'array' || propSchema.items) {
        result[key] = [value];
      }
    }
    return result;
  },

  // 5. Markdown 链接格式路径 → 提取真实路径
  //    模型在工具调用中误用对话 Markdown 格式，如：
  //    - "/Users/x/proj/[notes.md](http://notes.md)" → "/Users/x/proj/notes.md"
  //    - "[README.md](http://localhost/README.md)" → "README.md"
  //    仅处理链接文本为无协议纯文件名/路径的退化情况；
  //    正常 Markdown 链接（链接文本本身是 URL）不受影响。
  (args) => {
    const result = { ...args };
    // 匹配 [...](http...) 格式，链接文本不含协议头
    const MD_LINK_RE = /\[([^\]]+)\]\(https?:\/\/[^)]+\)/g;
    for (const [key, value] of Object.entries(result)) {
      if (typeof value !== 'string') continue;
      // 只处理包含 markdown 链接的字符串
      if (!MD_LINK_RE.test(value)) continue;
      MD_LINK_RE.lastIndex = 0; // 重置 regex state
      result[key] = value.replace(MD_LINK_RE, (_full, text) => {
        // 链接文本本身是 URL → 不解包（不是退化情况）
        if (/^https?:\/\//.test(text)) return _full;
        return text;
      });
    }
    return result;
  },
];

// ── 主函数 ──────────────────────────────────────────────

/**
 * 修复工具调用参数
 * @param args 原始参数对象
 * @param schema JSON Schema（可选，有 schema 时修复更精准）
 * @returns 修复后的参数对象
 */
export function repairToolInput(args: JsonObject, schema?: JsonObject): JsonObject {
  return REPAIRS.reduce((acc, repair) => repair(acc, schema), args);
}

/**
 * 包装工具函数，在调用前自动修复输入
 * @param fn 原始工具函数
 * @param schema 该工具的 JSON Schema
 * @returns 包装后的工具函数
 */
export function withRepair<T extends (...args: any[]) => any>(
  fn: T,
  schema?: JsonObject
): T {
  return ((...callArgs: any[]) => {
    if (callArgs.length > 0 && typeof callArgs[0] === 'object' && callArgs[0] !== null) {
      callArgs[0] = repairToolInput(callArgs[0], schema);
    }
    return fn(...callArgs);
  }) as T;
}
