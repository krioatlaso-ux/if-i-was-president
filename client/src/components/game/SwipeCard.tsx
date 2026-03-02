// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — Swipe kart bileşeni
// Framer Motion drag, sağa/sola swipe ile karar verme
// ============================================================

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import type { GameCard } from "@/data/cards";
import { ADVISORS } from "@/data/cards";

interface SwipeCardProps {
  card: GameCard;
  onSwipe: (direction: "yes" | "no") => void;
  onHoverChange?: (choice: "yes" | "no" | null) => void;
  dayCount: number;
}

const SWIPE_THRESHOLD = 100;

export function SwipeCard({ card, onSwipe, onHoverChange, dayCount }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exiting, setExiting] = useState<"yes" | "no" | null>(null);

  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const yesOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const noOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);
  const cardScale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);

  const advisor = ADVISORS[card.advisor];

  function handleDragEnd() {
    setIsDragging(false);
    onHoverChange?.(null);
    const currentX = x.get();
    if (currentX > SWIPE_THRESHOLD) {
      triggerSwipe("yes");
    } else if (currentX < -SWIPE_THRESHOLD) {
      triggerSwipe("no");
    } else {
      x.set(0);
    }
  }

  function handleDrag() {
    const currentX = x.get();
    if (currentX > 30) {
      onHoverChange?.("yes");
    } else if (currentX < -30) {
      onHoverChange?.("no");
    } else {
      onHoverChange?.(null);
    }
  }

  function triggerSwipe(direction: "yes" | "no") {
    setExiting(direction);
    const targetX = direction === "yes" ? 600 : -600;
    x.set(targetX);
    setTimeout(() => {
      onSwipe(direction);
      setExiting(null);
    }, 350);
  }

  return (
    <div className="swipe-card-wrapper">
      {/* Arka kart (dekoratif) */}
      <div className="swipe-card-back" />

      <motion.div
        ref={cardRef}
        className="swipe-card"
        style={{ x, rotate, scale: cardScale }}
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={0.15}
        onDragStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
        animate={exiting ? { x: exiting === "yes" ? 600 : -600, opacity: 0 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* EVET etiketi */}
        <motion.div className="swipe-label yes-label" style={{ opacity: yesOpacity }}>
          <span>✅ EVET</span>
        </motion.div>

        {/* HAYIR etiketi */}
        <motion.div className="swipe-label no-label" style={{ opacity: noOpacity }}>
          <span>❌ HAYIR</span>
        </motion.div>

        {/* Kart içeriği */}
        <div className="card-header">
          <div className="card-day-badge">GÜN {dayCount}</div>
          <div className="card-category">{card.category.replace("_", " ").toUpperCase()}</div>
        </div>

        {/* Danışman */}
        <div className="card-advisor">
          <div className="advisor-avatar" style={{ borderColor: advisor.accentColor }}>
            <img
              src={advisor.image}
              alt={advisor.name}
              className="advisor-img"
              draggable={false}
            />
          </div>
          <div className="advisor-info">
            <div className="advisor-name" style={{ color: advisor.accentColor }}>
              {card.advisorName}
            </div>
            <div className="advisor-title">{advisor.name}</div>
          </div>
        </div>

        {/* Olay metni */}
        <div className="card-event">
          <p className="card-event-text">{card.event}</p>
          {card.context && (
            <p className="card-context">{card.context}</p>
          )}
        </div>

        {/* Seçenekler */}
        <div className="card-choices">
          <button
            className="choice-btn no-btn"
            onClick={() => triggerSwipe("no")}
          >
            ← {card.noText}
          </button>
          <button
            className="choice-btn yes-btn"
            onClick={() => triggerSwipe("yes")}
          >
            {card.yesText} →
          </button>
        </div>

        {/* Sürükleme ipucu */}
        {!isDragging && (
          <div className="drag-hint">
            <span>← Sola çek</span>
            <span className="drag-icon">☰</span>
            <span>Sağa çek →</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
