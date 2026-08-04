/* ============================================================
   AboutSection — イベント概要
   ============================================================ */
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CONCEPT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663442056627/Mka8s8bmHpdnByoMCjCFQS/section_concept-Pz5RWT6kAdHtjvbwTA5MXh.webp";
const TEMPLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663442056627/Mka8s8bmHpdnByoMCjCFQS/section_temple-PFPiiW5DNwszBef82fdoT9.webp";

export default function AboutSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      {/* 背景装飾 */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.72 0.12 85 / 5%)" }}
      />

      <div className="container">
        {/* セクション見出し */}
        <div className="text-center mb-16 scroll-reveal">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            About
          </p>
          <h2
            className="section-title text-3xl md:text-4xl mb-4 gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)" }}
          >
            柳川の冬の夜に、<br />新しい光の物語を。
          </h2>
        </div>

        {/* 2カラムレイアウト */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="scroll-reveal reveal-delay-1">
            <p
              className="leading-loose mb-6 text-base"
              style={{
                color: "oklch(0.35 0.05 250)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
              }}
            >
              立花幻想夜は、福厳寺を舞台に、柳川の歴史・文化・自然・祈りをプロジェクションマッピングで表現する冬の夜間イベントです。
            </p>
            <p
              className="leading-loose mb-6 text-base"
              style={{
                color: "oklch(0.35 0.05 250)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
              }}
            >
              水郷柳川の風景、立花家が築いてきた歴史、福厳寺に受け継がれる祈りを、光と映像によって幻想的に描きます。
            </p>
            <p
              className="leading-loose text-base"
              style={{
                color: "oklch(0.35 0.05 250)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
              }}
            >
              昼の柳川観光とは異なる、静かで美しい夜の柳川。家族で、友人同士で、大切な人と一緒に、冬だけの特別な時間をお楽しみください。
            </p>
          </div>
          <div className="scroll-reveal reveal-delay-2">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "2px" }}
            >
              <img
                src={TEMPLE_IMG}
                alt="福厳寺プロジェクションマッピング"
                className="w-full h-72 md:h-80 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 60%, oklch(0.10 0.04 250 / 60%))",
                }}
              />
            </div>
          </div>
        </div>

        {/* 3つの特徴 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏯",
              title: "歴史ある舞台",
              desc: "福厳寺の荘厳な建築が、光と映像の舞台となります。",
            },
            {
              icon: "💡",
              title: "幻想的な光の演出",
              desc: "柳川の歴史・文化・自然・祈りを、最新のプロジェクションマッピングで表現。",
            },
            {
              icon: "🌙",
              title: "冬の夜間観光",
              desc: "昼の柳川観光とは異なる、特別な夜の体験をお届けします。",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="scroll-reveal card-hover gold-card p-6 text-center"
              style={{ transitionDelay: `${i * 0.15 + 0.2}s` }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3
                className="text-base font-semibold mb-3"
                style={{
                  color: "oklch(0.22 0.07 250)",
                  fontFamily: "'Shippori Mincho', serif",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "oklch(0.45 0.05 250)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 300,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 水郷柳川画像 */}
        <div className="mt-12 scroll-reveal">
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: "2px" }}
          >
            <img
              src={CONCEPT_IMG}
              alt="水郷柳川"
              className="w-full h-56 md:h-72 object-cover"
            />
            <div
              className="absolute inset-0 flex items-end p-6"
              style={{
                background: "linear-gradient(to top, oklch(0.10 0.04 250 / 80%) 0%, transparent 60%)",
              }}
            >
              <p
                className="text-sm tracking-widest"
                style={{
                  color: "oklch(0.30 0.05 250)",
                  fontFamily: "'Shippori Mincho', serif",
                }}
              >
                昼は川下り、夜は福厳寺へ。柳川を一日中楽しむ旅を。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
