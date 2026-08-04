/* ============================================================
   SNSSection — お知らせ・最新情報
   プロジェクトの進捗・決定事項を時系列で表示
   ============================================================ */

const NEWS_ITEMS = [
  {
    date: "2026.07.30",
    tag: "協賛募集",
    tagColor: "oklch(0.12 0.04 250)",
    tagBg: "oklch(0.72 0.12 85)",
    title: "協賛・スポンサー企業の募集を開始しました",
    body: "企業・団体向けの協賛プランを公開しました。詳細は協賛募集ページをご覧ください。",
    link: "/sponsor",
    linkText: "協賛プランを見る",
    external: false,
  },
  {
    date: "2026.07.30",
    tag: "Makuake",
    tagColor: "oklch(0.12 0.04 250)",
    tagBg: "oklch(0.72 0.12 85)",
    title: "Makuakeにてクラウドファンディングを開始しました",
    body: "一般の方向けの支援を受け付けています。御朱印・お守りなどのリターンをご用意しています。",
    link: "https://www.makuake.com/project/yanagawa-fukugonji/",
    linkText: "Makuakeで応援する",
    external: true,
  },
  {
    date: "2026.07.01",
    tag: "後援決定",
    tagColor: "oklch(0.90 0.08 85)",
    tagBg: "oklch(0.28 0.06 250)",
    title: "後援が正式に決定しました",
    body: "「立花宗茂と誾千代」NHK大河ドラマ招致委員会・柳川市教育委員会より後援をいただきました。",
    link: null,
    linkText: null,
    external: false,
  },
  {
    date: "2026.06.01",
    tag: "開催決定",
    tagColor: "oklch(0.90 0.08 85)",
    tagBg: "oklch(0.28 0.06 250)",
    title: "立花幻想夜 ― 福厳寺プロジェクションマッピング ― 開催決定",
    body: "2026年11月14日（土）〜2027年1月17日（日）の65日間、福厳寺にて開催することが正式に決定しました。",
    link: null,
    linkText: null,
    external: false,
  },
];

export default function SNSSection() {
  return (
    <section
      id="news"
      className="scroll-reveal py-20 md:py-28"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* ラベル */}
        <p
          className="text-xs tracking-[0.25em] text-center mb-4 font-medium"
          style={{ color: "oklch(0.55 0.10 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          NEWS &amp; UPDATES
        </p>

        {/* 見出し */}
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          style={{ color: "oklch(0.18 0.04 250)", fontFamily: "'Shippori Mincho', serif" }}
        >
          お知らせ
        </h2>

        <div className="flex justify-center mb-12">
          <div style={{ width: "48px", height: "2px", background: "oklch(0.72 0.12 85)" }} />
        </div>

        {/* ニュースリスト */}
        <div className="space-y-4">
          {NEWS_ITEMS.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-lg"
              style={{
                background: "#FFFFFF",
                border: "1px solid oklch(0.88 0.04 85)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.50 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {item.date}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: item.tagBg, color: item.tagColor, fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {item.tag}
                </span>
              </div>
              <h3
                className="text-base font-bold mb-2 leading-snug"
                style={{ color: "oklch(0.18 0.04 250)", fontFamily: "'Shippori Mincho', serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "oklch(0.40 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
              >
                {item.body}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "oklch(0.45 0.10 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {item.linkText} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* SNSフォローCTA — Instagramアカウント作成後に追加予定 */}
      </div>
    </section>
  );
}
