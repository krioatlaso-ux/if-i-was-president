// ============================================================
// Core Constants
// Tüm oyun sabitleri merkezi tanımı
// ============================================================

import type { AdvisorProfile, StatDefinition, GameOverMessage } from "./types";

/**
 * Danışman profilleri — her danışmanın görsel ve bilgisi
 */
export const ADVISOR_PROFILES: Record<string, AdvisorProfile> = {
  general: {
    name: "Genelkurmay Başkanı",
    title: "Paşa",
    color: "#2D5A27",
    accentColor: "#F4C430",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663394792489/TFEKqVVGKSEBsgvhpuTyQg/char-general-WooTunwk5fmFJGi9hWUXRj.webp",
  },
  economist: {
    name: "Hazine Bakanı",
    title: "Kemal Bey",
    color: "#1A237E",
    accentColor: "#F4C430",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663394792489/TFEKqVVGKSEBsgvhpuTyQg/char-economist-RMGuWY6Rnxm9i8g993QNLf.webp",
  },
  press: {
    name: "Basın Sözcüsü",
    title: "Ayşe Hanım",
    color: "#7B1A1A",
    accentColor: "#F4C430",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663394792489/TFEKqVVGKSEBsgvhpuTyQg/char-press-AAyg4gEMUWfqkkjf9GPRiQ.webp",
  },
  people: {
    name: "Halk Temsilcisi",
    title: "Mehmet Bey",
    color: "#1A3A5C",
    accentColor: "#F4C430",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663394792489/TFEKqVVGKSEBsgvhpuTyQg/char-people-4zpXMFf5h4QKZZbViUQ9Dg.webp",
  },
};

/**
 * Stat tanımları — her statın UI bilgisi
 */
export const STAT_DEFINITIONS: StatDefinition[] = [
  { key: "halk", label: "Halk", icon: "👥", color: "#E74C3C", dangerColor: "#FF6B6B" },
  { key: "ordu", label: "Ordu", icon: "⚔️", color: "#2ECC71", dangerColor: "#55EFC4" },
  { key: "para", label: "Para", icon: "💰", color: "#F4C430", dangerColor: "#FDCB6E" },
  { key: "itibar", label: "İtibar", icon: "⭐", color: "#3498DB", dangerColor: "#74B9FF" },
];

/**
 * Başlangıç istatistikleri
 */
export const INITIAL_STATS = {
  halk: 60,
  ordu: 55,
  para: 50,
  itibar: 65,
} as const;

/**
 * Game Over mesajları
 */
export const GAME_OVER_MESSAGES: Record<string, GameOverMessage> = {
  halk_low: {
    title: "HALK AYAKTA!",
    subtitle: "Meydanlar doldu taştı. Cumhurbaşkanlığı sarayı kuşatıldı. Tarih sizi 'halkını unutan lider' olarak anacak.",
    emoji: "✊",
  },
  halk_high: {
    title: "POPÜLİST TUZAK!",
    subtitle: "Her şeyi halka verdiniz ama devlet battı. Popülizm kazandı, ülke kaybetti.",
    emoji: "🎭",
  },
  ordu_low: {
    title: "ASKERİ DARBE!",
    subtitle: "Tanklar Ankara'da. Ordu 'anayasal düzeni koruma' adına yönetime el koydu.",
    emoji: "🪖",
  },
  ordu_high: {
    title: "MİLİTARİZM!",
    subtitle: "Ordu her şeye hakim oldu. Sivil yönetim sembolik kaldı. Demokrasi rafa kalktı.",
    emoji: "🎖️",
  },
  para_low: {
    title: "İFLAS!",
    subtitle: "Hazine boş, dolar 1000 lira. IMF kapıda. Ülke tarihinin en büyük ekonomik kriziyle yüzleşiyor.",
    emoji: "💸",
  },
  para_high: {
    title: "OLİGARŞİ!",
    subtitle: "Para her şeyi satın aldı. Demokrasi para babasına satıldı. Siz de onlardan biri oldunuz.",
    emoji: "🏦",
  },
  itibar_low: {
    title: "DİPLOMATİK İZOLASYON!",
    subtitle: "Hiçbir ülke sizi tanımıyor. Büyükelçiler geri çekildi. Uluslararası arenada yalnız kaldınız.",
    emoji: "🌍",
  },
  itibar_high: {
    title: "POPÜLER OTOKTRAT!",
    subtitle: "Çok sevildiniz ama bu sefer fazla. Karizmanız kurumları gölgede bıraktı. Tek adam rejimi kuruldu.",
    emoji: "👑",
  },
  survived: {
    title: "HAYATTA KALDINIZ!",
    subtitle: "Tüm kartları geçtiniz. Gerçek bir devlet adamısınız.",
    emoji: "🏆",
  },
};

/**
 * Oyun kuralları — stat limitleri
 */
export const GAME_RULES = {
  DANGER_THRESHOLD: 10,
  CEILING_THRESHOLD: 95,
  MIN_STAT: 0,
  MAX_STAT: 100,
} as const;
