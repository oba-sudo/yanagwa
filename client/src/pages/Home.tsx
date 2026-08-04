/* ============================================================
   Home — 立花幻想夜 公式プロジェクトサイト
   目的: Makuake支援・協賛獲得のための公式プロジェクトサイト
   セクション順序（推奨構成 2026-07-30）:
   1. Hero（公式性バッジ＋Makuake・協賛2CTA）
   2. Notice（開催決定のお知らせ）
   3. ProjectPurpose（プロジェクトの目的）
   4. Makuake（支援理由・使い道・リンク）
   5. Sponsor（協賛・スポンサー募集）
   6. EventInfo（開催概要）
   7. Organizer（主催者・実行体制）
   8. SNS（お知らせ・最新情報）
   9. Contact（一般・協賛・取材）
   10. Footer

   ★ 第2段階で追加予定（現在非表示）:
   - YanagawaSection（柳川まち巡り）
   - TicketSection（チケット詳細）
   - ElementaryFreeSection（小学生無料）
   - RegisterSection（来場予定登録）
   - AccessSection（アクセス）
   - FAQSection（よくある質問）
   ============================================================ */
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NoticeSection from "@/components/NoticeSection";
import ProjectPurposeSection from "@/components/ProjectPurposeSection";
import MakuakeSection from "@/components/MakuakeSection";
import SponsorSection from "@/components/SponsorSection";
import EventInfoSection from "@/components/EventInfoSection";
import OrganizerSection from "@/components/OrganizerSection";
import SNSSection from "@/components/SNSSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useGlobalScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  useGlobalScrollReveal();
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.005 80)" }}>
      <Navigation />

      {/* 1. ファーストビュー：公式性＋2CTA */}
      <HeroSection />

      {/* 2. 開催決定のお知らせ */}
      <NoticeSection />

      {/* 3. プロジェクトの目的 */}
      <ProjectPurposeSection />

      {/* 4. Makuake実施中 */}
      <MakuakeSection />

      {/* 5. 協賛・スポンサー募集 */}
      <SponsorSection />

      {/* 6. 開催概要 */}
      <EventInfoSection />

      {/* 7. 主催者・実行体制 */}
      <OrganizerSection />

      {/* 8. お知らせ・最新情報 */}
      <SNSSection />

      {/* 9. お問い合わせ */}
      <ContactSection />

      {/* 10. フッター */}
      <Footer />
    </div>
  );
}
