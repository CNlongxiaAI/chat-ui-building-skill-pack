# Chat UI Building Skill Pack

<p align="center">
  <strong>让 AI 伴侣有界面 — React 组件库</strong>
</p>

<p align="center">
  <a href="https://github.com/CNlongxiaAI/chat-ui-building-skill-pack">GitHub</a>
</p>

---

## 这是什么？

**Chat UI Building Skill Pack** 是一款完全自主研发的 React 组件库，为 AI 伴侣应用提供专业的界面支持。

### 组件一览

| 组件 | 说明 |
|------|------|
| EmotionDisplay | Plutchik 情感可视化 |
| ChatWindow | 完整聊天界面 |
| StatePanel | 生命状态面板 |
| MemoryIndicator | 记忆层级指示 |

---

## 快速开始

### 安装

```bash
npm install chat-ui-building-skill-pack
```

### 基础使用

```tsx
import { EmotionDisplay, ChatWindow } from "chat-ui-building-skill-pack";

<EmotionDisplay emotions={{ joy: 8, sadness: 2 }} mode="bars" />
<ChatWindow messages={[]} onSend={(msg) => handleSend(msg)} />
```

---

## 作者

**阿龙 / Long**
- GitHub: https://github.com/longxiashouji
- Email: 963737104@qq.com
- 微信: clawai

## 开源协议

**MIT License**
Copyright (C) 2025 阿龙 / Long
