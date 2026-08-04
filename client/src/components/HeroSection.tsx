/* ============================================================
   HeroSection — 立花幻想夜
   フルスクリーンヒーロー + プロジェクションマッピング光演出
   アニメーション:
     1. 背景画像 — ケン・バーンズ効果（ゆっくりズーム＋パン）
     2. 色彩オーバーレイ — 青紫〜金色の揺らぎ
     3. 光の波紋（リップル） — 中央から広がる金色の輪
     4. 光の筋（光芒） — 斜めに流れる光のビーム
     5. 浮遊する光の粒子 — 上昇する金色の点
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

// イベント開始日（2026年11月14日 17:00）
const EVENT_DATE = new Date("2026-11-14T17:00:00+09:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
}

function calcTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    started: false,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const HERO_BG = "/manus-storage/hero_cropped_c97c3e06.png";

interface Particle {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "gold" | "blue" | "white";
}

function generateParticles(count: number): Particle[] {
  const types: Particle["type"][] = ["gold", "blue", "white"];
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1.5,
    delay: Math.random() * 8,
    duration: Math.random() * 5 + 5,
    type: types[Math.floor(Math.random() * 3)],
  }));
}

const particles = generateParticles(70);

// 光の筋（光芒）の定義
const lightBeams = [
  { left: "10%", delay: "0s",   duration: "7s",  angle: "35deg", opacity: 0.12 },
  { left: "25%", delay: "1.5s", duration: "9s",  angle: "25deg", opacity: 0.10 },
  { left: "42%", delay: "3.5s", duration: "8s",  angle: "40deg", opacity: 0.14 },
  { left: "58%", delay: "5.5s", duration: "10s", angle: "30deg", opacity: 0.10 },
  { left: "72%", delay: "1.0s", duration: "8.5s",angle: "20deg", opacity: 0.12 },
  { left: "85%", delay: "3.0s", duration: "7.5s",angle: "45deg", opacity: 0.09 },
  { left: "93%", delay: "6.0s", duration: "9.5s",angle: "15deg", opacity: 0.08 },
];

// 光の波紋の定義
const ripples = [
  { delay: "0s",   duration: "4.5s" },
  { delay: "1.5s", duration: "4.5s" },
  { delay: "3.0s", duration: "4.5s" },
  { delay: "4.5s", duration: "4.5s" },
];

// 各ユニットのフラッシュ状態
interface FlashState {
  days: boolean;
  hours: boolean;
  minutes: boolean;
  seconds: boolean;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);
  const [flash, setFlash] = useState<FlashState>({ days: false, hours: false, minutes: false, seconds: false });
  const prevRef = useRef<TimeLeft>(calcTimeLeft());

  const triggerFlash = useCallback((key: keyof FlashState) => {
    setFlash(f => ({ ...f, [key]: true }));
    setTimeout(() => setFlash(f => ({ ...f, [key]: false })), 650);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const next = calcTimeLeft();
      const prev = prevRef.current;
      if (next.seconds !== prev.seconds) triggerFlash("seconds");
      if (next.minutes !== prev.minutes) triggerFlash("minutes");
      if (next.hours !== prev.hours) triggerFlash("hours");
      if (next.days !== prev.days) triggerFlash("days");
      prevRef.current = next;
      setTimeLeft(next);
    }, 1000);
    return () => clearInterval(id);
  }, [triggerFlash]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    const timer = setTimeout(() => {
      el.style.transition = "opacity 1.5s ease-out";
      el.style.opacity = "1";
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: "80px", paddingBottom: "100px" }}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. 背景画像 — ケン・バーンズ効果（ゆっくりズーム＋パン）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-kenburns"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. 色彩オーバーレイ — 青紫〜金の揺らぎ
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 hero-color-shift" />

      {/* ベースグラデーション（上部・下部フェード） */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.05 0.04 250 / 75%) 0%, oklch(0.08 0.04 250 / 45%) 25%, oklch(0.10 0.04 250 / 15%) 50%, oklch(0.10 0.04 250 / 55%) 80%, oklch(0.08 0.04 250 / 90%) 100%)",
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. 光の波紋（リップル）— 中央から広がる金色の輪
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {ripples.map((r, i) => (
          <div
            key={i}
            className="absolute hero-ripple"
            style={{
              animationDelay: r.delay,
              animationDuration: r.duration,
            }}
          />
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. 光の筋（光芒）— 斜めに流れる光のビーム
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {lightBeams.map((beam, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 hero-light-beam"
          style={{
            left: beam.left,
            animationDelay: beam.delay,
            animationDuration: beam.duration,
            opacity: beam.opacity,
            transform: `rotate(${beam.angle})`,
          }}
        />
      ))}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. 浮遊する光の粒子
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background:
              p.type === "gold"
                ? "oklch(0.85 0.12 85 / 80%)"
                : p.type === "blue"
                ? "oklch(0.70 0.12 280 / 70%)"
                : "oklch(0.95 0.02 85 / 60%)",
            boxShadow:
              p.type === "gold"
                ? `0 0 ${p.size * 3}px oklch(0.72 0.12 85 / 60%)`
                : p.type === "blue"
                ? `0 0 ${p.size * 3}px oklch(0.60 0.15 280 / 50%)`
                : `0 0 ${p.size * 2}px oklch(0.90 0.02 85 / 40%)`,
          }}
        />
      ))}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          コンテンツ
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* 開催期間 */}
        <p
          className="text-xs tracking-[0.3em] mb-4 uppercase"
          style={{
            color: "oklch(0.72 0.12 85)",
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 300,
            animation: "fadeInUp 0.8s ease-out 0.3s both",
            textShadow: "0 0 20px oklch(0.72 0.12 85 / 60%)",
          }}
        >
          2026.11.14 — 2027.1.17
        </p>

        {/* メインタイトル */}
        <h1
          className="mb-2 leading-tight"
          style={{
            fontFamily: "'Shippori Mincho', serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
            color: "oklch(0.90 0.10 85)",
            textShadow:
              "0 0 40px oklch(0.72 0.12 85 / 50%), 0 0 80px oklch(0.72 0.12 85 / 25%), 0 2px 4px oklch(0.05 0.02 250 / 80%)",
            animation: "fadeInUp 0.8s ease-out 0.5s both",
          }}
        >
          立花幻想夜
        </h1>

        {/* サブタイトル */}
        <p
          className="mb-2 tracking-widest"
          style={{
            fontFamily: "'Shippori Mincho', serif",
            fontWeight: 500,
            fontSize: "clamp(0.9rem, 3vw, 1.3rem)",
            color: "oklch(0.82 0.08 85)",
            textShadow: "0 0 20px oklch(0.72 0.12 85 / 40%)",
            animation: "fadeInUp 0.8s ease-out 0.7s both",
          }}
        >
          ― 福厳寺プロジェクションマッピング ―
        </p>

        {/* キャッチコピー */}
        <div
          className="gold-separator my-5"
          style={{ animation: "fadeInUp 0.8s ease-out 0.8s both" }}
        />
        <p
          className="mb-8 leading-relaxed"
          style={{
            fontFamily: "'Shippori Mincho', serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
            color: "oklch(0.92 0.04 85)",
            textShadow: "0 0 30px oklch(0.72 0.12 85 / 30%)",
            animation: "fadeInUp 0.8s ease-out 0.9s both",
          }}
        >
          水が語り、光が描く柳川の夜。
        </p>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            カウントダウンタイマー
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          className="mb-8"
          style={{ animation: "fadeInUp 0.8s ease-out 0.95s both" }}
        >
          {timeLeft.started ? (
            /* 開催中 */
            <div
              className="inline-flex items-center gap-3 px-6 py-3"
              style={{
                background: "oklch(0.20 0.08 85 / 25%)",
                border: "1px solid oklch(0.72 0.12 85 / 50%)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 30px oklch(0.72 0.12 85 / 20%)",
              }}
            >
              <span
                className="text-sm tracking-widest"
                style={{
                  color: "oklch(0.85 0.12 85)",
                  fontFamily: "'Shippori Mincho', serif",
                  textShadow: "0 0 15px oklch(0.72 0.12 85 / 60%)",
                }}
              >
                ✨ 只今 開催中
              </span>
            </div>
          ) : (
            /* カウントダウン */
            <div>
              <p
                className="text-xs tracking-[0.25em] mb-3"
                style={{
                  color: "oklch(0.65 0.08 85)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 300,
                }}
              >
                開幕まで
              </p>
              <div className="flex items-end justify-center gap-2 sm:gap-3">
                {([
                  { value: timeLeft.days, label: "日", flashKey: "days" as keyof FlashState },
                  { value: timeLeft.hours, label: "時間", flashKey: "hours" as keyof FlashState },
                  { value: timeLeft.minutes, label: "分", flashKey: "minutes" as keyof FlashState },
                  { value: timeLeft.seconds, label: "秒", flashKey: "seconds" as keyof FlashState },
                ]).map((unit, i) => {
                  const isFlashing = flash[unit.flashKey];
                  return (
                    <div key={i} className="flex items-end gap-1 sm:gap-2">
                    <div className="flex flex-col items-center">
                      <div
                        className={`relative flex items-center justify-center${isFlashing ? " countdown-digit-flash" : ""}`}
                        style={{
                          width: "clamp(52px, 12vw, 72px)",
                          height: "clamp(52px, 12vw, 72px)",
                          background: "oklch(0.10 0.05 255 / 80%)",
                          border: "1px solid oklch(0.72 0.12 85 / 40%)",
                          backdropFilter: "blur(12px)",
                          boxShadow: "0 0 20px oklch(0.72 0.12 85 / 15%), inset 0 1px 0 oklch(0.72 0.12 85 / 20%)",
                        }}
                      >
                        {/* 内側グロー */}
                        <div
                          className="inner-glow absolute inset-0"
                          style={{
                            background: "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.12 85 / 8%) 0%, transparent 70%)",
                          }}
                        />
                        {/* バースト用外側リング */}
                        {isFlashing && (
                          <div
                            className="absolute -inset-2 pointer-events-none"
                            style={{
                              borderRadius: "2px",
                              background: "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.12 85 / 25%) 0%, transparent 70%)",
                              animation: "innerGlowBurst 0.6s cubic-bezier(0.23,1,0.32,1) forwards",
                            }}
                          />
                        )}
                        <span
                          key={`${unit.flashKey}-${unit.value}`}
                          className="digit-text"
                          style={{
                            fontFamily: "'Shippori Mincho', serif",
                            fontWeight: 700,
                            fontSize: "clamp(1.4rem, 4vw, 2rem)",
                            color: "oklch(0.92 0.10 85)",
                            textShadow: "0 0 20px oklch(0.72 0.12 85 / 70%)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1,
                            fontVariantNumeric: "tabular-nums",
                            animation: isFlashing
                              ? "digitFlipIn 0.5s cubic-bezier(0.23,1,0.32,1) forwards"
                              : undefined,
                          }}
                        >
                          {unit.label === "日" ? timeLeft.days : pad(unit.value)}
                        </span>
                      </div>
                      <span
                        className="mt-1.5 text-xs"
                        style={{
                          color: "oklch(0.62 0.06 85)",
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: 300,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {unit.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <span
                        className="mb-5 text-lg"
                        style={{
                          color: "oklch(0.72 0.12 85 / 60%)",
                          fontFamily: "'Shippori Mincho', serif",
                          textShadow: "0 0 10px oklch(0.72 0.12 85 / 40%)",
                          animation: "pulse 1s ease-in-out infinite",
                        }}
                      >
                        :
                      </span>
                    )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 公式性バッジ（主催・後援） */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-6"
          style={{ animation: "fadeInUp 0.8s ease-out 1.0s both" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 text-xs"
            style={{
              background: "oklch(0.12 0.04 255 / 80%)",
              border: "1px solid oklch(0.72 0.12 85 / 40%)",
              backdropFilter: "blur(12px)",
              color: "oklch(0.85 0.08 85)",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            <span style={{ color: "oklch(0.65 0.08 85)" }}>主催</span>
            <span>水郷柳川光のまちづくり実行委員会</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 text-xs"
            style={{
              background: "oklch(0.12 0.04 255 / 80%)",
              border: "1px solid oklch(0.72 0.12 85 / 40%)",
              backdropFilter: "blur(12px)",
              color: "oklch(0.85 0.08 85)",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            <span style={{ color: "oklch(0.65 0.08 85)" }}>後援</span>
            <span>NHK大河ドラマ招致委員会・柳川市教育委員会</span>
          </div>
        </div>

        {/* 開催情報バッジ */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-8"
          style={{ animation: "fadeInUp 0.8s ease-out 1.05s both" }}
        >
          {[
            { label: "会場", value: "福厳寺（福岡県柳川市奥州町32-1）" },
            { label: "開催時間", value: "17:00〜21:30" },
            { label: "入場料", value: "大人1,500円" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 text-sm"
              style={{
                background: "oklch(0.12 0.04 255 / 75%)",
                border: "1px solid oklch(0.72 0.12 85 / 35%)",
                backdropFilter: "blur(12px)",
                color: "oklch(0.88 0.08 85)",
                fontFamily: "'Noto Sans JP', sans-serif",
                boxShadow: "0 0 12px oklch(0.72 0.12 85 / 10%)",
              }}
            >
              <span style={{ color: "oklch(0.65 0.08 85)", fontSize: "0.75rem" }}>
                {item.label}
              </span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        {/* 2大CTA：Makuake応援 ＋ 協賛・スポンサー */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: "fadeInUp 0.8s ease-out 1.1s both" }}
        >
          {/* Makuake応援ボタン（メイン） */}
          <a
            href="https://www.makuake.com/project/yanagawa-fukugonji/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.12 85), oklch(0.62 0.14 75))",
              color: "oklch(0.12 0.04 250)",
              fontFamily: "'Noto Sans JP', sans-serif",
              boxShadow: "0 4px 24px oklch(0.72 0.12 85 / 40%), 0 0 40px oklch(0.72 0.12 85 / 20%)",
            }}
          >
            <span>Makuakeでプロジェクトを応援する</span>
          </a>

          {/* 協賛・スポンサーボタン（サブ） */}
          <a
            href="/sponsor"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.10 0.04 255 / 70%)",
              color: "oklch(0.88 0.08 85)",
              border: "1.5px solid oklch(0.72 0.12 85 / 60%)",
              backdropFilter: "blur(12px)",
              fontFamily: "'Noto Sans JP', sans-serif",
              boxShadow: "0 0 20px oklch(0.72 0.12 85 / 15%)",
            }}
          >
            <span>協賛・スポンサーについて</span>
          </a>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <button
        onClick={() => scrollToSection("#notice")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity z-20"
        style={{ color: "oklch(0.72 0.12 85)" }}
      >
        <span
          className="text-xs tracking-widest"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          SCROLL
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
