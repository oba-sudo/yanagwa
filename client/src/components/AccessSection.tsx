/* ============================================================
   AccessSection — アクセス・駐車場
   ============================================================ */
import { useEffect, useRef } from "react";
import { MapPin, Navigation, Car, Bus, Footprints, ExternalLink } from "lucide-react";
import { MapView } from "@/components/Map";

export default function AccessSection() {
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

  const transports = [
    {
      icon: <Footprints size={20} />,
      label: "徒歩",
      value: "約25分",
      note: "西鉄柳川駅から",
    },
    {
      icon: <Navigation size={20} />,
      label: "タクシー",
      value: "約5分",
      note: "西鉄柳川駅から",
    },
    {
      icon: <Bus size={20} />,
      label: "バス",
      value: "最寄りバス停から徒歩数分",
      note: "詳細は決まり次第掲載",
    },
    {
      icon: <Car size={20} />,
      label: "お車",
      value: "駐車場情報",
      note: "決まり次第こちらに掲載",
    },
  ];

  return (
    <section
      id="access"
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
            Access
          </p>
          <h2
            className="section-title gold-underline"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            アクセス
          </h2>
        </div>

        {/* 会場情報 */}
        <div
          className="scroll-reveal flex items-start gap-4 p-5 mb-8 max-w-2xl mx-auto"
          style={{
            background: "oklch(1.00 0 0)",
            border: "1px solid oklch(0.72 0.12 85 / 30%)",
          }}
        >
          <MapPin size={20} className="shrink-0 mt-0.5" style={{ color: "oklch(0.22 0.07 250)" }} />
          <div>
            <p
              className="font-semibold mb-1"
              style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
            >
              福厳寺
            </p>
            <p
              className="text-sm"
              style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              福岡県柳川市稲荷町32-1
            </p>
          </div>
        </div>

        {/* Googleマップ */}
        <div
          className="scroll-reveal mb-8 overflow-hidden max-w-2xl mx-auto"
          style={{ border: "1px solid oklch(0.72 0.12 85 / 20%)", borderRadius: "2px" }}
        >
          <MapView
            onMapReady={(map: google.maps.Map) => {
              // 福厳寺の座標
              const pos = { lat: 33.1628, lng: 130.3992 };
              new google.maps.Marker({
                position: pos,
                map,
                title: "福厳寺",
              });
              map.setCenter(pos);
              map.setZoom(16);
            }}
            className="w-full h-72"
          />
        </div>

        {/* 交通手段 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          {transports.map((t, i) => (
            <div
              key={i}
              className="scroll-reveal gold-card p-5 flex items-start gap-4"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div style={{ color: "oklch(0.22 0.07 250)" }}>{t.icon}</div>
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {t.label}
                </p>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.22 0.07 250)", fontFamily: "'Shippori Mincho', serif" }}
                >
                  {t.value}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.40 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
                >
                  {t.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-xs text-center mb-8 scroll-reveal"
          style={{ color: "oklch(0.45 0.05 250)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
        >
          徒歩での来場も可能ですが、夜間開催のため、タクシー・バスの利用もご検討ください。
        </p>

        {/* CTAボタン */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center scroll-reveal">
          <a
            href="https://maps.google.com/?q=福厳寺+福岡県柳川市"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-filled inline-flex items-center gap-2"
          >
            <ExternalLink size={16} />
            Googleマップを開く
          </a>
        </div>
      </div>
    </section>
  );
}
