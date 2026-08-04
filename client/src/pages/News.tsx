/* ============================================================
   News — 最新情報ページ
   WordPress REST API から記事を取得して表示
   WordPressサイトURLは WP_BASE_URL を変更するだけで切り替え可能
   ============================================================ */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Tag, ExternalLink, RefreshCw, AlertCircle, Newspaper } from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WordPressサイトのURLをここに設定してください
// 例: "https://your-wordpress-site.com"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WP_BASE_URL = "https://your-wordpress-site.com";
const WP_API = `${WP_BASE_URL}/wp-json/wp/v2`;
const PER_PAGE = 9;

// WordPress記事の型定義
interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// 日付フォーマット
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// HTMLタグを除去してプレーンテキスト化
function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 記事カードコンポーネント
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function PostCard({ post, onClick }: { post: WPPost; onClick: () => void }) {
  const featuredImg = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const categories = post._embedded?.["wp:term"]?.[0] ?? [];
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 100);

  return (
    <button
      onClick={onClick}
      className="text-left w-full group transition-all duration-300"
      style={{
        background: "oklch(0.15 0.04 255 / 70%)",
        border: "1px solid oklch(0.72 0.12 85 / 18%)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid oklch(0.72 0.12 85 / 50%)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px oklch(0.72 0.12 85 / 12%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid oklch(0.72 0.12 85 / 18%)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* サムネイル */}
      <div
        className="relative overflow-hidden"
        style={{ height: "180px", background: "oklch(0.12 0.04 255)" }}
      >
        {featuredImg ? (
          <img
            src={featuredImg}
            alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "brightness(0.85)" }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "oklch(0.14 0.05 260)" }}
          >
            <Newspaper size={40} style={{ color: "oklch(0.72 0.12 85 / 30%)" }} />
          </div>
        )}
        {/* カテゴリバッジ */}
        {categories.length > 0 && (
          <span
            className="absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold"
            style={{
              background: "oklch(0.72 0.12 85 / 90%)",
              color: "oklch(0.10 0.04 250)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: "10px",
            }}
          >
            {categories[0].name}
          </span>
        )}
      </div>

      {/* テキスト */}
      <div className="p-4">
        <div
          className="flex items-center gap-1.5 mb-2"
          style={{ color: "oklch(0.60 0.06 85)", fontFamily: "'Noto Sans JP', sans-serif", fontSize: "11px" }}
        >
          <Calendar size={11} />
          <span>{formatDate(post.date)}</span>
        </div>
        <h3
          className="font-semibold mb-2 leading-snug line-clamp-2"
          style={{
            color: "oklch(0.88 0.08 85)",
            fontFamily: "'Shippori Mincho', serif",
            fontSize: "0.95rem",
          }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {excerpt && (
          <p
            className="text-xs leading-relaxed line-clamp-3"
            style={{
              color: "oklch(0.65 0.04 85)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
            }}
          >
            {excerpt}…
          </p>
        )}
        <div
          className="flex items-center gap-1 mt-3 text-xs font-medium"
          style={{ color: "oklch(0.72 0.12 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          <span>続きを読む</span>
          <ArrowRight size={11} />
        </div>
      </div>
    </button>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 記事詳細モーダル
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function PostModal({ post, onClose }: { post: WPPost; onClose: () => void }) {
  const featuredImg = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const categories = post._embedded?.["wp:term"]?.[0] ?? [];
  const tags = post._embedded?.["wp:term"]?.[1] ?? [];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: "oklch(0.05 0.03 250 / 92%)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl"
        style={{
          background: "oklch(0.13 0.05 260)",
          border: "1px solid oklch(0.72 0.12 85 / 30%)",
          boxShadow: "0 24px 80px oklch(0 0 0 / 60%)",
        }}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 transition-all"
          style={{
            background: "oklch(0.10 0.04 250 / 80%)",
            border: "1px solid oklch(0.72 0.12 85 / 30%)",
            color: "oklch(0.80 0.06 85)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.72 0.12 85 / 20%)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "oklch(0.10 0.04 250 / 80%)"; }}
        >
          ✕
        </button>

        {/* アイキャッチ */}
        {featuredImg && (
          <div className="overflow-hidden" style={{ height: "280px" }}>
            <img
              src={featuredImg}
              alt={post.title.rendered}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.85)" }}
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* カテゴリ */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat: any) => (
                <span
                  key={cat.id}
                  className="px-2.5 py-0.5 text-xs"
                  style={{
                    background: "oklch(0.72 0.12 85 / 15%)",
                    border: "1px solid oklch(0.72 0.12 85 / 40%)",
                    color: "oklch(0.80 0.10 85)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* タイトル */}
          <h2
            className="font-bold mb-3 leading-snug"
            style={{
              color: "oklch(0.92 0.08 85)",
              fontFamily: "'Shippori Mincho', serif",
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
            }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* 日付 */}
          <div
            className="flex items-center gap-1.5 mb-6 pb-4"
            style={{
              color: "oklch(0.60 0.06 85)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: "12px",
              borderBottom: "1px solid oklch(0.72 0.12 85 / 15%)",
            }}
          >
            <Calendar size={12} />
            <span>{formatDate(post.date)}</span>
          </div>

          {/* 本文 */}
          <div
            className="wp-content text-sm leading-relaxed"
            style={{
              color: "oklch(0.78 0.04 85)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
            }}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* タグ */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-4" style={{ borderTop: "1px solid oklch(0.72 0.12 85 / 15%)" }}>
              {tags.map((tag: any) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs"
                  style={{
                    background: "oklch(0.15 0.04 255 / 70%)",
                    border: "1px solid oklch(0.72 0.12 85 / 20%)",
                    color: "oklch(0.65 0.05 85)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  <Tag size={9} />
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* WordPress元記事リンク */}
          <div className="mt-6 pt-4" style={{ borderTop: "1px solid oklch(0.72 0.12 85 / 15%)" }}>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-all"
              style={{
                background: "oklch(0.72 0.12 85 / 12%)",
                border: "1px solid oklch(0.72 0.12 85 / 35%)",
                color: "oklch(0.80 0.10 85)",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.72 0.12 85 / 22%)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "oklch(0.72 0.12 85 / 12%)"; }}
            >
              <ExternalLink size={13} />
              WordPressサイトで読む
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// メインの最新情報ページ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function News() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<WPPost | null>(null);
  const [wpConfigured, setWpConfigured] = useState(true);

  // WordPress URLが設定済みか確認
  useEffect(() => {
    if (WP_BASE_URL === "https://your-wordpress-site.com") {
      setWpConfigured(false);
      setLoading(false);
    }
  }, []);

  // カテゴリ取得
  useEffect(() => {
    if (!wpConfigured) return;
    fetch(`${WP_API}/categories?per_page=20&hide_empty=true`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, [wpConfigured]);

  // 記事取得
  useEffect(() => {
    if (!wpConfigured) return;
    setLoading(true);
    setError(null);
    const catParam = selectedCategory ? `&categories=${selectedCategory}` : "";
    fetch(
      `${WP_API}/posts?per_page=${PER_PAGE}&page=${page}&_embed=1&orderby=date&order=desc${catParam}`
    )
      .then((r) => {
        const total = r.headers.get("X-WP-TotalPages");
        if (total) setTotalPages(parseInt(total, 10));
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
        else throw new Error("Invalid response");
        setLoading(false);
      })
      .catch((e) => {
        setError("記事の取得に失敗しました。WordPressサイトの設定をご確認ください。");
        setLoading(false);
      });
  }, [page, selectedCategory, wpConfigured]);

  const handleCategoryChange = (catId: number | null) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.10 0.04 250)", paddingTop: "64px" }}
    >
      {/* ページヘッダー */}
      <div
        className="relative py-16 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, oklch(0.12 0.05 260), oklch(0.10 0.04 250))",
          borderBottom: "1px solid oklch(0.72 0.12 85 / 15%)",
        }}
      >
        {/* 装飾ライン */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.12 85 / 8%) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10">
          <Link href="/">
            <a
              className="inline-flex items-center gap-2 mb-6 text-sm transition-colors"
              style={{
                color: "oklch(0.65 0.06 85)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.80 0.10 85)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.65 0.06 85)"; }}
            >
              <ArrowLeft size={14} />
              トップページへ戻る
            </a>
          </Link>
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "oklch(0.72 0.12 85)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            Latest News
          </p>
          <h1
            className="font-bold"
            style={{
              color: "oklch(0.92 0.08 85)",
              fontFamily: "'Shippori Mincho', serif",
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
            }}
          >
            最新情報
          </h1>
          <p
            className="mt-3 text-sm"
            style={{
              color: "oklch(0.65 0.04 85)",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
            }}
          >
            立花幻想夜に関する最新のお知らせをお届けします。
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* WordPress未設定の場合の案内 */}
        {!wpConfigured && (
          <div
            className="max-w-xl mx-auto p-8 text-center"
            style={{
              background: "oklch(0.15 0.04 255 / 70%)",
              border: "1px solid oklch(0.72 0.12 85 / 25%)",
            }}
          >
            <div
              className="w-14 h-14 mx-auto mb-4 flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.12 85 / 12%)",
                border: "1px solid oklch(0.72 0.12 85 / 30%)",
                borderRadius: "50%",
              }}
            >
              <Newspaper size={28} style={{ color: "oklch(0.72 0.12 85)" }} />
            </div>
            <h2
              className="font-semibold mb-3"
              style={{
                color: "oklch(0.88 0.08 85)",
                fontFamily: "'Shippori Mincho', serif",
                fontSize: "1.2rem",
              }}
            >
              WordPress連携の設定が必要です
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{
                color: "oklch(0.68 0.04 85)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
              }}
            >
              WordPressサイトのURLが設定されていません。<br />
              <code
                className="px-2 py-0.5 text-xs"
                style={{
                  background: "oklch(0.10 0.04 250)",
                  border: "1px solid oklch(0.72 0.12 85 / 20%)",
                  color: "oklch(0.80 0.10 85)",
                  fontFamily: "monospace",
                }}
              >
                client/src/pages/News.tsx
              </code>
              の <code
                className="px-2 py-0.5 text-xs"
                style={{
                  background: "oklch(0.10 0.04 250)",
                  border: "1px solid oklch(0.72 0.12 85 / 20%)",
                  color: "oklch(0.80 0.10 85)",
                  fontFamily: "monospace",
                }}
              >
                WP_BASE_URL
              </code>
              に<br />WordPressサイトのURLを設定してください。
            </p>
            <div
              className="p-4 text-left text-xs"
              style={{
                background: "oklch(0.10 0.04 250)",
                border: "1px solid oklch(0.72 0.12 85 / 15%)",
                color: "oklch(0.72 0.10 85)",
                fontFamily: "monospace",
              }}
            >
              <span style={{ color: "oklch(0.60 0.06 85)" }}>// 変更前</span><br />
              <span style={{ color: "oklch(0.55 0.04 85)" }}>const WP_BASE_URL = "https://your-wordpress-site.com";</span><br />
              <br />
              <span style={{ color: "oklch(0.60 0.06 85)" }}>// 変更後（例）</span><br />
              <span style={{ color: "oklch(0.80 0.10 85)" }}>const WP_BASE_URL = "https://tachibana-gensoya.jp";</span>
            </div>
            <p
              className="mt-4 text-xs"
              style={{
                color: "oklch(0.55 0.04 85)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
              }}
            >
              ※ WordPressのREST APIが有効になっている必要があります。<br />
              CORS設定でこのサイトのドメインを許可してください。
            </p>
          </div>
        )}

        {/* カテゴリフィルター */}
        {wpConfigured && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => handleCategoryChange(null)}
              className="px-4 py-1.5 text-sm transition-all"
              style={{
                background: selectedCategory === null ? "oklch(0.72 0.12 85 / 18%)" : "oklch(0.15 0.04 255 / 70%)",
                border: selectedCategory === null ? "1px solid oklch(0.72 0.12 85 / 60%)" : "1px solid oklch(0.72 0.12 85 / 20%)",
                color: selectedCategory === null ? "oklch(0.88 0.10 85)" : "oklch(0.65 0.05 85)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: selectedCategory === null ? 600 : 400,
              }}
            >
              すべて
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className="px-4 py-1.5 text-sm transition-all"
                style={{
                  background: selectedCategory === cat.id ? "oklch(0.72 0.12 85 / 18%)" : "oklch(0.15 0.04 255 / 70%)",
                  border: selectedCategory === cat.id ? "1px solid oklch(0.72 0.12 85 / 60%)" : "1px solid oklch(0.72 0.12 85 / 20%)",
                  color: selectedCategory === cat.id ? "oklch(0.88 0.10 85)" : "oklch(0.65 0.05 85)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: selectedCategory === cat.id ? 600 : 400,
                }}
              >
                {cat.name}
                <span
                  className="ml-1.5 text-xs"
                  style={{ color: selectedCategory === cat.id ? "oklch(0.72 0.12 85)" : "oklch(0.50 0.04 85)" }}
                >
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ローディング */}
        {wpConfigured && loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <RefreshCw
              size={32}
              className="animate-spin"
              style={{ color: "oklch(0.72 0.12 85)" }}
            />
            <p
              className="text-sm"
              style={{ color: "oklch(0.65 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              記事を読み込んでいます...
            </p>
          </div>
        )}

        {/* エラー */}
        {wpConfigured && error && !loading && (
          <div
            className="max-w-md mx-auto p-6 text-center"
            style={{
              background: "oklch(0.15 0.04 255 / 70%)",
              border: "1px solid oklch(0.55 0.18 25 / 40%)",
            }}
          >
            <AlertCircle size={32} className="mx-auto mb-3" style={{ color: "oklch(0.65 0.18 25)" }} />
            <p
              className="text-sm"
              style={{ color: "oklch(0.75 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              {error}
            </p>
            <button
              onClick={() => { setPage(1); setLoading(true); setError(null); }}
              className="mt-4 px-4 py-2 text-sm transition-all"
              style={{
                background: "oklch(0.72 0.12 85 / 15%)",
                border: "1px solid oklch(0.72 0.12 85 / 35%)",
                color: "oklch(0.80 0.10 85)",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              再試行
            </button>
          </div>
        )}

        {/* 記事グリッド */}
        {wpConfigured && !loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "oklch(0.15 0.04 255 / 70%)",
                    border: "1px solid oklch(0.72 0.12 85 / 25%)",
                    color: "oklch(0.75 0.06 85)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  <ArrowLeft size={13} />
                  前へ
                </button>
                <span
                  className="text-sm px-4 py-2"
                  style={{
                    color: "oklch(0.65 0.04 85)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: 300,
                    background: "oklch(0.15 0.04 255 / 40%)",
                    border: "1px solid oklch(0.72 0.12 85 / 15%)",
                  }}
                >
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "oklch(0.15 0.04 255 / 70%)",
                    border: "1px solid oklch(0.72 0.12 85 / 25%)",
                    color: "oklch(0.75 0.06 85)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  次へ
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
          </>
        )}

        {/* 記事なし */}
        {wpConfigured && !loading && !error && posts.length === 0 && (
          <div className="text-center py-24">
            <Newspaper size={48} className="mx-auto mb-4" style={{ color: "oklch(0.40 0.04 85)" }} />
            <p
              className="text-sm"
              style={{ color: "oklch(0.60 0.04 85)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
            >
              現在、記事はありません。
            </p>
          </div>
        )}
      </div>

      {/* 記事詳細モーダル */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
