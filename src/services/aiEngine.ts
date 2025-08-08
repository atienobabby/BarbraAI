import { Command, Conversation } from '../types';

class HadassahAI {
  private commands: Command[] = [
    {
      id: 'whatsapp',
      text: 'Open WhatsApp',
      category: 'communication',
      icon: '💬',
      description: 'Opens WhatsApp Web in a new tab'
    },
    {
      id: 'flashlight',
      text: 'Turn on flashlight',
      category: 'device',
      icon: '🔦',
      description: 'Activates your device flashlight'
    },
    {
      id: 'search',
      text: 'Search Google',
      category: 'search',
      icon: '🔍',
      description: 'Performs a web search'
    },
    {
      id: 'brightness',
      text: 'Dim screen brightness',
      category: 'device',
      icon: '🔅',
      description: 'Adjusts screen brightness settings'
    },
    {
      id: 'youtube',
      text: 'Search YouTube',
      category: 'entertainment',
      icon: '📺',
      description: 'Opens YouTube with search query'
    },
    {
      id: 'reminder',
      text: 'Set reminder',
      category: 'productivity',
      icon: '⏰',
      description: 'Creates a new reminder'
    }
  ];

  private responses = {
    greeting: [
      "Hi Barbra! I'm Hadassah, your personal AI assistant. How can I help you today?",
      "Hello! Ready to assist you with whatever you need.",
      "Hey there! What would you like me to help you with?"
    ],
    unknown: [
      "I'm not sure I understand that command. Could you try rephrasing it?",
      "That's a new one for me! Can you explain what you'd like me to do?",
      "I'm still learning. Could you try a different way to ask that?"
    ],
    success: [
      "Done! Anything else I can help you with?",
      "All set! What's next?",
      "Task completed successfully!"
    ]
  };

  processCommand(input: string): string {
    const lowerInput = input.toLowerCase().trim();

    // Greeting patterns
    if (this.isGreeting(lowerInput)) {
      return this.getRandomResponse('greeting');
    }

    // WhatsApp commands
    if (lowerInput.includes('whatsapp') || lowerInput.includes('message')) {
      if (lowerInput.includes('open')) {
        window.open('https://web.whatsapp.com/', '_blank');
        return "Opening WhatsApp Web for you!";
      }
      return "To message someone on WhatsApp, I can open WhatsApp Web for you. Would you like me to do that?";
    }

    // Flashlight commands
    if (lowerInput.includes('flashlight') || lowerInput.includes('torch')) {
      return "I'd love to turn on your flashlight! For security reasons, web browsers don't allow direct flashlight control. Try using your device's quick settings instead.";
    }

    // Search commands
    if (lowerInput.includes('search') || lowerInput.includes('google')) {
      const searchQuery = this.extractSearchQuery(input);
      if (searchQuery) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
        return `Searching Google for "${searchQuery}"!`;
      }
      return "What would you like me to search for?";
    }

    // YouTube commands
    if (lowerInput.includes('youtube')) {
      const searchQuery = this.extractYouTubeQuery(input);
      if (searchQuery) {
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
        return `Opening YouTube search for "${searchQuery}"!`;
      }
      return "What would you like me to search on YouTube?";
    }

    // Brightness commands
    if (lowerInput.includes('brightness') || lowerInput.includes('dim') || lowerInput.includes('bright')) {
      return "I can't directly control your screen brightness from the web, but you can adjust it in your device settings or quick controls!";
    }

    // Reminder commands
    if (lowerInput.includes('remind') || lowerInput.includes('reminder')) {
      return "I'd love to set reminders for you! This feature is coming soon. For now, you can use your device's built-in reminder app.";
    }

    // Time/weather queries
    if (lowerInput.includes('time') || lowerInput.includes('what time')) {
      return `It's currently ${new Date().toLocaleTimeString()}.`;
    }

    if (lowerInput.includes('weather')) {
      return "For weather information, let me search that for you!";
    }

    // Default response
    return this.getRandomResponse('unknown');
  }

  private isGreeting(input: string): boolean {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => input.includes(greeting));
  }

  private extractSearchQuery(input: string): string | null {
    const searchPatterns = [
      /search (?:for |about |)(.+)/i,
      /google (.+)/i,
      /find (.+)/i,
      /look up (.+)/i
    ];

    for (const pattern of searchPatterns) {
      const match = input.match(pattern);
      if (match) return match[1].trim();
    }

    return null;
  }

  private extractYouTubeQuery(input: string): string | null {
    const youtubePatterns = [
      /youtube (.+)/i,
      /search youtube (?:for |about |)(.+)/i,
      /play (.+) on youtube/i
    ];

    for (const pattern of youtubePatterns) {
      const match = input.match(pattern);
      if (match) return match[1].trim();
    }

    return null;
  }

  private getRandomResponse(type: keyof typeof this.responses): string {
    const responses = this.responses[type];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getCommands(): Command[] {
    return this.commands;
  }
}

export const hadassahAI = new HadassahAI();