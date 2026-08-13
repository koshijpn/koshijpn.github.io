# Google AdSense 再申請向け Production QA & サイト監査レポート (2026年8月版)

**監査実施日**: 2026年8月13日  
**対象リポジトリ**: `koshijpn.github.io` (Developer Portfolio)  
**サイトステータス**: 公開中・Search Console インプレッション収集開始済み  
**実行者**: Antigravity Assistant

---

## 1. サイト全体の集計

- **総 HTML ファイル数**: 24 ページ
- **インデックス対象 (Indexable URL) 数**: 19 ページ
- **非インデックス (noindex / Utility) 数**: 5 ページ
- **静的自動監査結果 (`scripts/site_audit.py`)**: **Pass (24 HTML files, 19 indexable URLs, 0 errors)**

---

## 2. AdSense 視点での全 24 ページ分類

### 【分類 A】十分な独自価値・独自本文があるページ (19 ページ)

| URL / パス | ページ種別 | AdSense 評価 & 理由 |
| :--- | :--- | :--- |
| `https://koshijpn.github.io/` | Top Page | **A**: 代表開発作品、スキル、経験、GitHub、二重問い合わせ導線が充実 |
| `https://koshijpn.github.io/projects.html` | Projects Overview | **A**: 商用案件、WordPress制作、Publicプロジェクト等のコンテキストと一覧 |
| `https://koshijpn.github.io/profile.html` | Education & Credentials | **A**: 学歴、国際学習歴、開発資格・認定一覧（証拠重視の構成） |
| `https://koshijpn.github.io/case-study/` | Engineering Case Studies | **A**: 失敗事例・原因・解決・証拠・制約を網羅した技術ケーススタディ一覧 |
| `https://koshijpn.github.io/articles/` | Technical Articles Overview | **A**: 技術記事一覧 |
| `https://koshijpn.github.io/articles/multilingual-static-portfolio/` | Technical Article | **A**: ビルド不要多言語静的サイト設計の詳細技術解説記事（独自コンテンツ） |
| `https://koshijpn.github.io/development-notes/` | Development Notes | **A**: 現場の障害復旧・設計判断メモ（Problem/Solution/Evidence/Lesson） |
| `https://koshijpn.github.io/projects/portfolio/` | Case Study | **A**: Developer Portfolio の詳細設計・SEO・障害時フォールバックケーススタディ |
| `https://koshijpn.github.io/projects/visual-dictionary/` | Case Study | **A**: Visual Dictionary 障害復旧の根本原因、Fix commit `413d56f`、制約を明記 |
| `https://koshijpn.github.io/projects/onii-media/` | Case Study | **A**: ONII Media の多言語再設計、テスト数（16/16 PASS）、設計根拠を明記 |
| `https://koshijpn.github.io/projects/hokkai-trace/` | Case Study | **A**: 人の承認と Production HTTP 確認を含む安全な CI/CD パイプライン解説 |
| `https://koshijpn.github.io/projects/corporate-website/` | Case Study | **A**: 企業サイト制作の守秘義務・範囲・成果・振り返り |
| `https://koshijpn.github.io/projects/vouvray-huguet/` | Case Study | **A**: 英仏多言語EC制作の課題・構成・学び |
| `https://koshijpn.github.io/projects/next-jobs/` | Case Study | **A**: SvelteKit + PocketBase API 構成のアーキテクチャ解説 |
| `https://koshijpn.github.io/projects/next-ecomm/` | Case Study | **A**: 前後分離ECプロトタイプの設計と思想 |
| `https://koshijpn.github.io/contact/` | Contact Form | **A**: UTM/Referrer/SourcePage自動取得付きの高度なお問い合わせフォーム |
| `https://koshijpn.github.io/privacy.html` | Privacy Policy | **A**: Analytics, GTM, Clarity, データ取扱い、問い合わせ規定 |
| `https://koshijpn.github.io/terms.html` | Terms & Disclaimer | **A**: 利用条件・免責事項・著作権 |
| `https://koshijpn.github.io/affiliate-disclosure.html` | Affiliate Disclosure | **A**: アフィリエイト・紹介リンクに関する透明性開示 |

### 【分類 B】有用だが説明を追加した方がよいページ (0 ページ)
- 現在、インデックス対象の全 19 ページに十分なテキストと背景が記載されています。

