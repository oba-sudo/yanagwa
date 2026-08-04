/* ============================================================
   ScheduleSection — 上映時間
   ============================================================ */
import { useEffect, useRef } from "react";
import { Clock, AlertTriangle } from "lucide-react";

const shows = [
  { num: "第1回", time: "18:30", note: "早めの来場向け" },
  { num: "第2回", time: "19:15", note: "混雑しやすい時間帯" },
  { num: "第3回", time: "20:00", note: "夕食後・仕事帰り向け" },
  { num: "第4回", time: "20:45", note: "最終回" },
];

export default function ScheduleSection() {
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

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      {/* 背景装飾 */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.25 0.06 280 / 15%)" }}
      />

      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14 scroll-reveal">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.78 0.14 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Schedule
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            プロジェクションマッピング<br />上映時間
          </h2>
          <p
            className="mt-6 text-sm leading-relaxed max-w-lg mx-auto"
            style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            プロジェクションマッピングは、1日複数回の上映を予定しています。
            来場前に上映時間をご確認のうえ、余裕を持ってお越しください。
          </p>
        </div>

        {/* 上映時間カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {shows.map((show, i) => (
            <div
              key={i}
              className="scroll-reveal card-hover gold-card p-6 flex items-center gap-4"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{ background: "oklch(0.72 0.12 85 / 15%)", border: "1px solid oklch(0.72 0.12 85 / 40%)" }}
              >
                <Clock size={18} style={{ color: "oklch(0.78 0.14 85)" }} />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.65 0.06 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {show.num}
                </p>
                <p
                  className="font-bold text-2xl"
                  style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
                >
                  {show.time}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.65 0.06 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                >
                  {show.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 注意事項 */}
        <div
          className="scroll-reveal flex items-start gap-3 p-4 max-w-2xl mx-auto mb-10"
          style={{
            background: "oklch(0.18 0.05 85 / 20%)",
            border: "1px solid oklch(0.72 0.12 85 / 20%)",
          }}
        >
          <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: "oklch(0.78 0.14 85)" }} />
          <div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              ※上記は仮の時間です。正式な上映時間は決定後に掲載します。<br />
              ※天候や安全上の理由により、上映内容・時間を変更または中止する場合があります。
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center scroll-reveal">
          <button
            onClick={() => scrollToSection("#register")}
            className="btn-gold-filled"
          >
            来場予定登録はこちら
          </button>
        </div>
      </div>
    </section>
  );
}
