# AI Smart Board with Speech Recognition 🎤🧠

An interactive learning assistant that combines speech recognition, real-time transcription, and AI-powered content processing.

## 🛠️ Technologies Used

### Frontend Framework & Core Technologies
- **React 18** - Component-based UI library
- **TypeScript** - Static type checking
- **Vite** - Blazing fast build tool
- **Tailwind CSS** - Utility-first CSS framework

### UI & Icons
- **Lucide React** - Beautiful customizable SVG icons

### Browser APIs
- **Web Speech API** - Native speech recognition/synthesis
- **SpeechRecognition** - Speech-to-text conversion
- **SpeechSynthesis** - Text-to-speech functionality

## 📁 Project Structure

src/
├── components/ # Reusable UI pieces
│ ├── Avatar.tsx # Animated AI character
│ ├── SmartBoard.tsx # Live transcript display
│ └── ContentProcessor.tsx # Course library
├── hooks/ # Custom React logic
│ ├── useSpeechRecognition.ts
│ └── useSpeechSynthesis.ts
├── data/ # Static content
│ └── courseMaterials.ts
├── utils/ # Helpers
│ ├── textSummarizer.ts
│ └── contentProcessor.ts
└── App.tsx # Main component

## 🧩 Key Components

### 1. App.tsx (Main Controller)
- Manages recording/content modes
- Coordinates data flow
- Controls avatar behavior

### 2. Avatar.tsx (AI Character)
- Visual states (listening/speaking/idle)
- Animated feedback
- Mode indicators

### 3. SmartBoard.tsx (Display Panel)
- Real-time speech-to-text
- Keyword highlighting
- Auto-generated summaries
- Session statistics

### 4. ContentProcessor.tsx (Course Library)
- Subject browser
- Interactive course cards
- Progress tracking

## 🔧 Custom Hooks

### `useSpeechRecognition.ts`
- Handles microphone input
- Real-time speech conversion
- Error management

### `useSpeechSynthesis.ts`
- Text-to-speech conversion
- Playback controls
- Progress tracking

## 🚀 Getting Started

### Prerequisites
- Node.js v16+

### Installation
```bash
npm install
npm run dev

Open http://localhost:5173 in your browser

🎯 Features
Voice Recording Mode
Click "Start Recording"

Speak naturally

View real-time transcription

Get auto-generated summaries

Export session data

Content Processing Mode
Browse course library

Select any subject

Avatar reads content aloud

Track progress

Review key takeaways
