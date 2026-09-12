/* ============================================================
   EventHome — 「宵桜の金箔絵巻」集客トップページ
   デザイン: 公式ポスターを唯一の基準に、夜帳の藍・箔押し金・紅桜で
   福厳寺の本番イベント情報と来場導線を最優先に伝える。
   ============================================================ */
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Ticket,
  X,
} from "lucide-react";
import ContactSection from "@/components/ContactSection";
import "./EventHome.css";

const HERO_IMAGE = "/images/tachibana-hero-landscape.webp";
const INSTAGRAM_URL = "https://www.instagram.com/yanagawa_fukugonji/";
const MAP_URL = "https://maps.app.goo.gl/KtPYwkwBfzTp6C7C8";
const TOURISM_MAP_URL = "https://sandbox2.kajitori.me/tourism-map";
const MAKUAKE_URL = "https://www.makuake.com/project/yanagawa-fukugonji/";

const NAV_ITEMS = [
  { label: "イベント概要", href: "#concept" },
  { label: "開催情報", href: "#info" },
  { label: "周遊案内", href: "#tour" },
  { label: "アクセス", href: "#access" },
  { label: "主催・後援", href: "#organizer" },
  { label: "お問い合わせ", href: "#contact" },
];

const EVENT_THEMES = [
  "水郷柳川",
  "柳川の四季",
  "立花家の歴史",
  "立花宗茂公",
  "福厳寺の祈り",
  "未来へつながる柳川",
];

const TOUR_ITEMS = [
  {
    image: "/images/spot_kawakudari.jpg",
    title: "水郷を舟でめぐる",
    body: "水面に映る町並みをゆったりと眺める、柳川ならではの川下り。光の体験へ向かう前のひとときに。",
    className: "tour-card--river",
  },
  {
    image: "/images/spot_motoyoshiya.jpg",
    title: "歴史と食に触れる",
    body: "受け継がれてきた食文化と、城下町に息づくもてなしを味わいながら、柳川の時間を楽しむ。",
    className: "tour-card--food",
  },
  {
    image: "/images/spot_ohana.webp",
    title: "まちの記憶をたどる",
    body: "歴史と文化が息づく町並みを歩き、夜の福厳寺で光の物語と出会う。",
    className: "tour-card--town",
  },
];

