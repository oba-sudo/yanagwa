/* ============================================================
   SponsorSection — 協賛企業紹介
   ============================================================ */
import { useEffect, useRef } from "react";
import { Building2, Heart } from "lucide-react";

const sponsorTiers = [
  { tier: "メインスポンサー", color: "oklch(0.22 0.07 250)", note: "募集中" },
  { tier: "オフィシャルスポンサー", color: "oklch(0.35 0.05 250)", note: "募集中" },
  { tier: "サポートスポンサー", color: "oklch(0.30 0.06 250)", note: "募集中" },
  { tier: "パートナー企業", color: "oklch(0.45 0.05 250)", note: "募集中" },
  { tier: "地域協力企業", color: "oklch(0.40 0.05 250)", note: "募集中" },
];

export default function SponsorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll(".scroll-reveal").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sponsor"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14 scroll-reveal">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Sponsors
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            協賛企業・地域応援企業
          </h2>
          <p
            className="mt-6 text-sm leading-relaxed max-w-xl mx-auto"
            style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            本イベントは、柳川の新たな夜間観光コンテンツ創出と文化財保全を目指す地域活性化プロジェクトです。
            本趣旨にご賛同いただいた企業・団体の皆様をご紹介します。
          </p>
        </div>

        {/* 協賛枠一覧 */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sponsorTiers.map((tier, i) => (
              <div
                key={i}
                className="scroll-reveal flex items-center justify-between p-5"
                style={{
                  background: "oklch(1.00 0 0)",
                  border: `1px solid ${tier.color}30`,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="flex items-center gap-3">
                  <Building2 size={16} style={{ color: tier.color }} />
                  <p
                    className="text-sm font-medium"
                    style={{ color: tier.color, fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {tier.tier}
                  </p>
                </div>
                <span
                  className="text-xs px-2 py-1"
                  style={{
                    background: `${tier.color}15`,
                    border: `1px solid ${tier.color}40`,
                    color: tier.color,
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  {tier.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 協賛のお願い */}
        <div
          className="scroll-reveal max-w-2xl mx-auto p-6 text-center"
          style={{
            background: "oklch(0.20 0.06 85 / 10%)",
            border: "1px solid oklch(0.72 0.12 85 / 30%)",
          }}
        >
          <Heart size={24} className="mx-auto mb-4" style={{ color: "oklch(0.22 0.07 250)" }} />
          <p
            className="font-semibold mb-3"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
          >
            協賛のご案内
          </p>
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            本イベントの協賛をご検討いただける企業・団体様は、お問い合わせよりご連絡ください。
          </p>
          <a
            href="/sponsor"
            className="btn-gold text-sm"
          >
            協賛プラン・お申込みはこちら
          </a>
        </div>
      </div>
    </section>
  );
}
