# JKPaw

**版本: 1.5-SNAPSHOT**

Java 版本 OpenClaw - 基于 Spring Boot 的智能代理开发平台，支持 ReAct 推理模式、多 LLM 提供商、MCP 协议扩展。

## 项目简介

JKPaw 是一个功能完整的 Java AI Agent 框架，灵感来源于 OpenClaw 项目。它提供了构建智能 AI 代理所需的核心能力：

- **ReAct 推理引擎** - 支持思考-行动-观察循环的智能推理
- **多 LLM 提供商** - 支持 OpenAI、Anthropic、Ollama、DeepSeek、智谱等多种模型提供商
- **工具系统** - 内置文件操作、Shell 命令、网络搜索等丰富工具
- **技能系统** - 可扩展的技能框架，支持自定义能力模块
- **记忆系统** - 支持短期、中期、长期记忆的上下文管理
- **MCP 协议** - 支持 Model Context Protocol，可接入外部工具服务
- **多渠道接入** - 支持京Me等消息渠道
- **Web UI** - 内置现代化的 Web 管理界面
- **定时任务** - 基于 Quartz 的定时任务调度

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Java | 17+ | 运行环境 |
| Spring Boot | 3.2.5 | 核心框架 |
| Spring WebFlux | - | 响应式流处理 |
| AgentScope | 1.0.9 | Agent 能力增强 |
| Hutool | 5.8.26 | Java 工具库 |
| Apache POI | 5.2.5 | Office 文档处理 |
| Apache PDFBox | 3.0.2 | PDF 处理 |
| Quartz | - | 任务调度 |

---

## 快速开始

### 环境要求

- **JDK 17** 或更高版本
- **Maven 3.6+**（或使用项目内置的 Maven Wrapper）
- 至少一个 LLM 提供商的 API Key

### 安装运行

#### 方式一：使用 Maven Wrapper（推荐）

```bash
# 克隆项目
git clone https://coding.jd.com/jk-ai-mvp/JKPaw.git
cd JKPaw

# 编译并运行（跳过测试）
./mvnw clean package -DskipTests

# 运行应用
java -jar target/JkPaw-1.5-SNAPSHOT.jar
```

#### 方式二：使用打包脚本

```bash
# 快速打包（跳过测试）
./build.sh fast

# 完整打包（包含测试）
./build.sh full

# 直接运行
./build.sh run
```

#### 方式三：开发模式运行

```bash
# 使用 Maven 直接运行（支持热重载）
./mvnw spring-boot:run

# Windows 用户
mvnw.cmd spring-boot:run
```

### 配置 LLM 提供商

启动后访问 http://localhost:8080 打开 Web UI，在「模型配置」页面添加提供商：

1. **OpenAI 兼容提供商** - 支持 OpenAI、DeepSeek、智谱等兼容 API
2. **Anthropic Claude** - 支持 Claude 系列模型
3. **Ollama 本地模型** - 支持本地部署的开源模型

也可以通过环境变量配置：

```bash
export OPENAI_API_KEY=your-api-key
export OPENAI_BASE_URL=https://api.openai.com
export OPENAI_MODEL=gpt-4o-mini
```

---

## 打包脚本说明

项目提供了 `build.sh` 打包脚本，支持三种模式：

| 模式 | 命令 | 说明 |
|------|------|------|
| fast | `./build.sh fast` | 快速打包，跳过测试（默认） |
| full | `./build.sh full` | 完整构建，包含测试 |
| run | `./build.sh run` | 直接运行应用 |

脚本会自动检测并使用 Maven Wrapper 或系统 Maven：

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

MODE="${1:-fast}"

# 自动检测 Maven
if [[ -x "./mvnw" ]]; then
  MVN=("./mvnw")
elif command -v mvn >/dev/null 2>&1; then
  MVN=("mvn")
else
  echo "未找到 Maven，请先安装 Maven 或补充 mvnw" >&2
  exit 1
fi

case "$MODE" in
  fast)
    "${MVN[@]}" -U clean package -DskipTests
    ;;
  full)
    "${MVN[@]}" -U clean verify
    ;;
  run)
    "${MVN[@]}" spring-boot:run
    ;;
  *)
    echo "用法: ./build.sh [fast|full|run]" >&2
    exit 1
    ;;
