/* ============================================================
   EventInfoSection — 開催情報
   ============================================================ */
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function EventInfoSection() {
  const sectionRef = useScrollReveal();

  const infoCards = [
    {
      icon: <CalendarDays size={24} />,
      label: "開催期間",
      value: "2026年11月14日（土）",
      sub: "〜 2027年1月17日（日）",
    },
    {
      icon: <Clock size={24} />,
      label: "開催時間",
      value: "17:00 〜 21:30",
      sub: "最終受付 21:00",
    },
    {
      icon: <MapPin size={24} />,
      label: "会場",
      value: "福厳寺",
      sub: "福岡県柳川市",
    },
    {
      icon: <Ticket size={24} />,
      label: "チケット",
      value: "当日会場受付にて販売",
      sub: "WEBチケット販売なし",
    },
  ];

  return (
    <section
      id="info"
      ref={sectionRef as React.RefObject<HTMLElement>}
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
            Event Info
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            開催情報
          </h2>
        </div>

        {/* 大きな日付表示 */}
        <div
          className="text-center mb-14 scroll-reveal reveal-delay-1"
          style={{
            background: "oklch(1.00 0 0)",
            border: "1px solid oklch(0.72 0.12 85 / 20%)",
            padding: "2rem 1rem",
          }}
        >
          <p
            className="text-xs tracking-[0.3em] mb-2"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            2026 — 2027
          </p>
          <div
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{ fontFamily: "'Shippori Mincho', serif" }}
          >
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "oklch(0.40 0.05 250)" }}>開幕</p>
              <p
                className="font-bold"
                style={{
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  color: "oklch(0.22 0.07 250)",
                  lineHeight: 1,
                }}
              >
                11/14
              </p>
              <p className="text-sm mt-1" style={{ color: "oklch(0.40 0.05 250)" }}>（土）</p>
            </div>
            <div
              className="text-2xl font-light"
              style={{ color: "oklch(0.22 0.07 250)" }}
            >
              ▶
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "oklch(0.40 0.05 250)" }}>閉幕</p>
              <p
                className="font-bold"
                style={{
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  color: "oklch(0.22 0.07 250)",
                  lineHeight: 1,
                }}
              >
                1/17
              </p>
              <p className="text-sm mt-1" style={{ color: "oklch(0.40 0.05 250)" }}>（日）</p>
            </div>
          </div>
          <p
            className="text-sm mt-4"
            style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            ※荒天時は中止となる場合があります
          </p>
        </div>

        {/* 情報カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="scroll-reveal card-hover gold-card p-6 flex items-start gap-4"
              style={{ transitionDelay: `${i * 0.1 + 0.2}s` }}
            >
              <div style={{ color: "oklch(0.22 0.07 250)" }}>{card.icon}</div>
              <div>
                <p
                  className="text-xs tracking-wide mb-1"
                  style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {card.label}
                </p>
                <p
                  className="font-semibold text-base"
                  style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
                >
                  {card.value}
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                >
                  {card.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 詳細テーブル */}
        <div className="scroll-reveal overflow-x-auto">
          <table
            className="w-full text-sm"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            <tbody>
              {[
                ["イベント名", "立花幻想夜 ― 福厳寺プロジェクションマッピング ―"],
                ["会場", "福厳寺（福岡県柳川市）"],
                ["開催期間", "2026年11月14日（土）〜 2027年1月17日（日）"],
                ["開催時間", "17:00〜21:30（最終入場 21:00）"],
                ["入場料", "大人1,500円 / 子ども500円 / 柳川市内小学生：無料招待チケット持参で無料"],
                ["チケット", "当日会場受付にて販売（WEBチケット販売なし）"],
                ["主催", "水郷柳川光のまちづくり実行委員会"],
                ["後援", "「立花宗茂と誾千代」NHK大河ドラマ招致委員会・柳川市教育委員会"],
              ].map(([label, value], i) => (
                <tr
                  key={i}
                  style={{ borderBottom: "1px solid oklch(0.72 0.12 85 / 15%)" }}
                >
                  <td
                    className="py-3 pr-4 w-28 shrink-0 font-medium text-xs tracking-wide"
                    style={{ color: "oklch(0.40 0.05 250)" }}
                  >
                    {label}
                  </td>
                  <td
                    className="py-3 font-light"
                    style={{ color: "oklch(0.35 0.05 250)" }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          className="text-xs mt-4 scroll-reveal"
          style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
        >
          ※開催時間・上映時間は変更となる場合があります。雨天・荒天時の開催情報は、公式サイトおよび公式SNSでお知らせします。
        </p>
      </div>
    </section>
  );
}
