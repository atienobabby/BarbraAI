import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.barbra.ai',
  appName: 'BarbraAI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: false
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#3B82F6'
    },
    Filesystem: {
      requestPermissions: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;