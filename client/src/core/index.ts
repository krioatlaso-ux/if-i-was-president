// ============================================================
// Core Module Exports
// Tüm core modüllerinin merkezi export noktası
// ============================================================

// Types
export type {
  AdvisorType,
  StatKey,
  CardCategory,
  GamePhase,
  Choice,
  StatEffect,
  GameStats,
  GameCard,
  AdvisorProfile,
  GameState,
  GameOverMessage,
  StatDefinition,
} from "./types";

// Constants
export {
  ADVISOR_PROFILES,
  STAT_DEFINITIONS,
  INITIAL_STATS,
  GAME_OVER_MESSAGES,
  GAME_RULES,
} from "./constants";

// Utilities
export {
  clampStat,
  applyStatEffect,
  checkGameOverCondition,
  isStatDangerous,
  calculateScore,
  shuffleArray,
  generateShareText,
} from "./utils";
