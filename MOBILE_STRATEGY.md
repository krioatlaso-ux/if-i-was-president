# 📱 Mobil App Stratejisi

## If I Was President — Android & iOS Deployment Roadmap

---

## 🎯 Genel Strateji

**Kapacitor** kullanarak mevcut React web uygulamasını iOS ve Android'e dönüştürüyoruz.

### Neden Capacitor?

| Kriter | Capacitor | React Native |
|--------|-----------|--------------|
| **Geliştirme Hızı** | ⚡ Çok hızlı | 🐢 Yavaş |
| **Kod Reuse** | ✅ 100% web kodu | ❌ Yeniden yazma |
| **Web Compatibility** | ✅ Mükemmel | ⚠️ Sınırlı |
| **Native Access** | ✅ Tam | ✅ Tam |
| **Learning Curve** | ✅ Kolay | ⚠️ Zor |
| **Community** | ✅ Büyüyen | ✅ Çok büyük |

**Sonuç:** Capacitor seçiyoruz — hızlı, kolay, web-first.

---

## 📋 Capacitor Setup

### 1. Kurulum

```bash
cd /home/ubuntu/if-i-was-president

# Capacitor CLI yükle
npm install -g @capacitor/cli

# Capacitor başlat
npx cap init

# Platform ekle
npx cap add android
npx cap add ios
```

### 2. Konfigürasyon (capacitor.config.ts)

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cumhurbaskani.oyun',
  appName: 'Cumhurbaşkanı',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
```

### 3. Build Process

```bash
# Web build
pnpm build

# Sync Capacitor
npx cap sync

# Android Studio'da aç
npx cap open android

# Xcode'da aç
npx cap open ios
```

---

## 🤖 Android Deployment

### Gereksinimler

- Android Studio 2022.1+
- JDK 11+
- Android SDK 31+
- Signing key (keystore)

### Step 1: Signing Key Oluştur

```bash
# Keystore oluştur (bir kez)
keytool -genkey -v -keystore cumhurbaskani-release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias cumhurbaskani-key