### 【分類 C】thin / utility / 重複性が高く、AdSense審査上注意なページ (0 ページ - 非掲載対応済み)
- ユーティリティページ（`uses/`, `now/`）は独自価値の観点から AdSense 審査で thin content とみなされるリスクがあるため、すでに正しく `<meta name="robots" content="noindex,follow">` が設定され、`sitemap.xml` から除外されています。

### 【分類 D】broken / placeholder / unfinished / 公開すべきでないページ (0 ページ)
- 削除整理済み: 重複旧ファイル `./case-study/index 2.html` は正式ファイル `./case-study/index.html` との diff 差分を確認・記録のうえ整理完了。

---

## 3. AdSense 再審査に関する不承認要因リスク分析 TOP 5

Google AdSense の審査基準および非承認理由「アカウントが承認されませんでした / ポリシーを遵守する」に基づくリスク分析結果です。

### 1. サイトの主目的が「技術ポートフォリオ / 開発者プロフィール」である点（High Risk）
- **根拠**: AdSense は主に「閲覧者が日常的に記事・情報コンテンツを消費するメディア型サイト」を好み、単なるサービス案内、ポートフォリオ、問い合わせ誘導サイトは「広告枠を掲載するメディアとしての適合性が低い」と機械判定される傾向があります。
- **対策**: `articles/` や `development-notes/` などのオリジナルの技術解説コンテンツを充実させており、将来的な広告枠も技術記事内のみ（`technical-article-mid`）に限定するアーキテクチャ（`js/ads-config.js`）をとっています。

### 2. ポートフォリオサイト全体における文章量・記事型ページの絶対数（Medium Risk）
- **根拠**: AdSense 審査では、サイト内に数十本以上のオリジナル記事が存在することを想定される場合があります。本サイトは現在 19 ページで構成されており、情報の質は極めて高いものの「ページ総数」がメディアサイトと比較して少なめです。
- **対策**: 今後 `articles/` 内に新しい技術記事を追加更新していくことで自然に解消可能です。

### 3. 未認証・開発プロトタイプ表記 (Beta / WIP / Private Repository)（Medium Risk）
- **根拠**: ケーススタディ内で「Repository private」「Production URL not verified」など誠実に記載していますが、自動審査ボットが「未完成なサイト / incomplete website」と誤誤認する可能性があります。
- **対策**: `robots.txt` および `sitemap.xml` でインデックス対象を整然と公開し、404 や未完成リンクがないことを明示しています。

### 4. 複数ブランド（koshijpn.com / sleeplatelab.com / koshijpn.github.io）への外部リンク（Low Risk）
- **根拠**: 外部サイトへの発リンクが多い場合、審査ボットが「別サイトへの誘導ページ」と判定するケースがあります。
- **対策**: 全ての外部リンクに `target="_blank" rel="noopener noreferrer"` または `rel="sponsored noopener noreferrer"` を適用し、正規の `canonical` を固定しています。

### 5. 多言語切り替えが単一 URL 内の JavaScript で動的に処理されている点（Low Risk）
- **根拠**: 審査ボットがクローラー実行時に JavaScript を実行しない場合、初期言語（日本語）のみをクロールするため、他言語ページの存在が認識されない場合があります。
- **対策**: HTML 内に完全な静的構造と title / description / OGP を残しており、SEO およびアクセシビリティ上の問題はありません。

---

## 4. 自動修正内容

1. **重複バックアップファイルの整理**:
   - `./case-study/index 2.html` と正式ファイル `./case-study/index.html` の差分を比較確認後、不要となった `./case-study/index 2.html` を削除。
2. **静的サイト自動監査のパス**:
   - `python3 scripts/site_audit.py` の実行により、24 個の HTML ファイル、19 個の インデックス URL にてエラー 0 件を確認。

---

## 5. 人間確認・外部サービス確認が必要な事項 (MANUAL TODO)

1. **Google Search Console**:
   - インデックス状態および登録クエリの監視（2026-08-10 から表示開始済み）。
2. **Google AdSense 再審査画面**:
   - 審査結果の回答を待つ（再審査期間中はコードの無用な大規模変更を回避する）。
3. **将来的な広告運用方針**:
   - ポートフォリオおよび Case Study では Project / GitHub / Live Demo CTA を最優先とし、広告は `articles/` の技術記事内でのみ慎重に利用する。
