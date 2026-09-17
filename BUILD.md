# Build Guide

## Android — three builds

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run android` | Local emulator (QA debug + Metro) | Installed on device |
| `npm run android:qa` | QA APK for real phones | `android/app/build/outputs/apk/qa/release/StarterApp-qa-release.apk` |
| `npm run android:prod` | Prod APK | `android/app/build/outputs/apk/prod/release/StarterApp-prod-release.apk` |
| `npm run android:prod:aab` | Play Store upload (preferred) | `android/app/build/outputs/bundle/prodRelease/app-prod-release.aab` |

### Flavors

| Flavor | Application ID | Notes |
|--------|----------------|-------|
| `qa` | `com.starterapp.qa` | Side-by-side with prod |
| `prod` | `com.starterapp` | Store package |

### Release signing

1. Generate keystore (once, keep forever):

```bash
keytool -genkey -v -keystore android/app/release.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Copy and fill credentials:

```bash
cp android/keystore.properties.example android/keystore.properties
```

Without `keystore.properties`, release builds fall back to the **debug** keystore (fine for QA sideload, **not** for Play Store).

```bash
npm run android:clean   # wipe Gradle build caches
```

---

## iOS

```bash
npm run ios:pods      # CocoaPods (required once / after native dep changes)
npm run ios           # Simulator / device
npm run ios:archive   # .xcarchive
npm run ios:ipa       # Export IPA (needs ExportOptions.plist + Team ID)
```

Bundle ID is `com.starterapp` (aligned with Android). Update Team ID / signing in Xcode and `ios/ExportOptions.plist` before App Store upload.

---

## Version bumps

Keep these aligned when shipping:

- `package.json` → `version`
- `src/config/appConfig.js` → `version` / `buildNumber`
- Android `versionName` / `versionCode` in `android/app/build.gradle`
- iOS `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` in Xcode