esac
```

---

## 架构分析

### 整体架构

JKPaw 采用分层架构设计，清晰划分职责边界：

```
┌─────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Web UI    │  │  REST API   │  │   Message Channels      │  │
│  │  (静态资源)  │  │ Controllers │  │   (京Me/飞书/钉钉)       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                         Service Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ AgentService│  │ ChatService │  │   ReactChatService      │  │
│  │ ProviderSvc │  │  SkillSvc   │  │   MemoryService         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                          Agent Layer                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Agent (ReAct)                           │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────────┐  │  │
│  │  │ Session │  │ Prompt  │  │ Memory  │  │ ReAct Engine │  │  │
│  │  │ Manager │  │ Builder │  │ Manager │  │              │  │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └──────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                       Capability Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ ToolSystem  │  │ SkillSystem │  │     MCP Protocol        │  │
│  │ ToolRegistry│  │ SkillManager│  │    McpClientManager     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                        Provider Layer                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   ProviderRegistry                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │  │
│  │  │OpenAI Comp │  │ Anthropic  │  │      Ollama        │   │  │
│  │  │  Provider  │  │  Provider  │  │     Provider       │   │  │
│  │  └────────────┘  └────────────┘  └────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                       Infrastructure Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Config    │  │   Scheduling│  │     Persistence         │  │
│  │  Properties │  │   Quartz    │  │   File Store            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 核心模块说明

#### 1. Agent 模块 (`io.wy.jkpaw.agent`)

Agent 模块是框架的核心，实现了 ReAct（Reasoning + Acting）推理模式。

| 组件 | 说明 |
|------|------|
| [Agent](src/main/java/io/wy/jkpaw/agent/Agent.java) | Agent 接口定义 |
| [AbstractAgent](src/main/java/io/wy/jkpaw/agent/AbstractAgent.java) | Agent 抽象基类 |
| [AgentSession](src/main/java/io/wy/jkpaw/agent/AgentSession.java) | 会话管理，维护对话上下文和状态 |
| [SessionManager](src/main/java/io/wy/jkpaw/agent/SessionManager.java) | 多会话生命周期管理 |

**ReAct 执行流程：**

```
用户输入 → 思考(Thought) → 行动(Action) → 观察(Observation) → ... → 最终响应
                ↑                                              ↓
                └──────────────── 循环迭代 ──────────────────────┘
```

#### 2. 记忆系统 (`io.wy.jkpaw.agent.memory`)

三层记忆架构，模拟人类记忆机制：

| 记忆类型 | 持久化 | 保留时长 | 用途 |
|----------|--------|----------|------|
| 短期记忆 | 内存 | 24小时 | 当前对话上下文 |
| 中期记忆 | 文件 | 30天 | 近期重要信息摘要 |
| 长期记忆 | 文件/向量库 | 永久 | 用户偏好、关键知识 |

#### 3. 工具系统 (`io.wy.jkpaw.agent.tool`)

可扩展的工具框架，支持 Agent 调用外部能力：

| 内置工具 | 功能 |
|----------|------|
| BashExecutionTool | Shell 命令执行 |
| FileReadTool / FileWriteTool | 文件读写 |
| GrepSearchTool / GlobSearchTool | 代码搜索 |
| WebSearchTool | 网络搜索 |
| DateTimeTool | 日期时间处理 |
| CalculatorTool | 数学计算 |
| MemoryTool | 记忆管理 |

#### 4. 技能系统 (`io.wy.jkpaw.agent.skill`)

技能是工具的高层封装，提供完整的领域能力：

- [SkillManager](src/main/java/io/wy/jkpaw/agent/skill/SkillManager.java) - 技能生命周期管理
- [SkillRegistry](src/main/java/io/wy/jkpaw/agent/skill/SkillRegistry.java) - 技能注册中心
- [SkillHubClient](src/main/java/io/wy/jkpaw/agent/skill/SkillHubClient.java) - 技能仓库客户端

