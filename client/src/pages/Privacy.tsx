/* ============================================================
   Privacy.tsx — プライバシーポリシー (/privacy)
   デザイン: サイト全体のテーマ（ダーク・ネイビー基調）に合わせたシンプルな文書ページ
   ============================================================ */
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663442056627/Mka8s8bmHpdnByoMCjCFQS/event_logo-f5858ed4a3bDwMfqMmqY52.webp";

const LAST_UPDATED = "2026年7月30日";
const ORG_NAME = "水郷柳川光のまちづくり実行委員会";
const CONTACT_EMAIL = "info@bidow.jp";

export default function Privacy() {
  return (
    <div
      style={{
        background: "oklch(0.08 0.03 250)",
        minHeight: "100vh",
        color: "oklch(0.88 0.02 80)",
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      {/* ヘッダー */}
      <header
        style={{
          background: "oklch(0.10 0.04 250)",
          borderBottom: "1px solid oklch(0.72 0.12 85 / 15%)",
        }}
      >
        <div
          className="container flex items-center justify-between"
          style={{ height: "64px" }}
        >
          <Link href="/">
            <span className="flex items-center gap-3 cursor-pointer">
              <img src={LOGO_URL} alt="立花幻想夜" className="w-9 h-9 object-contain" />
              <span
                className="hidden sm:block text-sm font-semibold tracking-widest"
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  color: "oklch(0.88 0.06 85)",
                }}
              >
                立花幻想夜
              </span>
            </span>
          </Link>
          <Link href="/">
            <span
              className="flex items-center gap-1.5 text-sm cursor-pointer transition-opacity hover:opacity-70"
              style={{ color: "oklch(0.65 0.04 85)" }}
            >
              <ArrowLeft size={15} />
              トップへ戻る
            </span>
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container py-16">
        <div className="max-w-3xl mx-auto">
          {/* タイトル */}
          <div className="mb-12 text-center">
            <h1
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: "'Shippori Mincho', serif",
                color: "oklch(0.88 0.06 85)",
                letterSpacing: "0.1em",
              }}
            >
              プライバシーポリシー
            </h1>
            <p
              className="text-sm"
              style={{ color: "oklch(0.55 0.03 85)" }}
            >
              最終更新日：{LAST_UPDATED}
            </p>
            <div
              className="mx-auto mt-4"
              style={{
                width: "48px",
                height: "1px",
                background: "oklch(0.72 0.12 85 / 50%)",
              }}
            />
          </div>

          {/* 本文 */}
          <div
            className="space-y-10 text-sm leading-8"
            style={{ color: "oklch(0.75 0.02 80)" }}
          >
            {/* 前文 */}
            <section>
              <p>
                {ORG_NAME}（以下「当実行委員会」といいます）は、「立花幻想夜 ― 福厳寺プロジェクションマッピング ―」の公式ウェブサイト（以下「本サイト」といいます）において、お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
              </p>
            </section>

            <PolicySection title="第1条（個人情報の定義）">
              <p>
                本ポリシーにおける「個人情報」とは、個人情報の保護に関する法律（以下「個人情報保護法」といいます）に定める個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、メールアドレス、電話番号、その他の記述等により特定の個人を識別できる情報をいいます。
              </p>
            </PolicySection>

            <PolicySection title="第2条（個人情報の収集方法）">
              <p>当実行委員会は、以下の方法により個人情報を取得することがあります。</p>
              <ul className="list-disc pl-6 mt-3 space-y-1.5">
                <li>お問い合わせフォームへの入力</li>
                <li>協賛・スポンサーに関するお申し込みや資料請求</li>
                <li>メール・電話等によるお問い合わせ</li>
                <li>Makuakeクラウドファンディングを通じた支援（Makuake社の規約に基づき収集）</li>
              </ul>
            </PolicySection>

            <PolicySection title="第3条（個人情報の利用目的）">
              <p>当実行委員会は、取得した個人情報を以下の目的のために利用します。</p>
              <ul className="list-disc pl-6 mt-3 space-y-1.5">
                <li>お問い合わせへの回答・対応</li>
                <li>協賛・スポンサー契約に関する手続きおよび連絡</li>
                <li>イベントに関する情報提供・お知らせの送付</li>
                <li>本サイトおよびイベントの運営・改善</li>
                <li>法令に基づく対応</li>
              </ul>
            </PolicySection>

            <PolicySection title="第4条（個人情報の第三者提供）">
              <p>
                当実行委員会は、次の場合を除き、取得した個人情報を第三者に提供いたしません。
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1.5">
                <li>ご本人の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難な場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、ご本人の同意を得ることが困難な場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </PolicySection>

            <PolicySection title="第5条（個人情報の管理）">
              <p>
                当実行委員会は、個人情報の正確性を保ち、これを安全に管理します。個人情報への不正アクセス、紛失、破壊、改ざんおよび漏洩等を防止するため、適切な安全管理措置を講じます。また、個人情報の取り扱いを委託する場合は、委託先に対して適切な監督を行います。
              </p>
            </PolicySection>

            <PolicySection title="第6条（アクセス解析ツールの利用）">
              <p>
                本サイトでは、サービスの改善および利用状況の把握を目的として、アクセス解析ツールを利用することがあります。これらのツールはCookieを使用して情報を収集しますが、収集される情報は匿名であり、個人を特定するものではありません。Cookieの利用を希望されない場合は、ブラウザの設定によりCookieを無効にすることができます。
              </p>
            </PolicySection>

            <PolicySection title="第7条（個人情報の開示・訂正・削除）">
              <p>
                ご本人から個人情報の開示、訂正、追加、削除または利用停止を求められた場合には、ご本人であることを確認のうえ、合理的な期間内に対応いたします。ただし、個人情報保護法その他の法令により、開示等をお断りする場合があります。
              </p>
              <p className="mt-3">
                開示等のご請求は、下記お問い合わせ先までご連絡ください。
              </p>
            </PolicySection>

            <PolicySection title="第8条（プライバシーポリシーの変更）">
              <p>
                当実行委員会は、法令の改正や事業内容の変更等に伴い、本ポリシーを予告なく変更することがあります。変更後のプライバシーポリシーは、本サイトに掲載した時点から効力を生じるものとします。重要な変更がある場合は、本サイト上でお知らせします。
              </p>
            </PolicySection>

            <PolicySection title="第9条（お問い合わせ）">
              <p>本ポリシーに関するお問い合わせは、下記までご連絡ください。</p>
              <div
                className="mt-4 p-5 text-sm space-y-1.5"
                style={{
                  background: "oklch(0.12 0.04 250)",
                  border: "1px solid oklch(0.72 0.12 85 / 15%)",
                }}
              >
                <p style={{ color: "oklch(0.88 0.04 85)", fontWeight: 500 }}>
                  {ORG_NAME}
                </p>
                <p>担当：藤崎</p>
                <p>
                  メール：
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    style={{ color: "oklch(0.72 0.12 85)", textDecoration: "underline" }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p>電話：080-3908-4738</p>
              </div>
            </PolicySection>
          </div>

          {/* 戻るボタン */}
          <div className="mt-16 text-center">
            <Link href="/">
              <span
                className="inline-flex items-center gap-2 text-sm cursor-pointer px-6 py-3 transition-opacity hover:opacity-70"
                style={{
                  border: "1px solid oklch(0.72 0.12 85 / 30%)",
                  color: "oklch(0.72 0.12 85)",
                }}
              >
                <ArrowLeft size={14} />
                トップページへ戻る
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer
        className="py-8 text-center"
        style={{
          borderTop: "1px solid oklch(0.72 0.12 85 / 10%)",
        }}
      >
        <p
          className="text-xs"
          style={{ color: "oklch(0.50 0.03 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
        >
          © 2026 {ORG_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ── セクションコンポーネント ── */
function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="text-base font-semibold mb-4 pb-2"
        style={{
          fontFamily: "'Shippori Mincho', serif",
          color: "oklch(0.88 0.06 85)",
          borderBottom: "1px solid oklch(0.72 0.12 85 / 20%)",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
