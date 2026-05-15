# CompanionUI

<p align="center">
  <strong>让 AI 伴侣有界面 — React 组件库</strong>
</p>

<p align="center">
  <a href="https://github.com/longxiashouji/companion-ui">GitHub</a>
  &nbsp;·&nbsp;
  <a href="#这是什么">这是什么</a>
  &nbsp;·&nbsp;
  <a href="#组件列表">组件列表</a>
  &nbsp;·&nbsp;
  <a href="#快速开始">快速开始</a>
  &nbsp;·&nbsp;
  <a href="#api文档">API 文档</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue.svg" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Type%20Safe-blue.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</p>

---

## 目录

- [这是什么？](#这是什么)
- [组件列表](#组件列表)
- [快速开始](#快速开始)
- [API 文档](#api-文档)
- [主题定制](#主题定制)
- [技术栈](#技术栈)
- [作者](#作者)
- [开源协议](#开源协议)

---

## 这是什么？

**CompanionUI** 是一款完全自主研发的 React 组件库，为 AI 伴侣应用提供专业的界面支持。

### 一句话理解

> 给 AI 伴侣装上"表情"——情感可视化、聊天窗口、状态面板、记忆指示器，让 AI 不再是冰冷的文字。

### 组件一览

| 组件 | 说明 | 预览 |
|------|------|------|
| `EmotionDisplay` | Plutchik 情感可视化 | 📊 |
| `ChatWindow` | 完整聊天界面 | 💬 |
| `StatePanel` | 生命状态面板 | 🔋 |
| `MemoryIndicator` | 记忆层级指示 | 🧠 |
| `ProactiveIndicator` | 主动行为状态 | 💭 |

### 能解决什么问题？

| 问题 | CompanionUI 如何解决 |
|------|---------------------|
| AI 伴侣没有界面？ | 开箱即用的 React 组件 |
| 情感无法可视化？ | Plutchik 情感轮盘/柱状图 |
| 用户不知道 AI 状态？ | 状态面板显示能量/睡眠 |
| 不知道 AI 在想什么？ | 主动行为指示器 |

---

## 组件列表

### EmotionDisplay

情感可视化组件，支持轮盘和柱状图两种模式。

```tsx
import { EmotionDisplay } from 'companionui';

<EmotionDisplay
  emotions={{
    joy: 8,
    sadness: 2,
    trust: 6,
    disgust: 1,
    fear: 2,
    anger: 1,
    anticipation: 5,
    surprise: 3,
  }}
  mode="bars"           // "bars" | "wheel"
  dominant="joy"
  compoundState="Excited Unease"
  moodMode="MID"
/>
```

### ChatWindow

完整功能的聊天窗口组件。

```tsx
import { ChatWindow } from 'companionui';

<ChatWindow
  messages={[
    { role: 'user', content: '你好！' },
    { role: 'companion', content: '你好，我在这里。' },
  ]}
  showEmotionTags={true}
  showTimestamps={true}
  onSend={(msg) => handleSend(msg)}
/>
```

### StatePanel

显示伴侣的生命状态面板。

```tsx
import { StatePanel } from 'companionui';

<StatePanel
  sleepQuality={4}          // 1-5
  energyLevel={7}           // 1-10
  activeConcerns={[
    { id: '1', description: '工作截止日期', importance: 'HIGH' },
    { id: '2', description: '用户生日快到了', importance: 'MID' },
  ]}
/>
```

### MemoryIndicator

记忆层级状态指示器。

```tsx
import { MemoryIndicator } from 'companionui';

<MemoryIndicator
  tiers={{
    tier1: { count: 45, label: '实时' },
    tier2: { count: 128, label: '浅层' },
    tier3: { count: 32, label: '结构' },
    tier4: { count: 892, label: '深层' },
  }}
/>
```

### ProactiveIndicator

主动行为状态指示器。

```tsx
import { ProactiveIndicator } from 'companionui';

<ProactiveIndicator
  isThinking={true}
  pendingThoughts={3}
  lastThought="用户在聊工作，我应该..."
/>
```

---

## 快速开始

### 安装

```bash
npm install companionui
```

### 基础使用

```tsx
import { CompanionProvider, ChatWindow, EmotionDisplay } from 'companionui';

function App() {
  return (
    <CompanionProvider apiEndpoint="/api">
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: 300 }}>
          <EmotionDisplay
            emotions={{ joy: 8, sadness: 3, ... }}
            mode="bars"
          />
          <StatePanel sleepQuality={4} energyLevel={7} />
          <MemoryIndicator tiers={...} />
          <ProactiveIndicator isThinking={false} pendingThoughts={0} />
        </div>
        <div style={{ flex: 1 }}>
          <ChatWindow
            showEmotionTags={true}
            onSend={(msg) => handleSend(msg)}
          />
        </div>
      </div>
    </CompanionProvider>
  );
}
```

---

## API 文档

### CompanionProvider

全局上下文提供者。

```tsx
<CompanionProvider
  apiEndpoint="/api"           // 后端 API 地址
  sessionId="abc123"           // 会话 ID（可选）
  theme="dark"                 // 主题："dark" | "light" | "auto"
>
  {children}
</CompanionProvider>
```

### EmotionDisplay Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `emotions` | `Emotions` | 必填 | Plutchik 8 情感值 |
| `mode` | `'bars' \| 'wheel'` | `'bars'` | 显示模式 |
| `dominant` | `string` | 自动 | 主导情感名称 |
| `compoundState` | `string` | - | 复合情感状态 |
| `moodMode` | `'HIGH' \| 'MID' \| 'CALM'` | - | 情绪模式 |

### ChatWindow Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `messages` | `Message[]` | `[]` | 消息列表 |
| `showEmotionTags` | `boolean` | `true` | 显示情感标签 |
| `showTimestamps` | `boolean` | `true` | 显示时间戳 |
| `onSend` | `(msg: string) => void` | 必填 | 发送回调 |

### Hooks

#### `useCompanion`

访问伴侣状态和操作。

```tsx
const {
  emotionState,    // 当前情感状态
  memoryState,      // 记忆状态
  sendMessage,      // 发送消息
  isTyping,         // 是否正在输入
} = useCompanion();
```

#### `useEmotion`

情感计算 Hook。

```tsx
const {
  currentEmotions,  // 当前情感
  dominant,          // 主导情感
  moodMode,          // 情绪模式
  compoundState,      // 复合状态
} = useEmotion(initialState);
```

---

## 主题定制

### 深色主题

```tsx
<CompanionProvider theme="dark">
  <App />
</CompanionProvider>
```

### 自定义主题变量

```css
:root {
  --companion-primary: #07c160;
  --companion-background: #1e1e1e;
  --companion-surface: #2d2d2d;
  --companion-text: #d4d4d4;
  --companion-accent: #4ec9b0;
}
```

---

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | React 18+ |
| 语言 | TypeScript |
| 样式 | CSS Variables + Inline Styles |
| 状态管理 | React Context |
| 包管理 | npm |

---

## 项目结构

```
companionui/
├── src/
│   ├── index.tsx            # 主入口
│   ├── components/
│   │   ├── EmotionDisplay.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── StatePanel.tsx
│   │   ├── MemoryIndicator.tsx
│   │   └── ProactiveIndicator.tsx
│   └── hooks/
│       ├── useCompanion.tsx
│       └── useEmotion.tsx
├── package.json
└── README.md
```

---

## 作者

**阿龙 / Long**

- GitHub: https://github.com/longxiashouji
- Email: 963737104@qq.com
- 微信: clawai

---

## 开源协议

**MIT License**

Copyright (C) 2025 阿龙 / Long

---

<p align="center">
  让 AI 伴侣有温度，看得见
</p>