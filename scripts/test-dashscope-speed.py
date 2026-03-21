#!/usr/bin/env python3
"""
阿里云百炼 DashScope Qwen 模型速度测试
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

# 测试的通义千问模型列表
MODELS = [
    "qwen-turbo",          # 最快
    "qwen-plus",           # 平衡
    "qwen-max",            # 当前主力
]

# 测试用的提示词（不同长度）
TEST_PROMPTS = {
    "短": "1+1等于几？",
    "中": "写一个Python函数，判断一个数是否为素数。",
    "长": "分析当前AI Agent市场的竞争格局，包括主要玩家、商业模式、技术趋势和未来发展方向。请给出500字左右的详细分析。",
}

# ============ 测试函数 ============

def test_model_speed(model: str, prompt: str, prompt_name: str):
    """测试单个模型的响应速度"""

    messages = [{"role": "user", "content": prompt}]

    start_time = time.time()
    first_token_time = None
    total_tokens = 0

    try:
        response = Generation.call(
            model=model,
            messages=messages,
            api_key=API_KEY,
            stream=True,
            result_format="message",
        )

        for chunk in response:
            if chunk.status_code == HTTPStatus.OK:
                if first_token_time is None:
                    first_token_time = time.time()

                # 累加 token 数
                usage = chunk.usage.get("output_tokens", 0)
                if usage > 0:
                    total_tokens = usage
            else:
                print(f"\n  ❌ 错误: {chunk.message}")
                return None

        end_time = time.time()

        # 计算指标
        ttft = (first_token_time - start_time) * 1000  # ms
        total_time = (end_time - start_time) * 1000  # ms
        tps = total_tokens / (total_time / 1000) if total_time > 0 else 0

        return {
            "model": model,
            "prompt": prompt_name,
            "ttft_ms": round(ttft, 2),
            "total_ms": round(total_time, 2),
            "tokens": total_tokens,
            "tps": round(tps, 2),
        }

    except Exception as e:
        print(f"\n  ❌ 异常: {e}")
        return None


# ============ 主程序 ============

def main():
    print("=" * 70)
    print("阿里云百炼 DashScope Qwen 模型速度测试")
    print("=" * 70)
    print(f"\n测试模型: {', '.join(MODELS)}")
    print(f"测试场景: {', '.join(TEST_PROMPTS.keys())}")
    print("\n" + "-" * 70)

    results = []

    for model in MODELS:
        print(f"\n🚀 测试模型: {model}")
        print("-" * 50)

        for prompt_name, prompt in TEST_PROMPTS.items():
            print(f"\n  场景: {prompt_name}文（{len(prompt)}字）")
            print(f"  [流式接收中...]", end="", flush=True)

            result = test_model_speed(model, prompt, prompt_name)
            if result:
                results.append(result)
                print(f"\r  ✅ TTFT: {result['ttft_ms']:>6.1f}ms | "
                      f"总耗时: {result['total_ms']:>6.1f}ms | "
                      f"Tokens: {result['tokens']:>4} | "
                      f"速度: {result['tps']:>5.1f} t/s")

    # 汇总报告
    print("\n" + "=" * 70)
    print("📊 测试结果汇总")
    print("=" * 70)

    # 按场景分组显示
    for prompt_name in TEST_PROMPTS.keys():
        print(f"\n【{prompt_name}文场景】")
        prompt_results = [r for r in results if r["prompt"] == prompt_name]
        for r in prompt_results:
            print(f"  {r['model']:20s} | TTFT: {r['ttft_ms']:>6.1f}ms | "
                  f"总耗时: {r['total_ms']:>6.1f}ms | TPS: {r['tps']:>5.1f}")

    # 保存结果
    report_file = "/Users/sundanian/Documents/projects/ai-agents/my-agent/dashscope-speed-report.json"
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\n💾 详细结果已保存: {report_file}")


if __name__ == "__main__":
    main()
