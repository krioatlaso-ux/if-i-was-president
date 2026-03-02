# 🏪 Play Store & App Store Deployment Checklist

## If I Was President — Store Submission Guide

---

## 📋 Pre-Submission Checklist

### General

- [ ] App version bumped (1.0.0)
- [ ] Build number incremented
- [ ] All bugs fixed and tested
- [ ] Performance optimized
- [ ] No console errors or warnings
- [ ] Offline mode tested
- [ ] All languages tested (TR, EN)
- [ ] Privacy policy written
- [ ] Terms of service written

### Assets

- [ ] App icon (512x512 PNG)
- [ ] Feature graphic (1024x500 PNG)
- [ ] Screenshots (5 adet, 1080x1920 or 1242x2208)
- [ ] App preview video (30 seconds, MP4)
- [ ] Splash screen (1024x1024 PNG)
- [ ] Banner image (1280x720 PNG)

### Content

- [ ] App name finalized
- [ ] Description written (Türkçe + İngilizce)
- [ ] Keywords selected (5-10)
- [ ] Changelog written
- [ ] Support email configured
- [ ] Support website configured
- [ ] Privacy policy URL ready
- [ ] Terms of service URL ready

---

## 🤖 GOOGLE PLAY STORE DEPLOYMENT

### Step 1: Google Play Console Setup

```
1. https://play.google.com/console adresine git
2. "Create app" tıkla
3. App details doldur:
   - App name: "Cumhurbaşkanı"
   - Default language: Turkish
   - App type: Games
   - Category: Casual
   - Content rating: Completed
```

### Step 2: App Information

**Store listing → App details:**

```
App name: Cumhurbaşkanı
Short description: Türkiye'yi yönetebilir misin?
Full description:

🇹🇷 Eğer Ben Cumhurbaşkanı Olsaydım

Türkiye'yi yönetebilir misin? Reigns tarzı siyasi karar oyununda her gün yeni kararlar al. Dört ana istatistiği dengele: Halk, Ordu, Para, İtibar.

Özellikler:
✅ 20+ siyasi karar kartı
✅ 4 stat sistemi (Halk, Ordu, Para, İtibar)
✅ Swipe mekanik
✅ Türkçe + İngilizce
✅ Offline oyun
✅ Sosyal paylaşım

Oyun tamamen kurgusaldır. Gerçek olaylar ve kişilerle benzerlik tesadüftür.

---

🇬🇧 If I Was President

Can you run Turkey? In this Reigns-style political decision game, make daily choices and balance four key stats: Public Support, Military Loyalty, Treasury, and International Reputation.

Features:
✅ 20+ political decision cards
✅ 4 stat system
✅ Swipe mechanics
✅ Turkish + English
✅ Offline play
✅ Social sharing

This game is entirely fictional. Any resemblance to real events or persons is coincidental.

Developer website: https://github.com/krioatlaso-ux/if-i-was-president
Support email: support@cumhurbaskani.app
Privacy policy: https://cumhurbaskani.app/privacy
```

### Step 3: Graphics & Images

**Store listing → Graphics:**

```
App icon (512x512):
- Pixel art saray logo
- Altın sarısı arka plan
- PNG format, no transparency

Feature graphic (1024x500):
- Oyun ekran görüntüsü
- "Cumhurbaşkanı" başlığı
- Büyük, okunabilir

Screenshots (5 adet, 1080x1920):
1. Giriş ekranı
2. Oyun ekranı (kart)
3. Stat barları
4. Game Over ekranı
5. Sosyal paylaşım

App preview video (30 sec, MP4):
- Gameplay montajı
- Swipe mekanik göster
- Stat değişimini göster
- Müzik/ses efektleri
```

### Step 4: Content Rating

**Store listing → Content rating:**

```
Questionnaire doldur:
- Violence: None
- Sexual content: None
- Profanity: Mild (politics)
- Alcohol/Tobacco: None
- Gambling: None
- Scary content: None

Rating: 12+ (PEGI)
```

