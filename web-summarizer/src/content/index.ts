// Content Script: 在网页中运行，提取内容和注入UI

interface PageContent {
  title: string;
  url: string;
  content: string;
}

// 提取页面主要内容
function extractPageContent(): PageContent {
  // 移除不需要的元素
  const scripts = document.querySelectorAll('script, style, nav, footer, header');
  const clones: HTMLElement[] = [];

  scripts.forEach(el => {
    const clone = el.cloneNode(false) as HTMLElement;
    clones.push(clone);
    el.parentNode?.replaceChild(clone, el);
  });

  // 尝试找到主要内容区域
  const mainSelectors = [
    'article',
    'main',
    '[role="main"]',
    '.content',
    '.article',
    '.post',
    '.entry-content',
    '#content',
    'article'
  ];

  let contentElement: HTMLElement | null = null;
  for (const selector of mainSelectors) {
    contentElement = document.querySelector(selector);
    if (contentElement && contentElement.textContent && contentElement.textContent.length > 200) {
      break;
    }
  }

  // 如果没找到，使用body
  if (!contentElement) {
    contentElement = document.body;
  }

  const title = document.title;
  const url = window.location.href;
  const content = contentElement.textContent || '';

  // 恢复被移除的元素
  scripts.forEach((el, i) => {
    el.parentNode?.replaceChild(clones[i], el);
  });

  return { title, url, content: content.substring(0, 15000) }; // 限制长度
}

// 检测页面语言
function detectLanguage(): string {
  const htmlLang = document.documentElement.lang;
  if (htmlLang.includes('zh')) return 'zh';
  if (htmlLang.includes('en')) return 'en';

  // 通过内容检测
  const content = document.body.textContent || '';
  const chineseChars = content.match(/[\u4e00-\u9fa5]/g);
  const ratio = chineseChars ? chineseChars.length / content.length : 0;

  return ratio > 0.3 ? 'zh' : 'en';
}

// 侧边栏组件
function createSidebar(): HTMLElement {
  const sidebar = document.createElement('div');
  sidebar.id = 'web-summarizer-sidebar';
  sidebar.innerHTML = `
    <div class="ws-sidebar-header">
      <span class="ws-title">网页总结翻译器</span>
      <button class="ws-close" title="关闭">×</button>
    </div>
    <div class="ws-sidebar-content">
      <div class="ws-loading">
        <div class="ws-spinner"></div>
        <span>正在分析...</span>
      </div>
      <div class="ws-result" style="display: none;">
        <div class="ws-tabs">
          <button class="ws-tab active" data-type="summary">总结</button>
          <button class="ws-tab" data-type="translation">翻译</button>
        </div>
        <div class="ws-text" id="ws-summary-text"></div>
        <div class="ws-text" id="ws-translation-text" style="display: none;"></div>
      </div>
      <div class="ws-error" style="display: none;"></div>
    </div>
    <div class="ws-sidebar-footer">
      <button class="ws-toggle">收起</button>
    </div>
  `;

  return sidebar;
}

// 注入样式
function injectStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    #web-summarizer-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 360px;
      height: 100vh;
      background: #ffffff;
      box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;
    }

    #web-summarizer-sidebar.ws-collapsed {
      transform: translateX(320px);
    }

    .ws-sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .ws-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }

    .ws-close {
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 20px;
      color: #6b7280;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ws-close:hover {
      background: #e5e7eb;
    }

    .ws-sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .ws-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: #6b7280;
    }

    .ws-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e5e7eb;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: ws-spin 0.8s linear infinite;
    }

    @keyframes ws-spin {
      to { transform: rotate(360deg); }
    }

    .ws-result {
      display: block;
    }

    .ws-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .ws-tab {
      flex: 1;
      padding: 8px 12px;
      border: none;
      background: #f3f4f6;
      color: #6b7280;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .ws-tab.active {
      background: #3b82f6;
      color: white;
    }

    .ws-tab:hover:not(.active) {
      background: #e5e7eb;
    }

    .ws-text {
      font-size: 14px;
      line-height: 1.7;
      color: #374151;
      white-space: pre-wrap;
    }

    .ws-error {
      padding: 16px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #991b1b;
      font-size: 13px;
    }

    .ws-sidebar-footer {
      padding: 12px 20px;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .ws-toggle {
      width: 100%;
      padding: 8px;
      border: none;
      background: #3b82f6;
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .ws-toggle:hover {
      background: #2563eb;
    }

    #web-summarizer-sidebar.ws-collapsed .ws-toggle::before {
      content: "展开";
    }
  `;

  document.head.appendChild(style);
}

// 显示侧边栏
function showSidebar(): void {
  let sidebar = document.getElementById('web-summarizer-sidebar');

  if (!sidebar) {
    injectStyles();
    sidebar = createSidebar();
    document.body.appendChild(sidebar);
    bindSidebarEvents(sidebar);
  }

  sidebar.classList.remove('ws-collapsed');

  // 发送消息分析内容
  const content = extractPageContent();
  const language = detectLanguage();

  chrome.runtime.sendMessage({
    type: 'ANALYZE_CONTENT',
    data: { ...content, language }
  });
}

// 绑定侧边栏事件
function bindSidebarEvents(sidebar: HTMLElement): void {
  // 关闭按钮
  const closeBtn = sidebar.querySelector('.ws-close') as HTMLElement;
  closeBtn?.addEventListener('click', () => {
    sidebar.remove();
  });

  // 折叠按钮
  const toggleBtn = sidebar.querySelector('.ws-toggle') as HTMLElement;
  toggleBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('ws-collapsed');
  });

  // 标签切换
  const tabs = sidebar.querySelectorAll('.ws-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const type = target.dataset.type;

      // 更新标签状态
      tabs.forEach(t => t.classList.remove('active'));
      target.classList.add('active');

      // 切换内容显示
      const summaryText = sidebar.querySelector('#ws-summary-text') as HTMLElement;
      const translationText = sidebar.querySelector('#ws-translation-text') as HTMLElement;

      if (type === 'summary') {
        summaryText.style.display = 'block';
        translationText.style.display = 'none';
      } else {
        summaryText.style.display = 'none';
        translationText.style.display = 'block';
      }
    });
  });
}

// 更新侧边栏内容
function updateSidebarResult(data: {
  summary?: string;
  translation?: string;
  error?: string;
}): void {
  const sidebar = document.getElementById('web-summarizer-sidebar');
  if (!sidebar) return;

  const loading = sidebar.querySelector('.ws-loading') as HTMLElement;
  const result = sidebar.querySelector('.ws-result') as HTMLElement;
  const error = sidebar.querySelector('.ws-error') as HTMLElement;
  const summaryText = sidebar.querySelector('#ws-summary-text') as HTMLElement;
  const translationText = sidebar.querySelector('#ws-translation-text') as HTMLElement;

  if (data.error) {
    loading.style.display = 'none';
    result.style.display = 'none';
    error.style.display = 'block';
    error.textContent = data.error;
  } else {
    loading.style.display = 'none';
    result.style.display = 'block';
    error.style.display = 'none';

    if (data.summary) {
      summaryText.textContent = data.summary;
    }
    if (data.translation) {
      translationText.textContent = data.translation;
    }
  }
}

// 监听来自background的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SHOW_SIDEBAR') {
    showSidebar();
  } else if (message.type === 'ANALYSIS_RESULT') {
    updateSidebarResult(message.data);
  }
});

// 页面加载完成后的初始化
console.log('网页总结翻译器已加载');
