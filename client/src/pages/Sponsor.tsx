/* ============================================================
   Sponsor.tsx — 協賛募集専用LP (/sponsor)
   デザイン: 「宵桜の金箔絵巻」— 深紺・箔押し金・紅桜の公式イベントトーン
   位置づけ: トップの主役にはせず、事業者向けの控えめな下層案内として維持
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Heart,
  MapPin,
  Mail,
  Phone,
  Users,
  TrendingUp,
  Building2,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  Download,
  FileText,
} from "lucide-react";

const PDF_URL = "/images/sponsor-guide-2026.pdf";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663442056627/Mka8s8bmHpdnByoMCjCFQS/event_logo-f5858ed4a3bDwMfqMmqY52.webp";

/* ── カラートークン（公式イベントの夜景テーマ） ── */
const C = {
  bg: "#071226",           // ページ背景（夜帳の藍）
  bgAlt: "#0C1A34",        // セクション交互背景
  bgCard: "#10213F",       // カード背景
  border: "#294563",       // ボーダー
  borderGold: "#C9A84C",   // ゴールドボーダー
  gold: "#D5A82E",         // メインゴールド
  goldLight: "#F1D879",    // 明るいゴールド
  goldPale: "#192B48",     // 薄いゴールド背景
  text: "#F4EEDC",         // メインテキスト
  textSub: "#D9CFBA",      // サブテキスト
  textMuted: "#B6AA91",    // ミュートテキスト
  navy: "#071226",         // ネイビー（見出し強調）
  shadow: "0 8px 28px rgba(0,0,0,0.22)",
  shadowGold: "0 8px 30px rgba(213,168,46,0.16)",
};

