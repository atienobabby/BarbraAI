import { hadassahAI } from './aiEngine';
import { NativeCapabilities } from './nativeCapabilities';

class EnhancedHadassahAI {
  private baseAI = hadassahAI;

  async processCommand(input: string): Promise<string> {
    const lowerInput = input.toLowerCase().trim();

    // Enhanced flashlight control for native apps
    if (lowerInput.includes('flashlight') || lowerInput.includes('torch')) {
      if (NativeCapabilities.isNative()) {
        const isOn = lowerInput.includes('on') || lowerInput.includes('turn on') || lowerInput.includes('enable');
        const isOff = lowerInput.includes('off') || lowerInput.includes('turn off') || lowerInput.includes('disable');
        
        if (isOn) {
          const success = await NativeCapabilities.toggleFlashlight(true);
          await NativeCapabilities.hapticFeedback('light');
          return success ? "Flashlight turned on!" : "I can't control the flashlight directly, but you can use your device's quick settings or control center.";
        } else if (isOff) {
          const success = await NativeCapabilities.toggleFlashlight(false);
          await NativeCapabilities.hapticFeedback('light');
          return success ? "Flashlight turned off!" : "I can't control the flashlight directly, but you can use your device's quick settings or control center.";
        }
        
        return "Would you like me to turn the flashlight on or off?";
      } else {
        return "Flashlight control is available when you install BarbraAI as a mobile app. For now, you can use your device's quick settings.";
      }
    }

    // Enhanced volume control
    if (lowerInput.includes('volume')) {
      if (NativeCapabilities.isNative()) {
        if (lowerInput.includes('up') || lowerInput.includes('increase')) {
          await NativeCapabilities.setVolume(0.8);
          await NativeCapabilities.hapticFeedback('light');
          return "Volume increased!";
        } else if (lowerInput.includes('down') || lowerInput.includes('decrease') || lowerInput.includes('lower')) {
          await NativeCapabilities.setVolume(0.3);
          await NativeCapabilities.hapticFeedback('light');
          return "Volume decreased!";
        } else if (lowerInput.includes('mute')) {
          await NativeCapabilities.setVolume(0);
          await NativeCapabilities.hapticFeedback('medium');
          return "Volume muted!";
        }
        return "I can help you adjust the volume. Say 'volume up', 'volume down', or 'mute'.";
      } else {
        return "Volume control is available when you install BarbraAI as a mobile app. You can use your device's volume buttons for now.";
      }
    }

    // Enhanced app opening
    if (lowerInput.includes('open') && (lowerInput.includes('whatsapp') || lowerInput.includes('camera') || lowerInput.includes('settings'))) {
      await NativeCapabilities.hapticFeedback('light');
      
      if (lowerInput.includes('whatsapp')) {
        const success = await NativeCapabilities.openApp('whatsapp://send', 'https://web.whatsapp.com');
        return success ? "Opening WhatsApp!" : "I tried to open WhatsApp but couldn't find it installed.";
      } else if (lowerInput.includes('camera')) {
        const success = await NativeCapabilities.openApp('camera://', null);
        return success ? "Opening Camera!" : "I tried to open the camera app.";
      } else if (lowerInput.includes('settings')) {
        const success = await NativeCapabilities.openApp('app-settings:', null);
        return success ? "Opening device settings!" : "I tried to open device settings.";
      }
    }

    // File operations
    if (lowerInput.includes('save') || lowerInput.includes('write file')) {
      if (NativeCapabilities.isNative()) {
        const filename = `barbra_note_${Date.now()}.txt`;
        const content = input.replace(/save|write file/gi, '').trim() || 'Note saved by BarbraAI';
        const success = await NativeCapabilities.writeFile(filename, content);
        await NativeCapabilities.hapticFeedback('medium');
        return success ? `File saved as ${filename}!` : "I couldn't save the file. Please check permissions.";
      } else {
        return "File saving is available when you install BarbraAI as a mobile app.";
      }
    }

    if (lowerInput.includes('list files') || lowerInput.includes('show files')) {
      const files = await NativeCapabilities.listFiles();
      await NativeCapabilities.hapticFeedback('light');
      return files.length > 0 ? `I found ${files.length} files: ${files.slice(0, 5).join(', ')}${files.length > 5 ? '...' : ''}` : "No files found.";
    }

    // Device info
    if (lowerInput.includes('device info') || lowerInput.includes('phone info')) {
      const info = await NativeCapabilities.getDeviceInfo();
      await NativeCapabilities.hapticFeedback('light');
      if (info) {
        return `Device: ${info.model} running ${info.operatingSystem} ${info.osVersion}`;
      }
      return "I couldn't get device information.";
    }

    // Fall back to original AI for other commands
    return this.baseAI.processCommand(input);
  }

  getCommands() {
    const baseCommands = this.baseAI.getCommands();
    
    // Add native-specific commands
    const nativeCommands = [
      {
        id: 'flashlight-native',
        text: 'Turn on flashlight',
        category: 'device' as const,
        icon: '🔦',
        description: 'Controls device flashlight (native app only)'
      },
      {
        id: 'volume-native',
        text: 'Volume up',
        category: 'device' as const,
        icon: '🔊',
        description: 'Adjusts device volume (native app only)'
      },
      {
        id: 'save-file',
        text: 'Save note to file',
        category: 'productivity' as const,
        icon: '💾',
        description: 'Saves text to device storage (native app only)'
      },
      {
        id: 'open-camera',
        text: 'Open camera',
        category: 'device' as const,
        icon: '📷',
        description: 'Opens device camera app (native app only)'
      }
    ];

    return [...baseCommands, ...nativeCommands];
  }
}

export const enhancedHadassahAI = new EnhancedHadassahAI();