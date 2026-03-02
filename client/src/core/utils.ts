// ============================================================
// Core Utilities
// Oyun mantığı ve hesaplama fonksiyonları
// ============================================================

import type { GameStats, StatEffect } from "./types";
import { GAME_RULES } from "./constants";

/**
 * Stat değerini min-max aralığına sıkıştır
 */
export function clampStat(value: number, min = GAME_RULES.MIN_STAT, max = GAME_RULES.MAX_STAT): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Stat etkisini oyun istatistiklerine uygula
 */
export function applyStatEffect(stats: GameStats, effect: StatEffect): GameStats {
  return {
    halk: clampStat(stats.halk + effect.halk),
    ordu: clampStat(stats.ordu + effect.ordu),
    para: clampStat(stats.para + effect.para),
    itibar: clampStat(stats.itibar + effect.itibar),
  };
}

/**
 * Oyun bitti koşulunu kontrol et
 * @returns Game over nedeni veya null (oyun devam ediyor)
 */
export function checkGameOverCondition(stats: GameStats): string | null {
  const { DANGER_THRESHOLD, CEILING_THRESHOLD } = GAME_RULES;

  if (stats.halk <= DANGER_THRESHOLD) return "halk_low";
  if (stats.halk >= CEILING_THRESHOLD) return "halk_high";
  if (stats.ordu <= DANGER_THRESHOLD) return "ordu_low";
  if (stats.ordu >= CEILING_THRESHOLD) return "ordu_high";
  if (stats.para <= DANGER_THRESHOLD) return "para_low";
  if (stats.para >= CEILING_THRESHOLD) return "para_high";
  if (stats.itibar <= DANGER_THRESHOLD) return "itibar_low";
  if (stats.itibar >= CEILING_THRESHOLD) return "itibar_high";

  return null;
}

/**
 * Stat tehlikeli mi kontrol et (pulsing göstergesi için)
 */
export function isStatDangerous(value: number): boolean {
  const { DANGER_THRESHOLD, CEILING_THRESHOLD } = GAME_RULES;
  return value <= DANGER_THRESHOLD || value >= CEILING_THRESHOLD;
}

/**
 * Skor hesapla
 */
export function calculateScore(dayCount: number, stats: GameStats): number {
  const avgStat = (stats.halk + stats.ordu + stats.para + stats.itibar) / 4;
  return dayCount * 10 + Math.round(avgStat);
}

/**
 * Dizi karıştır (Fisher-Yates shuffle)
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Paylaşım metni oluştur
 */
export function generateShareText(playerName: string, dayCount: number, score: number, emoji: string): string {
  return `🇹🇷 "Eğer Ben Cumhurbaşkanı Olsaydım" oyununu oynadım!\n\n${emoji} Oyun Bitti\n\n📅 ${dayCount} gün görevde kaldım\n🏆 ${score} puan topladım\n\nSen kaç gün dayanırsın? 👇`;
}
