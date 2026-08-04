/* ============================================================
   Navigation — 立花幻想夜
   スクロールで背景が変化するヘッダー + スマホ固定ボタン
   ============================================================ */
import { useState, useEffect } from "react";
import { Menu, X, Calendar, MapPin } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663442056627/Mka8s8bmHpdnByoMCjCFQS/event_logo-f5858ed4a3bDwMfqMmqY52.webp";

// ★ 9月末まで Makuake・協賛募集を上位に表示（期限: 2026-09-30）
const navLinks: Array<{ label: string; href: string; isPage?: boolean; highlight?: boolean }> = [
  { label: "Makuake応援", href: "#makuake", highlight: true },
  { label: "協賛・スポンサー", href: "/sponsor", isPage: true, highlight: true },
  { label: "プロジェクトの目的", href: "#purpose" },
  { label: "開催概要", href: "#info" },
  { label: "主催・実行体制", href: "#organizer" },
  { label: "お知らせ", href: "#news" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [location, navigate] = useLocation();

  const handleNavClick = (href: string, isPage?: boolean) => {
    setMenuOpen(false);
    if (isPage) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (location !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // スクロール前: 透明背景 → 文字は白/ゴールド
  // スクロール後: 白背景 → 文字は濃いネイビー/黒
  const textColor = scrolled ? "#1a1a2e" : "#f5edd6";
  const logoTextColor = scrolled ? "#1a1a2e" : "#d4a843";

  return (
    <>
      {/* ヘッダー */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,168,76,0.2)" : "none",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-16">
          {/* ロゴ */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3"
          >
            <img src={LOGO_URL} alt="立花幻想夜" className="w-9 h-9 object-contain" />
            <span
              className="hidden sm:block text-sm font-semibold tracking-widest transition-colors duration-300"
              style={{
                fontFamily: "'Shippori Mincho', serif",
                color: logoTextColor,
              }}
            >
              立花幻想夜
            </span>
          </a>

          {/* PCナビ */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.highlight ? (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.isPage)}
                  className="text-xs font-bold tracking-wide transition-all duration-200 px-3 py-1.5"
                  style={{
                    color: "#1a1a2e",
                    background: "#d4a843",
                    fontFamily: "'Noto Sans JP', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#e8bc55"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#d4a843"; }}
                >
                  {link.label}
                </button>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.isPage)}
                  className="text-sm font-light tracking-wide transition-colors duration-200"
                  style={{
                    color: textColor,
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d4a843")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
                >
                  {link.label}
                </button>
              )
            ))}
          </nav>

          {/* スマホハンバーガー */}
          <button
            className="lg:hidden p-2 transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
            style={{ color: scrolled ? "#1a1a2e" : "#f5edd6" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* スマホドロワーメニュー */}
        {menuOpen && (
          <div
            className="lg:hidden"
            style={{
              background: "#0d1b2a",
              borderTop: "1px solid rgba(212,168,67,0.3)",
            }}
          >
            <nav className="container py-2 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.isPage)}
                  className="text-left py-4 px-2 text-base tracking-wide border-b flex items-center justify-between"
                  style={{
                    color: link.highlight ? "#d4a843" : "#f0e8d0",
                    borderColor: "rgba(212,168,67,0.15)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: link.highlight ? 700 : 400,
                  }}
                >
                  {link.label}
                  {link.highlight && (
                    <span
                      className="ml-2 text-xs px-2 py-0.5"
                      style={{
                        background: "rgba(212,168,67,0.2)",
                        border: "1px solid rgba(212,168,67,0.5)",
                        color: "#d4a843",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      募集中
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* スマホ固定ボトムバー */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(212,168,67,0.25)",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <a
          href="https://www.makuake.com/project/yanagawa-fukugonji/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors"
          style={{ color: "#b8922a" }}
        >
          <Calendar size={18} />
          <span className="text-xs font-bold" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            Makuake応援
          </span>
        </a>
        <div style={{ width: "1px", background: "rgba(212,168,67,0.2)" }} />
        <a
          href="/sponsor"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors"
          style={{ color: "#1a1a2e" }}
        >
          <MapPin size={18} />
          <span className="text-xs font-medium" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            協賛・スポンサー
          </span>
        </a>
      </div>
    </>
  );
}
