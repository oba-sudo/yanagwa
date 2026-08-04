/* ============================================================
   TicketSection — 料金・チケット案内
   ============================================================ */
import { useEffect, useRef } from "react";
import { Ticket, AlertCircle, Gift } from "lucide-react";

export default function TicketSection() {
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
      id="ticket"
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
            Ticket & Price
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            料金・チケット
          </h2>
          <p
            className="mt-6 text-sm"
            style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            本イベントは、当日会場受付でのチケット販売を予定しています。<br />
            <strong style={{ color: "oklch(0.22 0.07 250)" }}>WEBチケット販売は行いません。</strong>
          </p>
        </div>

        {/* 料金カード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-12">
          {/* 大人 */}
          <div
            className="scroll-reveal text-center p-8"
            style={{
              background: "oklch(1.00 0 0)",
              border: "1px solid oklch(0.72 0.12 85 / 50%)",
              transitionDelay: "0s",
            }}
          >
            <Ticket size={28} className="mx-auto mb-3" style={{ color: "oklch(0.22 0.07 250)" }} />
            <p
              className="text-sm mb-2 tracking-wide"
              style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              大人
            </p>
            <p
              className="text-xs mb-1"
              style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              （中学生以上）
            </p>
            <p
              className="font-bold"
              style={{
                fontSize: "2.5rem",
                color: "oklch(0.22 0.07 250)",
                fontFamily: "'Shippori Mincho', serif",
                lineHeight: 1.2,
              }}
            >
              1,500
              <span className="text-lg ml-1">円</span>
            </p>
          </div>

          {/* 子ども */}
          <div
            className="scroll-reveal text-center p-8"
            style={{
              background: "oklch(1.00 0 0)",
              border: "1px solid oklch(0.72 0.12 85 / 30%)",
              transitionDelay: "0.1s",
            }}
          >
            <Ticket size={28} className="mx-auto mb-3" style={{ color: "oklch(0.35 0.05 250)" }} />
            <p
              className="text-sm mb-2 tracking-wide"
              style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              子ども
            </p>
            <p
              className="text-xs mb-1"
              style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              （小学生以下）
            </p>
            <p
              className="font-bold"
              style={{
                fontSize: "2.5rem",
                color: "oklch(0.22 0.07 250)",
                fontFamily: "'Shippori Mincho', serif",
                lineHeight: 1.2,
              }}
            >
              500
              <span className="text-lg ml-1">円</span>
            </p>
          </div>

          {/* 未就学児 */}
          <div
            className="scroll-reveal text-center p-8"
            style={{
              background: "oklch(1.00 0 0)",
              border: "1px solid oklch(0.72 0.12 85 / 20%)",
              transitionDelay: "0.2s",
            }}
          >
            <Gift size={28} className="mx-auto mb-3" style={{ color: "oklch(0.40 0.05 250)" }} />
            <p
              className="text-sm mb-2 tracking-wide"
              style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              未就学児
            </p>
            <p
              className="text-xs mb-1"
              style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              &nbsp;
            </p>
            <p
              className="font-bold"
              style={{
                fontSize: "2.5rem",
                color: "oklch(0.22 0.07 250)",
                fontFamily: "'Shippori Mincho', serif",
                lineHeight: 1.2,
              }}
            >
              無料
            </p>
          </div>
        </div>

        {/* 柳川市内小学生無料 */}
        <div
          className="scroll-reveal p-6 max-w-3xl mx-auto mb-10"
          style={{
            background: "oklch(0.20 0.06 85 / 15%)",
            border: "1px solid oklch(0.72 0.12 85 / 40%)",
          }}
        >
          <div className="flex items-start gap-4">
            <Gift size={20} className="shrink-0 mt-0.5" style={{ color: "oklch(0.22 0.07 250)" }} />
            <div>
              <p
                className="font-semibold mb-2"
                style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
              >
                柳川市内小学生 無料招待チケット
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
              >
                柳川市内の小学生は、無料招待チケットを持参すると無料で入場できます。
                保護者・同伴者は通常料金での入場となります。
              </p>
            </div>
          </div>
        </div>

        {/* 当日券・注意事項 */}
        <div
          className="scroll-reveal flex items-start gap-3 p-4 max-w-3xl mx-auto mb-10"
          style={{
            background: "oklch(0.93 0.01 80)",
            border: "1px solid oklch(0.72 0.12 85 / 15%)",
          }}
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "oklch(0.22 0.07 250)" }} />
          <div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              チケットは当日会場受付にてお求めください。混雑時は受付にお時間をいただく場合があります。<br />
              来場予定登録はチケット予約・入場確約ではありません。当日は会場受付で入場料をお支払いください。
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
