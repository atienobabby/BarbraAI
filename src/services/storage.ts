import { UserPreferences, Conversation } from '../types';

const STORAGE_KEYS = {
  PREFERENCES: 'barbra_ai_preferences',
  CONVERSATIONS: 'barbra_ai_conversations'
};

const DEFAULT_PREFERENCES: UserPreferences = {
  nickname: 'Barbra',
  favoriteApps: ['WhatsApp', 'YouTube', 'Google'],
  voiceEnabled: true,
  voicePitch: 1,
  voiceSpeed: 1,
  rememberConversations: true,
  darkMode: false,
  contrast: 1,
  commonRoutines: {
    'good morning': ['brightness up', 'open news', 'check weather'],
    'goodnight': ['dim lights', 'set alarm', 'play soft music']
  }
};

export const StorageService = {
  getPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  },

  setPreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save preferences:', error);
    }
  },

  getConversations(): Conversation[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addConversation(conversation: Omit<Conversation, 'id'>): void {
    try {
      const conversations = this.getConversations();
      const newConversation: Conversation = {
        ...conversation,
        id: Date.now().toString()
      };
      
      const updated = [newConversation, ...conversations].slice(0, 100); // Keep last 100
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save conversation:', error);
    }
  },

  clearConversations(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    } catch (error) {
      console.warn('Failed to clear conversations:', error);
    }
  }
};