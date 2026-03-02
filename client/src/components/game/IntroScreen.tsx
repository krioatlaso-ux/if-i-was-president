// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — Giriş ekranı
// Retro oyun başlangıç ekranı, isim girişi
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onStart: (name: string) => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const [name, setName] = useState("");

  function handleStart() {
    onStart(name.trim() || "Cumhurbaşkanı");
  }

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Arka plan */}
      <div
        className="intro-bg"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663394792489/TFEKqVVGKSEBsgvhpuTyQg/bg-palace-3znmAxWPFjAh9Ah9qKBKnB.webp)`,
        }}
      />
      <div className="intro-overlay" />

      <div className="intro-content">
        {/* Logo / Başlık */}
        <motion.div
          className="intro-logo"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <div className="intro-flag">🇹🇷</div>
          <h1 className="intro-title">
            <span className="intro-title-if">Eğer Ben</span>
            <span className="intro-title-president">Cumhurbaşkanı</span>
            <span className="intro-title-olsaydim">Olsaydım</span>
          </h1>
          <p className="intro-subtitle">
            Türkiye'yi yönetebilir misin?
          </p>
        </motion.div>

        {/* Stat açıklamaları */}
        <motion.div
          className="intro-stats-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="intro-stat-item">
            <span>👥</span><span>Halk Desteği</span>
          </div>
          <div className="intro-stat-item">
            <span>⚔️</span><span>Ordu Sadakati</span>
          </div>
          <div className="intro-stat-item">
            <span>💰</span><span>Hazine</span>
          </div>
          <div className="intro-stat-item">
            <span>⭐</span><span>Uluslararası İtibar</span>
          </div>
        </motion.div>

        {/* İsim girişi */}
        <motion.div
          className="intro-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="intro-label">Sayın Cumhurbaşkanı, adınız?</label>
          <input
            className="intro-input"
            type="text"
            placeholder="Adınızı girin..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            maxLength={30}
          />
          <motion.button
            className="intro-start-btn"
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏛️ KOLTUĞA OTU!
          </motion.button>
        </motion.div>

        <p className="intro-disclaimer">
          Bu oyun tamamen kurgusaldır. Gerçek olaylar ve kişilerle benzerlik tesadüftür.
        </p>
      </div>
    </motion.div>
  );
}
