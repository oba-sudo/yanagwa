/* ============================================================
   YanagawaSection — 柳川まち巡り情報 + 周辺マップ
   各スポットに画像・詳細情報・公式サイトリンクを追加
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, MapPin, ExternalLink, Clock, Info, ChevronRight } from "lucide-react";

// カテゴリフィルター定義
const FILTER_TABS = [
  { key: "all",   label: "すべて",  icon: "✦" },
  { key: "会場",  label: "会場",  icon: "✨" },
  { key: "観光",  label: "観光",  icon: "🚣" },
  { key: "食べる", label: "グルメ", icon: "🍱" },
  { key: "交通",  label: "交通",  icon: "🚉" },
  { key: "文化",  label: "文化",  icon: "🏛️" },
] as const;
type FilterKey = typeof FILTER_TABS[number]["key"];

// 柳川の主要観光スポット（詳細情報付き）
const SPOTS = [
  {
    id: "fukugonji",
    label: "福厳寺",
    sub: "会場 ★ 立花幻想夜",
    color: "#C9A84C",
    category: "会場",
    isMain: true,
    mapQuery: "福厳寺+柳川市",
    image: "/images/spot_fukugonji.jpg",
    description: "立花幻想夜の会場となる歴史ある寺院。プロジェクションマッピングで境内が幻想的な光に包まれます。境内のライトアップも同時開催。",
    hours: "開催期間中 17:00〜21:30（最終入場21:00）",
    address: "福岡県柳川市",
    official: null,
    note: "荒天時は中止となる場合があります",
  },
  {
    id: "kawasagari",
    label: "川下り乗り場",
    sub: "水郷柳川の名物体験",
    color: "#7EC8E3",
    category: "観光",
    isMain: false,
    mapQuery: "柳川川下り+柳川市",
    image: "/images/spot_kawakudari.jpg",
    description: "柳川を代表する観光体験。船頭さんの竿さばきで930kmの掘割を巡る約70分の舟旅。柳の木が垂れる水路を静かに流れる時間は格別です。",
    hours: "9:00〜17:00（季節により変動）",
    address: "福岡県柳川市三橋町高畑329-1",
    official: "https://www.yanagawa-net.com/",
    note: "複数の乗り場があります。事前予約がおすすめ",
  },
  {
    id: "ohana",
    label: "御花",
    sub: "立花家の歴史的邸宅・庭園",
    color: "#A8D8A8",
    category: "観光",
    isMain: false,
    mapQuery: "御花+柳川市",
    image: "/images/spot_ohana.webp",
    description: "初代柳川藩主・立花宗茂の子孫が営む料亭旅館。国指定名勝の松濤園、西洋館、大広間など大名文化を今に伝える文化施設として多くの人に親しまれています。",
    hours: "9:00〜18:00（入場は17:30まで）",
    address: "福岡県柳川市新外町1",
    official: "https://www.ohana.co.jp/",
    note: "料亭・宿泊施設も併設",
  },
  {
    id: "yanagawa_st",
    label: "西鉄柳川駅",
    sub: "最寄り駅（徒歩約25分）",
    color: "#E8A87C",
    category: "交通",
    isMain: false,
    mapQuery: "西鉄柳川駅",
    image: "/images/spot_nishitetsu.jpg",
    description: "福岡天神から西鉄特急で約50分。柳川観光の玄関口となる駅です。駅前から観光スポットへのアクセスも便利です。",
    hours: "始発〜終電",
    address: "福岡県柳川市三橋町下百町1",
    official: "https://www.nishitetsu.jp/",
    note: "天神から特急で約50分・急行で約60分",
  },
  {
    id: "motoyoshi",
    label: "元祖本吉屋",
    sub: "1681年創業 うなぎせいろ蒸しの元祖",
    color: "#D4A5A5",
    category: "食べる",
    isMain: false,
    mapQuery: "元祖本吉屋+柳川市",
    image: "/images/spot_motoyoshiya.jpg",
    description: "1681年（天和元年）創業。柳川名物「うなぎのせいろ蒸し」の元祖として知られる老舗。厳選した国産うなぎを職人が炭火で一本一本焼き上げます。",
    hours: "11:00〜20:00（LO 19:30）",
    address: "福岡県柳川市旭町69",
    official: "https://www.motoyoshiya.jp/",
    note: "せいろ蒸し定食 5,900円〜",
  },
  {
    id: "wakamatsuya",
    label: "若松屋",
    sub: "創業明治 うなぎ蒲焼・鰻巻の老舗",
    color: "#D4A5A5",
    category: "食べる",
    isMain: false,
    mapQuery: "若松屋+柳川市",
    image: "/images/spot_kawayoshi.jpg",
    description: "明治創業の老舗うなぎ店。秘伝のタレで仕上げた蒲焼と、柳川名物の鰻巻きが名物。川下りの後に立ち寄る観光客に人気の一軒です。",
    hours: "11:00〜20:00（水曜定休）",
    address: "福岡県柳川市沖端町26",
    official: null,
    note: "うなぎ蒲焼・鰻巻きが名物",
  },
  {
    id: "kawayoshi",
    label: "うなぎ処 川よし",
    sub: "炭火焼き 秘伝のタレが自慢の名店",
    color: "#D4A5A5",
    category: "食べる",
    isMain: false,
    mapQuery: "うなぎ処川よし+柳川市",
    image: "/images/spot_kawayoshi.jpg",
    description: "炭火でじっくり焼き上げたうなぎと、代々受け継がれた秘伝のタレが自慢。柳川の掘割沿いに佇む風情ある店構えも魅力のひとつです。",
    hours: "11:00〜20:00（火曜定休）",
    address: "福岡県柳川市沖端町",
    official: null,
    note: "炭火焼き・秘伝のタレが自慢",
  },
  {
    id: "hakushu",
    label: "北原白秋生家・記念館",
    sub: "詩聖・北原白秋の生誕地 国指定史跡",
    color: "#C8B4E8",
    category: "文化",
    isMain: false,
    mapQuery: "北原白秋生家記念館+柳川市",
    image: "/images/spot_hakushu.jpg",
    description: "「からたちの花」「この道」などで知られる詩聖・北原白秋の生誕地。昭和60年に生誕百年を記念して開館。館内には白秋の生い立ちや詩業が紹介されています。",
    hours: "9:00〜17:00（入館は16:30まで）",
    address: "福岡県柳川市沖端町55-1",
    official: "http://www.hakushu.or.jp/",
    note: "入館料：大人1,000円 / 学生600円 / 小中学生400円",
  },
  {
    id: "mihashira",
    label: "三柱神社",
    sub: "初代柳川藩主 立花宗茂公を祀る 提灯が幻想的",
    color: "#E8C87C",
    category: "文化",
    isMain: false,
    mapQuery: "三柱神社+柳川市",
    image: "/images/spot_mitsuhashira.jpg",
    description: "初代柳川藩主・立花宗茂公、岳父・戸次道雪公、宗茂室・誾千代姫の三神を祀る神社。境内を彩る無数の奉納提灯が幻想的な雰囲気を醸し出します。",
    hours: "参拝自由（社務所 9:00〜17:00）",
    address: "福岡県柳川市三橋町高畑323",
    official: "https://mihashirajinja.org/",
    note: "必勝・成就・復活のご利益で知られる",
  },
  {
    id: "matsuzouen",
    label: "松濤園",
    sub: "国指定名勝 江戸時代の大名庭園",
    color: "#A8D8A8",
    category: "観光",
    isMain: false,
    mapQuery: "松濤園+柳川市",
    image: "/images/spot_shotoen.webp",
    description: "御花に隣接する国指定名勝の大名庭園。江戸時代に整備された池泉回遊式庭園で、四季折々の美しい景色が楽しめます。",
    hours: "9:00〜18:00（入場は17:30まで）",
    address: "福岡県柳川市新外町1（御花内）",
    official: "https://www.ohana.co.jp/",
    note: "御花の入館料に含まれます",
  },
  {
    id: "okinohata",
    label: "沖端漁港",
    sub: "有明海の新鮮な魚介 夕景が絶景",
    color: "#7EC8E3",
    category: "観光",
    isMain: false,
    mapQuery: "沖端漁港+柳川市",
    image: "/images/spot_okihatako.jpg",
    description: "有明海に面した漁港。干満差6mの有明海ならではの景色と、新鮮な魚介類が並ぶ活気ある漁港の風景が楽しめます。夕暮れ時の景色は特に美しい。",
    hours: "見学自由",
    address: "福岡県柳川市沖端町",
    official: null,
    note: "夕暮れ時の景色が特におすすめ",
  },
  {
    id: "nakajima",
    label: "中島朝市",
    sub: "有明海の新鮮な魚介が並ぶ朝市",
    color: "#7EC8E3",
    category: "食べる",
    isMain: false,
    mapQuery: "中島朝市+柳川市",
    image: "/images/spot_nakajimaichiba.jpg",
    description: "有明海の新鮮な魚介類や地元野菜が並ぶ朝市。むつごろうやわらすぼなど有明海ならではの珍しい魚介も見られます。地元の人々の活気ある朝の風景を体験できます。",
    hours: "毎月第1・3日曜 7:00〜10:00頃",
    address: "福岡県柳川市中島町",
    official: null,
    note: "開催日は変動する場合があります",
  },
  {
    id: "parking",
    label: "駐車場",
    sub: "情報準備中 — 決まり次第掲載します",
    color: "#9BB5D4",
    category: "駐車場",
    isMain: false,
    mapQuery: "柳川市+駐車場",
    image: null,
    description: "",
    hours: "",
    address: "",
    official: null,
    note: "",
    pending: true,
  },
  {
    id: "shuttle",
    label: "シャトルバス乗り場",
    sub: "情報準備中 — 決まり次第掲載します",
    color: "#B4A8D4",
    category: "バス",
    isMain: false,
    mapQuery: "西鉄柳川駅",
    image: null,
    description: "",
    hours: "",
    address: "",
    official: null,
    note: "",
    pending: true,
  },
];

const course = [
  { icon: "🚣", label: "川下り", desc: "水郷柳川の名物体験" },
  { icon: "🏛️", label: "御花", desc: "立花家の歴史的邸宅" },
  { icon: "🍱", label: "うなぎ・カフェ", desc: "柳川名物うなぎせいろ蒸し" },
  { icon: "✨", label: "福厳寺プロジェクションマッピング", desc: "立花幻想夜で締めくくり" },
];

// Google Maps Embed URL生成（APIキー不要の埋め込み）
function getEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=ja&z=16`;
}

export default function YanagawaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSpot, setActiveSpot] = useState<string>("fukugonji");
  const [embedUrl, setEmbedUrl] = useState(getEmbedUrl("福厳寺 柳川市"));
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll(".fade-in-section").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const handleSpotClick = (spot: typeof SPOTS[0]) => {
    if ((spot as any).pending) return;
    setActiveSpot(spot.id);
    setEmbedUrl(getEmbedUrl(spot.mapQuery));
  };

  const activeSpotData = SPOTS.find((s) => s.id === activeSpot);
  const filteredSpots = SPOTS.filter(
    (s) => !((s as any).pending) && (activeFilter === "all" || s.category === activeFilter)
  );

  return (
    <section
      id="yanagawa"
      ref={sectionRef}
      className="py-20"
      style={{ background: "oklch(0.93 0.01 80)" }}
    >
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14 fade-in-section">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Yanagawa Guide
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            昼は柳川観光、<br />夜は福厳寺へ。
          </h2>
          <p
            className="mt-6 text-sm leading-relaxed max-w-lg mx-auto"
            style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            立花幻想夜は、柳川観光と合わせて楽しめる冬の夜イベントです。
            昼から夜まで、柳川で過ごす特別な時間をお楽しみください。
          </p>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            周辺マップ
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="fade-in-section mb-12">
          <p
            className="font-semibold mb-4 text-sm text-center"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
          >
            柳川まち巡りマップ
          </p>

          {/* ━ マップ本体（全幅） ━ */}
          <div
            className="relative overflow-hidden w-full mb-4"
            style={{
              height: "360px",
              border: "1px solid oklch(0.72 0.12 85 / 30%)",
              boxShadow: "0 0 30px oklch(0.72 0.12 85 / 10%)",
            }}
          >
            {activeSpotData && (
              <div
                className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5"
                style={{
                  background: "oklch(0.10 0.04 250 / 90%)",
                  border: `1px solid ${activeSpotData.color}70`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <MapPin size={12} style={{ color: activeSpotData.color }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: activeSpotData.color, fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {activeSpotData.label}
                </span>
              </div>
            )}
            <iframe
              key={embedUrl}
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="柳川まち巡りマップ"
            />
          </div>

          {/* ━ カテゴリ絞り込みボタン ━ */}
          <div className="flex flex-wrap gap-2 mb-4">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm transition-all"
                  style={{
                    background: isActive
                      ? "oklch(0.72 0.12 85 / 18%)"
                      : "oklch(1.00 0 0)",
                    border: isActive
                      ? "1px solid oklch(0.72 0.12 85 / 70%)"
                      : "1px solid oklch(0.72 0.12 85 / 20%)",
                    color: isActive
                      ? "oklch(0.88 0.10 85)"
                      : "oklch(0.65 0.05 85)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    boxShadow: isActive ? "0 0 12px oklch(0.72 0.12 85 / 20%)" : "none",
                    transform: isActive ? "translateY(-1px)" : "none",
                    transition: "all 0.18s cubic-bezier(0.23, 1, 0.32, 1)",
                    fontSize: "0.8rem",
                  }}
                >
                  <span style={{ fontSize: "0.85em" }}>{tab.icon}</span>
                  {tab.label}
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      minWidth: "18px",
                      height: "18px",
                      background: isActive ? "oklch(0.72 0.12 85 / 30%)" : "oklch(0.20 0.04 255 / 60%)",
                      borderRadius: "9px",
                      fontSize: "10px",
                      color: isActive ? "oklch(0.90 0.10 85)" : "oklch(0.55 0.04 85)",
                      padding: "0 4px",
                    }}
                  >
                    {tab.key === "all"
                      ? SPOTS.filter((s) => !(s as any).pending).length
                      : SPOTS.filter((s) => !(s as any).pending && s.category === tab.key).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ━ スポット一覧（カード型グリッド） ━ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            {filteredSpots.map((spot) => {
              const isActive = activeSpot === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => handleSpotClick(spot)}
                  className="text-left w-full transition-all overflow-hidden group"
                  style={{
                    background: isActive
                      ? `${spot.color}18`
                      : "oklch(1.00 0 0)",
                    border: isActive
                      ? `1px solid ${spot.color}80`
                      : "1px solid oklch(0.72 0.12 85 / 18%)",
                    transform: isActive ? "translateY(-3px)" : "none",
                    boxShadow: isActive ? `0 8px 24px ${spot.color}25` : "none",
                    transition: "all 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  {/* サムネイル画像 */}
                  {spot.image && (
                    <div
                      className="relative overflow-hidden"
                      style={{ height: "130px" }}
                    >
                      <img
                        src={spot.image}
                        alt={spot.label}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{
                          transform: isActive ? "scale(1.05)" : "scale(1)",
                          filter: isActive ? "brightness(1.1)" : "brightness(0.75)",
                          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      />
                      {/* カテゴリバッジ */}
                      <span
                        className="absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold"
                        style={{
                          background: `${spot.color}dd`,
                          color: "oklch(0.10 0.04 250)",
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "9px",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {spot.category}
                      </span>
                      {/* アクティブ時のゴールドオーバーレイ */}
                      {isActive && (
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to bottom, ${spot.color}10, ${spot.color}30)`,
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* テキスト情報 */}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin size={11} className="shrink-0 mt-0.5" style={{ color: spot.color }} />
                        <span
                          className="font-semibold text-sm leading-tight"
                          style={{
                            color: isActive ? spot.color : "oklch(0.85 0.06 85)",
                            fontFamily: "'Shippori Mincho', serif",
                          }}
                        >
                          {spot.label}
                        </span>
                      </div>
                      <ChevronRight
                        size={13}
                        className="shrink-0 mt-0.5 transition-transform"
                        style={{
                          color: isActive ? spot.color : "oklch(0.45 0.04 85)",
                          transform: isActive ? "translateX(2px)" : "none",
                        }}
                      />
                    </div>

                    <p
                      className="text-xs leading-snug mb-2"
                      style={{
                        color: "oklch(0.45 0.05 250)",
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontWeight: 300,
                        fontSize: "10px",
                        lineHeight: 1.5,
                      }}
                    >
                      {spot.sub}
                    </p>

                    {/* 営業時間（アクティブ時のみ表示） */}
                    {isActive && spot.hours && (
                      <div
                        className="flex items-start gap-1.5 mb-2 pt-2"
                        style={{ borderTop: `1px solid ${spot.color}25` }}
                      >
                        <Clock size={10} className="shrink-0 mt-0.5" style={{ color: spot.color }} />
                        <span
                          className="text-xs"
                          style={{
                            color: "oklch(0.40 0.05 250)",
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontWeight: 300,
                            fontSize: "10px",
                            lineHeight: 1.4,
                          }}
                        >
                          {spot.hours}
                        </span>
                      </div>
                    )}

                    {/* 注意事項（アクティブ時のみ） */}
                    {isActive && spot.note && (
                      <div className="flex items-start gap-1.5 mb-2">
                        <Info size={10} className="shrink-0 mt-0.5" style={{ color: "oklch(0.40 0.05 250)" }} />
                        <span
                          className="text-xs"
                          style={{
                            color: "oklch(0.45 0.05 250)",
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontWeight: 300,
                            fontSize: "10px",
                            lineHeight: 1.4,
                          }}
                        >
                          {spot.note}
                        </span>
                      </div>
                    )}

                    {/* 公式サイトリンク（アクティブ時のみ） */}
                    {isActive && spot.official && (
                      <a
                        href={spot.official}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-1 text-xs transition-all"
                        style={{
                          background: `${spot.color}20`,
                          border: `1px solid ${spot.color}50`,
                          color: spot.color,
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "10px",
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${spot.color}35`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${spot.color}20`;
                        }}
                      >
                        <ExternalLink size={9} />
                        公式サイトを見る
                      </a>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ━ 情報準備中スポット ━ */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {SPOTS.filter((s) => (s as any).pending).map((spot) => (
              <div
                key={spot.id}
                className="flex items-center gap-2 p-3"
                style={{
                  background: "oklch(0.93 0.01 80)",
                  border: "1px dashed oklch(0.72 0.12 85 / 22%)",
                  opacity: 0.7,
                }}
              >
                <MapPin size={13} className="shrink-0" style={{ color: "oklch(0.45 0.05 250)" }} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Shippori Mincho', serif" }}
                    >
                      {spot.label}
                    </span>
                    <span
                      className="inline-block px-1.5 py-0.5"
                      style={{
                        background: "oklch(0.72 0.12 85 / 8%)",
                        border: "1px dashed oklch(0.72 0.12 85 / 28%)",
                        color: "oklch(0.40 0.05 250)",
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontSize: "9px",
                        borderRadius: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      情報準備中
                    </span>
                  </div>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.50 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, fontSize: "10px" }}
                  >
                    決まり次第掲載します
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ━ Googleマップで開く ━ */}
          <div className="flex justify-end">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activeSpotData?.mapQuery ?? "福厳寺 柳川市")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-all"
              style={{
                background: "oklch(1.00 0 0)",
                border: "1px solid oklch(0.72 0.12 85 / 25%)",
                color: "oklch(0.22 0.07 250)",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "oklch(0.20 0.06 85 / 20%)";
                e.currentTarget.style.borderColor = "oklch(0.72 0.12 85 / 50%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "oklch(1.00 0 0)";
                e.currentTarget.style.borderColor = "oklch(0.72 0.12 85 / 25%)";
              }}
            >
              <ExternalLink size={13} />
              Googleマップで開く
            </a>
          </div>

          <p
            className="text-xs mt-3 text-center"
            style={{ color: "oklch(0.50 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            ※スポット名をクリックするとマップが切り替わります。情報は参考です。実際の営業状況は各施設にご確認ください。
          </p>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            モデルコース
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="max-w-md mx-auto fade-in-section" style={{ transitionDelay: "0.15s" }}>
          <p
            className="font-semibold mb-6 text-sm text-center"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
          >
            おすすめモデルコース
          </p>
          <div className="space-y-2">
            {course.map((step, i) => (
              <div key={i}>
                <div
                  className="flex items-center gap-4 p-4"
                  style={{
                    background: i === course.length - 1
                      ? "oklch(0.20 0.06 85 / 20%)"
                      : "oklch(1.00 0 0)",
                    border: i === course.length - 1
                      ? "1px solid oklch(0.72 0.12 85 / 40%)"
                      : "1px solid oklch(0.72 0.12 85 / 15%)",
                  }}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{
                        color: i === course.length - 1
                          ? "oklch(0.85 0.08 85)"
                          : "oklch(0.80 0.06 85)",
                        fontFamily: "'Shippori Mincho', serif",
                      }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
                {i < course.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown size={14} style={{ color: "oklch(0.72 0.12 85 / 60%)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
