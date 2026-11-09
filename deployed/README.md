# 本番サイト(ビルド済みファイル)

https://yanagawa-hikarinomachidukuri.com/ に公開しているビルド済みファイルの保管用です。
さくらサーバー `/home/habitsseed/www/yanagawa/` にこの中身を上書きアップロードします。

- 2026-11-06: イベント用駐車場の案内(マップ画像・3か所140台)と、TikTokリンクを追加
  - `assets/index-*.js` と `assets/index-*.css` を直接編集(ソースは Manus で作成され、現在は参照不可)
  - 2026-11-09: 駐車場マップを差し替え(`images/parking-map-2.*`)。市役所駐車場20台を追加し、4か所・合計160台に更新
- `.htaccess` は SPA ルーティング用(隠しファイルのためアップロード時に注意)

- 2026-11-09: 古い画面が端末に残る対策として、JS/CSSを `index-v20261109.*` に改名し、`index.html` の参照と `.htaccess`(index.html のキャッシュ無効化)を更新
- 2026-11-09: 「投稿キャンペーン」区画(SOCIAL CAMPAIGN)を削除(内容確定後に再掲予定)。JS/CSSを `index-v20261109b.*` に改名
- 2026-11-09: TikTokのリンク先を正しいアカウント(@tchibana_gensouya)に修正。JS/CSSを `index-v20261109c.*` に改名
