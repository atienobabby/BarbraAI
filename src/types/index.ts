export interface Command {
  id: string;
  text: string;
  category: 'communication' | 'device' | 'search' | 'productivity' | 'entertainment';
  icon: string;
  description: string;
}

export interface Conversation {
  id: string;
  timestamp: Date;
  userMessage: string;
  aiResponse: string;
}

export interface UserPreferences {
  nickname: string;
  favoriteApps: string[];
  voiceEnabled: boolean;
  voicePitch: number;
  voiceSpeed: number;
  rememberConversations: boolean;
  commonRoutines: Record<string, string[]>;
  darkMode: boolean;
  contrast: number;
}

export interface FeatureCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  example: string;
  color: string;
}