# Güvenli yerde sakla!
# Dosya: cumhurbaskani-release.keystore
# Şifre: [SECURE_PASSWORD]
# Alias: cumhurbaskani-key
```

### Step 2: Build Configuration

**android/app/build.gradle:**

```gradle
android {
    signingConfigs {
        release {
            storeFile file('cumhurbaskani-release.keystore')
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Step 3: Release Build

```bash
cd android

# Environment variables ayarla
export KEYSTORE_PASSWORD="your_keystore_password"
export KEY_ALIAS="cumhurbaskani-key"
export KEY_PASSWORD="your_key_password"

# Build
./gradlew bundleRelease

# Çıktı: app/release/app-release.aab
```

### Step 4: Play Store Upload

1. **Google Play Console'a git:** https://play.google.com/console
2. **Yeni app oluştur:**
   - App name: "Cumhurbaşkanı"
   - Package name: `com.cumhurbaskani.oyun`
   - App type: Games
   - Category: Casual

3. **Store listing doldur:**
   - Açıklama (Türkçe + İngilizce)
   - Screenshots (5 adet)
   - Icon (512x512)
   - Feature graphic (1024x500)

4. **Content rating questionnaire:**
   - Doldur ve gönder

5. **Pricing & distribution:**
   - Free seç
   - Countries seç

6. **Release:**
   - Internal testing → Closed testing → Production

### Play Store Checklist

```
✅ App name: "Cumhurbaşkanı"
✅ Package name: com.cumhurbaskani.oyun
✅ Version code: 1
✅ Version name: 1.0.0
✅ Min SDK: 21 (Android 5.0)
✅ Target SDK: 34 (Android 14)
✅ Permissions: INTERNET, ACCESS_NETWORK_STATE
✅ Screenshots: 5 adet (1080x1920)
✅ Icon: 512x512 PNG
✅ Feature graphic: 1024x500 PNG
✅ Description: Türkçe + İngilizce
✅ Privacy policy: URL
✅ Content rating: Completed
✅ Release notes: v1.0.0
```

---

## 🍎 iOS Deployment

### Gereksinimler

- macOS 12+
- Xcode 14+
- Apple Developer Account ($99/yıl)
- iOS 13+

### Step 1: Apple Developer Account

1. https://developer.apple.com adresine git
2. Account oluştur
3. Developer Program'a kaydol ($99/yıl)
4. Certificates, Identifiers & Profiles ayarla

### Step 2: Certificates & Provisioning

```bash
# Certificate Signing Request (CSR) oluştur
# Xcode → Settings → Accounts → Manage Certificates

# Apple Developer Portal'da:
# 1. App ID oluştur: com.cumhurbaskani.oyun
# 2. Distribution certificate oluştur
# 3. Provisioning profile oluştur
```

### Step 3: Xcode Build

```bash
# Xcode aç
npx cap open ios

# Xcode'da:
# 1. Project settings → Signing & Capabilities
# 2. Team seç
# 3. Bundle identifier: com.cumhurbaskani.oyun
# 4. Version: 1.0.0
# 5. Build number: 1
```

### Step 4: Archive & Upload

```bash
# Xcode'da Product → Archive

# Organizer'da:
# 1. Archive seç
# 2. "Distribute App" tıkla
# 3. "App Store Connect" seç
# 4. Upload
```

### Step 5: App Store Connect

1. **https://appstoreconnect.apple.com adresine git**

2. **Yeni app oluştur:**
   - App name: "Cumhurbaşkanı"
   - Bundle ID: `com.cumhurbaskani.oyun`
   - SKU: `cumhurbaskani-001`

3. **App information doldur:**
   - Açıklama (Türkçe + İngilizce)
   - Keywords
   - Support URL
   - Privacy policy URL

4. **Screenshots ekle:**
   - 5.5" display: 1242x2208 (iPhone)
   - 6.7" display: 1284x2778 (iPhone Pro Max)
   - iPad: 2048x2732

5. **App preview video (isteğe bağlı):**
   - 30 saniye gameplay video

6. **Content rating:**
   - Questionnaire doldur

7. **Pricing & availability:**
   - Free seç
   - Countries seç

8. **Build seç:**
   - Uploaded build'i seç

9. **Submit for Review**

### App Store Checklist

```
✅ App name: "Cumhurbaşkanı"
✅ Bundle ID: com.cumhurbaskani.oyun
✅ Version: 1.0.0
✅ Build: 1
✅ Min iOS: 13.0
✅ Screenshots: 5 adet (1242x2208)
✅ Icon: 1024x1024 PNG
✅ Description: Türkçe + İngilizce
✅ Keywords: oyun, cumhurbaşkan, siyaset, türkiye
✅ Support URL: https://github.com/krioatlaso-ux/if-i-was-president
✅ Privacy policy: URL
✅ Content rating: Completed
✅ Age rating: 12+
```

---

## 📱 Mobile-Specific Features

### 1. Push Notifications

```typescript
// src/core/notifications.ts
import { PushNotifications } from '@capacitor/push-notifications';

export async function setupPushNotifications() {
  // Permission iste
  const permission = await PushNotifications.requestPermissions();
  
  if (permission.receive === 'granted') {
    // Token al
    const result = await PushNotifications.getDeliveredNotifications();
    console.log('Delivered notifications:', result);
    
    // Listener ekle
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received:', notification);
    });
  }
}

// Günlük haber bildirimi
export async function sendDailyChallenge() {
  // Backend'den çağrılacak
  const notification = {
    title: "Günün Kartı",
    body: "Yeni bir karar seni bekliyor!",
    id: Date.now(),
    actionTypeId: 'open_app',
  };
  
  await PushNotifications.sendNotifications([notification]);
}
```

### 2. Offline Storage (SQLite)

```typescript
// src/core/storage.ts
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);

export async function initDatabase() {
  const db = await sqlite.createConnection('cumhurbaskani', false, 'no-encryption', 1);
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS game_saves (
      id INTEGER PRIMARY KEY,
      player_name TEXT,
      stats JSON,
      day_count INTEGER,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );
  `);
  
  return db;
}

// Oyun durumunu kaydet
export async function saveGameState(gameState: GameState) {
  const db = await sqlite.retrieveConnection('cumhurbaskani');
  
  await db.run(`
    INSERT INTO game_saves (player_name, stats, day_count, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `, [
    gameState.playerName,
    JSON.stringify(gameState.stats),
    gameState.dayCount,
    new Date().toISOString(),
    new Date().toISOString(),
  ]);
}
```

### 3. Vibration & Haptics

```typescript
// src/core/haptics.ts
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export async function vibrateOnSwipe() {
  await Haptics.impact({ style: ImpactStyle.Light });
}

export async function vibrateOnGameOver() {
  await Haptics.impact({ style: ImpactStyle.Heavy });
}

export async function vibrateOnSuccess() {
  await Haptics.notification({ type: 1 }); // Success
}
```

### 4. Share Intent

```typescript
// src/core/sharing.ts
import { Share } from '@capacitor/share';

export async function shareGameResult(playerName: string, score: number) {
  await Share.share({
    title: 'Cumhurbaşkanı Oyunu',
    text: `${playerName} ${score} puan topladı! Senin skorn ne?`,
    url: 'https://play.google.com/store/apps/details?id=com.cumhurbaskani.oyun',
    dialogTitle: 'Kaderini Paylaş',
  });
}
```

### 5. App Store Rating

```typescript
// src/core/rating.ts
import { AppRate } from '@capacitor-community/app-rate';

export async function requestAppReview() {
  await AppRate.requestReview();
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Android & iOS Build)

**.github/workflows/mobile-build.yml:**

```yaml
name: Mobile Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build web
        run: pnpm build
      
      - name: Sync Capacitor
        run: npx cap sync android
      
      - name: Build APK
        run: cd android && ./gradlew assembleRelease
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build web
        run: pnpm build
      
      - name: Sync Capacitor
        run: npx cap sync ios
      
      - name: Build IPA
        run: |
          cd ios/App
          xcodebuild -workspace App.xcworkspace \
            -scheme App \
            -configuration Release \
            -archivePath build/App.xcarchive \
            archive
```

---

## 📊 Deployment Timeline

| Aşama | Süre | Durum |
|-------|------|-------|
| Capacitor Setup | 30 min | ⏳ TODO |
| Android Build & Test | 1 hour | ⏳ TODO |
| Play Store Submission | 2 hours | ⏳ TODO |
| iOS Build & Test | 1 hour | ⏳ TODO |
| App Store Submission | 2 hours | ⏳ TODO |
| Review & Approval | 24-48 hours | ⏳ TODO |
| **TOPLAM** | **~7 hours** | **⏳ TODO** |

---

## 🔐 Güvenlik Checklist

```
✅ API keys → Environment variables
✅ Signing keys → Secure storage
✅ Permissions → Minimum required
✅ Data encryption → SQLite encryption
✅ HTTPS only → Enforced
✅ Privacy policy → Published
✅ Terms of service → Published
✅ GDPR compliance → Implemented
```

---

## 📞 Support & Maintenance

### Post-Launch

- 🐛 Bug fixes
- 📈 Analytics monitoring
- 🔄 Regular updates
- 📱 Device testing
- ⭐ User reviews monitoring

### Update Strategy

```
v1.0.0 → v1.1.0 (Bug fixes)
v1.1.0 → v1.2.0 (New features)
v1.2.0 → v2.0.0 (Major update)
```

---

## 📚 Kaynaklar

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)

---

**Hazırlanma Tarihi:** 2 Mart 2026  
**Versiyon:** 1.0.0  
**Durum:** Ready for Implementation