#### 5. Provider 模块 (`io.wy.jkpaw.provider`)

多 LLM 提供商抽象层，支持统一接口调用不同模型：

```
ModelProvider (接口)
       │
       ├── AbstractModelProvider (抽象基类)
       │         │
       │         ├── OpenAICompatibleProvider (OpenAI/DeepSeek/智谱等)
       │         │
       │         └── AnthropicProvider (Claude)
       │
       └── ProviderRegistry (注册中心)
```

#### 6. MCP 模块 (`io.wy.jkpaw.mcp`)

Model Context Protocol 支持：

- [McpClientManager](src/main/java/io/wy/jkpaw/mcp/McpClientManager.java) - MCP 客户端管理
- 支持外部工具服务的动态发现和调用
- 兼容 Claude Desktop MCP 标准

---

## 项目结构

```
JKPaw/
├── src/main/java/io/wy/jkpaw/
│   ├── agent/                    # Agent 核心模块
│   │   ├── Agent.java            # Agent 接口定义
│   │   ├── AbstractAgent.java    # Agent 抽象基类
│   │   ├── AgentSession.java     # 会话管理
│   │   ├── SessionManager.java   # 多会话管理器
│   │   ├── command/              # 命令处理
│   │   ├── hook/                 # Agent 钩子机制
│   │   │   ├── AgentHook.java    # 钩子接口
│   │   │   ├── HookManager.java  # 钩子管理器
│   │   │   └── impl/             # 内置钩子实现
│   │   ├── memory/               # 记忆系统
│   │   ├── output/               # 输出处理
│   │   ├── prompt/               # Prompt 构建
│   │   ├── react/                # ReAct 引擎
│   │   ├── skill/                # 技能系统
│   │   └── tool/                 # 工具系统
│   │       ├── Tool.java         # 工具接口
│   │       ├── ToolRegistry.java # 工具注册中心
│   │       ├── ToolExecutor.java # 工具执行器
│   │       └── impl/             # 内置工具实现
│   ├── agentscope/               # AgentScope 集成
│   ├── channel/                  # 消息渠道
│   ├── config/                   # 配置模块
│   │   └── properties/           # 配置属性类
│   ├── controller/               # REST API 控制器
│   ├── cron/                     # 定时任务
│   ├── exception/                # 异常处理
│   ├── mcp/                      # MCP 协议支持
│   ├── model/                    # 数据模型
│   │   ├── dto/                  # 数据传输对象
│   │   ├── entity/               # 实体类
│   │   ├── enums/                # 枚举
│   │   └── vo/                   # 视图对象
│   ├── provider/                 # LLM 提供商
│   │   ├── ModelProvider.java    # 提供商接口
│   │   ├── ProviderRegistry.java # 提供商注册
│   │   └── impl/                 # 提供商实现
│   └── service/                  # 业务服务
├── src/main/resources/
│   ├── application.yml           # 核心配置
│   ├── agent/                    # Prompt 模板
│   │   ├── zh/                   # 中文模板
│   │   └── en/                   # 英文模板
│   ├── skills/                   # 内置技能
│   └── static/                   # Web UI
├── docs/                         # 文档目录
├── sandbox/                      # 沙箱目录（Agent 工作区）
├── workspace/                    # 用户工作区
│   ├── providers/                # 提供商配置
│   ├── sessions/                 # 会话存储
│   ├── memory/                   # 记忆存储
│   ├── skills/                   # 自定义技能
│   └── prompts/                  # 自定义提示词
├── build.sh                      # 打包脚本
├── pom.xml                       # Maven 配置
└── README.md                     # 项目说明
```

---

## 二次开发指南

### 环境准备

1. **安装 JDK 17+**
   ```bash
   # macOS (使用 SDKMAN)
   sdk install java 17.0.9-tem
   
   # 或使用 Homebrew
   brew install openjdk@17
   
   # Linux (Ubuntu)
   sudo apt install openjdk-17-jdk
   ```

2. **安装 Maven 或使用 Maven Wrapper**
   ```bash
   # 使用 Maven Wrapper（项目内置，推荐）
   ./mvnw --version
   
   # 或安装系统 Maven
   # macOS
   brew install maven
   
   # Linux
   sudo apt install maven
   ```

