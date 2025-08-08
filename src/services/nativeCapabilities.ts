import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export class NativeCapabilities {
  static isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  static getPlatform(): string {
    return Capacitor.getPlatform();
  }

  // Flashlight Control
  static async toggleFlashlight(enable: boolean): Promise<boolean> {
    if (!this.isNative()) {
      console.warn('Flashlight control only available in native app');
      return false;
    }

    try {
      // For Android, we'll use a custom plugin or native code
      if (Capacitor.getPlatform() === 'android') {
        // This would require a custom plugin for full flashlight control
        // For now, we'll provide instructions to the user
        return false;
      }
      
      // iOS doesn't allow direct flashlight control from web context
      return false;
    } catch (error) {
      console.error('Flashlight control error:', error);
      return false;
    }
  }

  // Device Volume Control
  static async setVolume(level: number): Promise<boolean> {
    if (!this.isNative()) {
      console.warn('Volume control only available in native app');
      return false;
    }

    try {
      // Volume control requires custom native implementation
      // This is a placeholder for the native bridge
      console.log(`Setting volume to ${level}`);
      return true;
    } catch (error) {
      console.error('Volume control error:', error);
      return false;
    }
  }

  // File System Access
  static async writeFile(path: string, data: string): Promise<boolean> {
    if (!this.isNative()) {
      // Fallback to localStorage for web
      try {
        localStorage.setItem(`file_${path}`, data);
        return true;
      } catch (error) {
        console.error('Web file write error:', error);
        return false;
      }
    }

    try {
      await Filesystem.writeFile({
        path,
        data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      return true;
    } catch (error) {
      console.error('Native file write error:', error);
      return false;
    }
  }

  static async readFile(path: string): Promise<string | null> {
    if (!this.isNative()) {
      // Fallback to localStorage for web
      try {
        return localStorage.getItem(`file_${path}`);
      } catch (error) {
        console.error('Web file read error:', error);
        return null;
      }
    }

    try {
      const result = await Filesystem.readFile({
        path,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      return result.data as string;
    } catch (error) {
      console.error('Native file read error:', error);
      return null;
    }
  }

  static async listFiles(): Promise<string[]> {
    if (!this.isNative()) {
      // Return localStorage keys for web
      const keys = Object.keys(localStorage)
        .filter(key => key.startsWith('file_'))
        .map(key => key.replace('file_', ''));
      return keys;
    }

    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents
      });
      return result.files.map(file => file.name);
    } catch (error) {
      console.error('Native file list error:', error);
      return [];
    }
  }

  // App Opening
  static async openApp(appId: string, fallbackUrl?: string): Promise<boolean> {
    if (!this.isNative()) {
      // Web fallback - open URL
      if (fallbackUrl) {
        window.open(fallbackUrl, '_blank');
        return true;
      }
      return false;
    }

    try {
      // Try to open the app
      await App.openUrl({ url: appId });
      return true;
    } catch (error) {
      console.error('App opening error:', error);
      // Fallback to web URL if available
      if (fallbackUrl) {
        await App.openUrl({ url: fallbackUrl });
        return true;
      }
      return false;
    }
  }

  // Device Info
  static async getDeviceInfo() {
    if (!this.isNative()) {
      return {
        platform: 'web',
        model: navigator.userAgent,
        operatingSystem: 'web',
        osVersion: 'unknown',
        manufacturer: 'unknown',
        isVirtual: false,
        webViewVersion: 'N/A'
      };
    }

    try {
      return await Device.getInfo();
    } catch (error) {
      console.error('Device info error:', error);
      return null;
    }
  }

  // Haptic Feedback
  static async hapticFeedback(style: 'light' | 'medium' | 'heavy' = 'medium'): Promise<void> {
    if (!this.isNative()) {
      // Web fallback - vibration API
      if ('vibrator' in navigator || 'vibrate' in navigator) {
        const duration = style === 'light' ? 50 : style === 'medium' ? 100 : 200;
        navigator.vibrate?.(duration);
      }
      return;
    }

    try {
      const impactStyle = style === 'light' ? ImpactStyle.Light : 
                         style === 'medium' ? ImpactStyle.Medium : ImpactStyle.Heavy;
      await Haptics.impact({ style: impactStyle });
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  }

  // Permission Requests
  static async requestPermissions(): Promise<void> {
    if (!this.isNative()) return;

    try {
      // Request filesystem permissions
      await Filesystem.requestPermissions();
    } catch (error) {
      console.error('Permission request error:', error);
    }
  }
}