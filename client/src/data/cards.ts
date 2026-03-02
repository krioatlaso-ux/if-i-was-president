// ============================================================
// DESIGN: Pixel Cumhurbaşkanlığı — 16-bit retro oyun estetiği
// Her kart: danışman, olay metni, evet/hayır etkileri
// Etkiler: halk, ordu, para, itibar (0-100 arası)
// ============================================================

export type Advisor = "general" | "economist" | "press" | "people";

export interface CardEffect {
  halk: number;
  ordu: number;
  para: number;
  itibar: number;
}

export interface GameCard {
  id: string;
  advisor: Advisor;
  advisorName: string;
  event: string;
  context?: string;
  yesText: string;
  noText: string;
  yesEffect: CardEffect;
  noEffect: CardEffect;
  yesResponse: string;
  noResponse: string;
  category: "ekonomi" | "güvenlik" | "siyaset" | "sosyal" | "dış_politika";
}

export const CARDS: GameCard[] = [
  // --- EKONOMİ ---
  {
    id: "c001",
    advisor: "economist",
    advisorName: "Hazine Bakanı Kemal Bey",
    event: "Enflasyon yüzde 80'i aştı. Piyasalar panikle. Vatandaş markette fiyat etiketine bakıp ağlıyor.",
    context: "Merkez Bankası acil faiz artışı öneriyor.",
    yesText: "Faizi artır",
    noText: "Faizi dondur",
    yesEffect: { halk: -15, ordu: 0, para: 20, itibar: 5 },
    noEffect: { halk: 10, ordu: 0, para: -25, itibar: -10 },
    yesResponse: "Piyasalar sakinledi ama vatandaş kredi çekemiyor. Muhalefet 'faiz fakirleştirir' diye bağırıyor.",
    noResponse: "Kısa vadede halk memnun ama lira çakıldı. IMF kapıda.",
    category: "ekonomi",
  },
  {
    id: "c002",
    advisor: "economist",
    advisorName: "Hazine Bakanı Kemal Bey",
    event: "Bir Körfez ülkesi 50 milyar dolarlık yatırım teklif ediyor. Karşılığında stratejik bir liman 99 yıllığına kiralanacak.",
    yesText: "Anlaşmayı imzala",
    noText: "Reddet",
    yesEffect: { halk: -10, ordu: -15, para: 30, itibar: -5 },
    noEffect: { halk: 15, ordu: 10, para: -5, itibar: 10 },
    yesResponse: "Para aktı ama muhalefet 'vatanı sattık' diye meydanlara indi.",
    noResponse: "Milliyetçi kesim sizi alkışlıyor. Yatırım gelmedi ama gurur kaldı.",
    category: "ekonomi",
  },
  {
    id: "c003",
    advisor: "economist",
    advisorName: "Hazine Bakanı Kemal Bey",
    event: "Asgari ücret tartışması alevlendi. İşçi sendikaları yüzde 50 zam istiyor. İş dünyası 'kapanırız' diyor.",
    yesText: "Yüzde 50 zam ver",
    noText: "Yüzde 20 ile sınırla",
    yesEffect: { halk: 25, ordu: 0, para: -20, itibar: 10 },
    noEffect: { halk: -20, ordu: 0, para: 10, itibar: -15 },
    yesResponse: "İşçiler sokakta halay çekiyor. Ama bazı fabrikalar kapandı.",
    noResponse: "İş dünyası rahatladı. Ama işçi sendikası genel greve gidiyor.",
    category: "ekonomi",
  },
  {
    id: "c004",
    advisor: "economist",
    advisorName: "Hazine Bakanı Kemal Bey",
    event: "Kripto para borsaları vergilendirilsin mi? Gençler 'dokunma' diyor, hazine boş.",
    yesText: "Yüzde 30 vergi uygula",
    noText: "Serbest bırak",
    yesEffect: { halk: -10, ordu: 0, para: 15, itibar: 0 },
    noEffect: { halk: 15, ordu: 0, para: -5, itibar: 5 },
    yesResponse: "Hazineye para girdi ama kripto gençleri isyan etti.",
    noResponse: "Gençler sizi seviyor. Ama vergi kaçağı devam ediyor.",
    category: "ekonomi",
  },

  // --- GÜVENLİK ---
  {
    id: "c005",
    advisor: "general",
    advisorName: "Genelkurmay Başkanı Paşa",
    event: "Sınırda silahlı çatışma çıktı. Askerlerimiz ateş altında. Karşı taraf 'kaza' diyor.",
    yesText: "Misilleme yap",
    noText: "Diplomatik yol",
    yesEffect: { halk: 10, ordu: 25, para: -20, itibar: -15 },
    noEffect: { halk: -5, ordu: -20, para: 5, itibar: 15 },
    yesResponse: "Ordu şevke geldi. Ama uluslararası baskı arttı ve dolar fırladı.",
    noResponse: "Dünya sizi övdü. Ama askerler 'eli kolu bağlı bırakıldık' diye homurdanıyor.",
    category: "güvenlik",
  },
  {
    id: "c006",
    advisor: "general",
    advisorName: "Genelkurmay Başkanı Paşa",
    event: "İstihbarat raporuna göre büyük bir siber saldırı hazırlığı var. Önlem için tüm devlet sistemleri 48 saat kapatılacak.",
    yesText: "Sistemleri kapat",
    noText: "Riski göze al, açık tut",
    yesEffect: { halk: -15, ordu: 15, para: -10, itibar: 5 },
    noEffect: { halk: 5, ordu: -10, para: 0, itibar: -5 },
    yesResponse: "Saldırı önlendi ama 2 gün boyunca e-devlet çalışmadı. Vatandaş çıldırdı.",
    noResponse: "Şimdilik sorun yok. Ama paşa 'sorumluluk sizde' dedi.",
    category: "güvenlik",
  },
  {
    id: "c007",
    advisor: "general",
    advisorName: "Genelkurmay Başkanı Paşa",
    event: "NATO müttefiki büyük bir tatbikat istiyor. Topraklarımızda 10.000 yabancı asker konuşlanacak.",
    yesText: "Kabul et",
    noText: "Reddet",
    yesEffect: { halk: -10, ordu: 10, para: 5, itibar: 15 },
    noEffect: { halk: 15, ordu: -5, para: 0, itibar: -20 },
    yesResponse: "Batı memnun. Ama milliyetçiler 'topraklarımız işgal altında' diye bağırıyor.",
    noResponse: "Halk alkışladı. Ama NATO'da soğuk rüzgarlar esiyor.",
    category: "güvenlik",
  },

  // --- SİYASET ---
  {
    id: "c008",
    advisor: "press",
    advisorName: "Basın Sözcüsü Ayşe Hanım",
    event: "Muhalefet lideri sizi canlı yayında tartışmaya davet etti. Milyonlar izleyecek.",
    yesText: "Kabul et",
    noText: "Reddet",
    yesEffect: { halk: 15, ordu: 0, para: 0, itibar: 20 },
    noEffect: { halk: -10, ordu: 0, para: 0, itibar: -15 },
    yesResponse: "Tartışmayı kazandınız! Anketlerde 5 puan atladınız.",
    noResponse: "Muhalefet 'kaçtı' diye manşet attı. İtibarınız zedelendi.",
    category: "siyaset",
  },
  {
    id: "c009",
    advisor: "press",
    advisorName: "Basın Sözcüsü Ayşe Hanım",
    event: "Sosyal medyada sizi hedef alan viral bir video var. Milyonlarca izlenme. İçerik kısmen yanlış.",
    yesText: "Sansürle",
    noText: "Açıklama yap",
    yesEffect: { halk: -20, ordu: 0, para: 0, itibar: -25 },
    noEffect: { halk: 10, ordu: 0, para: 0, itibar: 15 },
    yesResponse: "Video kaldırıldı ama 'sansür' haberleri dünyayı dolaştı. Basın özgürlüğü endeksi düştü.",
    noResponse: "Şeffaf davrandınız. Halk güvendi, bazıları inanmasa da saygı duydu.",
    category: "siyaset",
  },
  {
    id: "c010",
    advisor: "press",
    advisorName: "Basın Sözcüsü Ayşe Hanım",
    event: "Seçimler 6 ay sonra. Koalisyon ortağı erken seçim istiyor, yoksa hükümeti düşüreceğini söylüyor.",
    yesText: "Erken seçime git",
    noText: "Koalisyonu bitir",
    yesEffect: { halk: 5, ordu: 0, para: -10, itibar: 0 },
    noEffect: { halk: -5, ordu: 0, para: 5, itibar: -10 },
    yesResponse: "Seçim kampanyası başladı. Her şey belirsiz.",
    noResponse: "Azınlık hükümeti oldunuz. Her oylama kriz.",
    category: "siyaset",
  },

  // --- SOSYAL ---
  {
    id: "c011",
    advisor: "people",
    advisorName: "Halk Temsilcisi Mehmet Bey",
    event: "Üniversite öğrencileri barınma krizi nedeniyle meydanlarda. Yurt ücretleri 3 katına çıktı.",
    yesText: "Yurt ücretlerini dondur",
    noText: "Burs artır",
    yesEffect: { halk: 20, ordu: 0, para: -15, itibar: 10 },
    noEffect: { halk: 10, ordu: 0, para: -8, itibar: 5 },
    yesResponse: "Öğrenciler sizi alkışladı. Ama yurt işletmecileri mahkemeye verdi.",
    noResponse: "Burslar arttı ama yurt sorunu çözülmedi. Eylemler devam ediyor.",
    category: "sosyal",
  },
  {
    id: "c012",
    advisor: "people",
    advisorName: "Halk Temsilcisi Mehmet Bey",
    event: "Deprem bölgesinde yeniden yapılanma yavaş gidiyor. Vatandaşlar 2 yıldır konteynerda yaşıyor.",
    yesText: "Acil kaynak aktar",
    noText: "Özel sektörü devreye sok",
    yesEffect: { halk: 25, ordu: 0, para: -25, itibar: 15 },
    noEffect: { halk: -5, ordu: 0, para: 5, itibar: -10 },
    yesResponse: "İnşaat hız kazandı. Ama bütçe açığı büyüdü.",
    noResponse: "Özel sektör yavaş hareket etti. Halk 'terk edildik' dedi.",
    category: "sosyal",
  },
  {
    id: "c013",
    advisor: "people",
    advisorName: "Halk Temsilcisi Mehmet Bey",
    event: "Sağlık sisteminde kriz: Doktorlar 'beyin göçü' nedeniyle Avrupa'ya gidiyor. Hastaneler personelsiz.",
    yesText: "Doktor maaşlarını 2 katına çıkar",
    noText: "Yurt dışı çıkışı kısıtla",
    yesEffect: { halk: 15, ordu: 0, para: -20, itibar: 10 },
    noEffect: { halk: -15, ordu: 5, para: 5, itibar: -20 },
    yesResponse: "Doktorlar kaldı. Ama sağlık bütçesi patladı.",
    noResponse: "Pasaport kısıtlaması uluslararası basında fırtına kopardı.",
    category: "sosyal",
  },
  {
    id: "c014",
    advisor: "people",
    advisorName: "Halk Temsilcisi Mehmet Bey",
    event: "Büyük bir çevre felaketi: Fabrika atıkları nehri kirletti. 500.000 kişinin içme suyu tehlikede.",
    yesText: "Fabrikayı kapat",
    noText: "Para cezası ver",
    yesEffect: { halk: 20, ordu: 0, para: -10, itibar: 15 },
    noEffect: { halk: -10, ordu: 0, para: 5, itibar: -10 },
    yesResponse: "Çevreciler sizi kahraman ilan etti. 3000 işçi işsiz kaldı.",
    noResponse: "Fabrika ceza ödedi ve devam etti. Çevre örgütleri sizi mahkemeye verdi.",
    category: "sosyal",
  },

  // --- DIŞ POLİTİKA ---
  {
    id: "c015",
    advisor: "press",
    advisorName: "Basın Sözcüsü Ayşe Hanım",
    event: "Komşu ülkeyle tarihi bir barış anlaşması imzalanabilir. 50 yıllık düşmanlık bitebilir.",
    yesText: "Anlaşmayı imzala",
    noText: "Şartları reddet",
    yesEffect: { halk: 5, ordu: -10, para: 15, itibar: 25 },
    noEffect: { halk: 10, ordu: 15, para: -5, itibar: -15 },
    yesResponse: "Nobel Barış Ödülü adayı oldunuz! Ama milliyetçiler 'hain' diye bağırıyor.",
    noResponse: "Sert duruş takdir gördü. Ama fırsat kaçtı.",
    category: "dış_politika",
  },
  {
    id: "c016",
    advisor: "general",
    advisorName: "Genelkurmay Başkanı Paşa",
    event: "BM Güvenlik Konseyi'nde önemli bir oylamada Batı ile Doğu arasında seçim yapmanız gerekiyor.",
    yesText: "Batı ile oy kullan",
    noText: "Doğu ile oy kullan",
    yesEffect: { halk: -5, ordu: 5, para: 10, itibar: 15 },
    noEffect: { halk: 5, ordu: 0, para: 5, itibar: -15 },
    yesResponse: "AB üyelik müzakereleri yeniden açıldı. Ama Rusya ve Çin büyükelçileri protesto etti.",
    noResponse: "Doğu ile ilişkiler güçlendi. Ama Batı yatırımları azaldı.",
    category: "dış_politika",
  },
  {
    id: "c017",
    advisor: "economist",
    advisorName: "Hazine Bakanı Kemal Bey",
    event: "Turizm sezonu açılıyor. Yabancı turistlere dövizle vergi alınması öneriliyor.",
    yesText: "Turist vergisi uygula",
    noText: "Vergisiz bırak",
    yesEffect: { halk: 5, ordu: 0, para: 15, itibar: -10 },
    noEffect: { halk: 10, ordu: 0, para: -5, itibar: 10 },
    yesResponse: "Hazineye döviz girdi. Ama turist sayısı yüzde 20 düştü.",
    noResponse: "Turizm patladı! Ama fırsatı kaçırdınız.",
    category: "dış_politika",
  },
  {
    id: "c018",
    advisor: "people",
    advisorName: "Halk Temsilcisi Mehmet Bey",
    event: "Mülteci krizi tırmanıyor. 2 milyon yeni mülteci sınırda bekliyor. AB para teklif ediyor ama kamuoyu karşı.",
    yesText: "Kapıları aç",
    noText: "Sınırı kapat",
    yesEffect: { halk: -25, ordu: -5, para: 20, itibar: 10 },
    noEffect: { halk: 20, ordu: 10, para: -10, itibar: -15 },
    yesResponse: "AB fonları geldi ama iç siyasette fırtına koptu.",
    noResponse: "Halk alkışladı. Ama uluslararası insan hakları örgütleri sizi kınadı.",
    category: "dış_politika",
  },
  {
    id: "c019",
    advisor: "general",
    advisorName: "Genelkurmay Başkanı Paşa",
    event: "Yeni bir savunma sanayii projesi: Yerli savaş uçağı için 10 yıl, 30 milyar dolar gerekiyor.",
    yesText: "Projeyi başlat",
    noText: "Yabancı uçak al",
    yesEffect: { halk: 10, ordu: 25, para: -20, itibar: 10 },
    noEffect: { halk: -5, ordu: -15, para: 10, itibar: -5 },
    yesResponse: "Ordu coşkuyla karşıladı. Ama 10 yıl boyunca bütçe kısıtlaması gelecek.",
    noResponse: "Hızlı çözüm ama ordu 'dışa bağımlı kaldık' diye üzüldü.",
    category: "güvenlik",
  },
  {
    id: "c020",
    advisor: "press",
    advisorName: "Basın Sözcüsü Ayşe Hanım",
    event: "Ünlü bir sanatçı konserine yasak getirilmesi için baskı var. 'Ahlak dışı' deniyor.",
    yesText: "Konseri yasakla",
    noText: "İzin ver",
    yesEffect: { halk: -10, ordu: 0, para: 0, itibar: -15 },
    noEffect: { halk: 10, ordu: 0, para: 5, itibar: 15 },
    yesResponse: "Muhafazakar kesim memnun. Ama gençler 'özgürlük' diye meydanlara çıktı.",
    noResponse: "Gençler sizi seviyor. Ama muhafazakar medya sizi hedef aldı.",
    category: "sosyal",
  },
];

export const ADVISORS = {
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

export type StatKey = "halk" | "ordu" | "para" | "itibar";

export const STATS: { key: StatKey; label: string; icon: string; color: string; dangerColor: string }[] = [
  { key: "halk", label: "Halk", icon: "👥", color: "#E74C3C", dangerColor: "#FF6B6B" },
  { key: "ordu", label: "Ordu", icon: "⚔️", color: "#2ECC71", dangerColor: "#55EFC4" },
  { key: "para", label: "Para", icon: "💰", color: "#F4C430", dangerColor: "#FDCB6E" },
  { key: "itibar", label: "İtibar", icon: "⭐", color: "#3498DB", dangerColor: "#74B9FF" },
];

export const GAME_OVER_MESSAGES: Record<string, { title: string; subtitle: string; emoji: string }> = {
  halk_low: {
    title: "HALK AYAKTA!",
    subtitle: "Meydanlar doldu taştı. Cumhurbaşkanlığı sarayı kuşatıldı. Tarih sizi 'halkını unutan lider' olarak anacak.",
    emoji: "✊",
  },
  halk_high: {
    title: "POPÜLIST TUZAK!",
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
