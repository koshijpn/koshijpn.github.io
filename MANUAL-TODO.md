# KOSHI Web Ecosystem 手動操作・タスク管理ガイド (MANUAL-TODO.md)

本ドキュメントは、コード上で自動修正された項目、ユーザー本人が外部管理画面で実施する必要がある操作、および将来的な改善候補を3分類でまとめたものです。

---

## 1. 自動修正済み (Auto-fixed by Assistant)

以下の項目はリポジトリのコード内で修正・検証を完了しました。

- [x] **全ページのメタデータ & タグ構成の検証**: HTML全20ページにおいて canonical, title, description, OGP, Favicon の正常性を確認。
- [x] **Analytics イベント標準化**:
  - `email_click`, `affiliate_click`, `outbound_click`, `contact_click`, `service_click`, `github_click`, `linkedin_click`, `project_click` の自動判定を追加。
  - `contact_form_start`, `contact_form_submit`, `generate_lead` のフォーム計測イベントを追加。
- [x] **Person / Organization Schema 統一**: JSON-LD 内の人物 ID を `https://koshijpn.com/#koshi`、会社 ID を `https://sleeplatelab.com/#organization` に統一。
- [x] **タグ二重読み込み防止**: GTM (`GTM-T6BQ47G3`), GA4 (`G-ZKZNCJZ6DF`), Clarity (`xy6zsg56uc`) の二重ロードガードを全ページ適用。
- [x] **README.md 強化**: リポジトリ冒頭だけで目的、ライブデモ、提供スキル、主要プロジェクトが理解できるよう構成を刷新。
- [x] **セキュリティ & CSP**: APIキー・認証トークンの露出がないことをスキャンし、CSP設定を適用。

---

## 2. 私の操作が必要 (User Manual Action Required)

コードからは直接操作できない、外部管理画面・サービス設定のタスク一覧です。

### 🌐 GitHub Repository Settings (`koshijpn/koshijpn.github.io`)
- [ ] **Description の設定**:
  `Koshi Sugawara's developer portfolio — multilingual web development, JavaScript, WordPress, AI-assisted development, SEO and selected projects.`
- [ ] **Homepage の設定**:
  `https://koshijpn.github.io/`
- [ ] **Topics (タグ) の設定**:
  `portfolio`, `web-development`, `javascript`, `wordpress`, `frontend`, `multilingual`, `seo`, `github-pages`, `developer-portfolio`, `ai-assisted-development`

### 🔍 Google Search Console
- [ ] **プロパティ追加・確認**:
  3サイト (`https://koshijpn.com/`, `https://sleeplatelab.com/`, `https://koshijpn.github.io/`) が個別プロパティとして登録されているか確認。
- [ ] **Sitemap 送信**:
  - `https://koshijpn.github.io/sitemap.xml` を送信。
  - `https://koshijpn.com/sitemap.xml` および `https://sleeplatelab.com/sitemap.xml` も同様に送信。

### 📊 Google Tag Manager (GTM) & Analytics
- [ ] **GTM コンテナの Publish**:
  将来 GTM 側で GA4 タグや Clarity タグを設定・公開する場合は、`js/main.js` の Direct Loader と二重計測にならないよう GTM プレビュー画面で確認してコンテナをバージョン公開する。
- [ ] **GA4 リアルタイム画面での確認**:
  `koshijpn.github.io` にアクセスし、GA4 画面で `page_view` および `github_click`, `generate_lead` 等のイベントが正常に記録されるかテスト。

### 👁️ Microsoft Clarity
- [ ] **プロジェクト所有権確認**:
  Clarity ダッシュボード (`xy6zsg56uc`) でヒートマップおよびセッション録画が記録開始されているか確認。

### 💼 SLEEP LATE LAB / WordPress 管理画面
- [ ] **問い合わせフォーム疎通テスト**:
  `https://sleeplatelab.com/contact/` から実際にメール送信テストを実施し、受動通知・自動返信・スパムフィルターが正常か確認。

---

## 3. 将来やればいい (Future Improvements)

急ぎではないが、ブランド拡張やコンテンツ拡充のタイミングで実施するとよい項目です。

- [ ] **旧サブドメイン (`dj.koshijpn.com`, `photo.koshijpn.com`) の整理**:
  活動継続中であれば `koshijpn.com` への Person プロフィール導線を設置。終了しているものは `noindex` または 301 リダイレクト処理。
- [ ] **AdSense / アフィリエイト連携 (コンテンツサイト優先)**:
  `koshijpn.com` の記事コンテンツやお兄メディア等で AdSense / Affiliate ネットワーク申請を進める（※ Developer Portfolio / SLEEP LATE LAB は案件獲得優先のため広告非掲載を継続）。
- [ ] **他公開リポジトリの README 改善**:
  `email-automator`, `next-ecomm-frontend/backend`, `next-jobs-frontend/backend`, `Project_Luno_Premium` の README にスクリーンショットや Live Demo を追記。
