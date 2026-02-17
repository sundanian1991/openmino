// Popup: 插件弹窗的逻辑

interface StorageResult {
  provider?: string;
  openaiKey?: string;
  anthropicKey?: string;
  customKey?: string;
}

// 检查配置状态
function checkConfigStatus(): void {
  const statusEl = document.getElementById('status');
  if (!statusEl) return;

  chrome.storage.local.get(['provider', 'openaiKey', 'anthropicKey', 'customKey'], (result) => {
    // 检查Chrome API错误
    if (chrome.runtime.lastError) {
      statusEl.textContent = '⚠️ 配置读取失败';
      statusEl.className = 'status not-configured';
      return;
    }

    const config = result as StorageResult;
    const provider = config.provider;
    let hasKey = false;

    if (provider === 'openai' && config.openaiKey) {
      hasKey = true;
    } else if (provider === 'anthropic' && config.anthropicKey) {
      hasKey = true;
    } else if (provider === 'custom' && config.customKey) {
      hasKey = true;
    }

    if (hasKey) {
      statusEl.textContent = '✓ 已配置API Key';
      statusEl.className = 'status configured';
    } else {
      statusEl.textContent = '✗ 未配置API Key';
      statusEl.className = 'status not-configured';
    }
  });
}

// 绑定按钮事件
document.getElementById('summarizeBtn')?.addEventListener('click', () => {
  // 发送消息到background，让background转发到content script
  chrome.runtime.sendMessage({ type: 'SHOW_SIDEBAR' });
  window.close();
});

document.getElementById('settingsBtn')?.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// 页面加载时检查配置状态
checkConfigStatus();
