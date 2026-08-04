/* ============================================================
   ProjectPurposeSection — プロジェクトの目的
   なぜ福厳寺で行うのか、柳川に何を残したいのか
   ============================================================ */

export default function ProjectPurposeSection() {
  return (
    <section
      id="purpose"
      className="scroll-reveal py-20 md:py-28"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* ラベル */}
        <p
          className="text-xs tracking-[0.25em] text-center mb-4 font-medium"
          style={{ color: "oklch(0.55 0.10 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          PROJECT PURPOSE
        </p>

        {/* 見出し */}
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-6 leading-snug"
          style={{ color: "oklch(0.18 0.04 250)", fontFamily: "'Shippori Mincho', serif" }}
        >
          なぜ、今、柳川で<br />プロジェクションマッピングなのか。
        </h2>

        {/* 区切り線 */}
        <div className="flex justify-center mb-10">
          <div style={{ width: "48px", height: "2px", background: "oklch(0.72 0.12 85)" }} />
        </div>

        {/* リード文 */}
        <p
          className="text-base md:text-lg leading-loose text-center mb-14"
          style={{ color: "oklch(0.30 0.04 250)", fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}
        >
          水郷柳川は、掘割と歴史が息づく九州屈指の観光地です。<br className="hidden md:block" />
          しかし近年、地域の賑わいは失われつつあります。<br className="hidden md:block" />
          私たちは、千年の祈りを受け継ぐ福厳寺を舞台に、<br className="hidden md:block" />
          光の芸術で柳川に新たな感動と経済の流れを生み出します。
        </p>

        {/* 3つの柱 */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "文化財の新たな価値創出",
              body: "福厳寺は立花家ゆかりの歴史的寺院です。プロジェクションマッピングにより、若い世代や観光客が文化財と出会う新しい接点を生み出します。",
            },
            {
              num: "02",
              title: "柳川への経済効果",
              body: "65日間・目標来場者10,000人のイベントを通じ、宿泊・飲食・交通など地域経済全体への波及効果を生み出します。",
            },
            {
              num: "03",
              title: "NHK大河ドラマ招致への貢献",
              body: "「立花宗茂と誾千代」のNHK大河ドラマ招致運動と連携し、柳川の知名度と文化的魅力を全国へ発信します。",
            },
          ].map(({ num, title, body }) => (
            <div
              key={num}
              className="p-7 rounded-lg"
              style={{
                background: "#FFFFFF",
                border: "1px solid oklch(0.88 0.04 85)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              }}
            >
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "oklch(0.82 0.10 85)", fontFamily: "'Shippori Mincho', serif" }}
              >
                {num}
              </p>
              <h3
                className="text-base font-bold mb-3 leading-snug"
                style={{ color: "oklch(0.18 0.04 250)", fontFamily: "'Shippori Mincho', serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.38 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
