# CompanionUI

A self-developed React component library for building AI companion interfaces. Features emotion visualization, chat window, state panels, and memory indicators.

## Features

- **EmotionDisplay**: Visualizes Plutchik 8 emotions with wheel or bar view
- **ChatWindow**: Full-featured chat interface with emotion tags
- **StatePanel**: Displays life state, active concerns, sleep status
- **MemoryIndicator**: Shows memory tier status
- **ProactiveIndicator**: Shows companion thinking state
- **Theme System**: Dark/light themes with warm aesthetic

## Installation

```bash
npm install companionui
```

## Quick Start

```tsx
import { CompanionProvider, ChatWindow, EmotionDisplay } from 'companionui';

function App() {
  return (
    <CompanionProvider apiEndpoint="/api">
      <div style={{ display: 'flex', gap: 20 }}>
        <EmotionDisplay emotions={{ joy: 8, sadness: 3, ... }} />
        <ChatWindow />
      </div>
    </CompanionProvider>
  );
}
```

## Components

### EmotionDisplay

Visualizes the companion's emotional state.

```tsx
<EmotionDisplay
  emotions={{ joy: 8, sadness: 3, trust: 6, ... }}
  mode="bars"  // or "wheel"
  dominant="joy"
  compoundState="Excited Unease"
  moodMode="MID"
/>
```

### ChatWindow

Full-featured chat interface.

```tsx
<ChatWindow
  showEmotionTags={true}
  showTimestamps={true}
  onSend={(msg) => handleSend(msg)}
/>
```

### StatePanel

Displays life state and active concerns.

```tsx
<StatePanel
  sleepQuality={4}
  energyLevel={7}
  activeConcerns={[
    { id: '1', description: 'Work deadline', importance: 'HIGH' }
  ]}
/>
```

### MemoryIndicator

Shows memory tier status.

```tsx
<MemoryIndicator
  tiers={{
    tier1: { count: 45 },
    tier2: { count: 128 },
    tier3: { count: 32 },
    tier4: { count: 892 },
  }}
/>
```

### ProactiveIndicator

Shows companion thinking state.

```tsx
<ProactiveIndicator
  isThinking={true}
  pendingThoughts={3}
/>
```

## Hooks

### useCompanion

Access companion state and actions.

```tsx
const { emotionState, sendMessage, isTyping } = useCompanion();
```

### useEmotion

Emotion computation with decay.

```tsx
const { currentEmotions, dominant, moodMode } = useEmotion(initialState);
```

## API Integration

CompanionUI expects a backend with these endpoints:

- `GET /api/state/:sessionId` - Get companion state
- `POST /api/chat` - Send message, get response
- `POST /api/onboard` - Initialize session

## License

MIT