# 网页总结翻译器

AI驱动的Chrome浏览器插件，用于网页内容的梳理总结和翻译。

## 功能特性

- ✨ **AI总结**：智能提取网页关键信息，生成3-5点总结
- 🌍 **双向翻译**：支持中英文互译
- 🎨 **侧边栏展示**：不干扰浏览，类似张咋啦的侧边浮窗
- 🔑 **灵活配置**：支持OpenAI、Anthropic、自定义API

## 技术栈

- **Vite + TypeScript**：现代化构建和类型安全
- **Manifest V3**：Chrome扩展最新标准
- **原生JavaScript**：无需React，轻量高效

## 安装使用

### 1. 构建项目

```bash
cd web-summarizer
npm install
npm run build
```

### 2. 准备图标

目前只有SVG图标占位。需要创建PNG图标：

**方法1：在线转换**
- 访问 https://cloudconvert.com/svg-to-png
- 上传 `public/icons/icon.svg`
- 下载并重命名为 icon16.png、icon48.png、icon128.png
- 放入 `public/icons/` 目录

**方法2：使用macOS预览**
```bash
qlmanage -t -s 128 -o . public/icons/icon.svg
mv public/icons/icon.svg.png public/icons/icon128.png
# 重复其他尺寸
```

### 3. 加载到Chrome

1. 打开Chrome，访问 `chrome://extensions/`
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择项目的 `dist/` 目录

### 4. 配置API Key

1. 点击插件图标，选择"API配置"
2. 选择服务商（OpenAI/Anthropic/自定义）
3. 输入对应的API Key
4. 点击"保存设置"

## 支持的API服务

### OpenAI
- 模型：GPT-3.5 Turbo、GPT-4
- 获取API Key：https://platform.openai.com/api-keys

### Anthropic (Claude)
- 模型：Claude 3 Haiku、Claude 3 Sonnet
- 获取API Key：https://console.anthropic.com/

### 自定义API
- 支持兼容OpenAI格式的国内API
- 例如：通义千问、文心一言等
- 需要填写API地址和模型名称

## 开发

```bash
# 开发模式（监听文件变化）
npm run dev

# 生产构建
npm run build
```

## 项目结构

```
web-summarizer/
├── manifest.json          # 扩展配置
├── src/
│   ├── content/           # 内容脚本（注入到网页）
│   ├── background/        # 后台服务（API调用）
│   ├── popup/             # 插件弹窗
│   └── options/           # 设置页
├── public/
│   └── icons/             # 图标文件
└── dist/                  # 构建输出
```

## 使用说明

1. **打开任意网页**
2. **点击插件图标**
3. **点击"总结当前页面"**
4. **侧边栏显示AI生成的总结和翻译**

## 注意事项

- API Key存储在本地，不会上传到任何服务器
- 每次API调用会消耗对应服务商的配额
- 建议使用国内API以获得更稳定的访问体验

## License

MIT