### Step 5: Pricing & Distribution

**Pricing & distribution:**

```
Pricing:
- Free
- No in-app purchases

Distribution:
- Countries: Select all
- Device categories: Phones, Tablets
- Min Android version: 5.0 (API 21)
- Target Android version: 14 (API 34)
```

### Step 6: Release

**Release → Create new release:**

```
1. Internal testing → Closed testing → Production
2. APK/AAB upload
3. Release notes:
   - v1.0.0: Initial release
   - 20 political decision cards
   - Turkish + English support
   - Offline play
   - Social sharing

4. "Review and roll out" tıkla
5. "Rollout to production" seç
6. Submit for review
```

### Play Store Submission Checklist

```
✅ App name: Cumhurbaşkanı
✅ Package name: com.cumhurbaskani.oyun
✅ Version code: 1
✅ Version name: 1.0.0
✅ Min SDK: 21 (Android 5.0)
✅ Target SDK: 34 (Android 14)
✅ Permissions: INTERNET, ACCESS_NETWORK_STATE
✅ Icon: 512x512 PNG
✅ Feature graphic: 1024x500 PNG
✅ Screenshots: 5 adet (1080x1920)
✅ Description: Türkçe + İngilizce
✅ Content rating: Completed
✅ Privacy policy: https://cumhurbaskani.app/privacy
✅ Support email: support@cumhurbaskani.app
✅ Release notes: v1.0.0
✅ Pricing: Free
✅ Countries: All
```

### Expected Timeline

- **Submission:** 0 hours
- **Initial review:** 2-4 hours
- **Approval:** 24-48 hours
- **Live on Play Store:** 48-72 hours

---

## 🍎 APP STORE DEPLOYMENT

### Step 1: Apple Developer Account

```
1. https://developer.apple.com adresine git
2. Account oluştur
3. Developer Program'a kaydol ($99/yıl)
4. Certificates, Identifiers & Profiles ayarla
```

### Step 2: App Store Connect Setup

```
1. https://appstoreconnect.apple.com adresine git
2. "My Apps" → "+" → "New App"
3. App details doldur:
   - Platform: iOS
   - App name: Cumhurbaşkanı
   - Bundle ID: com.cumhurbaskani.oyun
   - SKU: cumhurbaskani-001
   - User access: Full access
```

### Step 3: App Information

**App Store Connect → App Information:**

```
App name: Cumhurbaşkanı
Subtitle: Türkiye'yi yönetebilir misin?

Description:
🇹🇷 Eğer Ben Cumhurbaşkanı Olsaydım

Türkiye'yi yönetebilir misin? Reigns tarzı siyasi karar oyununda her gün yeni kararlar al. Dört ana istatistiği dengele: Halk, Ordu, Para, İtibar.

Özellikler:
✅ 20+ siyasi karar kartı
✅ 4 stat sistemi
✅ Swipe mekanik
✅ Türkçe + İngilizce
✅ Offline oyun
✅ Sosyal paylaşım

---

🇬🇧 If I Was President

Can you run Turkey? Make daily political decisions and balance four key stats.

Features:
✅ 20+ political cards
✅ 4 stat system
✅ Swipe mechanics
✅ Turkish + English
✅ Offline play
✅ Social sharing

Keywords: oyun, cumhurbaşkan, siyaset, türkiye, game, political, decision

Support URL: https://github.com/krioatlaso-ux/if-i-was-president
Privacy policy URL: https://cumhurbaskani.app/privacy
```

### Step 4: Screenshots & Preview

**App Store Connect → Screenshots:**

```
iPhone 6.7-inch display (1284x2778):
- Screenshot 1: Giriş ekranı
- Screenshot 2: Oyun ekranı
- Screenshot 3: Stat barları
- Screenshot 4: Game Over
- Screenshot 5: Sosyal paylaşım

iPad 12.9-inch display (2048x2732):
- Same screenshots, larger format

App preview video (30 sec, MP4):
- Gameplay montajı
- Swipe mekanik
- Stat değişimi
```

