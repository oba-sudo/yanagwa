/* ============================================================
   MakuakeSection — クラウドファンディング応援セクション
   マクアケプロジェクトへの誘導・リターン紹介
   ============================================================ */
import { useState } from "react";
import { ExternalLink, Heart, ChevronDown, ChevronUp, Star, Gift, Users, Building2 } from "lucide-react";

const MAKUAKE_URL = "https://www.makuake.com/project/yanagawa-fukugonji/";

const RETURNS = [
  {
    id: 1,
    price: "1,000円",
    title: "お礼メール",
    description: "感謝の気持ちを込めたお礼メールをお送りします。",
    items: ["御礼メール"],
    icon: "💌",
    color: "oklch(0.45 0.05 250)",
  },
  {
    id: 2,
    price: "5,000円",
    title: "チケット1枚＋御朱印",
    description: "本企画限定御朱印と入場チケット1枚。当日券より事前購入がお得！",
    items: ["特別拝観チケット 1枚", "限定御朱印"],
    icon: "🎫",
    color: "oklch(0.30 0.06 250)",
    popular: false,
  },
  {
    id: 3,
    price: "10,000円",
    title: "チケット2枚＋御朱印＋お守り",
    description: "ペアでお楽しみいただける2枚チケットに御朱印・お守りをセット。",
    items: ["特別拝観チケット 2枚", "限定御朱印", "福厳寺特別お守り"],
    icon: "🎋",
    color: "oklch(0.22 0.07 250)",
    popular: true,
  },
  {
    id: 4,
    price: "30,000円",
    title: "チケット3枚＋大般若祈祷札",
    description: "福厳寺にてご祈祷した「大般若祈祷札」と3枚チケットのセット。",
    items: ["特別拝観チケット 3枚", "大般若祈祷札"],
    icon: "🪬",
    color: "oklch(0.35 0.05 250)",
  },
  {
    id: 5,
    price: "50,000円",
    title: "住職による祈祷＋5枚セット",
    description: "住職による「成功祈願」への立ち会いができる特別プラン。",
    items: ["特別拝観チケット 5枚", "限定御朱印", "お守り", "祈祷札", "住職による祈祷立ち会い"],
    icon: "🙏",
    color: "oklch(0.22 0.07 250)",
  },
  {
    id: 6,
    price: "100,000円",
    title: "【プレミア】10枚＋特別体験",
    description: "福厳寺ツアー・立花宗茂公をしのぶ会・座禅体験から選べるプレミアプラン。",
    items: ["特別拝観チケット 10枚", "限定御朱印", "お守り", "祈祷札", "選べる特別体験（ツアー/しのぶ会/座禅）"],
    icon: "✨",
    color: "oklch(0.22 0.07 250)",
    premium: true,
  },
];

const SPONSOR_PLANS = [
  {
    size: "小",
    price: "300,000円",
    items: ["会場パネルに企業名掲載（ベニヤパネル制作）", "特別拝観チケット 20枚"],
    icon: <Building2 size={18} />,
  },
  {
    size: "中",
    price: "500,000円",
    items: ["SNS集客動画に企業名掲載（期間中常時掲載）", "特別拝観チケット 30枚"],
    icon: <Users size={18} />,
  },
  {
    size: "大",
    price: "1,000,000円",
    items: ["「〇〇企業プレゼンツ」として会場内掲出", "会場入口でのチラシ・サンプリング配布可能", "特別拝観チケット 50枚"],
    icon: <Star size={18} />,
  },
];

