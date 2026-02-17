// Background Service Worker: 处理AI API调用和消息路由

interface AnalysisRequest {
  title: string;
  url: string;
  content: string;
  language: string;
}

interface APIConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  apiKey: string;
  baseURL?: string;
  model?: string;
}

interface StoredConfig {
  openaiKey?: string;
  anthropicKey?: string;
  customKey?: string;
  customBaseURL?: string;
  customModel?: string;
  provider: 'openai' | 'anthropic' | 'custom';
  openaiModel?: string;
  anthropicModel?: string;
}

// 验证自定义API URL
function validateBaseURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// 从存储获取配置
async function getConfig(): Promise<APIConfig> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(
      ['provider', 'openaiKey', 'anthropicKey', 'customKey', 'customBaseURL', 'openaiModel', 'anthropicModel', 'customModel'],
      (result) => {
        // 检查Chrome API错误
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        const config = result as StoredConfig;
        const provider: 'openai' | 'anthropic' | 'custom' = config.provider || 'openai';

        let apiKey = '';
        let baseURL: string | undefined;
        let model: string;

        if (provider === 'openai') {
          apiKey = config.openaiKey || '';
          model = config.openaiModel || 'gpt-3.5-turbo';
        } else if (provider === 'anthropic') {
          apiKey = config.anthropicKey || '';
          model = config.anthropicModel || 'claude-3-haiku-20240307';
        } else {
          apiKey = config.customKey || '';
          baseURL = config.customBaseURL || '';
          model = config.customModel || 'gpt-3.5-turbo';

          // 验证自定义URL
          if (baseURL && !validateBaseURL(baseURL)) {
            reject(new Error('自定义API必须使用HTTPS协议'));
            return;
          }
        }

        resolve({ provider, apiKey, baseURL, model });
      }
    );
  });
}

// 调用OpenAI API
async function callOpenAI(apiKey: string, model: string, prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('API请求失败，请检查配置');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '无法获取响应';
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('请求超时，请稍后重试');
    }
    throw error;
  }
}

// 调用Anthropic API
async function callAnthropic(apiKey: string, model: string, prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);
      throw new Error('API请求失败，请检查配置');
    }

    const data = await response.json();
    return data.content[0]?.text || '无法获取响应';
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('请求超时，请稍后重试');
    }
    throw error;
  }
}

// 调用自定义API
async function callCustomAPI(baseURL: string, apiKey: string, model: string, prompt: string): Promise<string> {
  // 再次验证URL（双重保护）
  if (!validateBaseURL(baseURL)) {
    throw new Error('自定义API必须使用HTTPS协议');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${baseURL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Custom API error:', response.status);
      throw new Error('API请求失败，请检查配置');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '无法获取响应';
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('请求超时，请稍后重试');
    }
    throw error;
  }
}

// 统一的API调用入口
async function callAI(prompt: string): Promise<string> {
  const config = await getConfig();

  if (!config.apiKey) {
    throw new Error('请先在设置中配置API Key');
  }

  if (config.provider === 'openai') {
    return callOpenAI(config.apiKey, config.model || 'gpt-3.5-turbo', prompt);
  } else if (config.provider === 'anthropic') {
    return callAnthropic(config.apiKey, config.model || 'claude-3-haiku-20240307', prompt);
  } else {
    if (!config.baseURL) {
      throw new Error('请配置自定义API地址');
    }
    return callCustomAPI(config.baseURL, config.apiKey, config.model || 'gpt-3.5-turbo', prompt);
  }
}

// 生成总结提示词
function generateSummaryPrompt(content: string, language: string): string {
  if (language === 'zh') {
    return `请总结以下网页内容的要点，用简洁的中文列出3-5个关键点：

标题：${content.substring(0, 10000)}`;
  } else {
    return `Please summarize the key points of the following web content in 3-5 bullet points:

${content.substring(0, 10000)}`;
  }
}

// 生成翻译提示词
function generateTranslationPrompt(content: string, language: string): string {
  if (language === 'zh') {
    return `请将以下内容翻译成自然的英文：

${content.substring(0, 8000)}`;
  } else {
    return `Please translate the following content into natural Chinese:

${content.substring(0, 8000)}`;
  }
}

// 分析内容
async function analyzeContent(request: AnalysisRequest): Promise<{ summary: string; translation: string }> {
  try {
    // 并发请求总结和翻译
    const [summary, translation] = await Promise.all([
      callAI(generateSummaryPrompt(request.content, request.language)),
      callAI(generateTranslationPrompt(request.content, request.language))
    ]);

    return { summary, translation };
  } catch (error) {
    throw error;
  }
}

// 监听来自content script和popup的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ANALYZE_CONTENT') {
    analyzeContent(message.data)
      .then(result => {
        // 发送结果到content script
        chrome.tabs.sendMessage(sender.tab?.id || 0, {
          type: 'ANALYSIS_RESULT',
          data: result
        });
        sendResponse({ success: true });
      })
      .catch(error => {
        chrome.tabs.sendMessage(sender.tab?.id || 0, {
          type: 'ANALYSIS_RESULT',
          data: { error: error.message }
        });
        sendResponse({ success: false, error: error.message });
      });

    return true; // 异步响应
  }

  if (message.type === 'SHOW_SIDEBAR') {
    // 转发消息到当前标签页的content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'SHOW_SIDEBAR'
        });
      }
    });
  }
});

// 插件安装时的初始化
chrome.runtime.onInstalled.addListener(() => {
  console.log('网页总结翻译器已安装');

  // 打开设置页引导用户配置API Key
  chrome.runtime.openOptionsPage();
});

console.log('Background Service Worker已加载');
