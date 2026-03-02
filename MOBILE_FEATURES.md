# 📱 Mobile-Specific Features

## If I Was President — Mobil Özel Özellikler

---

## 🔔 Push Notifications

### Özellik Açıklaması

Oyunculara günlük haber kartları ve özel etkinlikler hakkında bildirim gönder.

### Kullanım Senaryoları

1. **Günlük Haber** — Her gün saat 09:00'da "Günün Kartı" bildirimi
2. **Başarı** — 10 gün görevde kalınca "Milestone" bildirimi
3. **Sosyal** — Arkadaş yüksek skor yaptığında "Rekabet" bildirimi
4. **Kampanya** — Yeni kart seti yayınlandığında "Güncelleme" bildirimi

### Implementation

```typescript
// src/core/notifications.ts
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

export async function initPushNotifications() {
  // Permission iste
  const permission = await PushNotifications.requestPermissions();
  
  if (permission.receive === 'granted') {
    // Token al ve backend'e gönder
    await PushNotifications.register();
    
    PushNotifications.addListener('registration', (token) => {
      console.log('Push token:', token.value);
      // Backend'e gönder: POST /api/push-tokens
    });
  }
}

// Günlük haber bildirimi (backend'den tetiklenir)
export async function scheduleLocalNotification(title: string, body: string) {
  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id: Date.now(),
        schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 9) }, // 9 saat sonra
        smallIcon: 'ic_stat_icon_config_sample',
        iconColor: '#F4C430',
      },
    ],
  });
}
```

### Backend Integration

```typescript
// Backend: Daily notification job
app.post('/api/notifications/send-daily', async (req, res) => {
  const users = await User.find({ pushTokens: { $exists: true } });
  
  for (const user of users) {
    const dailyCard = getRandomCard();
    
    await sendPushNotification(user.pushTokens, {
      title: 'Günün Kartı',
      body: dailyCard.event.substring(0, 50) + '...',
      data: { cardId: dailyCard.id },
    });
  }
  
  res.json({ sent: users.length });
});
```

---

## 💾 Offline Storage (SQLite)

### Özellik Açıklaması

İnternet bağlantısı olmadan oyun oyna, geri gelince sync et.

### Kullanım Senaryoları

1. **Offline Play** — Uçakta, metroda oyun oyna
2. **Auto-save** — Her karar otomatik kaydedilir
3. **Sync** — İnternet geri gelince cloud'a sync et
4. **Backup** — Oyun verileri cihazda güvenli

### Implementation

```typescript
// src/core/storage.ts
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);

export async function initDatabase() {
  const db = await sqlite.createConnection(
    'cumhurbaskani',
    false,
    'encryption',
    1
  );
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS game_sessions (
      id TEXT PRIMARY KEY,
      player_name TEXT,
      stats JSON,
      day_count INTEGER,
      phase TEXT,
      current_card_id TEXT,
      used_cards TEXT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      synced INTEGER DEFAULT 0
    );
  `);
  
  return db;
}