3. **IDE 配置**
   - IntelliJ IDEA：安装 Lombok 插件
   - VS Code：安装 Extension Pack for Java 和 Lombok Annotations

### 添加自定义工具

```java
// 1. 创建工具类
package io.wy.jkpaw.agent.tool.impl;

import io.wy.jkpaw.agent.tool.AbstractTool;
import io.wy.jkpaw.agent.tool.ToolResult;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class WeatherTool extends AbstractTool {
    
    @Override
    public void initialize() {
        setName("weather");
        setDescription("查询指定城市的天气信息");
        setCategory("external");
        setVersion("1.0.0");
    }
    
    @Override
    public ToolResult execute(Map<String, Object> args) {
        String city = (String) args.get("city");
        if (city == null || city.isBlank()) {
            return ToolResult.failure("城市参数不能为空");
        }
        
        // 实现天气查询逻辑
        String weatherInfo = queryWeather(city);
        return ToolResult.success(weatherInfo);
    }
    
    private String queryWeather(String city) {
        // 调用天气 API
        return "晴天，25°C";
    }
}

// 2. 工具会自动被 Spring 注入并注册到 ToolRegistry
```

### 添加自定义技能

```markdown
<!-- workspace/skills/weather/SKILL.md -->
---
name: weather-assistant
version: 1.0.0
description: 天气助手技能，提供天气查询和预报功能
tools:
  - weather
  - web_search
---

# 天气助手技能

## 功能描述
提供以下天气相关能力：
- 当前天气查询
- 天气预报
- 气象预警

## 使用示例

### 查询天气
```
查询北京的天气
```
```

### 添加新的 LLM 提供商

```java
package io.wy.jkpaw.provider.impl;

import io.wy.jkpaw.provider.AbstractModelProvider;
import io.wy.jkpaw.model.enums.ProviderType;
import org.springframework.stereotype.Component;

@Component
public class MyProvider extends AbstractModelProvider {
    
    @Override
    public String getId() {
        return "my-provider";
    }
    
    @Override
    public ProviderType getType() {
        return ProviderType.OPENAI_COMPATIBLE;
    }
    
    @Override
    protected ChatResponse doChat(ChatRequest request) {
        // 实现具体的 API 调用
        return parseResponse(response);
    }
    
    @Override
    protected Flux<String> doStreamChat(ChatRequest request) {
        // 实现流式 API 调用
        return Flux.create(sink -> {
            // 流式处理
        });
    }
}
```

### 添加 Agent 钩子

```java
package io.wy.jkpaw.agent.hook.impl;

import io.wy.jkpaw.agent.hook.AbstractHook;
import io.wy.jkpaw.agent.hook.HookContext;
import org.springframework.stereotype.Component;

@Component
public class LoggingHook extends AbstractHook {
    
    @Override
    public String getName() {
        return "logging-hook";
    }
    
    @Override
    public int getPriority() {
        return 100; // 优先级，数字越小越先执行
    }
    
    @Override
    public void beforeExecute(HookContext context) {
        // 在 Agent 执行前调用
        log.info("Agent starting: {}", context.getSession().getId());
    }
    
    @Override
    public void afterExecute(HookContext context) {
        // 在 Agent 执行后调用
        log.info("Agent finished: {}", context.getSession().getId());
    }
    
    @Override
    public void onError(HookContext context, Exception e) {
        // 发生错误时调用
        log.error("Agent error: {}", e.getMessage());
    }
}
```

---

## 三层目录结构

