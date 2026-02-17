// Options Page: 处理设置页面的逻辑

interface StoredConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  openaiKey?: string;
  anthropicKey?: string;
  customKey?: string;
  customBaseURL?: string;
  openaiModel?: string;
  anthropicModel?: string;
  customModel?: string;
}

// 获取DOM元素的辅助函数（带空值检查）
function getElement<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

// DOM元素（带空值检查）
const providerSelect = getElement<HTMLSelectElement>('provider');
const openaiSection = getElement<HTMLElement>('openai-section');
const anthropicSection = getElement<HTMLElement>('anthropic-section');
const customSection = getElement<HTMLElement>('custom-section');
const saveBtn = getElement<HTMLElement>('saveBtn');
const successMessage = getElement<HTMLElement>('successMessage');

// 切换服务商配置区域
function switchProvider(provider: string): void {
  if (!openaiSection || !anthropicSection || !customSection) return;

  openaiSection.classList.remove('active');
  anthropicSection.classList.remove('active');
  customSection.classList.remove('active');

  if (provider === 'openai') {
    openaiSection.classList.add('active');
  } else if (provider === 'anthropic') {
    anthropicSection.classList.add('active');
  } else if (provider === 'custom') {
    customSection.classList.add('active');
  }
}

// 加载已保存的配置
function loadConfig(): void {
  chrome.storage.local.get(
    [
      'provider',
      'openaiKey',
      'anthropicKey',
      'customKey',
      'customBaseURL',
      'openaiModel',
      'anthropicModel',
      'customModel'
    ],
    (result) => {
      // 检查Chrome API错误
      if (chrome.runtime.lastError) {
        console.error('Failed to load config:', chrome.runtime.lastError);
        return;
      }

      const config = result as StoredConfig;

      // 设置服务商
      if (providerSelect && config.provider) {
        providerSelect.value = config.provider;
        switchProvider(config.provider);
      }

      // OpenAI
      const openaiKeyInput = getElement<HTMLInputElement>('openaiKey');
      const openaiModelSelect = getElement<HTMLSelectElement>('openaiModel');
      if (config.openaiKey && openaiKeyInput) {
        openaiKeyInput.value = config.openaiKey;
      }
      if (config.openaiModel && openaiModelSelect) {
        openaiModelSelect.value = config.openaiModel;
      }

      // Anthropic
      const anthropicKeyInput = getElement<HTMLInputElement>('anthropicKey');
      const anthropicModelSelect = getElement<HTMLSelectElement>('anthropicModel');
      if (config.anthropicKey && anthropicKeyInput) {
        anthropicKeyInput.value = config.anthropicKey;
      }
      if (config.anthropicModel && anthropicModelSelect) {
        anthropicModelSelect.value = config.anthropicModel;
      }

      // 自定义API
      const customBaseURLInput = getElement<HTMLInputElement>('customBaseURL');
      const customKeyInput = getElement<HTMLInputElement>('customKey');
      const customModelInput = getElement<HTMLInputElement>('customModel');
      if (config.customBaseURL && customBaseURLInput) {
        customBaseURLInput.value = config.customBaseURL;
      }
      if (config.customKey && customKeyInput) {
        customKeyInput.value = config.customKey;
      }
      if (config.customModel && customModelInput) {
        customModelInput.value = config.customModel;
      }
    }
  );
}

// 保存配置
function saveConfig(): void {
  if (!providerSelect) return;

  const provider = providerSelect.value as 'openai' | 'anthropic' | 'custom';

  const openaiModelSelect = getElement<HTMLSelectElement>('openaiModel');
  const anthropicModelSelect = getElement<HTMLSelectElement>('anthropicModel');
  const customBaseURLInput = getElement<HTMLInputElement>('customBaseURL');
  const customModelInput = getElement<HTMLInputElement>('customModel');

  const config: StoredConfig = {
    provider,
    openaiModel: openaiModelSelect?.value || 'gpt-3.5-turbo',
    anthropicModel: anthropicModelSelect?.value || 'claude-3-haiku-20240307',
    customBaseURL: customBaseURLInput?.value || '',
    customModel: customModelInput?.value || 'gpt-3.5-turbo'
  };

  // 只保存当前选中的服务商的API Key
  if (provider === 'openai') {
    const openaiKeyInput = getElement<HTMLInputElement>('openaiKey');
    if (openaiKeyInput) {
      config.openaiKey = openaiKeyInput.value;
    }
  } else if (provider === 'anthropic') {
    const anthropicKeyInput = getElement<HTMLInputElement>('anthropicKey');
    if (anthropicKeyInput) {
      config.anthropicKey = anthropicKeyInput.value;
    }
  } else if (provider === 'custom') {
    const customKeyInput = getElement<HTMLInputElement>('customKey');
    if (customKeyInput) {
      config.customKey = customKeyInput.value;
    }
  }

  chrome.storage.local.set(config, () => {
    if (chrome.runtime.lastError) {
      console.error('Failed to save config:', chrome.runtime.lastError);
      return;
    }

    // 显示成功消息
    if (successMessage) {
      successMessage.classList.add('show');
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 2000);
    }
  });
}

// 绑定事件
if (providerSelect) {
  providerSelect.addEventListener('change', (e) => {
    switchProvider((e.target as HTMLSelectElement).value);
  });
}

if (saveBtn) {
  saveBtn.addEventListener('click', saveConfig);
}

// 页面加载时初始化
loadConfig();
