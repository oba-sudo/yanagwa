/* ============================================================
   KitchenCarSection — キッチンカー情報
   ============================================================ */
import { useEffect, useRef } from "react";
import { Coffee, Calendar, AlertTriangle } from "lucide-react";

const menuItems = [
  "ホットコーヒー",
  "ホットチョコレート",
  "甘酒",
  "スープ",
  "焼き芋",
  "唐揚げ",
  "クレープ",
  "焼き菓子",
  "和菓子",
];

const schedules = [
  { month: "11月", detail: "開幕初週・土日祝 出店予定" },
  { month: "12月", detail: "クリスマス・年末年始 強化出店" },
  { month: "1月", detail: "最終週末 出店予定" },
];

export default function KitchenCarSection() {
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
      id="kitchen"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14 scroll-reveal">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.78 0.14 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Kitchen Car
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            週末限定<br />あったかキッチンカー
          </h2>
          <p
            className="mt-6 text-sm leading-relaxed max-w-lg mx-auto"
            style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            冬の夜に楽しめるホットドリンクや軽食を、会場近接エリアで販売予定です。
            プロジェクションマッピングの前後に、温かい飲み物と一緒に柳川の夜をお楽しみください。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* 出店予定カレンダー */}
          <div className="scroll-reveal">
            <div className="flex items-center gap-2 mb-5">
              <Calendar size={18} style={{ color: "oklch(0.78 0.14 85)" }} />
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
              >
                出店予定日
              </p>
            </div>
            <div className="space-y-3">
              {schedules.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4"
                  style={{
                    background: "oklch(1.00 0 0)",
                    border: "1px solid oklch(0.72 0.12 85 / 20%)",
                  }}
                >
                  <span
                    className="font-bold text-lg shrink-0"
                    style={{ color: "oklch(0.78 0.14 85)", fontFamily: "'Shippori Mincho', serif" }}
                  >
                    {s.month}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.78 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                  >
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 販売予定商品 */}
          <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="flex items-center gap-2 mb-5">
              <Coffee size={18} style={{ color: "oklch(0.78 0.14 85)" }} />
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
              >
                販売予定商品例
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {menuItems.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs"
                  style={{
                    background: "oklch(0.93 0.01 80)",
                    border: "1px solid oklch(0.72 0.12 85 / 25%)",
                    color: "oklch(0.30 0.05 250)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div
          className="scroll-reveal flex items-start gap-3 p-4 max-w-3xl mx-auto mt-8"
          style={{
            background: "oklch(0.93 0.01 80)",
            border: "1px solid oklch(0.72 0.12 85 / 15%)",
          }}
        >
          <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: "oklch(0.78 0.14 85)" }} />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(0.65 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            ※出店日は変更となる場合があります。出店者・商品内容は決まり次第掲載します。
            雨天・荒天時は出店内容を変更または中止する場合があります。
          </p>
        </div>
      </div>
    </section>
  );
}
