// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — Oyun bitti ekranı
// GAME OVER / ZAFERi retro pixel art tarzında göster
// KOMİK: Sarcastic mesajlar, danışman tepkileri, meme potansiyeli
// ============================================================

import { motion } from "framer-motion";
import { GAME_OVER_MESSAGES } from "@/data/cards";
import type { GameStats } from "@/hooks/useGameState";
import { STATS } from "@/data/cards";

interface GameOverScreenProps {
  reason: string;
  playerName: string;
  stats: GameStats;
  dayCount: number;
  score: number;
  isVictory?: boolean;
  onRestart: () => void;
  onShare: () => void;
}

export function GameOverScreen({
  reason,
  playerName,
  stats,
  dayCount,
  score,
  isVictory,
  onRestart,
  onShare,
}: GameOverScreenProps) {
  const msg = GAME_OVER_MESSAGES[reason] ?? GAME_OVER_MESSAGES.survived;

  return (
    <motion.div
      className={`gameover-screen ${isVictory ? "victory" : "defeat"}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* CRT efekti */}
      <div className="crt-overlay" />

      <div className="gameover-content">
        {/* Büyük emoji */}
        <motion.div
          className="gameover-emoji"
          animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: isVictory ? Infinity : 3, repeatDelay: 2 }}
        >
          {msg.emoji}
        </motion.div>

        {/* Başlık */}
        <motion.h1
          className={`gameover-title ${isVictory ? "victory-title" : "defeat-title"}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {msg.title}
        </motion.h1>

        <motion.p
          className="gameover-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {msg.subtitle}
        </motion.p>

        {/* İstatistikler */}
        <motion.div
          className="gameover-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="gameover-stat-row">
            <span className="gameover-stat-label">📅 Görevde Kalma</span>
            <span className="gameover-stat-value">{dayCount} Gün</span>
          </div>
          <div className="gameover-stat-row">
            <span className="gameover-stat-label">🏆 Skor</span>
            <span className="gameover-stat-value highlight">{score}</span>
          </div>
          {STATS.map((stat) => (
            <div key={stat.key} className="gameover-stat-row">
              <span className="gameover-stat-label">
                {stat.icon} {stat.label}
              </span>
              <div className="gameover-mini-bar">
                <div
                  className="gameover-mini-fill"
                  style={{
                    width: `${stats[stat.key]}%`,
                    backgroundColor: stats[stat.key] <= 20 || stats[stat.key] >= 90 ? "#E74C3C" : "#2ECC71",
                  }}
                />
              </div>
              <span className="gameover-stat-num">{Math.round(stats[stat.key])}</span>
            </div>
          ))}
        </motion.div>

        {/* Paylaşım metni */}
        <motion.div
          className="gameover-share-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>
            <strong>{playerName}</strong> {dayCount} gün görevde kaldı ve {score} puan topladı!
          </p>
        </motion.div>

        {/* Butonlar */}
        <motion.div
          className="gameover-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="gameover-btn share-btn"
            onClick={onShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📱 Kaderini Paylaş
          </motion.button>
          <motion.button
            className="gameover-btn restart-btn"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Tekrar Oyna
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
