// Add future technical articles and case studies here. Keeping content as data
// avoids duplicating card markup and preserves the build-free GitHub Pages setup.
const portfolioContent = [
  {
    id: "multilingual-static-portfolio",
    type: "article",
    title: "Multilingual static portfolio architecture",
    summary: "A technical note about language switching, data-driven cards, and resilient public GitHub integration without a build step.",
    status: "planned",
    translations: {
      ja: { title: "多言語静的ポートフォリオの設計", summary: "ビルド工程を増やさず、言語切替、データ駆動カード、GitHub連携の耐障害性を整える技術記事を準備しています。" },
      "zh-TW": { title: "多語言靜態作品集架構", summary: "準備介紹在免建置流程下，如何實作語言切換、資料驅動卡片與具備備援的GitHub整合。" }
    }
  },
  {
    id: "developer-portfolio-case-study",
    type: "caseStudy",
    title: "Developer Portfolio case study",
    summary: "A planned case study covering the information architecture, accessibility, SEO, and release decisions behind this site.",
    status: "planned",
    projectUrl: "#featured-projects",
    translations: {
      ja: { title: "Developer Portfolio ケーススタディ", summary: "このサイトの情報設計、アクセシビリティ、SEO、公開判断をまとめるケーススタディを準備しています。" },
      "zh-TW": { title: "Developer Portfolio 案例研究", summary: "準備整理本網站的資訊架構、無障礙設計、SEO與發布決策。" }
    }
  }
];

function renderPortfolioContent() {
  const grid = document.getElementById("content-grid");
  if (!grid) return;
  const lang = window.getCurrentLanguage?.() || "ja";
  const translate = (key, fallback) => window.getTranslation?.(key) || fallback;
  grid.textContent = "";
  portfolioContent.forEach((source) => {
    const item = { ...source, ...(source.translations?.[lang] || {}) };
    const article = document.createElement("article");
    article.className = "content-card";
    const meta = document.createElement("p");
    meta.className = "content-card-meta";
    meta.textContent = `${translate(`content.${item.type}`, item.type)} · ${translate(`status.${item.status}`, item.status)}`;
    const title = document.createElement("h3");
    title.textContent = item.title;
    const summary = document.createElement("p");
    summary.textContent = item.summary;
    article.append(meta, title, summary);
    if (item.projectUrl) {
      const link = document.createElement("a");
      link.href = item.projectUrl;
      link.textContent = translate("content.relatedProject", "Related project →");
      article.append(link);
    }
    grid.append(article);
  });
}

document.addEventListener("DOMContentLoaded", renderPortfolioContent);
document.addEventListener("languagechange", renderPortfolioContent);
