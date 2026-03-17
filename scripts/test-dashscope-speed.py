#!/usr/bin/env python3
"""
阿里云百炼 DashScope GLM 模型速度测试
测试指标：首 token 延迟(TTFT)、每秒 token 数(TPS)、总耗时
"""

import os
import time
import json
from http import HTTPStatus

try:
    from dashscope import Generation
except ImportError:
    print("请先安装 dashscope: pip install dashscope")
    exit(1)

# ============ 配置 ============
API_KEY = os.getenv("DASHSCOPE_API_KEY")
if not API_KEY:
    print("错误：请设置环境变量 DASHSCOPE_API_KEY")
    print("示例: export DASHSCOPE_API_KEY=sk-xxx")
    exit(1)

# 测试的模型列表
MODELS = [
    "glm-4.7",      # 主力模型
    "glm-4.5-air",  # 轻量模型
]

# 测试用的提示词（不同长度）
TEST_PROMPTS = {
    "短文本": "请用一句话解释什么是人工智能。",
    "中文本": "请详细说明人工智能在医疗领域的三个应用场景，每个场景说明其价值和挑战。",
    "长文本": """请阅读以下技术文档，总结其核心架构和关键特性：

大语言模型(LLM)是一种基于Transformer架构的人工智能模型，通过海量文本数据的预训练，
学会了理解和生成人类语言。其核心特点包括：
1. 自注意力机制：能够捕捉长距离依赖关系
2. 大规模参数：从数十亿到数万亿不等
3. 涌现能力：在达到一定规模后展现出小模型不具备的能力
4. 上下文学习：通过提示词就能完成新任务，无需微调

当前主流的大模型包括 GPT 系列、Claude、Gemini、GLM 等，各有特色和适用场景。
请基于以上内容，总结大语言模型的技术要点。"""
}

# ============ 测试函数 ============

def test_model_speed(model: str, prompt: str, prompt_name: str):
    """测试单个模型的响应速度"""

    messages = [{"role": "user", "content": prompt}]

    start_time = time.time()
    first_token_time = None
    token_count = 0

    try:
        response = Generation.call(
            model=model,
            messages=messages,
            api_key=API_KEY,
            stream=True,  # 流式输出以准确测量 TTFT
        )

        print(f"\n  [流式接收中...]", end="", flush=True)

        for chunk in response:
            if chunk.status_code == HTTPStatus.OK:
                if first_token_time is None:
                    first_token_time = time.time()
                    print(f"\r  [首token到达]", end="", flush=True)

                # 累加 token 数（估算）
                content = chunk.output.get("text", "")
                token_count += len(content) // 2  # 粗略估算
            else:
                print(f"\n  错误: {chunk.message}")
                return None

        end_time = time.time()

        # 计算指标
        ttft = (first_token_time - start_time) * 1000  # ms
        total_time = (end_time - start_time) * 1000  # ms
        tps = token_count / (total_time / 1000) if total_time > 0 else 0

        return {
            "model": model,
            "prompt": prompt_name,
            "ttft_ms": round(ttft, 2),
            "total_ms": round(total_time, 2),
            "tokens": token_count,
            "tps": round(tps, 2),
        }

    except Exception as e:
        print(f"\n  异常: {e}")
        return None


def test_with_timing(model: str, prompt: str, prompt_name: str):
    """非流式调用测试（用于对比）"""

    messages = [{"role": "user", "content": prompt}]

    start_time = time.time()

    try:
        response = Generation.call(
            model=model,
            messages=messages,
            api_key=API_KEY,
            stream=False,
        )

        end_time = time.time()
        total_time = (end_time - start_time) * 1000

        if response.status_code == HTTPStatus.OK:
            content = response.output.get("text", "")
            # 估算 token 数（中文约 1.5 字符/token，英文约 4 字符/token）
            token_count = len(content) // 2
            tps = token_count / (total_time / 1000) if total_time > 0 else 0

            return {
                "model": model,
                "prompt": prompt_name,
                "ttft_ms": "N/A (非流式)",
                "total_ms": round(total_time, 2),
                "tokens": token_count,
                "tps": round(tps, 2),
            }
        else:
            print(f"  错误: {response.message}")
            return None

    except Exception as e:
        print(f"  异常: {e}")
        return None


# ============ 主程序 ============

def main():
    print("=" * 60)
    print("阿里云百炼 DashScope GLM 模型速度测试")
    print("=" * 60)
    print(f"\n测试模型: {', '.join(MODELS)}")
    print(f"测试场景: {', '.join(TEST_PROMPTS.keys())}")
    print("\n" + "-" * 60)

    results = []

    for model in MODELS:
        print(f"\n🧪 测试模型: {model}")
        print("-" * 40)

        for prompt_name, prompt in TEST_PROMPTS.items():
            print(f"\n  场景: {prompt_name}")

            # 流式测试（测量 TTFT）
            result = test_model_speed(model, prompt, prompt_name)
            if result:
                results.append(result)
                print(f"\n    ✅ TTFT: {result['ttft_ms']}ms")
                print(f"       总耗时: {result['total_ms']}ms")
                print(f"       约 {result['tokens']} tokens")
                print(f"       速度: {result['tps']} tokens/s")

    # 汇总报告
    print("\n" + "=" * 60)
    print("📊 测试结果汇总")
    print("=" * 60)

    # 按模型分组显示
    for model in MODELS:
        print(f"\n【{model}】")
        model_results = [r for r in results if r["model"] == model]
        for r in model_results:
            print(f"  {r['prompt']:6s} | TTFT: {r['ttft_ms']:>8}ms | "
                  f"总耗时: {r['total_ms']:>8}ms | TPS: {r['tps']:>6}")

    # 保存结果
    report_file = "dashscope-speed-report.json"
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\n💾 详细结果已保存: {report_file}")


if __name__ == "__main__":
    main()
