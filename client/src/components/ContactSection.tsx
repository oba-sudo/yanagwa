/* ============================================================
   ContactSection — お問い合わせ
   デザイン: ダークネイビー背景 × ゴールドアクセント
   参考: https://www.hita-hikarinomachidukuri.com/contact
   ============================================================ */
import { useState, useRef, useEffect } from "react";

const INQUIRY_TYPES = [
  "選択してください",
  "来場に関するお問い合わせ",
  "協賛・スポンサーに関するお問い合わせ",
  "取材・メディアに関するお問い合わせ",
  "その他",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("お名前をご入力ください。"); return; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("正しいメールアドレスをご入力ください。"); return;
    }
    if (!form.message.trim()) { setError("お問い合わせ内容をご入力ください。"); return; }
    // mailto fallback（バックエンドなし）
    const subject = encodeURIComponent(`【立花幻想夜】${form.type || "お問い合わせ"}`);
    const body = encodeURIComponent(
      `お名前：${form.name}\nメールアドレス：${form.email}\nお問い合わせ種別：${form.type || "未選択"}\n\n${form.message}`
    );
    window.location.href = `mailto:info@bidow.jp?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "oklch(0.14 0.04 250)" }}
    >
      <div className="container">
        {/* 見出し */}
        <div className="text-center mb-14 scroll-reveal">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.78 0.14 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Contact
          </p>
          <h2
            className="text-3xl font-bold"
            style={{
              color: "oklch(0.96 0.02 90)",
              fontFamily: "'Shippori Mincho', serif",
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            }}
          >
            お問い合わせ
          </h2>
          <div
            className="mx-auto mt-3 mb-0"
            style={{
              width: "3rem",
              height: "2px",
              background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85), transparent)",
            }}
          />
          <p
            className="mt-5 text-sm"
            style={{
              color: "oklch(0.75 0.04 250)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
            }}
          >
            イベントに関するご質問・ご要望はこちらからお送りください。
          </p>
        </div>

        <div className="max-w-xl mx-auto scroll-reveal">
          {submitted ? (
            <div
              className="text-center py-16 px-8 rounded-lg"
              style={{
                background: "oklch(0.18 0.05 250)",
                border: "1px solid oklch(0.78 0.14 85 / 30%)",
              }}
            >
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "oklch(0.78 0.14 85)", fontFamily: "'Shippori Mincho', serif" }}
              >
                ありがとうございます
              </p>
              <p
                className="text-sm"
                style={{ color: "oklch(0.75 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
              >
                メールアプリが開きます。送信後、担当者よりご連絡いたします。
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-lg p-8 space-y-6"
              style={{
                background: "oklch(0.18 0.05 250)",
                border: "1px solid oklch(0.78 0.14 85 / 20%)",
              }}
            >
              {/* お名前 */}
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "oklch(0.88 0.03 90)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  お名前 <span style={{ color: "oklch(0.78 0.14 85)" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="山田 太郎"
                  required
                  className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
                  style={{
                    background: "oklch(0.22 0.05 250)",
                    border: "1px solid oklch(0.78 0.14 85 / 30%)",
                    color: "oklch(0.92 0.02 90)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 80%)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 30%)")}
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "oklch(0.88 0.03 90)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  メールアドレス <span style={{ color: "oklch(0.78 0.14 85)" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
                  style={{
                    background: "oklch(0.22 0.05 250)",
                    border: "1px solid oklch(0.78 0.14 85 / 30%)",
                    color: "oklch(0.92 0.02 90)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 80%)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 30%)")}
                />
              </div>

              {/* お問い合わせ種別 */}
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "oklch(0.88 0.03 90)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  お問い合わせ種別
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded text-sm outline-none transition-all appearance-none cursor-pointer"
                  style={{
                    background: "oklch(0.22 0.05 250)",
                    border: "1px solid oklch(0.78 0.14 85 / 30%)",
                    color: form.type ? "oklch(0.92 0.02 90)" : "oklch(0.60 0.03 250)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 80%)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 30%)")}
                >
                  {INQUIRY_TYPES.map((t, i) => (
                    <option key={i} value={i === 0 ? "" : t} disabled={i === 0}
                      style={{ background: "oklch(0.22 0.05 250)", color: "oklch(0.92 0.02 90)" }}
                    >
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* お問い合わせ内容 */}
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "oklch(0.88 0.03 90)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  お問い合わせ内容 <span style={{ color: "oklch(0.78 0.14 85)" }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="お問い合わせ内容をご記入ください"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded text-sm outline-none transition-all resize-none"
                  style={{
                    background: "oklch(0.22 0.05 250)",
                    border: "1px solid oklch(0.78 0.14 85 / 30%)",
                    color: "oklch(0.92 0.02 90)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 80%)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.78 0.14 85 / 30%)")}
                />
              </div>

              {/* エラーメッセージ */}
              {error && (
                <p className="text-sm" style={{ color: "oklch(0.70 0.20 25)", fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {error}
                </p>
              )}

              {/* 送信ボタン */}
              <button
                type="submit"
                className="w-full py-4 rounded font-semibold text-sm tracking-widest transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, oklch(0.78 0.14 85), oklch(0.68 0.16 75))",
                  color: "oklch(0.15 0.04 250)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                }}
              >
                送信する
              </button>

              <p
                className="text-xs text-center"
                style={{ color: "oklch(0.55 0.03 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
              >
                ご入力いただいた個人情報は、お問い合わせへの回答のみに使用します。
              </p>
            </form>
          )}

          {/* 事務局連絡先 */}
          <div
            className="mt-6 px-6 py-5 rounded-lg text-center"
            style={{
              background: "oklch(0.18 0.05 250)",
              border: "1px solid oklch(0.78 0.14 85 / 15%)",
            }}
          >
            <p
              className="text-xs mb-3"
              style={{ color: "oklch(0.65 0.04 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              水郷柳川光のまちづくり実行委員会 事務局（担当：藤崎）
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="mailto:info@bidow.jp"
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "oklch(0.78 0.14 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                info@bidow.jp
              </a>
              <span className="hidden sm:inline" style={{ color: "oklch(0.40 0.03 250)" }}>|</span>
              <a
                href="tel:080-3908-4738"
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "oklch(0.78 0.14 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                080-3908-4738
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
