/* ============================================================
   NoticeSection — 開催決定のお知らせ
   正式に開催が決定したことを伝える
   ============================================================ */

export default function NoticeSection() {
  return (
    <section
      id="notice"
      className="scroll-reveal py-10 md:py-14"
      style={{ background: "oklch(0.18 0.04 250)" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-lg"
          style={{
            border: "1px solid oklch(0.72 0.12 85 / 40%)",
            background: "oklch(0.22 0.05 250 / 80%)",
            boxShadow: "0 0 40px oklch(0.72 0.12 85 / 10%)",
          }}
        >
          {/* ラベル */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <span
              className="text-xs font-bold tracking-widest px-4 py-1.5 rounded-full"
              style={{
                background: "oklch(0.72 0.12 85)",
                color: "oklch(0.12 0.04 250)",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              開催決定
            </span>
          </div>

          {/* テキスト */}
          <div className="text-center md:text-left">
            <h2
              className="text-xl md:text-2xl font-bold mb-2 leading-snug"
              style={{
                color: "oklch(0.90 0.08 85)",
                fontFamily: "'Shippori Mincho', serif",
              }}
            >
              立花幻想夜 ― 福厳寺プロジェクションマッピング ―<br className="hidden md:block" />
              2026年11月14日より正式開催決定
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "oklch(0.72 0.06 250)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
              }}
            >
              水郷柳川・福厳寺を舞台に、数千年の祝りを継ぐ光の芸術が65日間にわたり正式開催決定しました。
              現在Makuakeにてクラウドファンディングを実施中です。皆さまのご支援をお待ちしております。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