JKPaw 采用三层目录设计，支持灵活的配置覆盖：

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: classpath (只读)                                   │
│   src/main/resources/                                       │
│   ├── application.yml     # 核心配置                        │
│   ├── agent/              # Prompt 模板                     │
│   └── skills/             # 内置技能                        │
├─────────────────────────────────────────────────────────────┤
│ Layer 2: workspace (可读写)                                 │
│   ./workspace/                                              │
│   ├── providers/          # 用户配置的模型提供商            │
│   ├── sessions/           # 会话持久化                      │
│   ├── memory/             # 记忆存储                        │
│   ├── skills/             # 自定义技能                      │
│   ├── active_skills/      # 激活中的技能                    │
│   └── prompts/            # 自定义提示词                    │
├─────────────────────────────────────────────────────────────┤
│ Layer 3: sandbox (受限读写)                                 │
│   ./sandbox/                                                │
│   └── (Agent 生成的文件)                                    │
└─────────────────────────────────────────────────────────────┘
```

**加载优先级**：workspace > classpath

### 目录配置

可通过环境变量或配置文件覆盖默认目录：

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `JKPAW_WORKSPACE` | 用户工作区 | `./workspace` |
| `JKPAW_SANDBOX` | 沙箱目录 | `./sandbox` |
| `JKPAW_LOGS` | 日志目录 | `./logs` |

---

## REST API 参考

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/agent/chat` | POST | 流式对话 (SSE) |
| `/api/agent/chat/sync` | POST | 同步对话 |
| `/api/providers` | GET/POST/PUT/DELETE | 模型提供商管理 |
| `/api/tools` | GET | 工具列表 |
| `/api/tools/{name}/execute` | POST | 执行工具 |
| `/api/skills` | GET/POST | 技能管理 |
| `/api/memory` | GET/POST/DELETE | 记忆管理 |
| `/api/workspace/*` | GET/POST | 工作空间管理 |
| `/api/cron/jobs` | GET/POST/PUT/DELETE | 定时任务管理 |
| `/api/config` | GET/PUT | 配置管理 |
| `/api/mcp` | GET/POST | MCP 服务管理 |
| `/api/channels` | GET/POST | 消息渠道管理 |

详细 API 文档请参考 [用户使用指南](docs/user-guide.md)。

---

## 配置说明

### 核心配置 (application.yml)

```yaml
jkpaw:
  name: JKPaw
  version: 1.5.0
  debug: false
  
  dirs:
    workspace: ${JKPAW_WORKSPACE:./workspace}
    sandbox: ${JKPAW_SANDBOX:./sandbox}
    logs: ${JKPAW_LOGS:./logs}
  
  agent:
    name: JKPaw Agent
    language: zh
    max-history: 100
    max-iters: 10
    streaming-enabled: true
    memory:
      enabled: true
      long-term:
        enabled: true
        max-size: 1000
      mid-term:
        enabled: true
        max-size: 100
      short-term:
        enabled: true
        max-size: 20
  
  mcp:
    enabled: true
    timeout: 30s
```

---

## 常见问题

### Q1: 启动时端口被占用？

```bash
# 查看端口占用
lsof -i :8080

# 终止进程
kill -9 <PID>

# 或使用其他端口启动
java -jar target/JkPaw-1.5-SNAPSHOT.jar --server.port=8081
```

### Q2: 如何使用本地模型 (Ollama)？

```bash
# 1. 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 2. 启动服务
ollama serve

# 3. 拉取模型
ollama pull llama3.2
ollama pull qwen2.5

# 4. 在 JKPaw 中添加 Ollama 提供商
#    - 类型：Ollama
#    - Base URL：http://localhost:11434
#    - API Key：任意值
#    - 默认模型：llama3.2
```

### Q3: 配置文件存储位置？

用户配置存储在 `./workspace/` 目录：

```
./workspace/
├── providers/providers.json  # 提供商配置
├── sessions/                 # 会话存储
├── memory/                   # 记忆存储
├── skills/                   # 用户技能
├── active_skills/            # 激活技能
└── config.json               # 运行时配置
```

### Q4: 如何查看日志？

```bash
# 查看实时日志
tail -f logs/jkpaw.log

# 查看历史日志
cat logs/jkpaw.log
```

---

## 许可证

本项目采用 MIT 许可证。

## 致谢

- [CoPaw/AgentScope](https://github.com/modelscope/agentscope) - 设计灵感来源
- [Spring Boot](https://spring.io/projects/spring-boot) - 核心框架
- [AgentScope Java](https://github.com/alibaba/AgentScope) - Agent 能力增强