/* ── 協賛プランデータ ── */
const sponsorPlans = [
  {
    tier: "冠協賛パートナー",
    amount: "1,000,000",
    badge: "最上位",
    badgeBg: "#FFF3CD",
    badgeColor: "#B8922A",
    borderColor: "#C9A84C",
    headerBg: "#1C2B4A",
    headerText: "#F5EDD6",
    icon: <Award size={20} />,
    summary: "公式ポスター最上段・上映前企業紹介映像・大型看板など最高位の露出",
    benefits: [
      { label: "公式ポスター最上段掲載", desc: "イベント公式ポスターの最も目立つ位置に企業名・ロゴを掲載します。" },
      { label: "公式HP最上段掲載", desc: "公式ウェブサイトのトップに企業名・ロゴ・リンクを掲載します。" },
      { label: "会場大型看板掲載", desc: "福厳寺境内の大型看板に企業名・ロゴを掲出します。65日間、来場者全員の目に触れます。" },
      { label: "SNS特別紹介", desc: "公式Instagram・X（旧Twitter）等で企業を特別フィーチャーして紹介します。" },
      { label: "上映前 企業紹介映像", desc: "プロジェクションマッピング上映開始前に、企業紹介映像を会場で放映します（30秒程度）。" },
      { label: "メディア対応時の協賛企業パネル掲載", desc: "取材・プレスリリース対応時のバックパネルに企業名・ロゴを掲出します。" },
    ],
  },
  {
    tier: "特別協賛パートナー",
    amount: "500,000",
    badge: "プレミアム",
    badgeBg: "#FFF3CD",
    badgeColor: "#B8922A",
    borderColor: "#C9A84C",
    headerBg: "#2A3F6B",
    headerText: "#F5EDD6",
    icon: <Star size={20} />,
    summary: "公式ポスター掲載・オープニングセレモニー招待・メディアパネル掲載",
    benefits: [
      { label: "公式ポスター掲載", desc: "イベント公式ポスターに企業名・ロゴを掲載します。" },
      { label: "公式HP掲載", desc: "公式ウェブサイトに企業名・ロゴ・リンクを掲載します。" },
      { label: "会場看板掲載", desc: "福厳寺境内の看板に企業名・ロゴを掲出します。" },
      { label: "SNS紹介", desc: "公式SNSで企業を紹介します。" },
      { label: "オープニングセレモニー招待", desc: "2026年11月14日（土）のオープニングセレモニーにご招待します。" },
      { label: "メディア対応時の協賛企業パネル掲載", desc: "取材・プレスリリース対応時のバックパネルに企業名・ロゴを掲出します。" },
    ],
  },
  {
    tier: "公式協賛パートナー",
    amount: "100,000",
    badge: "スタンダード",
    badgeBg: "#F0F4FF",
    badgeColor: "#3B5BA5",
    borderColor: "#B0BCD8",
    headerBg: "#3B5BA5",
    headerText: "#FFFFFF",
    icon: <Building2 size={20} />,
    summary: "公式HP・会場看板・SNS紹介・メディアパネル掲載",
    benefits: [
      { label: "公式HP掲載", desc: "公式ウェブサイトに企業名・ロゴ・リンクを掲載します。" },
      { label: "会場看板掲載", desc: "福厳寺境内の看板に企業名・ロゴを掲出します。" },
      { label: "SNS紹介", desc: "公式SNSで企業を紹介します。" },
      { label: "メディア対応時の協賛企業パネル掲載", desc: "取材・プレスリリース対応時のバックパネルに企業名・ロゴを掲出します。" },
    ],
  },
  {
    tier: "地域応援パートナー",
    amount: "50,000",
    badge: "飲食店向け",
    badgeBg: "#F0FFF4",
    badgeColor: "#2D7A4F",
    borderColor: "#A8D5B5",
    headerBg: "#2D7A4F",
    headerText: "#FFFFFF",
    icon: <Megaphone size={20} />,
    summary: "飲食店マップ掲載＋インスタグラマーによる店舗PR投稿1回",
    benefits: [
      { label: "公式HP掲載", desc: "公式ウェブサイトに店舗名・ロゴ・リンクを掲載します。" },
      { label: "SNS紹介", desc: "公式SNSで店舗を紹介します。" },
      { label: "飲食店マップ掲載・来場者配布", desc: "来場者全員に配布する「飲食店マップ」に店舗情報（名称・住所・営業時間・PR文）を掲載します。" },
      { label: "インスタグラマーによる店舗PR投稿 1回", desc: "イベント公式インスタグラマーが店舗を訪問し、SNS投稿を1回実施します。来場前から店舗の認知を広げ、来店動機づくりにつなげます。" },
    ],
  },
  {
    tier: "まちづくり応援パートナー",
    amount: "30,000",
    badge: "飲食店向け",
    badgeBg: "#F0FFF4",
    badgeColor: "#2D7A4F",
    borderColor: "#A8D5B5",
    headerBg: "#4A8F65",
    headerText: "#FFFFFF",
    icon: <MapPin size={20} />,
    summary: "飲食店マップ掲載・来場者配布＋公式HP掲載",
    benefits: [
      { label: "公式HP掲載", desc: "公式ウェブサイトに店舗名・ロゴ・リンクを掲載します。" },
      { label: "飲食店マップ掲載・来場者配布", desc: "来場者全員に配布する「飲食店マップ」に店舗情報を掲載します。" },
    ],
  },
  {
    tier: "協力パートナー",
    amount: "10,000",
    badge: "エントリー",
    badgeBg: "#F5F5F5",
    badgeColor: "#666660",
    borderColor: "#CCCCCC",
    headerBg: "#666660",
    headerText: "#FFFFFF",
    icon: <Heart size={20} />,
    summary: "公式HP掲載・協賛企業一覧掲載",
    benefits: [
      { label: "公式HP掲載", desc: "公式ウェブサイトの協賛企業一覧に企業名・店舗名を掲載します。" },
      { label: "協賛企業一覧掲載", desc: "会場掲示の協賛企業一覧にお名前を掲載します。" },
    ],
  },
];

/* ── 来場者構成データ ── */
const visitorData = [
  { label: "柳川市・近隣市町村", value: 50, count: "5,000人", color: "#B8922A" },
  { label: "福岡都市圏", value: 35, count: "3,500人", color: "#3B5BA5" },
  { label: "県外・インバウンド", value: 15, count: "1,500人", color: "#2D7A4F" },
];

/* ── 集客方法データ ── */
const promotionMethods = [
  {
    target: "地域住民向け",
    icon: <Users size={18} />,
    methods: ["自治体広報誌・地域新聞", "学校関係への案内", "地域イベント連携", "口コミ紹介"],
  },
  {
    target: "福岡都市圏向け",
    icon: <TrendingUp size={18} />,
    methods: ["Instagram・Google・YouTube広告", "西鉄沿線PR", "観光情報サイト掲載"],
  },
  {
    target: "県外・インバウンド向け",
    icon: <ExternalLink size={18} />,
    methods: ["柳川市観光協会・宿泊施設連携", "旅行会社・観光メディア", "外国語WEBサイト", "福岡空港利用者向けPR"],
  },
];

