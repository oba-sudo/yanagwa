/* ============================================================
   ElementaryFreeSection — 小学生無料チケット案内
   ============================================================ */
import { useEffect, useRef } from "react";
import { Gift, CheckCircle, AlertCircle } from "lucide-react";

const steps = [
  "紙の無料招待チケットを持参",
  "会場受付で提示",
  "半券を回収",
  "小学生本人は無料入場",
];

const notes = [
  "対象は柳川市内の小学生です。",
  "チケットを持参した本人のみ無料入場できます。",
  "保護者・同伴者は通常料金での入場となります。",
  "チケットを忘れた場合は、通常料金となる場合があります。",
  "利用期間はイベント開催期間中です。",
];

export default function ElementaryFreeSection() {
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
      id="elementary"
      ref={sectionRef}
      className="py-20"
      style={{ background: "oklch(0.93 0.01 80)" }}
    >
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14 scroll-reveal">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Free Ticket
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}
          >
            柳川市内小学生<br />無料招待チケット
          </h2>
          <p
            className="mt-6 text-sm leading-relaxed max-w-lg mx-auto"
            style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            柳川市内の小学生は、無料招待チケットを持参すると無料で入場できます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* 利用方法 */}
          <div className="scroll-reveal">
            <div className="flex items-center gap-2 mb-5">
              <Gift size={18} style={{ color: "oklch(0.22 0.07 250)" }} />
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
              >
                利用方法
              </p>
            </div>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4"
                  style={{
                    background: "oklch(1.00 0 0)",
                    border: "1px solid oklch(0.72 0.12 85 / 20%)",
                  }}
                >
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 text-xs font-bold"
                    style={{
                      background: "oklch(0.72 0.12 85 / 20%)",
                      border: "1px solid oklch(0.72 0.12 85 / 40%)",
                      color: "oklch(0.22 0.07 250)",
                      fontFamily: "'Shippori Mincho', serif",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.80 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 注意事項 */}
          <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="flex items-center gap-2 mb-5">
              <AlertCircle size={18} style={{ color: "oklch(0.22 0.07 250)" }} />
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
              >
                注意事項
              </p>
            </div>
            <div className="space-y-2">
              {notes.map((note, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "oklch(0.35 0.05 250)" }} />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                  >
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
