/* ============================================================
   Footer — 立花幻想夜
   ============================================================ */
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663442056627/Mka8s8bmHpdnByoMCjCFQS/event_logo-f5858ed4a3bDwMfqMmqY52.webp";

const navLinks = [
  { label: "Makuake応援", href: "#makuake" },
  { label: "協賛・スポンサー", href: "/sponsor" },
  { label: "プロジェクトの目的", href: "#purpose" },
  { label: "開催概要", href: "#info" },
  { label: "主催・実行体制", href: "#organizer" },
  { label: "お知らせ", href: "#news" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="pb-20 lg:pb-0"
      style={{
        background: "oklch(0.08 0.03 250)",
        borderTop: "1px solid oklch(0.72 0.12 85 / 20%)",
      }}
    >
      <div className="container py-12">
        {/* ロゴ + イベント名 */}
        <div className="flex flex-col items-center mb-10">
          <img src={LOGO_URL} alt="立花幻想夜" className="w-16 h-16 object-contain mb-4" />
          <h2
            className="text-xl font-bold mb-1"
            style={{ color: "#d4a843", fontFamily: "'Shippori Mincho', serif" }}
          >
            立花幻想夜
          </h2>
          <p
            className="text-xs tracking-widest"
            style={{ color: "#c49a35", fontFamily: "'Shippori Mincho', serif" }}
          >
            ― 福厳寺プロジェクションマッピング ―
          </p>
          <div className="gold-separator mt-4" />
        </div>

        {/* ナビリンク */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xs transition-colors"
              style={{ color: "oklch(0.65 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.80 0.06 85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.65 0.04 85)")}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* 開催情報サマリー */}
        <div
          className="text-center mb-10 p-5"
          style={{
            background: "oklch(0.93 0.01 80)",
            border: "1px solid oklch(0.72 0.12 85 / 15%)",
          }}
        >
          <p
            className="text-sm mb-1"
            style={{ color: "oklch(0.30 0.05 250)", fontFamily: "'Shippori Mincho', serif" }}
          >
            2026年11月14日（土）〜 2027年1月17日（日）
          </p>
          <p
            className="text-xs"
            style={{ color: "oklch(0.65 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            17:00〜21:30（最終入場21:00）｜福厳寺（福岡県柳川市）
          </p>
        </div>

        {/* 主催・後援 */}
        <div className="text-center mb-8">
          <p
            className="text-xs mb-1"
            style={{ color: "oklch(0.60 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            主催：水郷柳川光のまちづくり実行委員会
          </p>
          <p
            className="text-xs"
            style={{ color: "oklch(0.60 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            後援：「立花宗茂と誾千代」NHK大河ドラマ招致委員会・柳川市教育委員会
          </p>
        </div>

        {/* 注意事項 */}
        <div
          className="text-xs leading-relaxed mb-8 text-center max-w-lg mx-auto"
          style={{ color: "oklch(0.55 0.03 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
        >
          <p>・境内は足元が暗くなっております。歩きやすい靴でお越しください。</p>
          <p>・ペットの同伴はご遠慮ください。</p>
          <p>・ゴミは各自でお持ち帰りください。</p>
        </div>

        {/* プライバシーポリシー + コピーライト */}
        <div className="text-center">
          <div className="mb-3">
            <Link href="/privacy">
              <span
                className="text-xs cursor-pointer transition-colors"
                style={{
                  color: "oklch(0.55 0.03 85)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 300,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.72 0.08 85)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.55 0.03 85)")}
              >
                プライバシーポリシー
              </span>
            </Link>
          </div>
          <p
            className="text-xs"
            style={{ color: "oklch(0.50 0.03 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            © 2026 水郷柳川光のまちづくり実行委員会. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
