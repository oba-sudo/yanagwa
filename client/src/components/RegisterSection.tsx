/* ============================================================
   RegisterSection — 来場予定登録
   ============================================================ */
import { useEffect, useRef } from "react";
import { UserCheck, Info } from "lucide-react";

export default function RegisterSection() {
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
      id="register"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      {/* 背景装飾 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.72 0.12 85 / 5%)" }}
      />

      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14 scroll-reveal">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Pre-Registration
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}
          >
            混雑緩和のため、<br />来場予定登録にご協力ください。
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* 説明 */}
          <p
            className="text-center text-sm leading-loose mb-8 scroll-reveal"
            style={{ color: "oklch(0.78 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            来場予定登録をしていただくことで、開催情報、上映時間、混雑情報、アクセス、駐車場、雨天時の案内などを事前に確認しやすくなります。
          </p>

          {/* 登録内容 */}
          <div
            className="scroll-reveal gold-card p-6 mb-8"
          >
            <p
              className="font-semibold mb-4 text-sm"
              style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
            >
              登録していただきたい内容
            </p>
            <ul className="space-y-2">
              {[
                "来場予定日",
                "来場予定時間帯",
                "来場人数",
                "来場手段",
                "居住エリア",
                "メールアドレスまたはLINE登録",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "oklch(0.78 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "oklch(0.78 0.14 85)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 注意事項 */}
          <div
            className="scroll-reveal flex items-start gap-3 p-4 mb-8"
            style={{
              background: "oklch(0.93 0.01 80)",
              border: "1px solid oklch(0.72 0.12 85 / 20%)",
            }}
          >
            <Info size={16} className="shrink-0 mt-0.5" style={{ color: "oklch(0.22 0.07 250)" }} />
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              来場予定登録はチケット予約・入場確約ではありません。
              当日は会場受付にて入場料をお支払いください。
            </p>
          </div>

          {/* CTAボタン */}
          <div className="text-center scroll-reveal">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="btn-gold-filled inline-flex items-center gap-3"
              style={{ fontSize: "1rem" }}
            >
              <UserCheck size={20} />
              来場予定登録フォームへ
            </a>
            <p
              className="text-xs mt-3"
              style={{ color: "oklch(0.60 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              ※登録フォームは準備中です。公開次第お知らせします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