export default function MakuakeSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleReturns = showAll ? RETURNS : RETURNS.slice(0, 3);

  return (
    <section
      id="makuake"
      className="relative py-20 overflow-hidden"
      style={{ background: "oklch(0.93 0.01 80)" }}
    >
      {/* 背景装飾 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, oklch(0.72 0.12 85 / 5%) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, oklch(0.55 0.18 300 / 5%) 0%, transparent 50%)",
        }}
      />

      <div className="container relative z-10">
        {/* セクションヘッダー */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.35em] mb-3 uppercase"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Crowdfunding
          </p>
          <h2
            className="font-bold mb-4"
            style={{
              color: "oklch(0.22 0.07 250)",
              fontFamily: "'Shippori Mincho', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            }}
          >
            Makuakeで応援する
          </h2>
          <div
            className="w-16 h-px mx-auto mb-5"
            style={{ background: "linear-gradient(to right, transparent, oklch(0.78 0.14 85), transparent)" }}
          />
          <p
            className="text-sm leading-relaxed max-w-xl mx-auto"
            style={{
              color: "oklch(0.45 0.05 250)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
            }}
          >
            この挑戦は、皆さまの応援によって実現します。<br />
            「柳川の夜に、新しい文化を生み出す」この景色を、一緒に創ってください。
          </p>
        </div>

        {/* メインCTAバナー */}
        <a
          href={MAKUAKE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-12 group transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, oklch(0.93 0.01 80), oklch(0.93 0.01 80))",
            border: "1px solid oklch(0.72 0.12 85 / 35%)",
            boxShadow: "0 4px 24px oklch(0.72 0.12 85 / 8%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = "1px solid oklch(0.72 0.12 85 / 65%)";
            e.currentTarget.style.boxShadow = "0 8px 40px oklch(0.72 0.12 85 / 18%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = "1px solid oklch(0.72 0.12 85 / 35%)";
            e.currentTarget.style.boxShadow = "0 4px 24px oklch(0.72 0.12 85 / 8%)";
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8">
            {/* Makuakeロゴ風バッジ */}
            <div
              className="shrink-0 w-20 h-20 flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.12 85 / 12%)",
                border: "2px solid oklch(0.72 0.12 85 / 40%)",
                borderRadius: "50%",
              }}
            >
              <Heart
                size={36}
                style={{ color: "oklch(0.22 0.07 250)" }}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p
                className="text-xs tracking-widest mb-1"
                style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                Makuake（マクアケ）にて実施中
              </p>
              <h3
                className="font-bold mb-2"
                style={{
                  color: "oklch(0.22 0.07 250)",
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                }}
              >
                千年の祈りに、光を灯す。
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "oklch(0.40 0.05 250)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 300,
                }}
              >
                立花幻想夜 ― 福厳寺プロジェクションマッピング ―
              </p>
              <p
                className="text-xs mt-2"
                style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
              >
                All in型 ｜ 2026年9月29日まで
              </p>
            </div>

            <div className="shrink-0">
              <span
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-300"
                style={{
                  background: "oklch(0.22 0.07 250)",
                  color: "oklch(0.97 0.005 80)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                }}
              >
                応援購入する
                <ExternalLink size={14} />
              </span>
            </div>
          </div>
        </a>

        {/* リターン一覧 */}
        <div className="mb-10">
          <h3
            className="text-center font-semibold mb-8"
            style={{
              color: "oklch(0.22 0.07 250)",
              fontFamily: "'Shippori Mincho', serif",
              fontSize: "1.2rem",
            }}
          >
            <span style={{ color: "oklch(0.22 0.07 250)" }}>✦</span>　リターン一覧　<span style={{ color: "oklch(0.22 0.07 250)" }}>✦</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleReturns.map((ret) => (
              <div
                key={ret.id}
                className="relative transition-all duration-300"
                style={{
                  background: "oklch(1.00 0 0)",
                  border: ret.popular
                    ? "1px solid oklch(0.72 0.12 85 / 60%)"
                    : ret.premium
                    ? "1px solid oklch(0.80 0.16 85 / 50%)"
                    : "1px solid oklch(0.72 0.12 85 / 20%)",
                  boxShadow: ret.popular ? "0 0 20px oklch(0.72 0.12 85 / 10%)" : "none",
                }}
              >
                {/* 人気バッジ */}
                {ret.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold whitespace-nowrap"
                    style={{
                      background: "oklch(0.22 0.07 250)",
                      color: "oklch(0.97 0.005 80)",
                      fontFamily: "'Noto Sans JP', sans-serif",
                    }}
                  >
                    ★ 人気No.1
                  </div>
                )}
                {ret.premium && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold whitespace-nowrap"
                    style={{
                      background: "linear-gradient(90deg, oklch(0.65 0.14 60), oklch(0.80 0.16 85))",
                      color: "oklch(0.97 0.005 80)",
                      fontFamily: "'Noto Sans JP', sans-serif",
                    }}
                  >
                    ✨ プレミア
                  </div>
                )}

                <div className="p-5">
                  {/* アイコン＋価格 */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{ret.icon}</span>
                    <span
                      className="font-bold text-lg"
                      style={{
                        color: ret.color,
                        fontFamily: "'Shippori Mincho', serif",
                      }}
                    >
                      {ret.price}
                    </span>
                  </div>

                  {/* タイトル */}
                  <h4
                    className="font-semibold mb-2 leading-snug"
                    style={{
                      color: "oklch(0.22 0.07 250)",
                      fontFamily: "'Shippori Mincho', serif",
                      fontSize: "0.95rem",
                    }}
                  >
                    {ret.title}
                  </h4>

                  {/* 説明 */}
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{
                      color: "oklch(0.40 0.05 250)",
                      fontFamily: "'Noto Sans JP', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {ret.description}
                  </p>

                  {/* 内容物リスト */}
                  <ul className="space-y-1">
                    {ret.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs"
                        style={{
                          color: "oklch(0.45 0.05 250)",
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        <span style={{ color: "oklch(0.22 0.07 250)", marginTop: "2px" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* もっと見る / 閉じる */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm transition-all"
              style={{
                background: "oklch(1.00 0 0)",
                border: "1px solid oklch(0.72 0.12 85 / 30%)",
                color: "oklch(0.35 0.05 250)",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.72 0.12 85 / 15%)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "oklch(1.00 0 0)"; }}
            >
              {showAll ? (
                <>
                  <ChevronUp size={14} />
                  閉じる
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  すべてのリターンを見る（全{RETURNS.length}種）
                </>
              )}
            </button>
          </div>
        </div>

        {/* 企業協賛プラン */}
        <div
          className="p-6 sm:p-8 mb-10"
          style={{
            background: "oklch(1.00 0 0)",
            border: "1px solid oklch(0.72 0.12 85 / 20%)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Gift size={20} style={{ color: "oklch(0.22 0.07 250)" }} />
            <h3
              className="font-semibold"
              style={{
                color: "oklch(0.22 0.07 250)",
                fontFamily: "'Shippori Mincho', serif",
                fontSize: "1.1rem",
              }}
            >
              企業協賛プラン
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SPONSOR_PLANS.map((plan) => (
              <div
                key={plan.size}
                className="p-4"
                style={{
                  background: "oklch(1.00 0 0)",
                  border: "1px solid oklch(0.72 0.12 85 / 18%)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: "oklch(0.22 0.07 250)" }}>{plan.icon}</span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
                  >
                    協賛{plan.size}
                  </span>
                  <span
                    className="ml-auto font-bold text-sm"
                    style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
                  >
                    {plan.price}
                  </span>
                </div>
                <ul className="space-y-1">
                  {plan.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-xs"
                      style={{
                        color: "oklch(0.40 0.05 250)",
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      <span style={{ color: "oklch(0.35 0.05 250)", marginTop: "2px" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* スケジュール */}
        <div
          className="p-6 sm:p-8 mb-10"
          style={{
            background: "oklch(1.00 0 0)",
            border: "1px solid oklch(0.72 0.12 85 / 20%)",
          }}
        >
          <h3
            className="font-semibold mb-5"
            style={{
              color: "oklch(0.22 0.07 250)",
              fontFamily: "'Shippori Mincho', serif",
              fontSize: "1.1rem",
            }}
          >
            プロジェクトスケジュール
          </h3>
          <div className="relative">
            {/* タイムラインライン */}
            <div
              className="absolute left-3 top-2 bottom-2 w-px"
              style={{ background: "linear-gradient(to bottom, oklch(0.72 0.12 85 / 60%), oklch(0.72 0.12 85 / 10%))" }}
            />
            <div className="space-y-4 pl-10">
              {[
                { date: "2026年6月", label: "Makuake開始", active: true },
                { date: "2026年8月", label: "映像制作開始" },
                { date: "2026年10月", label: "機材設営" },
                { date: "2026年11月", label: "プレ内覧会" },
                { date: "2026年11月14日〜2027年1月17日", label: "本開催", highlight: true },
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  {/* ドット */}
                  <div
                    className="absolute -left-7 top-1 w-2.5 h-2.5 rounded-full"
                    style={{
                      background: item.highlight
                        ? "oklch(0.22 0.07 250)"
                        : item.active
                        ? "oklch(0.30 0.06 250)"
                        : "oklch(0.35 0.04 85)",
                      boxShadow: item.highlight ? "0 0 8px oklch(0.72 0.12 85 / 60%)" : "none",
                    }}
                  />
                  <div>
                    <span
                      className="text-xs"
                      style={{
                        color: item.highlight ? "oklch(0.22 0.07 250)" : "oklch(0.45 0.05 250)",
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {item.date}
                    </span>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: item.highlight ? "oklch(0.22 0.07 250)" : "oklch(0.38 0.05 250)",
                        fontFamily: "'Shippori Mincho', serif",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 最終CTA */}
        <div className="text-center">
          <a
            href={MAKUAKE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-base transition-all duration-300 group"
            style={{
              background: "oklch(0.22 0.07 250)",
              color: "oklch(0.97 0.005 80)",
              fontFamily: "'Noto Sans JP', sans-serif",
              boxShadow: "0 4px 20px oklch(0.72 0.12 85 / 30%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.80 0.14 85)";
              e.currentTarget.style.boxShadow = "0 6px 30px oklch(0.72 0.12 85 / 50%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(0.22 0.07 250)";
              e.currentTarget.style.boxShadow = "0 4px 20px oklch(0.72 0.12 85 / 30%)";
            }}
          >
            <Heart size={18} className="group-hover:scale-110 transition-transform" />
            Makuakeで応援購入する
            <ExternalLink size={15} />
          </a>
          <p
            className="mt-3 text-xs"
            style={{
              color: "oklch(0.45 0.05 250)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
            }}
          >
            All in型 ｜ 締切：2026年9月29日 ｜ Makuake公式ページへ移動します
          </p>
        </div>
      </div>
    </section>
  );
}
