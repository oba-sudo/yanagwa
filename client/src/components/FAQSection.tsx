/* ============================================================
   FAQSection — よくある質問
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "チケットは事前購入できますか？",
    a: "WEBチケット販売は行わず、当日会場受付での販売を予定しています。",
  },
  {
    q: "当日券はどこで買えますか？",
    a: "会場受付にてお求めください。",
  },
  {
    q: "支払い方法は何がありますか？",
    a: "支払い方法は決まり次第、公式サイトでお知らせします。",
  },
  {
    q: "雨の日も開催されますか？",
    a: "小雨の場合は安全確認のうえ開催予定です。荒天時は開催内容を変更または中止する場合があります。最新情報は公式サイト・公式SNSでお知らせします。",
  },
  {
    q: "駐車場はありますか？",
    a: "駐車場情報は決まり次第、公式サイトでお知らせします。",
  },
  {
    q: "子ども連れでも行けますか？",
    a: "ご家族でお楽しみいただけます。夜間開催のため、防寒対策のうえお越しください。",
  },
  {
    q: "写真や動画の撮影はできますか？",
    a: "撮影は可能です。ただし、三脚・大型機材の使用、他の来場者の迷惑になる撮影はご遠慮ください。撮影ルールは会場案内に従ってください。",
  },
  {
    q: "小学生無料チケットは誰が使えますか？",
    a: "柳川市内の小学生が対象です。紙の無料招待チケットを持参した本人が無料で入場できます。",
  },
  {
    q: "来場予定登録をすれば入場できますか？",
    a: "来場予定登録はチケット予約・入場確約ではありません。当日は会場受付で入場料をお支払いください。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ borderBottom: "1px solid oklch(0.72 0.12 85 / 15%)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <div className="flex items-start gap-3">
          <span
            className="shrink-0 font-bold text-sm mt-0.5"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
          >
            Q
          </span>
          <span
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
          >
            {q}
          </span>
        </div>
        <ChevronDown
          size={18}
          className="shrink-0 mt-0.5 transition-transform duration-200"
          style={{
            color: "oklch(0.22 0.07 250)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <div className="pb-5 pl-6">
          <div className="flex items-start gap-3">
            <span
              className="shrink-0 font-bold text-sm"
              style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Shippori Mincho', serif" }}
            >
              A
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              {a}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
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
      id="faq"
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
            FAQ
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            よくある質問
          </h2>
        </div>

        <div
          className="scroll-reveal max-w-2xl mx-auto"
          style={{
            background: "oklch(1.00 0 0)",
            border: "1px solid oklch(0.72 0.12 85 / 20%)",
            padding: "0 1.5rem",
          }}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
