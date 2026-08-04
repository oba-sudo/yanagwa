# 立花幻想夜 ― 福厳寺プロジェクションマッピング ― 公式サイト

**URL:** https://yanagawa-hikarinomachidukuri.com/

## 技術スタック

- **フレームワーク:** React 19 + TypeScript
- **スタイリング:** Tailwind CSS v4 + shadcn/ui
- **ビルドツール:** Vite 7
- **パッケージマネージャー:** pnpm

## ディレクトリ構成

```
client/
  public/images/   ← 画像・PDF等の静的ファイル
  src/
    components/    ← セクション別コンポーネント
    pages/         ← ページコンポーネント（Home, Sponsor等）
    hooks/         ← カスタムフック
    lib/           ← ユーティリティ
    App.tsx        ← ルーティング
    index.css      ← グローバルスタイル・デザイントークン
```

## ローカル開発

```bash
pnpm install
pnpm dev
```

ブラウザで http://localhost:3000 を開く。

## ビルド（本番用）

```bash
pnpm build
```

ビルド成果物は `dist/public/` に出力される。

## さくらサーバーへのデプロイ手順

1. `pnpm build` を実行
2. `dist/public/` 内の以下をさくらサーバーの公開ディレクトリ `/home/habitsseed/www/yanagawa/` にアップロード：
   - `index.html`
   - `assets/`（フォルダごと）
   - `images/`（フォルダごと）
   - `.htaccess`（隠しファイル・必須）
3. `.htaccess` はFTPソフトで「隠しファイルを表示」してアップロード

## 注意事項

- `index.html` 内のJS/CSSファイル名はビルドのたびに変わるため、必ず最新のビルド成果物を使用すること
- ヒーロー画像（`hero_cropped.png`）はManusのストレージに保存済み（`/manus-storage/hero_cropped_c97c3e06.png`）
