# BarbraAI - Personal Voice Assistant

BarbraAI is an intelligent personal voice assistant powered by the Hadassah AI engine. It provides natural voice interaction, smart command processing, and personalized responses while maintaining complete privacy by processing everything locally in your browser.

## Features

### 🎙️ Voice Interaction
- **Speech Recognition**: Natural voice input with real-time transcription
- **Voice Synthesis**: Hadassah responds with customizable voice settings
- **Continuous Listening**: Hands-free operation with voice activation

### 🧠 Smart AI Engine
- **Natural Language Processing**: Understands context and intent
- **Command Recognition**: Processes various types of commands and requests
- **Learning Capability**: Adapts to your communication style over time

### 🔧 Device Integration
- **Web Search**: Intelligent Google and YouTube search
- **App Integration**: Quick access to WhatsApp Web and other services
- **System Commands**: Voice-controlled device settings (where supported)

### 🎨 Customizable Interface
- **Dark/Light Mode**: Toggle between themes
- **High Contrast**: Enhanced visibility options
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion

### 🔒 Privacy First
- **Local Processing**: All voice processing happens in your browser
- **No Data Collection**: Your conversations stay on your device
- **Optional Storage**: Choose whether to remember conversations

## Getting Started

### Prerequisites
- Modern web browser with Web Speech API support (Chrome, Edge, Safari)
- Microphone access for voice input
- Internet connection for web searches and external integrations

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd barbra-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### First Time Setup

1. **Grant Microphone Permission**: When prompted, allow microphone access for voice input
2. **Test Voice Input**: Click the microphone button and say "Hello Hadassah"
3. **Explore Settings**: Navigate to Settings to customize your experience
4. **Try Commands**: Use the Command Gallery to discover what Hadassah can do

## Usage Guide

### Basic Voice Commands

**Greetings & Conversation**
- "Hi Hadassah" / "Hello" / "Hey there"
- "How are you?" / "What can you do?"

**Web Search**
- "Search Google for [query]"
- "Find information about [topic]"
- "Look up [anything]"

**YouTube**
- "Search YouTube for [content]"
- "Find [type] videos on YouTube"
- "Play [content] on YouTube"

**Messaging**
- "Open WhatsApp"
- "Message [contact] on WhatsApp"

**Device Control**
- "Turn on flashlight" (opens instructions)
- "Dim screen brightness" (provides guidance)
- "What time is it?"

**Productivity**
- "Set a reminder for [task]"
- "Remind me to [action] at [time]"

### Settings Configuration

#### Appearance Settings
- **Dark Mode**: Toggle between light and dark themes
- **High Contrast**: Increase contrast for better visibility

#### Audio Settings
- **Voice Responses**: Enable/disable Hadassah's voice responses
- **Voice Pitch**: Adjust the pitch of Hadassah's voice (1.0 = normal)
- **Voice Speed**: Control speaking rate (1.0 = normal speed)

#### Privacy Settings
- **Remember Conversations**: Choose whether to store conversation history
- **Conversation Limit**: Automatically keeps only the last 100 conversations

### Navigation

- **Home**: Main interface with voice input and feature showcase
- **Commands**: Gallery of available commands with examples
- **Settings**: Customize appearance, audio, and privacy preferences

## Technical Architecture

### Core Technologies
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Vite**: Fast development and build tool

### Browser APIs Used
- **Web Speech API**: Speech recognition and synthesis
- **Local Storage**: Preferences and conversation history
- **Fetch API**: External integrations (Google, YouTube)

### Project Structure
```
src/
├── components/          # React components
│   ├── HomePage.tsx     # Main landing page
│   ├── SettingsPage.tsx # Settings configuration
│   ├── CommandGallery.tsx # Available commands showcase
│   ├── VoiceInput.tsx   # Voice interaction component
│   └── Navigation.tsx   # App navigation
├── hooks/              # Custom React hooks
│   ├── useSpeechRecognition.ts
│   └── useSpeechSynthesis.ts
├── services/           # Business logic
│   ├── aiEngine.ts     # Hadassah AI processing
│   └── storage.ts      # Local storage management
└── types/              # TypeScript definitions
```

## Customization

### Adding New Commands

1. **Define the command** in `src/services/aiEngine.ts`:
   ```typescript
   {
     id: 'new-command',
     text: 'Command phrase',
     category: 'productivity',
     icon: '⚡',
     description: 'What this command does'
   }
   ```

2. **Add processing logic** in the `processCommand` method:
   ```typescript
   if (lowerInput.includes('your-trigger-word')) {
     // Your command logic here
     return "Response message";
   }
   ```

### Customizing Appearance

1. **Modify themes** in component files using Tailwind classes
2. **Adjust animations** in Framer Motion configurations
3. **Update gradients** and colors in the design system

### Extending AI Capabilities

1. **Add new response patterns** in `aiEngine.ts`
2. **Implement new integrations** for external services
3. **Enhance natural language processing** logic

## Browser Compatibility

### Fully Supported
- **Chrome 25+**: Complete Web Speech API support
- **Edge 79+**: Full functionality
- **Safari 14.1+**: Speech recognition and synthesis

### Limited Support
- **Firefox**: No native speech recognition (synthesis only)
- **Mobile browsers**: Varies by platform and version

### Fallback Behavior
- Text input always available when voice input isn't supported
- Graceful degradation for unsupported features
- Clear user feedback about browser capabilities

## Troubleshooting

### Voice Input Not Working
1. **Check microphone permissions** in browser settings
2. **Ensure HTTPS connection** (required for Web Speech API)
3. **Try a different browser** (Chrome recommended)
4. **Check microphone hardware** and system settings

### Commands Not Recognized
1. **Speak clearly** and at normal pace
2. **Use exact command phrases** from the Command Gallery
3. **Check for background noise** interference
4. **Try rephrasing** your request

### Settings Not Saving
1. **Check browser storage permissions**
2. **Clear browser cache** and reload
3. **Ensure JavaScript is enabled**
4. **Try incognito/private mode** to test

### Performance Issues
1. **Close unnecessary browser tabs**
2. **Disable browser extensions** temporarily
3. **Check system resources** (CPU, memory)
4. **Update your browser** to the latest version

## Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Privacy & Security

### Data Handling
- **No server communication** for voice processing
- **Local storage only** for preferences and history
- **No tracking or analytics** implemented
- **No external API keys** required for basic functionality

### Permissions Required
- **Microphone access**: For voice input only
- **Local storage**: For saving preferences and conversations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or feature requests:
1. Check the troubleshooting section above
2. Review existing issues in the repository
3. Create a new issue with detailed information
4. Include browser version and error messages

---

**BarbraAI** - Your intelligent personal voice assistant that learns, adapts, and acts just like you would. Built with privacy in mind and powered by modern web technologies.