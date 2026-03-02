// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — Stat bar bileşeni
// Retro oyun tarzı can/stat barları, animasyonlu dolum
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { STAT_DEFINITIONS } from "@/core";
import type { GameStats } from "@/hooks/useGameState";

interface StatBarProps {
  stats: GameStats;
  pendingEffects?: Partial<GameStats>;
  swipeDirection?: "left" | "right" | null;
  hoveredChoice?: "yes" | "no" | null;
  yesEffect?: Partial<GameStats>;
  noEffect?: Partial<GameStats>;
}

function getBarColor(value: number): string {
  if (value <= 20) return "#E74C3C";
  if (value <= 40) return "#E67E22";
  if (value >= 80) return "#E74C3C";
  return "#2ECC71";
}

function getDangerPulse(value: number): boolean {
  return value <= 10 || value >= 95;
}

export function StatBar({ stats, swipeDirection, hoveredChoice, yesEffect, noEffect }: StatBarProps) {
  const activeEffect = hoveredChoice === "yes" ? yesEffect : hoveredChoice === "no" ? noEffect : null;

  return (
    <div className="stat-bar-container">
      {STAT_DEFINITIONS.map((stat) => {
        const value = stats[stat.key];
        const effect = activeEffect ? (activeEffect[stat.key] ?? 0) : 0;
        const previewValue = Math.max(0, Math.min(100, value + effect));
        const isDanger = getDangerPulse(value);
        const barColor = getBarColor(value);

        return (
          <div key={stat.key} className="stat-item">
            <div className="stat-label">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-name">{stat.label}</span>
              <span className="stat-value" style={{ color: isDanger ? "#E74C3C" : "#F4C430" }}>
                {Math.round(value)}
              </span>
            </div>
            <div className="stat-track">
              {/* Ana bar */}
              <motion.div
                className="stat-fill"
                style={{ backgroundColor: barColor }}
                animate={{ width: `${value}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
              {/* Preview efekti */}
              {effect !== 0 && (
                <motion.div
                  className="stat-preview"
                  style={{
                    left: effect > 0 ? `${value}%` : `${previewValue}%`,
                    width: `${Math.abs(effect)}%`,
                    backgroundColor: effect > 0 ? "rgba(46, 204, 113, 0.5)" : "rgba(231, 76, 60, 0.5)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              {/* Tehlike göstergesi */}
              {isDanger && (
                <motion.div
                  className="stat-danger-pulse"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>
            {/* Etki göstergesi */}
            <AnimatePresence>
              {effect !== 0 && (
                <motion.span
                  className="stat-effect-label"
                  style={{ color: effect > 0 ? "#2ECC71" : "#E74C3C" }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {effect > 0 ? `+${effect}` : effect}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
