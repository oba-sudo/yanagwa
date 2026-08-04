/* ============================================================
   OrganizerSection — 主催者・実行体制
   誰が責任を持って運営しているかを明示
   ============================================================ */

export default function OrganizerSection() {
  return (
    <section
      id="organizer"
      className="scroll-reveal py-20 md:py-28"
      style={{ background: "oklch(0.95 0.008 80)" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* ラベル */}
        <p
          className="text-xs tracking-[0.25em] text-center mb-4 font-medium"
          style={{ color: "oklch(0.55 0.10 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          ORGANIZER
        </p>

        {/* 見出し */}
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          style={{ color: "oklch(0.18 0.04 250)", fontFamily: "'Shippori Mincho', serif" }}
        >
          主催者・実行体制
        </h2>

        <div className="flex justify-center mb-12">
          <div style={{ width: "48px", height: "2px", background: "oklch(0.72 0.12 85)" }} />
        </div>

        {/* 主催・後援カード */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* 主催 */}
          <div
            className="p-8 rounded-lg"
            style={{
              background: "#FFFFFF",
              border: "1px solid oklch(0.88 0.04 85)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            <p
              className="text-xs tracking-[0.2em] mb-3 font-medium"
              style={{ color: "oklch(0.55 0.10 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              主催
            </p>
            <h3
              className="text-lg font-bold mb-3 leading-snug"
              style={{ color: "oklch(0.18 0.04 250)", fontFamily: "'Shippori Mincho', serif" }}
            >
              水郷柳川光のまちづくり実行委員会
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.40 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              福厳寺（福岡県柳川市奥州町32-1）を拠点に、水郷柳川の文化・観光振興を目的として設立された実行委員会です。地域の歴史と文化を次世代に継承するため、光の芸術を通じた新たなまちづくりに取り組んでいます。
            </p>
          </div>

          {/* 後援 */}
          <div
            className="p-8 rounded-lg"
            style={{
              background: "#FFFFFF",
              border: "1px solid oklch(0.88 0.04 85)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            <p
              className="text-xs tracking-[0.2em] mb-3 font-medium"
              style={{ color: "oklch(0.55 0.10 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              後援
            </p>
            <div className="space-y-3">
              <div
                className="flex items-start gap-3 pb-3"
                style={{ borderBottom: "1px solid oklch(0.90 0.03 85)" }}
              >
                <span
                  className="text-xs mt-0.5 shrink-0 px-2 py-0.5 rounded"
                  style={{ background: "oklch(0.95 0.05 85)", color: "oklch(0.45 0.10 85)" }}
                >
                  後援
                </span>
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: "oklch(0.22 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  「立花宗茂と誾千代」NHK大河ドラマ招致委員会
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="text-xs mt-0.5 shrink-0 px-2 py-0.5 rounded"
                  style={{ background: "oklch(0.95 0.05 85)", color: "oklch(0.45 0.10 85)" }}
                >
                  後援
                </span>
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: "oklch(0.22 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  柳川市教育委員会
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 問い合わせ先 */}
        <div
          className="p-8 rounded-lg text-center"
          style={{
            background: "oklch(0.18 0.04 250)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <p
            className="text-xs tracking-[0.2em] mb-3"
            style={{ color: "oklch(0.72 0.12 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            CONTACT
          </p>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: "#FFFFFF", fontFamily: "'Shippori Mincho', serif" }}
          >
            お問い合わせ
          </h3>
          <p
            className="text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            協賛・取材・一般のお問い合わせは下記までご連絡ください
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:080-3908-4738"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:opacity-80"
              style={{ background: "oklch(0.72 0.12 85)", color: "oklch(0.12 0.04 250)" }}
            >
              <span className="text-sm font-bold" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                📞 080-3908-4738
              </span>
            </a>
            <a
              href="mailto:info@bidow.jp"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.12)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <span className="text-sm" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                ✉ info@bidow.jp
              </span>
            </a>
          </div>
          <p
            className="text-xs mt-4"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            担当：藤崎（ふじさき）
          </p>
        </div>
      </div>
    </section>
  );
}
