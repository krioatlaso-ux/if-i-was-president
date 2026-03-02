// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — Karar sonrası tepki kartı
// Danışmanın tepkisi ve etkilerin gösterimi
// ============================================================

import { motion } from "framer-motion";
import type { GameCard } from "@/data/cards";
import { ADVISORS, STATS } from "@/data/cards";
import type { GameStats } from "@/hooks/useGameState";

interface ResponseCardProps {
  card: GameCard;
  choice: "yes" | "no";
  response: string;
  statsBefore: GameStats;
  statsAfter: GameStats;
  onContinue: () => void;
}

export function ResponseCard({ card, choice, response, statsBefore, statsAfter, onContinue }: ResponseCardProps) {
  const advisor = ADVISORS[card.advisor];

  return (
    <motion.div
      className="response-card"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* Karar etiketi */}
      <div className={`response-choice-badge ${choice === "yes" ? "yes" : "no"}`}>
        {choice === "yes" ? `✅ ${card.yesText}` : `❌ ${card.noText}`}
      </div>

      {/* Danışman tepkisi */}
      <div className="response-advisor">
        <div className="response-avatar" style={{ borderColor: advisor.accentColor }}>
          <img src={advisor.image} alt={advisor.name} className="advisor-img" />
        </div>
        <div className="response-bubble">
          <div className="response-advisor-name" style={{ color: advisor.accentColor }}>
            {card.advisorName}
          </div>
          <p className="response-text">{response}</p>
        </div>
      </div>

      {/* Etki özeti */}
      <div className="response-effects">
        {STATS.map((stat) => {
          const before = statsBefore[stat.key];
          const after = statsAfter[stat.key];
          const diff = Math.round(after - before);
          if (diff === 0) return null;
          return (
            <motion.div
              key={stat.key}
              className="effect-item"
              initial={{ opacity: 0, x: diff > 0 ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>{stat.icon}</span>
              <span className="effect-label">{stat.label}</span>
              <span
                className="effect-value"
                style={{ color: diff > 0 ? "#2ECC71" : "#E74C3C" }}
              >
                {diff > 0 ? `+${diff}` : diff}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        className="response-continue-btn"
        onClick={onContinue}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Sonraki Karar →
      </motion.button>
    </motion.div>
  );
}
