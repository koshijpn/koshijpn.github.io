// Featured case studies are curated manually. Other cards come from GitHub's
// public API; private repositories are never requested or rendered.
const GITHUB_USER = "koshijpn";
const GITHUB_REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?type=public&sort=pushed&per_page=100`;

const featuredProjects = [
  {
    id: "next-jobs", title: "Next Jobs", image: ["./img/projects/next-jobs.png", 1080, 675],
    summary: "A Svelte interface for searching and reviewing job opportunities.",
    purpose: "Make API-delivered job information easier to browse through a focused, responsive interface.",
    role: "UI design / API integration / Front-end implementation",
    technologies: ["Svelte", "JavaScript", "REST API", "Docker"], status: "caseStudy",
    links: [["Frontend", "https://github.com/koshijpn/next-jobs-frontend"], ["Backend", "https://github.com/koshijpn/next-jobs-backend"]],
    translations: {
      ja: { summary: "求人情報を検索・閲覧するためのSvelteフロントエンド。", purpose: "APIから取得した求人情報を、条件検索とレスポンシブUIで見やすく提示します。", role: "UI設計 / API連携 / フロントエンド実装" },
      "zh-TW": { summary: "用於搜尋與瀏覽職缺資訊的Svelte前端。", purpose: "以條件搜尋與響應式介面，清楚呈現API取得的職缺資料。", role: "UI設計 / API整合 / 前端實作" }
    }
  },
  {
    id: "next-ecomm", title: "Next Ecomm", image: ["./img/projects/next-ecomm.png", 1080, 675],
    summary: "A full-stack commerce prototype with separated Svelte front-end and API services.",
    purpose: "Explore product presentation, account flows, and a maintainable front-end/back-end separation.",
    role: "Planning / UI design / Full-stack implementation",
    technologies: ["Svelte", "JavaScript", "REST API", "Full Stack"], status: "caseStudy",
    links: [["Frontend", "https://github.com/koshijpn/next-ecomm-frontend"], ["Backend", "https://github.com/koshijpn/next-ecomm-backend"]],
    translations: {
      ja: { summary: "SvelteのフロントエンドとAPIを分離したフルスタックECプロトタイプ。", purpose: "商品表示やアカウント導線を検証し、保守しやすい前後分離構成を実装しました。", role: "企画 / UI設計 / フルスタック実装" },
      "zh-TW": { summary: "前端與API分離的Svelte全端電商原型。", purpose: "驗證商品呈現與帳號流程，建立易於維護的前後端分離架構。", role: "企劃 / UI設計 / 全端實作" }
    }
  },
  {
    id: "luno-premium", title: "Luno Premium Calculator", image: ["./img/projects/luno-premium.png", 1080, 396],
    summary: "A command-line tool that compares Bitcoin prices across two exchanges.",
    purpose: "Normalize currencies and calculate market-price differences from external exchange data.",
    role: "Data flow / API integration / Calculation logic",
    technologies: ["JavaScript", "Node.js", "Exchange APIs"], status: "caseStudy",
    links: [["GitHub", "https://github.com/koshijpn/Project_Luno_Premium"]],
    translations: {
      ja: { summary: "2つの取引所のBitcoin価格を比較するコマンドラインツール。", purpose: "外部データの通貨を揃え、市場価格差を計算できるようにしました。", role: "データ設計 / API連携 / 計算ロジック" },
      "zh-TW": { summary: "比較兩個交易所比特幣價格的命令列工具。", purpose: "統一外部資料的幣別並計算市場價差。", role: "資料流程 / API整合 / 計算邏輯" }
    }
  },
  {
    id: "developer-portfolio", title: "Developer Portfolio", image: ["./img/projects/developer-portfolio.png", 1024, 423],
    summary: "This multilingual, responsive portfolio for GitHub Pages.",
    purpose: "Present public development work clearly across languages without a build step.",
    role: "Information architecture / Design / Development / SEO / Release",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub API", "SEO"], status: "active",
    links: [["GitHub", "https://github.com/koshijpn/koshijpn.github.io"], ["Demo", "https://koshijpn.github.io/"]],
    translations: {
      ja: { summary: "GitHub Pages向けの多言語・レスポンシブ開発者ポートフォリオ。", purpose: "ビルド不要の構成で、公開開発実績を多言語で分かりやすく伝えます。", role: "情報設計 / デザイン / 実装 / SEO / 公開" },
      "zh-TW": { summary: "為GitHub Pages建立的多語言響應式開發者作品集。", purpose: "以免建置流程的架構，清楚呈現多語言公開開發成果。", role: "資訊架構 / 設計 / 開發 / SEO / 發布" }
    }
  }
];

const featuredRepoNames = new Set(["next-jobs-frontend", "next-jobs-backend", "next-ecomm-frontend", "next-ecomm-backend", "Project_Luno_Premium", "koshijpn.github.io"]);
const projectImages = { "email-automator": ["./img/projects/email-automator.png", 1080, 675] };

const skillGroups = [
  { id: "primary", skills: [
    ["HTML", "Semantic markup · Accessibility", "Personal development", "Developer Portfolio"],
    ["CSS", "Responsive UI · Modern layouts", "Personal and client work", "Developer Portfolio"],
    ["JavaScript", "Interactive UI · Data processing", "Personal development", "Luno Premium / Email Automator"],
    ["WordPress", "Client sites · Divi · WooCommerce", "Paid client work", "Corporate and commerce websites"],
    ["Git / GitHub", "Version control · GitHub Pages", "Daily development workflow", "Public repositories"],
    ["Responsive Design", "Mobile-first interfaces", "Personal and client work", "Portfolio / Next Jobs / Next Ecomm"],
    ["SEO", "Metadata · Structure · Performance", "Site delivery and maintenance", "Developer Portfolio"],
    ["AI-Assisted Development", "Requirements · Coding · Review · Documentation · Test support", "Human-reviewed workflow", "Design and release decisions remain human-led"]
  ]},
  { id: "working", skills: [
    ["Python", "Automation · Data collection · Flask", "Personal development and study", "Automation prototypes"],
    ["Node.js", "Server-side JavaScript · Automation", "Personal development", "Email Automator / Luno Premium"],
    ["SQL", "SQLite · Cloudflare D1", "Personal development", "Data-backed prototypes"],
    ["APIs", "REST APIs · External data integration", "Personal development", "Next Jobs / Luno Premium"],
    ["Svelte", "Component-based front-end development", "Bootcamp and personal development", "Next Jobs / Next Ecomm"],
    ["Docker", "Containerized development", "Bootcamp project", "Next Jobs backend"]
  ]},
  { id: "creative", skills: [
    ["Photography", "Visual direction · Image editing", "Coursework and production", "Web imagery"],
    ["Video Editing", "Premiere Pro · Final Cut Pro", "Coursework and production", "Short-form media"],
    ["Copywriting", "Clear multilingual content", "Paid and personal work", "Web content"],
    ["Graphic Design", "Figma · Canva · Photoshop", "Coursework and production", "UI and visual assets"]
  ]}
];

const detailTranslations = {
  ja: { "Semantic markup · Accessibility":"セマンティックHTML・アクセシビリティ","Responsive UI · Modern layouts":"レスポンシブUI・モダンレイアウト","Interactive UI · Data processing":"インタラクティブUI・データ処理","Client sites · Divi · WooCommerce":"クライアントサイト・Divi・WooCommerce","Version control · GitHub Pages":"バージョン管理・GitHub Pages","Mobile-first interfaces":"モバイルファースト設計","Metadata · Structure · Performance":"メタデータ・構造・パフォーマンス","Requirements · Coding · Review · Documentation · Test support":"要件整理・コード生成・レビュー・文書作成・テスト補助" },
  "zh-TW": { "Semantic markup · Accessibility":"語意化標記・無障礙設計","Responsive UI · Modern layouts":"響應式介面・現代版面","Interactive UI · Data processing":"互動介面・資料處理","Client sites · Divi · WooCommerce":"客戶網站・Divi・WooCommerce","Version control · GitHub Pages":"版本控制・GitHub Pages","Mobile-first interfaces":"行動優先介面","Metadata · Structure · Performance":"中繼資料・結構・效能","Requirements · Coding · Review · Documentation · Test support":"需求整理・程式生成・審查・文件・測試支援" }
};

let otherProjects = [];
const tr = (key, fallback = key) => window.getTranslation?.(key) || fallback;
const language = () => window.getCurrentLanguage?.() || "ja";
const localized = (project) => ({ ...project, ...(project.translations?.[language()] || {}) });

function createLink(label, url) { const a=document.createElement("a"); a.href=url; a.target="_blank"; a.rel="noopener noreferrer"; a.textContent=`${label} ↗`; return a; }
function createVisual(project) { const v=document.createElement("div"); v.className="project-visual project-visual-placeholder"; if(project.image){const [src,w,h]=project.image;const img=document.createElement("img");img.src=src;img.width=w;img.height=h;img.loading="lazy";img.decoding="async";img.alt=`${project.title} ${language()==="ja"?"プロジェクト画面":language()==="zh-TW"?"專案畫面":"project preview"}`;v.classList.remove("project-visual-placeholder");v.append(img);}else{v.setAttribute("aria-hidden","true");v.textContent=project.title.slice(0,2).toUpperCase();}return v; }
function techList(items){const ul=document.createElement("ul");ul.className="tech-list";items.forEach(x=>{const li=document.createElement("li");li.textContent=x;ul.append(li);});return ul;}

function createFeaturedCard(source,index){const p=localized(source),article=document.createElement("article");article.className="project-card project-card-featured";article.append(createVisual(p));const body=document.createElement("div");body.className="project-card-body";body.innerHTML=`<div class="project-meta"><span>${String(index+1).padStart(2,"0")}</span><span class="project-badges"><span>${tr(`status.${p.status}`,p.status)}</span></span></div><h3>${p.title}</h3><p class="project-summary">${p.summary}</p><dl class="project-facts"><div><dt>${tr("project.purpose","Purpose")}</dt><dd>${p.purpose}</dd></div><div><dt>${tr("project.role","Role")}</dt><dd>${p.role}</dd></div><div><dt>${tr("project.tech","Tech")}</dt><dd></dd></div></dl>`;body.querySelector(".project-facts dd:last-child").append(techList(p.technologies));const links=document.createElement("div");links.className="project-links";p.links.forEach(([label,url])=>links.append(createLink(label,url)));body.append(links);article.append(body);return article;}

function createOtherCard(project,index){const article=document.createElement("article");article.className="project-card";article.append(createVisual(project));const body=document.createElement("div");body.className="project-card-body";body.innerHTML=`<div class="project-meta"><span>${String(index+1).padStart(2,"0")}</span><span class="project-badges"><span>${tr("status.public","Public")}</span></span></div><h3>${project.title}</h3><p class="project-summary">${project.summary}</p>`;body.append(techList(project.technologies));const links=document.createElement("div");links.className="project-links";links.append(createLink("GitHub",project.githubUrl));if(project.demoUrl)links.append(createLink("Demo",project.demoUrl));body.append(links);article.append(body);return article;}

function renderProjects(){const featured=document.getElementById("featured-project-grid"),other=document.getElementById("other-project-grid");if(featured){featured.textContent="";featuredProjects.forEach((p,i)=>featured.append(createFeaturedCard(p,i)));}if(other){other.textContent="";otherProjects.forEach((p,i)=>other.append(createOtherCard(p,i)));}}
function renderSkills(){const container=document.getElementById("skills-grid");if(!container)return;container.textContent="";skillGroups.forEach(group=>{const section=document.createElement(group.id==="creative"?"details":"section");section.className=`skill-group ${group.id==="creative"?"skill-group-collapsible":""}`;if(group.id==="creative"){const summary=document.createElement("summary");summary.textContent=tr(`skills.${group.id}`,group.id);section.append(summary);}else{const h=document.createElement("h3");h.textContent=tr(`skills.${group.id}`,group.id);section.append(h);}const grid=document.createElement("div");grid.className="skill-group-grid";group.skills.forEach(([name,detail,experience,evidence])=>{const card=document.createElement("article");card.className="skill-card";const translated=detailTranslations[language()]?.[detail]||detail;card.innerHTML=`<h4>${name}</h4><p>${translated}</p><dl class="skill-evidence"><div><dt>${tr("skills.experience","Experience")}</dt><dd>${experience}</dd></div><div><dt>${tr("skills.evidence","Evidence")}</dt><dd>${evidence}</dd></div></dl>`;grid.append(card);});section.append(grid);container.append(section);});}

async function loadOtherProjects(){try{const response=await fetch(GITHUB_REPOS_ENDPOINT,{headers:{Accept:"application/vnd.github+json"}});if(!response.ok)throw new Error(response.status);const repos=await response.json();otherProjects=repos.filter(r=>!r.private&&!r.fork&&!featuredRepoNames.has(r.name)).map(r=>({title:r.name,summary:r.description||tr("project.noDescription"),technologies:[r.language,...(r.topics||[])].filter(Boolean),githubUrl:r.html_url,demoUrl:r.homepage||null,image:projectImages[r.name]||null}));renderProjects();}catch(error){console.warn("Public repositories could not be loaded",error);document.getElementById("other-projects")?.setAttribute("hidden","");}}
function renderAll(){renderSkills();renderProjects();}
document.addEventListener("DOMContentLoaded",()=>{renderAll();loadOtherProjects();});
document.addEventListener("languagechange",renderAll);
