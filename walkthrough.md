# Developer Portfolio Refresh — Walkthrough

## 1. 現状の問題点

- Heroで氏名とWeb Developerという職種がすぐに判別しにくかった。
- LinkedInの旧URLがContact、Footer、JSON-LDに残っていた。
- 2026年の学歴が「履修中」「入学予定」という古い状態だった。
- GTM、gtag、Clarity、AdSense、Cloudflare Analyticsが同時に埋め込まれ、計測の二重化とCSP違反が起こり得た。
- Skillsが能力領域ではなく個別カード中心で、採用担当者が全体像を把握しにくかった。
- READMEがなく、リポジトリの目的、構造、公開方法が説明されていなかった。

## 2. 変更した構成

トップページは `Hero → Projects → About → Skills → Experience → GitHub → Contact` を維持しつつ、Hero、Skills、Contactの判断材料を強化した。個人プロフィールはkoshijpn.com、商用サービスはSLEEP LATE LAB、詳細学歴・資格はprofile.htmlへ分離した。

## 3. Featured Projects

商用WordPress案件、Developer Portfolio、Vouvray Huguet、Next Jobsを手動選定している。自動GitHub一覧とは分離し、APIの成否でFeatured Projectsが変化しない。BorderLensは公開リポジトリとして確認できなかったため掲載していない。

## 4. Skills整理

Front-end、CMS / Web、Development、AI-assisted Development、Growthの5領域に分類した。ReactやTailwind CSSはスキルとして示す一方、公開リポジトリで確認できるSvelte等は補助技術として扱い、公開実績と能力表記を混同しない。

## 5. Experience更新

- SLEEP LATE LAB: Founder / Web Developer（2021–）
- 大手前大学: 2024年9月 学士（学術）取得
- 北海道情報大学: 卒業要件に関する最終結果待ち
- 文藻外語大学: 国際企業管理系修士課程に合格、2026年9月入学予定
- 文藻華語中心: 2025年9月〜2026年8月

更新頻度の高い詳細は `js/career.js` に一元管理した。

## 6. LinkedIn / GitHub導線

LinkedInを `https://www.linkedin.com/in/koshi-sugawara` に統一し、HeroとContactへ明示した。GitHubはHero、Projects、GitHub Dashboard、Contactから到達できる。

## 7. 多言語対応

日本語と英語のHero、About、2026年経歴、SEO文言を更新した。繁體中文も同じ情報へ同期した。その他既存言語は削除せず、経歴の時点情報を更新した。

## 8. SEO変更

title、description、OG、Twitter Card、Person / ProfilePage / WebSite / SoftwareSourceCode / BreadcrumbListを見直した。PersonのsameAsと職種・専門領域も更新した。

## 9. Analytics変更

全ページが読み込むmain.jsを共通計測エントリーポイントとした。GTMはイベント基盤、GA4とClarityは公開GTMコンテナに未登録であることを確認したため、それぞれガード付きで1回だけ初期化する。AdSenseとCloudflare Analyticsは除外し、主要CTAには安定したイベント名を付けた。

## 10. CSP / Security修正

GitHub API、Google Fonts、GTM、GA4通信先のみを許可した。`default-src *`、`unsafe-eval`は使用していない。公開トークンや秘密鍵を必要としない構成を維持した。

## 11. Performance

トップページの主要画像は縮小版を使用し、About画像はlazy loadingを維持した。GitHub API失敗時は静的フォールバックを表示する。未使用の大型アーカイブ画像・動画は互換性維持のため今回削除していない。

## 12. 未対応事項

- 公開されていないプロジェクトの動作確認やREADME改善は各リポジトリ側の作業が必要。
- GA4またはClarityを将来GTMへ移行する場合は、main.jsの直接ローダーを先に削除する必要がある。
- CSPはHTML metaで配信しており、`frame-ancestors`やHSTSはGitHub Pages側のHTTPヘッダー制御範囲外。
- 実機iPhone / iPadでの最終確認は公開後にも行う。

## 13. 次に改善すべき項目

1. Next Jobs / Next Ecomm各リポジトリのREADMEとデモURLを整備する。
2. 公開プロジェクトのスクリーンショットを継続的にWebP化する。
3. ケーススタディに検証可能な成果指標を追加する。
4. GTM PreviewとブラウザConsoleで本番CSP・イベント送信を確認する。

## 14. アフィリエイト審査基盤（2026-08-09）

- Terms / DisclaimerとAffiliate Disclosureを追加し、Privacy、sitemap、全ページ共通フッター導線を更新。
- Amazon、楽天、A8.net、もしもの設定と、外部リンク・開示・商品カードの再利用部品を追加。
- 審査中のため全プロバイダーは無効で、商品リンクや自動広告は生成しない。
- 技術サイトの役割を守り、今後も実際に使用した開発環境・書籍・機材など、技術コンテンツと直接関係する場合に限定する。
- `AUDIT.md`にページ数、SEO、コンテンツ数、旧公開版との差分と公開前確認を記録。
- 再利用APIは要件どおり`AffiliateLink`、`ProductCard`、`ExternalLink`、`DisclosureNotice`の名前でも利用できる。
- HTML 17ページのローカルリンクとJavaScript構文を再検査し、欠落0件。
- 本番Homeを390px・768pxで確認し、横スクロール、alt欠落、コンソールエラーはいずれも0件。実機確認は引き続き必要。
