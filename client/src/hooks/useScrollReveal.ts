/* ============================================================
   useScrollReveal — スクロール時のフェードインアニメーション
   Intersection Observer APIを使用してスクロール位置を検知し、
   .scroll-reveal / .scroll-reveal-left / .scroll-reveal-right クラスの
   要素に .revealed クラスを付与する
   ============================================================ */
import { useEffect, useRef } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px" } = options;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // 一度表示したら監視を解除（再アニメーション不要）
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    // セクション内のすべての .scroll-reveal 要素を監視
    const targets = el.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
    );
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return sectionRef;
}

/**
 * ページ全体のスクロールリビールを一括設定するフック
 * Home.tsx などのトップレベルで呼び出す
 */
export function useGlobalScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10, rootMargin: "0px 0px -50px 0px" }
    );

    const targets = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
    );
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);
}
