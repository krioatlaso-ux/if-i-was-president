// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — Ana oyun sayfası
// Tüm oyun akışını yönetir: intro → oyun → gameover
// ============================================================

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import { IntroScreen } from "@/components/game/IntroScreen";
import { SwipeCard } from "@/components/game/SwipeCard";
import { StatBar } from "@/components/game/StatBar";
import { ResponseCard } from "@/components/game/ResponseCard";
import { GameOverScreen } from "@/components/game/GameOverScreen";
import type { GameStats } from "@/hooks/useGameState";

export default function Home() {
  const { state, startGame, makeChoice, nextCard, restartGame } = useGameState();
  const [hoveredChoice, setHoveredChoice] = useState<"yes" | "no" | null>(null);
  const statsBefore = useRef<GameStats>({ halk: 60, ordu: 55, para: 50, itibar: 65 });

  function handleChoice(direction: "yes" | "no") {
    statsBefore.current = { ...state.stats };
    makeChoice(direction);
    setHoveredChoice(null);
  }

  function handleShare() {
    const msg = GAME_OVER_MESSAGES[state.gameOverReason];
    const text = `🇹🇷 "Eğer Ben Cumhurbaşkanı Olsaydım" oyununu oynadım!\n\n${msg?.emoji ?? "🏛️"} ${msg?.title ?? "Oyun Bitti"}\n\n📅 ${state.dayCount} gün görevde kaldım\n🏆 ${state.score} puan topladım\n\nSen kaç gün dayanırsın? 👇\n`;

    if (navigator.share) {
      navigator.share({ title: "Eğer Ben Cumhurbaşkanı Olsaydım", text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Paylaşım metni kopyalandı! Instagram Story'ye yapıştırabilirsiniz.");
      });
    }
  }

  const currentEffect = state.currentCard
    ? hoveredChoice === "yes"
      ? state.currentCard.yesEffect
      : hoveredChoice === "no"
      ? state.currentCard.noEffect
      : undefined
    : undefined;

  return (
    <div className="game-root">
      <AnimatePresence mode="wait">
        {state.phase === "intro" && (
          <IntroScreen key="intro" onStart={startGame} />
        )}

        {(state.phase === "playing" || state.phase === "response") && (
          <motion.div
            key="game"
            className="game-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Arka plan */}
            <div
              className="game-bg"
              style={{
                backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663394792489/TFEKqVVGKSEBsgvhpuTyQg/bg-palace-3znmAxWPFjAh9Ah9qKBKnB.webp)`,
              }}
            />
            <div className="game-bg-overlay" />

            {/* Üst bar */}
            <header className="game-header">
              <div className="game-header-left">
                <span className="game-flag">🇹🇷</span>
                <span className="game-title-small">Cumhurbaşkanlığı</span>
              </div>
              <div className="game-day-counter">
                <span className="game-day-label">GÜN</span>
                <span className="game-day-num">{state.dayCount}</span>
              </div>
              <div className="game-header-right">
                <span className="game-player-name">{state.playerName}</span>
              </div>
            </header>

            {/* Stat barları */}
            <div className="game-stats-panel">
              <StatBar
                stats={state.stats}
                hoveredChoice={hoveredChoice}
                yesEffect={state.currentCard?.yesEffect}
                noEffect={state.currentCard?.noEffect}
              />
            </div>

            {/* Ana içerik */}
            <main className="game-main">
              <AnimatePresence mode="wait">
                {state.phase === "playing" && state.currentCard && (
                  <SwipeCard
                    key={state.currentCard.id}
                    card={state.currentCard}
                    onSwipe={handleChoice}
                    onHoverChange={setHoveredChoice}
                    dayCount={state.dayCount}
                  />
                )}
                {state.phase === "response" && state.currentCard && (
                  <ResponseCard
                    key={`response-${state.currentCard.id}`}
                    card={state.currentCard}
                    choice={state.lastChoice!}
                    response={state.lastResponse}
                    statsBefore={statsBefore.current}
                    statsAfter={state.stats}
                    onContinue={nextCard}
                  />
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}

        {state.phase === "gameover" && (
          <GameOverScreen
            key="gameover"
            reason={state.gameOverReason}
            playerName={state.playerName}
            stats={state.stats}
            dayCount={state.dayCount}
            score={state.score}
            isVictory={false}
            onRestart={restartGame}
            onShare={handleShare}
          />
        )}

        {state.phase === "victory" && (
          <GameOverScreen
            key="victory"
            reason="survived"
            playerName={state.playerName}
            stats={state.stats}
            dayCount={state.dayCount}
            score={state.score}
            isVictory={true}
            onRestart={restartGame}
            onShare={handleShare}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline import için
const GAME_OVER_MESSAGES: Record<string, { title: string; emoji: string }> = {
  halk_low: { title: "HALK AYAKTA!", emoji: "✊" },
  halk_high: { title: "POPÜLİST TUZAK!", emoji: "🎭" },
  ordu_low: { title: "ASKERİ DARBE!", emoji: "🪖" },
  ordu_high: { title: "MİLİTARİZM!", emoji: "🎖️" },
  para_low: { title: "İFLAS!", emoji: "💸" },
  para_high: { title: "OLİGARŞİ!", emoji: "🏦" },
  itibar_low: { title: "DİPLOMATİK İZOLASYON!", emoji: "🌍" },
  itibar_high: { title: "POPÜLER OTOKTRAT!", emoji: "👑" },
  survived: { title: "HAYATTA KALDINIZ!", emoji: "🏆" },
};