// Oyun durumunu kaydet
export async function saveGameState(gameState: GameState) {
  const db = await sqlite.retrieveConnection('cumhurbaskani');
  
  await db.run(`
    INSERT OR REPLACE INTO game_sessions 
    (id, player_name, stats, day_count, phase, current_card_id, used_cards, created_at, updated_at, synced)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    gameState.id,
    gameState.playerName,
    JSON.stringify(gameState.stats),
    gameState.dayCount,
    gameState.phase,
    gameState.currentCard?.id,
    JSON.stringify(gameState.usedCardIds),
    gameState.createdAt,
    new Date().toISOString(),
    0, // Not synced yet
  ]);
}

// Oyun durumunu yükle
export async function loadGameState(gameId: string): Promise<GameState | null> {
  const db = await sqlite.retrieveConnection('cumhurbaskani');
  
  const result = await db.query(
    'SELECT * FROM game_sessions WHERE id = ?',
    [gameId]
  );
  
  if (result.values.length === 0) return null;
  
  const row = result.values[0];
  return {
    id: row.id,
    playerName: row.player_name,
    stats: JSON.parse(row.stats),
    dayCount: row.day_count,
    phase: row.phase,
    currentCard: row.current_card_id ? getCardById(row.current_card_id) : null,
    usedCardIds: JSON.parse(row.used_cards),
    createdAt: row.created_at,
  };
}

// Sync unsynced games
export async function syncOfflineGames() {
  const db = await sqlite.retrieveConnection('cumhurbaskani');
  
  const result = await db.query(
    'SELECT * FROM game_sessions WHERE synced = 0'
  );
  
  for (const row of result.values) {
    try {
      await fetch('/api/game-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
      });
      
      await db.run(
        'UPDATE game_sessions SET synced = 1 WHERE id = ?',
        [row.id]
      );
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }
}
```

---

## 📳 Haptic Feedback

### Özellik Açıklaması

Oyuncu etkileşimlerine fiziksel geri bildirim ver (titreşim).

### Kullanım Senaryoları

1. **Swipe** — Hafif titreşim
2. **Game Over** — Güçlü titreşim
3. **Success** — İki kısa titreşim
4. **Stat Change** — Stat değişiminde hafif titreşim

### Implementation

```typescript
// src/core/haptics.ts
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export async function vibrateOnSwipe() {
  await Haptics.impact({ style: ImpactStyle.Light });
}

export async function vibrateOnStatChange() {
  await Haptics.impact({ style: ImpactStyle.Medium });
}

export async function vibrateOnGameOver() {
  await Haptics.impact({ style: ImpactStyle.Heavy });
}

export async function vibrateSuccess() {
  await Haptics.notification({ type: 1 }); // Success
}

export async function vibrateWarning() {
  await Haptics.notification({ type: 2 }); // Warning
}

export async function vibrateError() {
  await Haptics.notification({ type: 3 }); // Error
}

// React component'te kullanım
export function SwipeCard() {
  const handleSwipe = async (direction: 'left' | 'right') => {
    await vibrateOnSwipe();
    // ... swipe logic
  };
  
  return <div onTouchEnd={() => handleSwipe('right')}>...</div>;
}
```

---

## 📤 Share Intent

### Özellik Açıklaması

Oyun sonuçlarını sosyal medyada paylaş (native share dialog).

### Kullanım Senaryoları

1. **Game Over** — Skor ve sonuç paylaş
2. **Milestone** — 10 gün başarısını paylaş
3. **High Score** — Rekor kır
4. **Daily Challenge** — Günlük kartı paylaş

### Implementation

```typescript
// src/core/sharing.ts
import { Share } from '@capacitor/share';

export async function shareGameResult(
  playerName: string,
  dayCount: number,
  score: number,
  gameOverReason: string
) {
  const text = `🇹🇷 "Cumhurbaşkanı" oyununu oynadım!

👤 ${playerName}
📅 ${dayCount} gün görevde kaldım
🏆 ${score} puan topladım
💥 ${gameOverReason}

Senin skorn ne? Oyna: https://cumhurbaskani.app`;

  await Share.share({
    title: 'Cumhurbaşkanı Oyunu',
    text,
    dialogTitle: 'Kaderini Paylaş',
  });
}

export async function shareDailyChallenge(cardTitle: string) {
  const text = `🇹🇷 Bugünün Kartı: "${cardTitle}"

Senin kararın ne olurdu? Oyna: https://cumhurbaskani.app`;

  await Share.share({
    title: 'Günün Kartı',
    text,
    dialogTitle: 'Arkadaşlarına Gönder',
  });
}
```

---

## ⭐ App Store Rating

### Özellik Açıklaması

Oyuncu 5 gün başarıyla oynadıktan sonra app rating iste.

### Implementation

```typescript
// src/core/rating.ts
import { AppRate } from '@capacitor-community/app-rate';

export async function requestAppReview(dayCount: number) {
  // 5 gün başarıyla oynadıktan sonra iste
  if (dayCount === 5) {
    try {
      await AppRate.requestReview();
    } catch (error) {
      console.log('Rating not available');
    }
  }
}

// Game Over ekranında
export function GameOverScreen() {
  const { dayCount } = useGameState();
  
  useEffect(() => {
    requestAppReview(dayCount);
  }, [dayCount]);
  
  return <div>...</div>;
}
```

---

## 🔐 Biometric Authentication

### Özellik Açıklaması

Oyun verilerini fingerprint/face ID ile koru.

### Implementation

```typescript
// src/core/biometric.ts
import { BiometricAuth } from '@capacitor-community/biometric-auth';

export async function enableBiometric() {
  const available = await BiometricAuth.isAvailable();
  
  if (available.isAvailable) {
    const result = await BiometricAuth.authenticate({
      reason: 'Oyun verilerini koru',
      title: 'Biyometrik Kimlik Doğrulama',
      subtitle: 'Parmak izini veya yüzünü tara',
      description: 'Oyun verilerine erişmek için',
    });
    
    if (result.success) {
      // Unlock game data
      localStorage.setItem('biometric_unlocked', 'true');
    }
  }
}

export async function checkBiometricLock() {
  const locked = !localStorage.getItem('biometric_unlocked');
  
  if (locked) {
    await enableBiometric();
  }
}
```

---

## 📊 Analytics

### Özellik Açıklaması

Oyuncu davranışını takip et ve optimize et.

### Tracking Events

```typescript
// src/core/analytics.ts
import { Analytics } from '@capacitor-community/analytics';

export async function trackGameStart(playerName: string) {
  await Analytics.logEvent({
    name: 'game_start',
    params: { player_name: playerName },
  });
}

export async function trackCardDecision(
  cardId: string,
  choice: 'yes' | 'no',
  statChanges: StatEffect
) {
  await Analytics.logEvent({
    name: 'card_decision',
    params: {
      card_id: cardId,
      choice,
      halk_change: statChanges.halk,
      ordu_change: statChanges.ordu,
      para_change: statChanges.para,
      itibar_change: statChanges.itibar,
    },
  });
}

export async function trackGameOver(
  dayCount: number,
  score: number,
  reason: string
) {
  await Analytics.logEvent({
    name: 'game_over',
    params: {
      day_count: dayCount,
      score,
      reason,
    },
  });
}
```

---

## 🎮 Game Controller Support

### Özellik Açıklaması

Bluetooth game controller desteği (Joystick, D-Pad).

### Implementation

```typescript
// src/core/gamepad.ts
import { Gamepad } from '@capacitor-community/gamepad';

export async function initGamepad() {
  Gamepad.addListener('gamepadConnected', (event) => {
    console.log('Gamepad connected:', event.gamepad.id);
  });
  
  Gamepad.addListener('gamepadButtonDown', (event) => {
    if (event.button === 0) { // A button
      handleYesDecision();
    } else if (event.button === 1) { // B button
      handleNoDecision();
    }
  });
}
```

---

## 📍 Location-Based Features (Future)

### Özellik Açıklaması

Oyuncunun konumuna göre özel kartlar (Türkiye'nin farklı şehirleri).

### Örnek

```
Ankara'da oynarsan: "Başkent Krizi" kartı
İstanbul'da oynarsan: "Boğaz Anlaşması" kartı
Antalya'da oynarsan: "Turizm Patlaması" kartı
```

---

## 🔊 Sound Effects & Music

### Özellik Açıklaması

Oyun atmosferi için ses efektleri ve müzik.

### Implementation

```typescript
// src/core/audio.ts
import { NativeAudio } from '@capacitor-community/native-audio';

export async function initAudio() {
  await NativeAudio.preload({
    assetId: 'swipe',
    path: 'audio/swipe.mp3',
    isUrl: false,
  });
  
  await NativeAudio.preload({
    assetId: 'gameover',
    path: 'audio/gameover.mp3',
    isUrl: false,
  });
}

export async function playSwipeSound() {
  await NativeAudio.play({ assetId: 'swipe' });
}

export async function playGameOverSound() {
  await NativeAudio.play({ assetId: 'gameover' });
}
```

---

## 📋 Feature Checklist

```
✅ Push Notifications
✅ Offline Storage (SQLite)
✅ Haptic Feedback
✅ Share Intent
✅ App Store Rating
⏳ Biometric Auth (Future)
⏳ Analytics (Future)
⏳ Game Controller (Future)
⏳ Location-Based (Future)
⏳ Sound Effects (Future)
```

---

**Hazırlanma Tarihi:** 2 Mart 2026  
**Versiyon:** 1.0.0  
**Durum:** Ready for Implementation