/* ── 地域効果データ ── */
const regionalEffects = [
  { num: "01", title: "夜間観光の創出", desc: "冬の夜に柳川を訪れる新しい理由をつくります。" },
  { num: "02", title: "市内回遊の促進", desc: "飲食店マップ等により、来場者の店舗利用を促します。" },
  { num: "03", title: "地域店舗のPR", desc: "協賛店舗を来場者へ紹介し、認知拡大につなげます。" },
  { num: "04", title: "文化財保全", desc: "大人チケット売上の20%を福厳寺へ還元します。" },
];

/* ── 申込ステップ ── */
const applySteps = [
  { step: "01", title: "協賛区分の選択", desc: "6つのプランからご予算・目的に合ったプランをお選びください。" },
  { step: "02", title: "内容の確認", desc: "企業名・店舗名・掲載内容をご確認いただきます。" },
  { step: "03", title: "協賛金のお支払い", desc: "お支払い方法についてご案内いたします。" },
  { step: "04", title: "掲載・PR開始", desc: "公式HP・SNS・会場掲示・飲食店マップ等へ掲載します。" },
];

/* ── ナビゲーション ── */
function SponsorNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "事業概要", href: "#overview" },
    { label: "協賛プラン", href: "#plans" },
    { label: "地域効果", href: "#effects" },
    { label: "お申込み", href: "#apply" },
    { label: "お問い合わせ", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* ロゴ */}
        <Link href="/">
          <span className="flex items-center gap-3 cursor-pointer">
            <img src={LOGO_URL} alt="立花幻想夜" className="w-9 h-9 object-contain" />
            <span
              className="hidden sm:block text-sm font-semibold tracking-widest"
              style={{ fontFamily: "'Shippori Mincho', serif", color: C.navy }}
            >
              立花幻想夜
            </span>
          </span>
        </Link>

        {/* PCナビ */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textSub)}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="text-sm font-bold px-5 py-2.5 transition-all duration-200 hover:opacity-90 active:scale-97"
            style={{
              background: C.gold,
              color: "#FFFFFF",
              fontFamily: "'Noto Sans JP', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            協賛のお申込み
          </button>
        </nav>

        {/* スマホハンバーガー */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
          style={{ color: C.navy }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* スマホドロワー */}
      {menuOpen && (
        <div style={{ background: "#FFFFFF", borderTop: `1px solid ${C.border}` }}>
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left py-3 px-2 text-sm font-medium border-b"
                style={{ color: C.text, borderColor: C.border, fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-4 w-full py-3 font-bold text-sm"
              style={{ background: C.gold, color: "#FFFFFF", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              協賛のお申込み
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

const HERO_BG = "/images/tachibana-hero-landscape.webp";

/* ── ヒーローセクション ── */
function SponsorHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: C.navy,
        paddingTop: "80px",
        paddingBottom: "0",
      }}
    >
      {/* プロジェクションマッピング背景画像 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.35,
        }}
      />
      {/* 暗めのグラデーションオーバーレイ（テキスト可読性確保） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(28,43,74,0.88) 0%, rgba(28,43,74,0.72) 50%, rgba(28,43,74,0.82) 100%)`,
        }}
      />
      {/* ゴールドグロー */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 65% 40%, rgba(184,146,42,0.10) 0%, transparent 70%)",
        }}
      />
      {/* 右側の装飾ライン */}
      <div
        className="absolute right-0 top-0 bottom-0 w-px opacity-20"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.goldLight}, transparent)` }}
      />

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* ラベル */}
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: "32px", height: "2px", background: C.goldLight }} />
            <p
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: C.goldLight, fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              Sponsorship Recruitment
            </p>
          </div>

          {/* メインタイトル */}
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
              lineHeight: 1.25,
              color: "#FFFFFF",
            }}
          >
            協賛募集のご案内
          </h1>
          <p
            className="mb-8"
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
              color: "rgba(245,237,214,0.85)",
              letterSpacing: "0.08em",
            }}
          >
            立花幻想夜 ― 福厳寺プロジェクションマッピング ―
          </p>

          {/* サブコピー */}
          <p
            className="max-w-2xl text-base leading-loose mb-10"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            柳川に、新たな「夜の観光目的」をつくる。<br />
            65日間・目標来場者10,000人のプロジェクションマッピングイベントを通じて、
            柳川の観光振興と文化財保全に、ともに取り組みませんか。
          </p>

          {/* PDFダウンロードバナー */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 mb-8"
            style={{
              background: "rgba(245,237,214,0.1)",
              border: `1px solid rgba(212,168,67,0.4)`,
              backdropFilter: "blur(4px)",
            }}
          >
            <FileText size={18} style={{ color: C.goldLight, flexShrink: 0 }} />
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: C.goldLight, fontFamily: "'Noto Sans JP', sans-serif" }}>
                協賛募集のご案内（詳細資料）
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Noto Sans JP', sans-serif" }}>
                A4・5ページ・PDF形式
              </p>
            </div>
            <a
              href={PDF_URL}
              download="立花幻想夜_協賛募集のご案内.pdf"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-all duration-200 hover:opacity-90 active:scale-97"
              style={{ background: C.goldLight, color: C.navy, fontFamily: "'Noto Sans JP', sans-serif", whiteSpace: "nowrap" }}
            >
              <Download size={13} />
              資料をダウンロード
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.querySelector("#plans")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-97"
              style={{ background: C.goldLight, color: C.navy, fontFamily: "'Noto Sans JP', sans-serif", letterSpacing: "0.05em" }}
            >
              協賛プランを見る
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-medium text-sm transition-all duration-200"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(245,237,214,0.5)",
                color: "rgba(245,237,214,0.9)",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.goldLight; e.currentTarget.style.color = C.goldLight; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,237,214,0.5)"; e.currentTarget.style.color = "rgba(245,237,214,0.9)"; }}
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </div>

      {/* 開催概要バー */}
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container">
          <div className="flex flex-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              { label: "開催期間", value: "2026年11月14日（土）〜 2027年1月17日（日）" },
              { label: "開催日数", value: "65日間" },
              { label: "目標来場者数", value: "10,000人" },
              { label: "会場", value: "福厳寺（福岡県柳川市奥州町32-1）" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 min-w-[160px] px-6 py-4"
                style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
              >
                <p className="text-xs mb-1" style={{ color: "rgba(245,237,214,0.6)", fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {item.label}
                </p>
                <p className="text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 事業概要セクション ── */
function OverviewSection() {
  return (
    <section id="overview" style={{ background: C.bg, padding: "80px 0" }}>
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] mb-3 uppercase font-medium" style={{ color: C.gold }}>
            About the Event
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}
          >
            事業概要・来場者数計画
          </h2>
          <div className="mx-auto" style={{ width: "48px", height: "2px", background: C.gold }} />
        </div>

        {/* 概要テキスト */}
        <div
          className="max-w-3xl mx-auto mb-16 p-8"
          style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
        >
          <p
            className="text-lg font-bold mb-4 text-center"
            style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}
          >
            柳川に、新たな「夜の観光目的」をつくる。
          </p>
          <p className="text-sm leading-loose" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
            本事業は、福厳寺を舞台に、柳川の歴史・文化・自然・祈りを最先端の映像技術で表現するプロジェクションマッピングイベントです。
            昼間観光が中心であった柳川に、新たな夜間観光資源を創出し、観光客の滞在時間延長、地域回遊の促進、地域経済の活性化を目指します。
            65日間にわたり開催することで、単発イベントではなく、継続的に柳川市内外から来場者を呼び込み、
            協賛企業・店舗様にとっても<strong style={{ color: C.navy }}>長期間のPR機会</strong>を創出します。
          </p>
        </div>

        {/* 開催概要テーブル */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-center mb-6 text-lg font-bold" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            開催概要
          </h3>
          <div style={{ border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: C.shadow }}>
            {[
              { label: "イベント名称", value: "立花幻想夜 ― 福厳寺プロジェクションマッピング ―" },
              { label: "会場", value: "福厳寺（福岡県柳川市奥州町32-1）" },
              { label: "開催期間", value: "2026年11月14日（土）〜 2027年1月17日（日）" },
              { label: "開催日数", value: "65日間" },
              { label: "開催時間", value: "17:00 開場 ▶ 17:30 スタート ▶ 21:00 受付終了 ▶ 21:30 閉場" },
              { label: "入場料", value: "大人（中学生以上）1,500円 ／ こども（小学生以下）500円 ／ 未就学児無料　※お支払いは現金のみ" },
              { label: "目標来場者数", value: "10,000人" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row"
                style={{ borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}
              >
                <div
                  className="sm:w-44 px-5 py-4 flex-shrink-0"
                  style={{ background: C.bgAlt, borderRight: `1px solid ${C.border}` }}
                >
                  <p className="text-xs font-semibold" style={{ color: C.gold, fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {row.label}
                  </p>
                </div>
                <div className="px-5 py-4" style={{ background: C.bgCard }}>
                  <p className="text-sm" style={{ color: C.text, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}>
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 来場者構成 */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-center mb-8 text-lg font-bold" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            想定来場者構成
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {visitorData.map((item, i) => (
              <div
                key={i}
                className="p-6 text-center"
                style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
              >
                <p className="text-4xl font-bold mb-1" style={{ color: item.color, fontFamily: "'Shippori Mincho', serif" }}>
                  {item.value}%
                </p>
                <p className="text-sm mb-1 font-medium" style={{ color: C.text, fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: item.color, fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {item.count}
                </p>
              </div>
            ))}
          </div>
          {/* バーグラフ */}
          <div
            className="p-4"
            style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
          >
            <div className="flex h-6 overflow-hidden mb-3" style={{ borderRadius: "3px" }}>
              {visitorData.map((item, i) => (
                <div
                  key={i}
                  style={{ width: `${item.value}%`, background: item.color }}
                  title={`${item.label}: ${item.value}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {visitorData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ width: "10px", height: "10px", background: item.color, borderRadius: "2px" }} />
                  <span className="text-xs" style={{ color: C.textSub }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 集客方法 */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center mb-8 text-lg font-bold" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            主な集客方法
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {promotionMethods.map((method, i) => (
              <div
                key={i}
                className="p-5"
                style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: C.gold }}>{method.icon}</span>
                  <p className="text-sm font-semibold" style={{ color: C.navy, fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {method.target}
                  </p>
                </div>
                <ul className="space-y-2">
                  {method.methods.map((m, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div className="mt-1.5 flex-shrink-0" style={{ width: "4px", height: "4px", background: C.gold, borderRadius: "50%" }} />
                      <p className="text-xs leading-relaxed" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
                        {m}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 協賛プランカード（展開式） ── */
function PlanCard({ plan, index }: { plan: typeof sponsorPlans[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex flex-col transition-all duration-300"
      style={{
        background: C.bgCard,
        border: `1px solid ${plan.borderColor}`,
        boxShadow: expanded ? `0 8px 32px rgba(0,0,0,0.10)` : C.shadow,
        transitionDelay: `${index * 0.05}s`,
      }}
    >
      {/* カードヘッダー（カラー帯） */}
      <div
        className="px-6 py-4"
        style={{ background: plan.headerBg }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs px-2 py-0.5 font-semibold"
            style={{ background: plan.badgeBg, color: plan.badgeColor }}
          >
            {plan.badge}
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{plan.icon}</span>
        </div>
        <h3
          className="text-base font-bold"
          style={{ color: plan.headerText, fontFamily: "'Shippori Mincho', serif" }}
        >
          {plan.tier}
        </h3>
      </div>

      {/* 金額 */}
      <div className="px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="flex items-baseline gap-1">
          <span className="text-xs" style={{ color: C.textMuted }}>¥</span>
          <span
            className="text-3xl font-bold"
            style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}
          >
            {plan.amount}
          </span>
          <span className="text-xs" style={{ color: C.textMuted }}>円（税別）</span>
        </div>
        <p className="text-xs mt-2 leading-relaxed" style={{ color: C.textSub }}>
          {plan.summary}
        </p>
      </div>

      {/* 特典サマリー（常時表示） */}
      <div className="px-6 py-4 flex-1">
        <ul className="space-y-2">
          {plan.benefits.map((benefit, j) => (
            <li key={j} className="flex items-start gap-2">
              <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: plan.headerBg }} />
              <p className="text-xs leading-relaxed font-medium" style={{ color: C.text, fontFamily: "'Noto Sans JP', sans-serif" }}>
                {benefit.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* 詳細展開ボタン */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold transition-all duration-200"
        style={{
          background: expanded ? plan.headerBg : C.bgAlt,
          color: expanded ? "rgba(255,255,255,0.9)" : C.textSub,
          borderTop: `1px solid ${C.border}`,
          fontFamily: "'Noto Sans JP', sans-serif",
        }}
        onMouseEnter={(e) => {
          if (!expanded) { e.currentTarget.style.background = C.border; e.currentTarget.style.color = C.text; }
        }}
        onMouseLeave={(e) => {
          if (!expanded) { e.currentTarget.style.background = C.bgAlt; e.currentTarget.style.color = C.textSub; }
        }}
      >
        {expanded ? (
          <>詳細を閉じる <ChevronUp size={14} /></>
        ) : (
          <>特典の詳細を見る <ChevronDown size={14} /></>
        )}
      </button>

      {/* 詳細パネル（展開時） */}
      {expanded && (
        <div
          className="px-6 py-5"
          style={{ background: "#FAFAF8", borderTop: `1px solid ${C.border}` }}
        >
          <p className="text-xs font-bold mb-4" style={{ color: C.navy, fontFamily: "'Noto Sans JP', sans-serif" }}>
            各特典の詳細
          </p>
          <div className="space-y-4">
            {plan.benefits.map((benefit, j) => (
              <div key={j} className="flex gap-3">
                <div
                  className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5"
                  style={{ background: plan.headerBg, borderRadius: "50%" }}
                >
                  <span className="text-white" style={{ fontSize: "9px", fontWeight: 700 }}>{j + 1}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: C.navy, fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {benefit.label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* 申込ボタン */}
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-5 w-full py-3 text-sm font-bold transition-all duration-200 hover:opacity-90"
            style={{ background: plan.headerBg, color: plan.headerText, fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            このプランで申込む →
          </button>
        </div>
      )}
    </div>
  );
}

/* ── 協賛プランセクション ── */
function PlansSection() {
  return (
    <section id="plans" style={{ background: C.bgAlt, padding: "80px 0" }}>
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-6">
          <p className="text-xs tracking-[0.3em] mb-3 uppercase font-medium" style={{ color: C.gold }}>
            Sponsorship Plans
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}
          >
            協賛プラン一覧
          </h2>
          <div className="mx-auto mb-6" style={{ width: "48px", height: "2px", background: C.gold }} />
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
            協賛金額に応じて、公式ホームページ掲載・会場看板掲載・SNS紹介・飲食店マップ掲載・
            メディア対応時の企業名掲出などのPR機会をご提供します。<br />
            <span className="font-medium" style={{ color: C.text }}>「特典の詳細を見る」ボタンで各プランの詳細をご確認いただけます。</span>
          </p>
        </div>

        {/* PR価値 */}
        <div
          className="max-w-3xl mx-auto mb-12 p-6 flex items-center gap-4"
          style={{ background: C.goldPale, border: `1px solid ${C.borderGold}` }}
        >
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center" style={{ background: C.gold }}>
            <TrendingUp size={20} color="#FFFFFF" />
          </div>
          <p className="text-sm leading-loose" style={{ color: C.navy, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}>
            本事業は<strong>65日間</strong>の開催を予定しており、来場者に対して継続的に企業名・店舗名を届けることができます。
            公式ホームページ、SNS、会場掲示、飲食店マップ、メディア対応時の協賛企業パネルなど、
            協賛区分に応じたPR機会をご提供します。
          </p>
        </div>

        {/* プランカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sponsorPlans.map((plan, i) => (
            <PlanCard key={i} plan={plan} index={i} />
          ))}
        </div>

        {/* 飲食店マップ説明 */}
        <div
          className="max-w-3xl mx-auto mt-14 p-8"
          style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
        >
          <h3 className="text-center text-lg font-bold mb-6" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            飲食店・地域店舗向け協賛について
          </h3>
          <p className="text-sm leading-loose mb-6 text-center" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
            協賛店舗を掲載した「飲食店マップ」を作成し、イベント来場者へ配布します。<br />
            飲食店・カフェ・土産物店・観光関連店舗など、来場者の回遊促進につながる事業者様を掲載します。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                tier: "まちづくり応援パートナー",
                amount: "3万円",
                color: "#4A8F65",
                points: ["飲食店マップ掲載・来場者配布", "公式HP掲載"],
              },
              {
                tier: "地域応援パートナー",
                amount: "5万円",
                color: "#2D7A4F",
                points: ["飲食店マップ掲載・来場者配布", "公式HP掲載", "SNS紹介", "★ インスタグラマーによる店舗PR投稿 1回"],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5"
                style={{ background: C.bgAlt, border: `1px solid ${item.color}40` }}
              >
                <p className="text-xs mb-1 font-medium" style={{ color: item.color }}>{item.tier}</p>
                <p className="text-2xl font-bold mb-4" style={{ color: item.color, fontFamily: "'Shippori Mincho', serif" }}>
                  ¥{item.amount}
                </p>
                <ul className="space-y-1.5">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                      <p className="text-xs" style={{ color: C.text, fontFamily: "'Noto Sans JP', sans-serif" }}>{p}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-center leading-relaxed" style={{ color: C.textMuted, fontFamily: "'Noto Sans JP', sans-serif" }}>
            5万円プランの大きな違いは、インスタグラマーによる店舗PR投稿を1回実施する点です。<br />
            イベント公式SNSと店舗SNSを紐付けて発信することで、来場前から店舗の認知を広げ、来店動機づくりにつなげます。
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 地域効果・文化財保全セクション ── */
function EffectsSection() {
  return (
    <section id="effects" style={{ background: C.bg, padding: "80px 0" }}>
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] mb-3 uppercase font-medium" style={{ color: C.gold }}>
            Regional Impact
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            地域に生まれる効果
          </h2>
          <div className="mx-auto mb-6" style={{ width: "48px", height: "2px", background: C.gold }} />
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
            本事業は、福厳寺だけで完結するイベントではありません。
            川下り・御花・うなぎ店・宿泊施設・土産物店・交通事業者などと連携し、
            柳川市内全体への回遊促進を目指します。
          </p>
        </div>

        {/* 効果カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {regionalEffects.map((effect, i) => (
            <div
              key={i}
              className="p-6"
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-4"
                style={{ background: C.goldPale, border: `1px solid ${C.borderGold}` }}
              >
                <span className="text-sm font-bold" style={{ color: C.gold, fontFamily: "'Shippori Mincho', serif" }}>
                  {effect.num}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
                {effect.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
                {effect.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 文化財保全 */}
        <div
          className="max-w-3xl mx-auto p-8"
          style={{
            background: `linear-gradient(135deg, ${C.navy} 0%, #2A3F6B 100%)`,
            boxShadow: "0 8px 40px rgba(28,43,74,0.2)",
          }}
        >
          <div className="text-center mb-6">
            <p className="text-xs tracking-[0.3em] mb-2 uppercase" style={{ color: "rgba(245,237,214,0.7)" }}>
              Cultural Heritage
            </p>
            <h3 className="text-xl font-bold" style={{ color: "#FFFFFF", fontFamily: "'Shippori Mincho', serif" }}>
              文化財保全への還元
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center flex-shrink-0">
              <p className="text-6xl font-bold" style={{ color: C.goldLight, fontFamily: "'Shippori Mincho', serif" }}>
                20%
              </p>
              <p className="text-xs mt-2" style={{ color: "rgba(245,237,214,0.7)" }}>
                大人チケット売上の
              </p>
            </div>
            <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.2)" }} className="hidden sm:block" />
            <div>
              <p className="text-sm leading-loose" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
                本事業では、大人チケット売上の20%を福厳寺へ還元する計画です。
                目標来場者数10,000人を達成した場合、大人チケット売上1,200万円の20%にあたる
                <strong style={{ color: C.goldLight }}>約240万円</strong>を、
                福厳寺の維持管理および文化財保全活動へ還元します。
              </p>
              <p className="mt-3 text-sm leading-loose" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
                協賛いただくことは、イベント開催の支援だけでなく、
                <strong style={{ color: C.goldLight }}>柳川の歴史・文化資源を未来へつなぐ取り組みへの参加</strong>にもなります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 申込の流れセクション ── */
function ApplySection() {
  return (
    <section id="apply" style={{ background: C.bgAlt, padding: "80px 0" }}>
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] mb-3 uppercase font-medium" style={{ color: C.gold }}>
            How to Apply
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            お申込みの流れ
          </h2>
          <div className="mx-auto" style={{ width: "48px", height: "2px", background: C.gold }} />
        </div>

        {/* ステップ（縦並びタイムライン） */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="relative">
            {/* 縦ライン */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(to bottom, ${C.gold}, rgba(184,146,42,0.15))` }}
            />
            <div className="space-y-0">
              {applySteps.map((step, i) => (
                <div key={i} className="relative flex gap-6">
                  {/* ステップ番号バッジ（ライン上に重ねる） */}
                  <div
                    className="relative z-10 flex-shrink-0 w-12 h-12 flex flex-col items-center justify-center"
                    style={{ background: C.navy, border: `2px solid ${C.gold}` }}
                  >
                    <p className="text-xs" style={{ color: "rgba(245,237,214,0.6)", lineHeight: 1, fontSize: "9px" }}>STEP</p>
                    <p className="text-base font-bold" style={{ color: C.goldLight, fontFamily: "'Shippori Mincho', serif", lineHeight: 1.2 }}>
                      {step.step}
                    </p>
                  </div>
                  {/* カード */}
                  <div
                    className="flex-1 mb-6 p-5"
                    style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
                  >
                    <h3 className="font-bold mb-1" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif", fontSize: "1rem" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 申込時にご準備いただくもの */}
        <div
          className="max-w-3xl mx-auto p-6"
          style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
        >
          <h3 className="font-bold mb-4" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            申込時にご準備いただくもの
          </h3>
          <ul className="space-y-2">
            {[
              "企業名・店舗名",
              "担当者名・連絡先",
              "掲載用ロゴデータまたは店舗写真",
              "飲食店マップ掲載希望の場合：店舗住所・営業時間・PR文",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <ArrowRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: C.gold }} />
                <p className="text-sm" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── お問い合わせセクション ── */
function ContactSection() {
  return (
    <section id="contact" style={{ background: C.bg, padding: "80px 0" }}>
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] mb-3 uppercase font-medium" style={{ color: C.gold }}>
            Contact
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
            お問い合わせ
          </h2>
          <div className="mx-auto mb-6" style={{ width: "48px", height: "2px", background: C.gold }} />
          <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>
            協賛についてのご質問・お申込みは、下記担当者までお気軽にご連絡ください。
          </p>
        </div>

        {/* 連絡先カード */}
        <div className="max-w-2xl mx-auto">
          <div
            className="p-8 text-center"
            style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            }}
          >
            {/* 主催 */}
            <p className="text-xs tracking-widest mb-2" style={{ color: C.textMuted }}>主催</p>
            <p className="text-base font-bold mb-2" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
              水郷柳川光のまちづくり実行委員会
            </p>
            <p className="text-xs mb-6" style={{ color: C.textMuted }}>（福厳寺内）</p>

            <div className="mx-auto mb-6" style={{ width: "40px", height: "1px", background: C.border }} />

            {/* 担当者 */}
            <p className="text-xl font-bold mb-6" style={{ color: C.navy, fontFamily: "'Shippori Mincho', serif" }}>
              担当：藤崎（ふじさき）
            </p>

            {/* 連絡先 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@bidow.jp"
                className="flex items-center gap-3 px-6 py-4 transition-all duration-200"
                style={{
                  background: C.bgAlt,
                  border: `1px solid ${C.border}`,
                  color: C.text,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.goldPale; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgAlt; }}
              >
                <Mail size={18} style={{ color: C.gold }} />
                <div className="text-left">
                  <p className="text-xs mb-0.5" style={{ color: C.textMuted }}>メール</p>
                  <p className="text-sm font-medium" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    info@bidow.jp
                  </p>
                </div>
              </a>
              <a
                href="tel:080-3908-4738"
                className="flex items-center gap-3 px-6 py-4 transition-all duration-200"
                style={{
                  background: C.bgAlt,
                  border: `1px solid ${C.border}`,
                  color: C.text,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.goldPale; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgAlt; }}
              >
                <Phone size={18} style={{ color: C.gold }} />
                <div className="text-left">
                  <p className="text-xs mb-0.5" style={{ color: C.textMuted }}>電話</p>
                  <p className="text-sm font-medium" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    080-3908-4738
                  </p>
                </div>
              </a>
            </div>

            {/* メッセージ */}
            <p
              className="mt-8 text-sm leading-loose"
              style={{ color: C.textSub, fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, fontStyle: "italic" }}
            >
              「柳川の新しい冬の風物詩を、ぜひ共に育ててください。」
            </p>
          </div>
        </div>

        {/* メインサイトへのリンク */}
        <div className="text-center mt-12">
          <Link href="/">
            <span
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer"
              style={{ color: C.textMuted, fontFamily: "'Noto Sans JP', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
            >
              <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
              イベント公式サイトへ戻る
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── フッター ── */
function SponsorFooter() {
  return (
    <footer
      className="py-10 text-center"
      style={{ background: C.navy, borderTop: `3px solid ${C.gold}` }}
    >
      <div className="container">
        <img src={LOGO_URL} alt="立花幻想夜" className="w-10 h-10 object-contain mx-auto mb-4" />
        <p className="text-sm font-semibold mb-2" style={{ color: "#FFFFFF", fontFamily: "'Shippori Mincho', serif" }}>
          立花幻想夜 ― 福厳寺プロジェクションマッピング ―
        </p>
        <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
          主催：水郷柳川光のまちづくり実行委員会
        </p>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
          後援：「立花宗茂と誾千代」NHK大河ドラマ招致委員会・柳川市教育委員会
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          © 2026 水郷柳川光のまちづくり実行委員会. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ── メインエクスポート ── */
export default function Sponsor() {
  return (
    <div style={{ background: C.bg }}>
      <SponsorNav />
      <div style={{ paddingTop: "64px" }}>
        <SponsorHero />
        <OverviewSection />
        <PlansSection />
        <EffectsSection />
        <ApplySection />
        <ContactSection />
        <SponsorFooter />
      </div>
    </div>
  );
}