### Step 5: App Preview

**App Store Connect → App Preview:**

```
Video format: MP4 or MOV
Duration: 15-30 seconds
Resolution: 1080x1920 (iPhone)
Codec: H.264
Audio: AAC

Content:
- Oyun açılış
- Swipe mekanik göster
- Stat değişimi
- Game Over
- Sosyal paylaşım
```

### Step 6: General Information

**General → General Information:**

```
Category: Games
Subcategory: Casual
Content rating: 12+
Age rating: 12+
Requires login: No
In-app purchases: No
```

### Step 7: Pricing & Availability

**Pricing & availability:**

```
Pricing tier: Free
Availability: All countries
Release date: Automatic
```

### Step 8: Build

**TestFlight → Builds:**

```
1. Xcode'da Archive oluştur
2. Organizer'da "Distribute App" seç
3. "App Store Connect" seç
4. Upload
5. Processing tamamlanmasını bekle (5-10 min)
6. TestFlight'ta görünecek
```

### Step 9: Submit for Review

**App Store Connect → Version Release:**

```
1. Build seç
2. "Add for Review" tıkla
3. Export compliance doldur
4. Advertising identifier: No
5. Content rights: Confirm
6. "Submit for Review" tıkla
```

### App Store Submission Checklist

```
✅ App name: Cumhurbaşkanı
✅ Bundle ID: com.cumhurbaskani.oyun
✅ Version: 1.0.0
✅ Build: 1
✅ Min iOS: 13.0
✅ Device support: iPhone, iPad
✅ Icon: 1024x1024 PNG
✅ Screenshots: 5 adet (1284x2778)
✅ App preview: 30 sec video
✅ Description: Türkçe + İngilizce
✅ Keywords: oyun, cumhurbaşkan, siyaset, türkiye
✅ Support URL: https://github.com/...
✅ Privacy policy: https://cumhurbaskani.app/privacy
✅ Content rating: 12+
✅ Export compliance: Completed
✅ Build uploaded: Yes
```

### Expected Timeline

- **Build upload:** 5-10 minutes
- **Initial review:** 24-48 hours
- **Approval:** 24-48 hours
- **Live on App Store:** 48-72 hours

---

## 📊 Comparison: Play Store vs App Store

| Kriter | Play Store | App Store |
|--------|-----------|-----------|
| **Review time** | 2-4 hours | 24-48 hours |
| **Approval rate** | ~95% | ~90% |
| **Rejection reasons** | Bugs, policy | Policy, content |
| **Update frequency** | Weekly | Weekly |
| **Developer fee** | $25 (one-time) | $99/year |
| **Revenue share** | 70/30 | 70/30 |

---

## 🔄 Post-Launch

### Week 1

- [ ] Monitor crash reports
- [ ] Fix critical bugs
- [ ] Respond to reviews
- [ ] Monitor download numbers

### Week 2-4

- [ ] Gather user feedback
- [ ] Plan v1.1.0 (bug fixes)
- [ ] Monitor analytics
- [ ] Plan marketing

### Month 2+

- [ ] v1.1.0 release (bug fixes)
- [ ] v1.2.0 release (new features)
- [ ] v2.0.0 release (major update)

---

## 🎯 Success Metrics

```
Target downloads (Month 1): 1,000+
Target rating (Month 1): 4.0+
Target retention (Day 7): 30%+
Target retention (Day 30): 10%+
Target reviews: 100+
```

---

## 📞 Support

### Support Channels

- Email: support@cumhurbaskani.app
- GitHub Issues: https://github.com/krioatlaso-ux/if-i-was-president/issues
- Discord: [Link]
- Twitter: [@cumhurbaskani](https://twitter.com/cumhurbaskani)

### Response Time

- Critical bugs: 24 hours
- Feature requests: 48 hours
- General support: 72 hours

---

**Hazırlanma Tarihi:** 2 Mart 2026  
**Versiyon:** 1.0.0  
**Durum:** Ready for Submission
