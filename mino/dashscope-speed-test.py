#!/usr/bin/env python3
"""阿里云百炼 Coding Plan 模型延迟测试脚本 (Anthropic 兼容接口)"""

import os
import time
import json
import statistics
from anthropic import Anthropic

# 配置
API_KEY = "sk-sp-4383f11b67224e11b340d43350619d0a"
BASE_URL = "https://coding.dashscope.aliyuncs.com/apps/anthropic"

# 测试模型列表 (Coding Plan 支持的模型 - 8款)
MODELS = [
    "qwen3.5-plus",
    "qwen3-max",
    "qwen3-coder-plus",
    "qwen3-coder-next",
    "glm-4.7",
    "kimi-k2.5",
]

# 测试prompt
TEST_PROMPT = "请用100字左右介绍一下人工智能的发展历程。"

# 每个模型测试次数
TEST_ROUNDS = 10

def measure_model(client, model_name, prompt):
    """测量单个模型的延迟"""
    results = []

    for i in range(TEST_ROUNDS):
        try:
            start_time = time.time()
            first_token_time = None
            total_content = ""

            with client.messages.stream(
                max_tokens=500,
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
            ) as stream:
                for text in stream.text_stream:
                    if first_token_time is None:
                        first_token_time = time.time()
                    total_content += text

            end_time = time.time()

            # 计算指标
            total_time = end_time - start_time
            ttft = first_token_time - start_time if first_token_time else 0

            # 粗略估算token数（中文约1.5字/token）
            estimated_tokens = len(total_content) / 1.5
            generation_time = total_time - ttft
            tokens_per_sec = estimated_tokens / generation_time if generation_time > 0 else 0

            results.append({
                "round": i + 1,
                "total_time": total_time,
                "ttft": ttft,
                "tokens_per_sec": tokens_per_sec,
                "estimated_tokens": estimated_tokens,
                "content_length": len(total_content),
            })

            print(f"  第{i+1}次: 总耗时={total_time:.2f}s, TTFT={ttft:.2f}s, 速度={tokens_per_sec:.1f} tok/s, 输出{len(total_content)}字")

        except Exception as e:
            print(f"  第{i+1}次失败: {e}")
            results.append({"round": i + 1, "error": str(e)})

        # 避免触发限流
        time.sleep(1)

    return results

def calculate_stats(results):
    """计算统计数据"""
    valid_results = [r for r in results if "error" not in r]
    if not valid_results:
        return None

    return {
        "avg_total_time": statistics.mean([r["total_time"] for r in valid_results]),
        "avg_ttft": statistics.mean([r["ttft"] for r in valid_results]),
        "avg_tokens_per_sec": statistics.mean([r["tokens_per_sec"] for r in valid_results]),
        "avg_content_length": statistics.mean([r["content_length"] for r in valid_results]),
    }

def main():
    client = Anthropic(
        api_key=API_KEY,
        base_url=BASE_URL,
    )

    print("=" * 70)
    print("阿里云百炼 Coding Plan 模型延迟测试 (Anthropic 兼容接口)")
    print(f"Base URL: {BASE_URL}")
    print(f"测试prompt: {TEST_PROMPT}")
    print(f"每模型测试次数: {TEST_ROUNDS}")
    print("=" * 70)

    all_results = {}

    for model in MODELS:
        print(f"\n【{model}】")
        results = measure_model(client, model, TEST_PROMPT)
        stats = calculate_stats(results)
        all_results[model] = {"raw": results, "stats": stats}

        if stats:
            print(f"  ★ 平均: 总耗时={stats['avg_total_time']:.2f}s, "
                  f"TTFT={stats['avg_ttft']:.2f}s, "
                  f"速度={stats['avg_tokens_per_sec']:.1f} tok/s")

    # 汇总报告
    print("\n" + "=" * 70)
    print("汇总报告（按速度排序）")
    print("=" * 70)
    print(f"{'模型':<25} {'总耗时(s)':<12} {'TTFT(s)':<12} {'速度(tok/s)':<12}")
    print("-" * 70)

    sorted_models = sorted(
        [(m, d["stats"]) for m, d in all_results.items() if d["stats"]],
        key=lambda x: x[1]["avg_tokens_per_sec"],
        reverse=True
    )

    for model, stats in sorted_models:
        print(f"{model:<25} {stats['avg_total_time']:<12.2f} {stats['avg_ttft']:<12.2f} {stats['avg_tokens_per_sec']:<12.1f}")

    # 保存结果
    output_file = "dashscope-speed-report.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)
    print(f"\n详细结果已保存到 {output_file}")

if __name__ == "__main__":
    main()