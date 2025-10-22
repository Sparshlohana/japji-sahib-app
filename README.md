# Shri Japji Sahib - React Native App

A peaceful, devotional mobile app for reading and listening to Japji Sahib Path (morning prayer from Guru Granth Sahib Ji).

## Features

### 📖 Read Path
- Full Japji Sahib text in **Gurmukhi**, **Hindi**, and **English** transliteration
- Language switcher with beautiful tab interface
- Auto-scroll functionality
- Adjustable font sizes (Small, Medium, Large, Extra Large)
- Fully offline - no internet required

### 🎧 Audio Player (Integrated in Read Path)
- Audio player with play/pause controls
- 10-second skip forward/backward
- Seek bar for precise navigation
- Offline audio playback
- Beautiful minimalist audio player UI
- Integrated directly into Read Path screen

### 🌅 Daily Hukamnama
- Fetches daily Hukamnama (currently using sample data)
- Available in Gurmukhi, Hindi, and English
- Offline caching - loads instantly
- Pull to refresh

### ⚙️ Settings
- **Dark Mode** - Beautiful night reading mode with golden text on black background
- **Font Size Control** - Choose from 4 different font sizes
- Preferences saved automatically

### 📱 Mala Counter
- Visual mala beads (108 beads in a circle)
- Track your Japji Sahib recitations
- Shows completed rounds
- Auto-saves progress
- Beautiful circular UI

### ℹ️ About
- App information and version
- Feature list
- Contact and support links
- Credits

## Tech Stack

- **Framework**: React Native with Expo (~54.0)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand + Context API
- **Styling**: LinearGradient backgrounds, golden/white theme
- **Audio**: expo-audio (modern, hooks-based API)
- **Storage**: @react-native-async-storage/async-storage
- **Icons**: @expo/vector-icons (Ionicons, MaterialCommunityIcons with Khanda)

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS  
npm run ios
```

## Building APK

This app is configured with EAS Build for easy APK generation:

```bash
# Install EAS CLI globally (if not already installed)
npm install -g eas-cli

# Login to Expo account
eas login

# Configure the project
eas build:configure

# Build Android APK (preview profile)
eas build -p android --profile preview

# Build for production (AAB for Play Store)
eas build -p android --profile production
```

The APK will be available for download from your EAS dashboard once the build completes.

## Build Size Optimization

This project is configured to keep release builds lean:

- **JS Bundle Minification**: Enabled by default in production
- **Console Stripping**: Removes `console.*` calls (except `console.warn` and `console.error`) via Babel
- **Proguard**: Enabled for Android release builds to remove unused classes
- **Resource Shrinking**: Removes unused resources in Android builds
- **Android App Bundles (AAB)**: Use for production to deliver optimized APKs per device configuration

## Recent Updates

✅ **Migrated to expo-audio** - Using the new `expo-audio` package instead of deprecated `expo-av`
✅ **Integrated Audio Player** - Audio controls now integrated directly into Read Path screen
✅ **Modern Hooks API** - Leveraging React hooks for cleaner, more performant audio playback

What we changed:

- Added `babel.config.js` with `transform-remove-console` in production.
- Added the `expo-build-properties` plugin in `app.json` with:
  - `android.enableProguardInReleaseBuilds: true`
  - `android.enableShrinkResourcesInReleaseBuilds: true`

Tips:

- For internal testing where size matters, consider using the `production` profile (AAB) instead of the `preview` APK, or create a dedicated profile that builds per-ABI APKs if you eject/prebuild.
- Large media assets (audio/images) dominate size. Keep audio compressed (e.g., 96–128 kbps AAC/MP3) and optimize images (WebP/PNG). Only ship assets you need.
- Hermes is enabled by default with Expo SDK 54 and helps reduce JS size.

## Project Structure

```
app/
  ├── (tabs)/          # Main tab navigation
  │   ├── index.tsx    # Home screen
  │   └── _layout.tsx  # Tabs layout
  ├── _layout.tsx      # Root layout
  ├── read-path.tsx    # Read Path screen
  ├── hukamnama.tsx    # Daily Hukamnama
  ├── settings.tsx     # Settings screen
  ├── about.tsx        # About screen
  └── mala-counter.tsx # Mala counter modal

assets/
  ├── audio/           # Audio files (add japji-sahib.mp3)
  └── images/          # App icons

contexts/
  └── theme-context.tsx # Theme provider (colors, dark mode, font size)

store/
  └── app-store.ts     # Zustand store (language, mala count)

data/
  └── japji-sahib.json # Japji Sahib text data
```

## Adding Audio File

To enable audio playback:

1. Add your Japji Sahib audio file to `assets/audio/japji-sahib.mp3`
2. The app will automatically load it for offline playback

## Theme & Design

- **Light Mode**: White background with golden (#D4AF37) accents
- **Dark Mode**: Black background with golden (#FFD700) text
- **Gradient Backgrounds**: Smooth transitions for peaceful UI
- **Sikh Symbols**: Khanda icon, Ik Onkar references
- **Footer**: "Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh" on all screens

## Customization

### Adding More Verses

Edit `data/japji-sahib.json` to add complete Japji Sahib text.

### Connecting to Hukamnama API

Update `app/hukamnama.tsx` to fetch from a real API like GurbaniNow.

## Development

```bash
# Start development server
npm start

# Clear cache
npm start -- --clear

# Run linter
npm run lint
```

---

**ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ**

*Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh*