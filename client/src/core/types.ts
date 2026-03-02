// ============================================================
// Core Types
// Tüm oyun veri yapıları ve türleri merkezi tanımı
// ============================================================

/**
 * Danışman türleri — her danışmanın kendi karakteri ve etkisi var
 */
export type AdvisorType = "general" | "economist" | "press" | "people";

/**
 * Stat anahtarları — oyunun 4 ana istatistiği
 */
export type StatKey = "halk" | "ordu" | "para" | "itibar";

/**
 * Oyun kategorileri — kart türleri
 */
export type CardCategory = "ekonomi" | "güvenlik" | "siyaset" | "sosyal" | "dış_politika";

/**
 * Oyun fazları — oyunun durumu
 */
export type GamePhase = "intro" | "playing" | "response" | "gameover" | "victory";

/**
 * Seçim yönü — evet/hayır
 */
export type Choice = "yes" | "no";

/**
 * Stat etkileri — bir kararın istatistiklere etkisi
 */
export interface StatEffect {
  halk: number;
  ordu: number;
  para: number;
  itibar: number;
}

/**
 * Oyun istatistikleri — mevcut stat değerleri
 */
export interface GameStats {
  halk: number;
  ordu: number;
  para: number;
  itibar: number;
}

/**
 * Kart veri yapısı — oyun kartının tam tanımı
 */
export interface GameCard {
  id: string;
  advisor: AdvisorType;
  advisorName: string;
  event: string;
  context?: string;
  yesText: string;
  noText: string;
  yesEffect: StatEffect;
  noEffect: StatEffect;
  yesResponse: string;
  noResponse: string;
  category: CardCategory;
}

/**
 * Danışman profili — görsel ve bilgi
 */
export interface AdvisorProfile {
  name: string;
  title: string;
  color: string;
  accentColor: string;
  image: string;
}

/**
 * Oyun durumu — tüm oyun verisi
 */
export interface GameState {
  phase: GamePhase;
  playerName: string;
  stats: GameStats;
  currentCard: GameCard | null;
  cardIndex: number;
  dayCount: number;
  lastChoice: Choice | null;
  lastResponse: string;
  gameOverReason: string;
  score: number;
  usedCardIds: string[];
  deck: GameCard[];
}

/**
 * Game Over mesajı — sonuç ekranı metinleri
 */
export interface GameOverMessage {
  title: string;
  subtitle: string;
  emoji: string;
}

/**
 * Stat tanımı — UI için stat bilgisi
 */
export interface StatDefinition {
  key: StatKey;
  label: string;
  icon: string;
  color: string;
  dangerColor: string;
}
