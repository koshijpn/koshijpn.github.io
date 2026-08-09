# koshijpn.github.io 公開・アフィリエイト監査

監査日: 2026-08-09  
役割: Web開発・技術実績のDeveloper Portfolio

## 現状

- HTML: 17ページ
- sitemap URL: 14件
- 最終Git更新: 2026-08-09
- ローカルリンク切れ: 0件
- 完全重複ページ: 0件
- Lorem ipsum / ダミー本文: 0件
- title / description: 全ページあり
- canonical: 404を除き設定済み
- OGP / Twitter Card: Homeと主要Project Detailを優先。一部補助ページは未設定
- JSON-LD: Home中心。Project DetailはBreadcrumb / SoftwareSourceCodeの拡充余地あり
- robots.txt / sitemap.xml / 404 / favicon参照: あり
- Privacy / Terms / Affiliate Disclosure: あり
- 計測: main.jsを共通入口としてCTAイベントを統一

## コンテンツ評価

- Project Detail 5件、Project一覧、Case Studies、Technical Article 1件がある
- 技術サイトの役割を守り、審査数を満たすためだけの記事量産は行わない
- 公開・Private・Commercial・Legacyの状態表示を維持する
- 検証可能な課題、担当、技術、工夫、Source / Demoを追加できる案件から拡充する

## 本番確認

- 2026-08-09に公開Homeが現在のDeveloper Portfolioであることを確認した
- 390pxと768pxのブラウザ表示で横スクロール、alt欠落、コンソールエラーはいずれも0件
- 旧動画・画像資産が約24MB残る。未使用資産は参照確認後に別途整理する
- 公開HTTP確認: Developer Portfolio、GitHub、個人サイト、事業サイト、主要デモURLは到達可能

## 公開判定

ローカル版は公開準備可能。変更のpush後にcanonical、CSP、GitHub API、主要リンクを再検証し、iPhone / iPad mini実機でも最終確認する。
