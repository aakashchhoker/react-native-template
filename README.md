# React Native Starter Template

Simple, production-ready **React Native CLI** template (JavaScript only). Clone it, rebrand it, ship many apps.

**Included:** Splash → Onboarding → Tabs · Light/Dark/System theme · Zustand + AsyncStorage · QA & Prod Android builds · Shared UI kit

---

## Quick start

```bash
npm install
npm start          # Metro
npm run android    # Emulator / device (QA debug)
npm run ios:pods && npm run ios   # iOS (macOS)
```

---

## Three Android workflows

| Goal | Command | Output |
|------|---------|--------|
| **1. Local develop** | `npm run android` | Runs on emulator with Metro |
| **2. QA phone APK** | `npm run android:qa` | `android/app/build/outputs/apk/qa/release/StarterApp-qa-release.apk` |
| **3. Play Store** | `npm run android:prod:aab` | `android/app/build/outputs/bundle/prodRelease/app-prod-release.aab` |

Also available: `npm run android:prod` (prod APK).

| Flavor | App ID | Use |
|--------|--------|-----|
| `qa` | `com.starterapp.qa` | Testing (installs beside prod) |
| `prod` | `com.starterapp` | Store release |

Full signing / iOS archive notes: [`BUILD.md`](./BUILD.md)

---

## Create a new app from this template

### 1. Branding (JS)
Edit `src/config/appConfig.js`:

```js
appName, appTagline, version, buildNumber,
packageId, supportEmail, websiteUrl, features
```

### 2. Colors
Edit `src/constants/colors.js` — light + `colors.dark` drive the whole theme.

### 3. Content
- Splash: `src/screens/Splash/`
- Onboarding slides: `src/screens/Onboarding/onboardingData.js`
- Tabs / screens: `src/screens/`

### 4. Native IDs (required for store)
| Platform | What to change |
|----------|----------------|
| Android | `applicationId` in `android/app/build.gradle` |
| iOS | `PRODUCT_BUNDLE_IDENTIFIER` in Xcode (now `com.starterapp`) |
| Display name | `app.json`, Android `strings.xml`, iOS `Info.plist` / `PRODUCT_NAME` |

Keep `appConfig.packageId` in sync with native IDs.

### 5. Feature toggles
In `appConfig.features`:

```js
enableSearch: true,         // Search tab
enableNotifications: true,  // Notifications tab
```

---

## Project layout

```text
src/
  config/appConfig.js     # Rebrand here first
  constants/              # colors, spacing, typography
  theme/                  # light / dark tokens
  store/                  # Zustand (app + theme)
  services/               # AsyncStorage helper
  navigation/             # Splash → Onboarding → Tabs
  screens/                # Feature screens
  components/common/      # AppText, AppButton, AppCard, …
  hooks/                  # useTheme (+ useAppState, useKeyboard)
android/                  # qa + prod flavors
ios/                      # StarterApp Xcode project
```

---

## Screen style pattern

```js
const { theme } = useTheme();
const styles = createStyles(theme);
```

Each screen keeps a local `styles.js` with `createStyles(theme)`.

---

## Play Store signing (once)

```bash
keytool -genkey -v -keystore android/app/release.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

cp android/keystore.properties.example android/keystore.properties
# fill passwords, then:
npm run android:prod:aab
```

Never commit `keystore.properties` or `release.keystore`.

---

## Tests

```bash
npm test
npm run test:coverage
```
# react-native-template