function scrollTo(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GoldRule() {
  return <div className="poster-rule" aria-hidden="true"><span /></div>;
}

export default function EventHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (hash: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollTo(hash), 30);
  };

  return (
    <div className="event-shell">
      <header className={`event-nav ${scrolled ? "event-nav--scrolled" : ""}`}>
        <div className="event-nav__inner">
          <button className="event-nav__brand" onClick={() => scrollTo("#top")} aria-label="トップへ戻る">
            <span className="event-nav__crest" aria-hidden="true"><i /><i /><i /><b>立</b></span>
            <span>
              <b>立花幻想夜</b>
              <small>福厳寺プロジェクションマッピング</small>
            </span>
          </button>

          <nav className="event-nav__links" aria-label="メインナビゲーション">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => navigate(item.href)}>{item.label}</button>
            ))}
          </nav>

          <button
            className="event-nav__menu"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="event-nav__drawer" aria-label="モバイルナビゲーション">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => navigate(item.href)}>{item.label}</button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="top" className="event-hero" aria-labelledby="event-title">
          <img className="event-hero__image" src={HERO_IMAGE} alt="福厳寺を彩るプロジェクションマッピング" />
          <div className="event-hero__veil" aria-hidden="true" />
          <span className="event-hero__petal event-hero__petal--one" aria-hidden="true" />
          <span className="event-hero__petal event-hero__petal--two" aria-hidden="true" />
          <div className="event-hero__inner">
            <div className="event-hero__copy">
              <p className="event-kicker">― 水郷柳川で、歴史と光が出会う。―</p>
              <h1 id="event-title"><span>立花幻想夜</span><em>福厳寺</em></h1>
              <p className="event-hero__subtitle">プロジェクションマッピング</p>
              <GoldRule />
              <p className="event-hero__poem">光が紡ぐ、祈りの物語。</p>
            </div>

            <div className="event-hero__facts">
              <div className="event-hero__badge"><strong>65</strong><span>日間<br />開催</span></div>
              <div className="event-hero__date">
                <span>2026.11.14 <b>土</b></span>
                <i>—</i>
                <span>2027.1.17 <b>日</b></span>
              </div>
              <p>17:00〜21:30 <small>（最終入場 21:00）</small></p>
              <p>福厳寺 <small>（福岡県柳川市奥州町32-1）</small></p>
            </div>

            <div className="event-hero__actions">
              <button className="poster-button poster-button--gold" onClick={() => scrollTo("#info")}>開催概要を見る <ChevronDown size={17} /></button>
              <button className="poster-button poster-button--outline" onClick={() => scrollTo("#access")}>アクセス・周遊をみる <MapPin size={17} /></button>
            </div>
          </div>
          <button className="event-hero__scroll" onClick={() => scrollTo("#concept")} aria-label="イベント概要へスクロール"><span>SCROLL</span><ChevronDown size={18} /></button>
        </section>

        <section id="concept" className="poster-section concept-section">
          <div className="poster-section__container concept-section__grid">
            <div className="concept-section__short-strip">千年の祈りが、<br />光でよみがえる。</div>
            <div className="concept-section__body">
              <p className="section-eyebrow">CONCEPT</p>
              <h2>水郷柳川で、<br />歴史と光が出会う。</h2>
              <GoldRule />
              <p className="concept-section__lead">水が語り、光が描く柳川の夜。</p>
              <p>旧柳川藩主・立花家ゆかりの福厳寺を舞台に、歴史、水郷、祈りを光の演出で紡ぐ夜の体験です。冬の柳川をめぐった先に、いつもの寺院とは異なる幻想的な表情が立ち上がります。</p>
              <div className="theme-ribbon" aria-label="演出テーマ">
                {EVENT_THEMES.map((theme, index) => <span key={theme}><b>{String(index + 1).padStart(2, "0")}</b>{theme}</span>)}
              </div>
            </div>
            <div className="concept-section__moon" aria-hidden="true"><span>光</span></div>
          </div>
        </section>

        <section id="info" className="poster-section event-info-section">
          <div className="poster-section__container">
            <span className="section-tanzaku section-tanzaku--info">暦をめくる、<br />柳川の冬。</span>
            <div className="section-heading section-heading--center">
              <p className="section-eyebrow">EVENT INFORMATION</p>
              <h2>開催概要</h2>
              <GoldRule />
            </div>

            <div className="event-period"><span>2026</span><strong>11.14 <b>土</b></strong><i>▶</i><strong>1.17 <b>日</b></strong><span>2027</span></div>
            <p className="event-period__caption">2026年11月14日（土）〜 2027年1月17日（日）</p>

            <div className="event-info-section__grid">
              <article className="information-plate"><CalendarDays aria-hidden="true" /><div><span>開催期間</span><strong>2026年11月14日（土）〜<br />2027年1月17日（日）</strong></div></article>
              <article className="information-plate"><Clock3 aria-hidden="true" /><div><span>開催時間</span><strong>17:00〜21:30 <small>（最終入場 21:00）</small></strong></div></article>
              <article className="information-plate"><MapPin aria-hidden="true" /><div><span>会場</span><strong>福厳寺 <small>福岡県柳川市奥州町32-1</small></strong></div></article>
              <article className="information-plate"><Ticket aria-hidden="true" /><div><span>入場方法</span><strong>当日、会場受付にてお支払い</strong></div></article>
            </div>

            <div className="admission-board">
              <div className="admission-board__title">入 場 料</div>
              <div className="admission-board__prices">
                <p><span>大人 <small>（中学生以上）</small></span><b>1,500<em>円</em></b></p>
                <p><span>こども <small>（小学生以下）</small></span><b>500<em>円</em></b></p>
                <p><span>未就学児</span><b>無料</b></p>
              </div>
              <p className="admission-board__note">お支払いは現金のみです</p>
            </div>

            <div className="event-info-section__business">
              <p>事業者・店舗のみなさまへ</p>
              <a href="/sponsor">協賛のご案内 <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section id="tour" className="poster-section tour-section">
          <div className="poster-section__container">
            <span className="section-index">03<br /><small>TOUR</small></span>
            <div className="tour-section__header">
              <div>
                <p className="section-eyebrow">AROUND YANAGAWA</p>
                <h2>柳川の美しいまち並みとともに楽しむ、<br />光の芸術。</h2>
              </div>
              <p>水辺、食、城下町。福厳寺での夜の体験へ向かう前後にも、柳川の魅力をゆっくりお楽しみください。</p>
            </div>
            <div className="tour-grid">
              {TOUR_ITEMS.map((item, index) => (
                <article className={`tour-card ${item.className}`} key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <div className="tour-card__frame" />
                  <div className="tour-card__copy"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></div>
                </article>
              ))}
            </div>
            <div className="tour-section__action">
              <a href={TOURISM_MAP_URL} target="_blank" rel="noopener noreferrer" className="poster-button poster-button--gold">柳川の観光・周遊情報を見る <ExternalLink size={17} /></a>
              <p>外部サイト「水郷柳川ゆるり旅・観光マップ」へ移動します。</p>
            </div>
          </div>
        </section>

        <section id="access" className="poster-section access-section">
          <div className="poster-section__container access-section__grid">
            <span className="section-tanzaku section-tanzaku--access">光のもとへ、<br />たどり着く。</span>
            <div className="access-section__visual" aria-hidden="true"><div className="access-section__ring"><MapPin size={42} /><span>福厳寺</span></div><p>YANAGAWA<br />FUKUGONJI</p></div>
            <div className="access-section__body">
              <p className="section-eyebrow">ACCESS</p>
              <h2>福厳寺へのアクセス</h2>
              <GoldRule />
              <dl>
                <div><dt>会場</dt><dd>福厳寺</dd></div>
                <div><dt>住所</dt><dd>〒832-0046<br />福岡県柳川市奥州町32-1</dd></div>
                <div><dt>開催時間</dt><dd>17:00〜21:30<br /><small>最終入場 21:00</small></dd></div>
              </dl>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="poster-button poster-button--outline">Google Mapsで会場を開く <ExternalLink size={17} /></a>
              <p className="access-section__note">会場までの経路・所要時間は、Google Mapsでご確認いただけます。</p>
            </div>
          </div>
        </section>

        <section id="organizer" className="poster-section organizer-section">
          <div className="poster-section__container">
            <span className="section-index section-index--organizer">05<br /><small>CREDIT</small></span>
            <div className="section-heading section-heading--center"><p className="section-eyebrow">ORGANIZER & SUPPORT</p><h2>主催・後援</h2><GoldRule /></div>
            <div className="credit-board">
              <div><span>主催</span><strong>水郷柳川光のまちづくり実行委員会</strong></div>
              <div><span>後援</span><strong>「立花宗茂と誾千代」NHK大河ドラマ招致委員会<br />柳川市教育委員会</strong></div>
            </div>
            <div className="organizer-section__contactline">
              <a href="tel:080-3908-4738"><Phone size={18} />080-3908-4738</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram size={18} />@yanagawa_fukugonji</a>
            </div>
          </div>
        </section>

        <section className="poster-section follow-section">
          <div className="poster-section__container follow-section__inner">
            <span className="follow-section__stamp">最新情報は<br />公式HP・SNSを<br />チェック！</span>
            <div><p className="section-eyebrow">OFFICIAL INSTAGRAM</p><h2>開催情報を、<br />いち早くお届けします。</h2><p>イベントに関する最新のお知らせは公式Instagramでも発信します。</p></div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="poster-button poster-button--gold"><Instagram size={18} />公式Instagramを見る</a>
          </div>
        </section>

        <div className="event-contact-wrap">
          <span className="section-tanzaku section-tanzaku--contact">幻想の夜を、<br />あなたに。</span>
          <ContactSection />
        </div>
      </main>

      <footer className="event-footer">
        <div className="event-footer__container">
          <div className="event-footer__identity"><span className="event-footer__crest" aria-hidden="true"><i /><i /><i /><b>立</b></span><div><p className="event-footer__title">立花幻想夜</p><p>福厳寺プロジェクションマッピング</p></div></div>
          <div className="event-footer__links"><a href="/sponsor">協賛のご案内</a><a href={MAKUAKE_URL} target="_blank" rel="noopener noreferrer">Makuakeで応援する</a><a href="/privacy">プライバシーポリシー</a></div>
          <p className="event-footer__copyright">© 水郷柳川光のまちづくり実行委員会</p>
        </div>
      </footer>
    </div>
  );
}
