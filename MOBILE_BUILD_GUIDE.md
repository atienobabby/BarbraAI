# BarbraAI Mobile Build Guide

This guide explains how to build and deploy BarbraAI as both a web app and native mobile apps for iOS and Android using Capacitor.

## Prerequisites

### For All Platforms
- Node.js 16+ and npm
- Git

### For Android Development
- Android Studio (latest version)
- Android SDK (API level 21+)
- Java Development Kit (JDK) 11+

### For iOS Development (macOS only)
- Xcode 12+
- iOS SDK 13+
- CocoaPods (`sudo gem install cocoapods`)

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Capacitor (First time only)
```bash
npm run cap:init
```

### 3. Add Mobile Platforms
```bash
# Add Android platform
npm run cap:add:android

# Add iOS platform (macOS only)
npm run cap:add:ios
```

## Building for Different Platforms

### Web App (Browser)
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The web app will work in any modern browser with all web-compatible features.

### Mobile Apps

#### Build Web Assets First
```bash
# Build and sync to mobile platforms
npm run build:mobile
```

#### Android

##### Development Build
```bash
# Open Android Studio
npm run cap:open:android
```

In Android Studio:
1. Wait for Gradle sync to complete
2. Connect an Android device or start an emulator
3. Click "Run" button or press Ctrl+R

##### Production Build
1. Open Android Studio: `npm run cap:open:android`
2. Go to Build → Generate Signed Bundle/APK
3. Choose "Android App Bundle" for Play Store or "APK" for direct install
4. Follow the signing wizard

#### iOS (macOS only)

##### Development Build
```bash
# Open Xcode
npm run cap:open:ios
```

In Xcode:
1. Select your development team in project settings
2. Choose a device or simulator
3. Click the play button or press Cmd+R

##### Production Build
1. Open Xcode: `npm run cap:open:ios`
2. Select "Any iOS Device" as target
3. Go to Product → Archive
4. Follow the distribution wizard for App Store or Ad Hoc distribution

## Features by Platform

### Web App Features
- ✅ Voice recognition and synthesis
- ✅ Web search and YouTube integration
- ✅ WhatsApp Web opening
- ✅ Local storage for preferences
- ✅ Dark mode and settings
- ❌ Hardware flashlight control
- ❌ Native volume control
- ❌ File system access
- ❌ Native app opening

### Native Mobile App Features
- ✅ All web app features
- ✅ Hardware flashlight control (Android)
- ✅ Native volume control
- ✅ File system read/write access
- ✅ Native app opening (WhatsApp, Camera, etc.)
- ✅ Haptic feedback
- ✅ Device information access
- ✅ Native permissions handling
- ✅ Offline capability

## Development Workflow

### 1. Web Development
```bash
# Start development server
npm run dev

# Make your changes to React components
# Test in browser at http://localhost:5173
```

### 2. Mobile Testing
```bash
# After making changes, build and sync
npm run build:mobile

# Test on Android
npm run cap:run:android

# Test on iOS (macOS only)
npm run cap:run:ios
```

### 3. Live Reload (Development)
For faster mobile development, you can use live reload:

```bash
# Start dev server
npm run dev

# In another terminal, sync with live reload
npx cap run android --livereload --external
npx cap run ios --livereload --external
```

## Permissions

### Android Permissions (Automatic)
- Internet access
- Microphone (for voice input)
- Camera (for opening camera app)
- Storage (for file operations)
- Flashlight control
- Vibration (for haptic feedback)

### iOS Permissions (User Prompted)
- Microphone access (for voice commands)
- Camera access (when opening camera)
- File system access (when saving files)

## Troubleshooting

### Common Issues

#### Android Build Fails
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run build:mobile
```

#### iOS Build Fails
```bash
# Clean iOS build
cd ios/App
xcodebuild clean
cd ../..
npm run build:mobile
```

#### Capacitor Sync Issues
```bash
# Force sync all platforms
npx cap sync --force
```

#### Plugin Issues
```bash
# Reinstall Capacitor plugins
npm uninstall @capacitor/core @capacitor/cli
npm install @capacitor/core @capacitor/cli
npx cap sync
```

### Platform-Specific Issues

#### Android
- Ensure Android SDK is properly installed
- Check that ANDROID_HOME environment variable is set
- Verify Java version compatibility (JDK 11+)

#### iOS
- Ensure Xcode command line tools are installed: `xcode-select --install`
- Check CocoaPods installation: `pod --version`
- Verify iOS deployment target in Xcode (13.0+)

## File Structure

```
├── src/                          # React app source
│   ├── services/
│   │   ├── nativeCapabilities.ts # Native hardware access
│   │   └── enhancedAiEngine.ts   # AI with native features
├── android/                      # Android project
│   └── app/src/main/
│       └── AndroidManifest.xml   # Android permissions
├── ios/                          # iOS project
│   └── App/App/
│       └── Info.plist            # iOS permissions
├── capacitor.config.ts           # Capacitor configuration
└── MOBILE_BUILD_GUIDE.md         # This guide
```

## Deployment

### Web App
Deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

### Android App
- **Google Play Store**: Upload the AAB file from Android Studio
- **Direct Install**: Share the APK file

### iOS App
- **App Store**: Submit through Xcode or App Store Connect
- **TestFlight**: Distribute beta versions

## Testing Checklist

### Web App
- [ ] Voice input works in browser
- [ ] All UI components responsive
- [ ] Settings persist across sessions
- [ ] External links open correctly

### Mobile App
- [ ] Voice input works on device
- [ ] Native features work (flashlight, volume, etc.)
- [ ] File operations work
- [ ] App opening works
- [ ] Permissions requested properly
- [ ] Haptic feedback works
- [ ] App works offline

## Support

For issues specific to:
- **Capacitor**: Check [Capacitor Documentation](https://capacitorjs.com/docs)
- **Android**: Check [Android Developer Docs](https://developer.android.com)
- **iOS**: Check [iOS Developer Docs](https://developer.apple.com/documentation)

## Version Compatibility

- **Capacitor**: 5.x
- **Android**: API 21+ (Android 5.0+)
- **iOS**: 13.0+
- **Node.js**: 16+