// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — Oyun state yönetimi
// Swipe mekanik, bar sistemi, oyun döngüsü
// ============================================================

import { useState, useCallback, useRef } from "react";
import { CARDS, type GameCard, type CardEffect, type StatKey } from "@/data/cards";

export type GamePhase = "intro" | "playing" | "response" | "gameover" | "victory";

export interface GameStats {
  halk: number;
  ordu: number;
  para: number;
  itibar: number;
}

export interface GameState {
  phase: GamePhase;
  playerName: string;
  stats: GameStats;
  currentCard: GameCard | null;
  cardIndex: number;
  dayCount: number;
  lastChoice: "yes" | "no" | null;
  lastResponse: string;
  gameOverReason: string;
  score: number;
  usedCardIds: string[];
  deck: GameCard[];
}

const INITIAL_STATS: GameStats = {
  halk: 60,
  ordu: 55,
  para: 50,
  itibar: 65,
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(val: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, val));
}

function applyEffect(stats: GameStats, effect: CardEffect): GameStats {
  return {
    halk: clamp(stats.halk + effect.halk),
    ordu: clamp(stats.ordu + effect.ordu),
    para: clamp(stats.para + effect.para),
    itibar: clamp(stats.itibar + effect.itibar),
  };
}

function checkGameOver(stats: GameStats): string | null {
  const threshold = 10;
  const ceiling = 95;
  if (stats.halk <= threshold) return "halk_low";
  if (stats.halk >= ceiling) return "halk_high";
  if (stats.ordu <= threshold) return "ordu_low";
  if (stats.ordu >= ceiling) return "ordu_high";
  if (stats.para <= threshold) return "para_low";
  if (stats.para >= ceiling) return "para_high";
  if (stats.itibar <= threshold) return "itibar_low";
  if (stats.itibar >= ceiling) return "itibar_high";
  return null;
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: "intro",
    playerName: "",
    stats: { ...INITIAL_STATS },
    currentCard: null,
    cardIndex: 0,
    dayCount: 0,
    lastChoice: null,
    lastResponse: "",
    gameOverReason: "",
    score: 0,
    usedCardIds: [],
    deck: [],
  });

  const deckRef = useRef<GameCard[]>([]);

  const startGame = useCallback((name: string) => {
    const shuffled = shuffleArray(CARDS);
    deckRef.current = shuffled;
    setState({
      phase: "playing",
      playerName: name || "Cumhurbaşkanı",
      stats: { ...INITIAL_STATS },
      currentCard: shuffled[0] ?? null,
      cardIndex: 0,
      dayCount: 1,
      lastChoice: null,
      lastResponse: "",
      gameOverReason: "",
      score: 0,
      usedCardIds: [],
      deck: shuffled,
    });
  }, []);

  const makeChoice = useCallback((choice: "yes" | "no") => {
    setState((prev) => {
      if (!prev.currentCard || prev.phase !== "playing") return prev;

      const effect = choice === "yes" ? prev.currentCard.yesEffect : prev.currentCard.noEffect;
      const response = choice === "yes" ? prev.currentCard.yesResponse : prev.currentCard.noResponse;
      const newStats = applyEffect(prev.stats, effect);
      const gameOverReason = checkGameOver(newStats);

      if (gameOverReason) {
        return {
          ...prev,
          stats: newStats,
          lastChoice: choice,
          lastResponse: response,
          phase: "gameover",
          gameOverReason,
          score: prev.dayCount * 10 + Math.round((newStats.halk + newStats.ordu + newStats.para + newStats.itibar) / 4),
        };
      }

      return {
        ...prev,
        stats: newStats,
        lastChoice: choice,
        lastResponse: response,
        phase: "response",
        usedCardIds: [...prev.usedCardIds, prev.currentCard.id],
      };
    });
  }, []);

  const nextCard = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.cardIndex + 1;
      const deck = prev.deck;

      if (nextIndex >= deck.length) {
        // Tüm kartlar bitti — zafer!
        return {
          ...prev,
          phase: "victory",
          gameOverReason: "survived",
          score: prev.dayCount * 10 + Math.round((prev.stats.halk + prev.stats.ordu + prev.stats.para + prev.stats.itibar) / 4),
        };
      }

      return {
        ...prev,
        phase: "playing",
        currentCard: deck[nextIndex],
        cardIndex: nextIndex,
        dayCount: prev.dayCount + 1,
        lastChoice: null,
        lastResponse: "",
      };
    });
  }, []);

  const restartGame = useCallback(() => {
    setState({
      phase: "intro",
      playerName: "",
      stats: { ...INITIAL_STATS },
      currentCard: null,
      cardIndex: 0,
      dayCount: 0,
      lastChoice: null,
      lastResponse: "",
      gameOverReason: "",
      score: 0,
      usedCardIds: [],
      deck: [],
    });
  }, []);

  return { state, startGame, makeChoice, nextCard, restartGame };
}

export type { StatKey };
