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
    result: "Implemented a responsive job-list interface with separated front-end and back-end repositories.",
    currentState: "Public portfolio prototype",
    technologies: ["Svelte", "JavaScript", "REST API", "Docker"], status: "prototype",
    links: [["Frontend", "https://github.com/koshijpn/next-jobs-frontend"], ["Backend", "https://github.com/koshijpn/next-jobs-backend"]],
    translations: {
      ja: { summary: "求人情報を検索・閲覧するためのSvelteフロントエンド。", purpose: "APIから取得した求人情報を、条件検索とレスポンシブUIで見やすく提示します。", role: "UI設計 / API連携 / フロントエンド実装", result: "フロントエンドとバックエンドを分離し、レスポンシブな求人一覧UIを実装。", currentState: "公開ポートフォリオ用プロトタイプ" },
      "zh-TW": { summary: "用於搜尋與瀏覽職缺資訊的Svelte前端。", purpose: "以條件搜尋與響應式介面，清楚呈現API取得的職缺資料。", role: "UI設計 / API整合 / 前端實作", result: "完成前後端分離及響應式職缺列表介面。", currentState: "公開作品集原型" }
    }
  },
  {
    id: "next-ecomm", title: "Next Ecomm", image: ["./img/projects/next-ecomm.png", 1080, 675],
    summary: "A full-stack commerce prototype with separated Svelte front-end and API services.",
    purpose: "Explore product presentation, account flows, and a maintainable front-end/back-end separation.",
    role: "Planning / UI design / Full-stack implementation",
    result: "Built product, account, and navigation flows across separated application layers.",
    currentState: "Public portfolio prototype",
    technologies: ["Svelte", "JavaScript", "REST API", "Full Stack"], status: "prototype",
    links: [["Frontend", "https://github.com/koshijpn/next-ecomm-frontend"], ["Backend", "https://github.com/koshijpn/next-ecomm-backend"]],
    translations: {
      ja: { summary: "SvelteのフロントエンドとAPIを分離したフルスタックECプロトタイプ。", purpose: "商品表示やアカウント導線を検証し、保守しやすい前後分離構成を実装しました。", role: "企画 / UI設計 / フルスタック実装", result: "商品表示、アカウント、ナビゲーションの導線を前後分離構成で実装。", currentState: "公開ポートフォリオ用プロトタイプ" },
      "zh-TW": { summary: "前端與API分離的Svelte全端電商原型。", purpose: "驗證商品呈現與帳號流程，建立易於維護的前後端分離架構。", role: "企劃 / UI設計 / 全端實作", result: "以前後端分離架構完成商品、帳號與導覽流程。", currentState: "公開作品集原型" }
    }
  },
  {
    id: "luno-premium", title: "Luno Premium Calculator", image: ["./img/projects/luno-premium.png", 1080, 396],
    summary: "A command-line tool that compares Bitcoin prices across two exchanges.",
    purpose: "Normalize currencies and calculate market-price differences from external exchange data.",
    role: "Data flow / API integration / Calculation logic",
    result: "Implemented currency normalization and exchange-premium calculations in a command-line workflow.",
    currentState: "Public learning project",
    technologies: ["JavaScript", "Node.js", "Exchange APIs"], status: "learning",
    links: [["GitHub", "https://github.com/koshijpn/Project_Luno_Premium"]],
    translations: {
      ja: { summary: "2つの取引所のBitcoin価格を比較するコマンドラインツール。", purpose: "外部データの通貨を揃え、市場価格差を計算できるようにしました。", role: "データ設計 / API連携 / 計算ロジック", result: "通貨換算と取引所間プレミアム計算をコマンドライン処理として実装。", currentState: "公開学習プロジェクト" },
      "zh-TW": { summary: "比較兩個交易所比特幣價格的命令列工具。", purpose: "統一外部資料的幣別並計算市場價差。", role: "資料流程 / API整合 / 計算邏輯", result: "以命令列流程完成幣別換算與交易所溢價計算。", currentState: "公開學習專案" }
    }
  },
  {
    id: "developer-portfolio", title: "Developer Portfolio", image: ["./img/projects/developer-portfolio.png", 1024, 423],
    summary: "This multilingual, responsive portfolio for GitHub Pages.",
    purpose: "Present public development work clearly across languages without a build step.",
    role: "Information architecture / Design / Development / SEO / Release",
    result: "Published a multilingual static portfolio with curated case studies and public GitHub integration.",
    currentState: "Live on GitHub Pages",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub API", "SEO"], status: "active",
    links: [["GitHub", "https://github.com/koshijpn/koshijpn.github.io"], ["Demo", "https://koshijpn.github.io/"]],
    translations: {
      ja: { summary: "GitHub Pages向けの多言語・レスポンシブ開発者ポートフォリオ。", purpose: "ビルド不要の構成で、公開開発実績を多言語で分かりやすく伝えます。", role: "情報設計 / デザイン / 実装 / SEO / 公開", result: "手動ケーススタディとPublic GitHub連携を備えた多言語静的サイトを公開。", currentState: "GitHub Pagesで公開・運用中" },
      "zh-TW": { summary: "為GitHub Pages建立的多語言響應式開發者作品集。", purpose: "以免建置流程的架構，清楚呈現多語言公開開發成果。", role: "資訊架構 / 設計 / 開發 / SEO / 發布", result: "發布具備精選案例與Public GitHub整合的多語言靜態網站。", currentState: "於GitHub Pages公開運作中" }
    }
  }
];

const featuredRepoNames = new Set(["next-jobs-frontend", "next-jobs-backend", "next-ecomm-frontend", "next-ecomm-backend", "Project_Luno_Premium", "koshijpn.github.io"]);
const projectImages = { "email-automator": ["./img/projects/email-automator.png", 1080, 675] };
const fallbackPublicProjects = [{ title: "email-automator", summary: "Node.js automation for monitoring an inbox and preparing rule-based replies.", technologies: ["Node.js", "Nodemailer", "IMAP"], githubUrl: "https://github.com/koshijpn/email-automator", demoUrl: null, image: projectImages["email-automator"] }];

const coreSkills = [
  ["HTML / CSS", "Semantic, accessible, and responsive interface design."],
  ["JavaScript", "Data processing, API integration, and interactive interfaces."],
  ["WordPress", "Divi, WooCommerce, and paid client websites."],
  ["Git / GitHub", "Version control, GitHub Pages, and public releases."],
  ["SEO", "Metadata, structure, performance, and internal architecture."],
  ["AI-Assisted Development", "Requirements, implementation support, review, and documentation with human oversight."]
];

const detailTranslations = {
  ja: { "Semantic markup · Accessibility":"セマンティックHTML・アクセシビリティ","Responsive UI · Modern layouts":"レスポンシブUI・モダンレイアウト","Interactive UI · Data processing":"インタラクティブUI・データ処理","Client sites · Divi · WooCommerce":"クライアントサイト・Divi・WooCommerce","Version control · GitHub Pages":"バージョン管理・GitHub Pages","Mobile-first interfaces":"モバイルファースト設計","Metadata · Structure · Performance":"メタデータ・構造・パフォーマンス","Requirements · Coding · Review · Documentation · Test support":"要件整理・コード生成・レビュー・文書作成・テスト補助" },
  "zh-TW": { "Semantic markup · Accessibility":"語意化標記・無障礙設計","Responsive UI · Modern layouts":"響應式介面・現代版面","Interactive UI · Data processing":"互動介面・資料處理","Client sites · Divi · WooCommerce":"客戶網站・Divi・WooCommerce","Version control · GitHub Pages":"版本控制・GitHub Pages","Mobile-first interfaces":"行動優先介面","Metadata · Structure · Performance":"中繼資料・結構・效能","Requirements · Coding · Review · Documentation · Test support":"需求整理・程式生成・審查・文件・測試支援" }
};

let otherProjects = [];
let apiFallbackUsed = false;
const tr = (key, fallback = key) => window.getTranslation?.(key) || fallback;
const language = () => window.getCurrentLanguage?.() || "ja";
const localized = (project) => ({ ...project, ...(project.translations?.[language()] || {}) });

function createLink(label, url) { const a=document.createElement("a"); a.href=url; a.target="_blank"; a.rel="noopener noreferrer"; a.textContent=`${label} ↗`; return a; }
function createVisual(project) { const v=document.createElement("div"); v.className="project-visual project-visual-placeholder"; if(project.image){const [src,w,h]=project.image;const img=document.createElement("img");img.src=src;img.width=w;img.height=h;img.loading="lazy";img.decoding="async";img.alt=`${project.title} ${language()==="ja"?"プロジェクト画面":language()==="zh-TW"?"專案畫面":"project preview"}`;v.classList.remove("project-visual-placeholder");v.append(img);}else{v.setAttribute("aria-hidden","true");v.textContent=project.title.slice(0,2).toUpperCase();}return v; }
function techList(items){const ul=document.createElement("ul");ul.className="tech-list";items.forEach(x=>{const li=document.createElement("li");li.textContent=x;ul.append(li);});return ul;}

function createFeaturedCard(source,index,detailed=false){const p=localized(source),article=document.createElement("article");article.id=p.id;article.className="project-card project-card-featured";article.append(createVisual(p));const body=document.createElement("div");body.className="project-card-body";body.innerHTML=`<div class="project-meta"><span>${String(index+1).padStart(2,"0")}</span><span class="project-badges"><span>${tr(`status.${p.status}`,p.status)}</span></span></div><h3>${p.title}</h3><p class="project-summary">${p.summary}</p>`;if(detailed){body.insertAdjacentHTML("beforeend",`<dl class="project-facts"><div><dt>${tr("project.purpose","Purpose")}</dt><dd>${p.purpose}</dd></div><div><dt>${tr("project.role","Role")}</dt><dd>${p.role}</dd></div><div><dt>${tr("project.result","Result")}</dt><dd>${p.result}</dd></div><div><dt>${tr("project.currentState","Current state")}</dt><dd>${p.currentState}</dd></div><div><dt>${tr("project.tech","Technologies")}</dt><dd class="project-tech-slot"></dd></div><div><dt>${tr("project.repositories","Repositories")}</dt><dd class="project-repo-slot"></dd></div></dl>`);body.querySelector(".project-tech-slot").append(techList(p.technologies));const repositories=body.querySelector(".project-repo-slot");p.links.forEach(([label,url])=>repositories.append(createLink(label,url)));}else{body.append(techList(p.technologies.slice(0,3)));const facts=document.createElement("dl");facts.className="project-facts project-facts-compact";facts.innerHTML=`<div><dt>${tr("project.role","Role")}</dt><dd>${p.role}</dd></div><div><dt>${tr("project.currentState","Status")}</dt><dd>${p.currentState}</dd></div>`;body.append(facts);const links=document.createElement("div");links.className="project-links";const caseLink=document.createElement("a");caseLink.href=`./projects.html#${p.id}`;caseLink.textContent=`${tr("content.caseStudy","Case Study")} →`;links.append(caseLink,createLink("GitHub",p.links[0][1]));body.append(links);}article.append(body);return article;}

function createOtherCard(project,index){const article=document.createElement("article");article.className="project-card";article.append(createVisual(project));const body=document.createElement("div");body.className="project-card-body";body.innerHTML=`<div class="project-meta"><span>${String(index+1).padStart(2,"0")}</span><span class="project-badges"><span>${tr("status.public","Public")}</span></span></div><h3>${project.title}</h3><p class="project-summary">${project.summary}</p>`;body.append(techList(project.technologies));const links=document.createElement("div");links.className="project-links";links.append(createLink("GitHub",project.githubUrl));if(project.demoUrl)links.append(createLink("Demo",project.demoUrl));body.append(links);article.append(body);return article;}

function renderProjects(){const featured=document.getElementById("featured-project-grid"),other=document.getElementById("other-project-grid"),isDetails=document.body.dataset.page==="projects";if(featured){featured.textContent="";const selected=isDetails?featuredProjects:[featuredProjects[3],featuredProjects[0],featuredProjects[1]];selected.forEach((p,i)=>featured.append(createFeaturedCard(p,i,isDetails)));}if(other){other.textContent="";if(apiFallbackUsed){const notice=document.createElement("p");notice.className="project-api-notice";notice.setAttribute("role","status");notice.textContent=tr("projects.apiFallback","GitHub could not be reached. Showing a locally stored list of public projects.");other.append(notice);}otherProjects.forEach((p,i)=>other.append(createOtherCard(p,i)));}}
function renderSkills(){const container=document.getElementById("skills-grid");if(!container)return;container.textContent="";const translations={ja:{"HTML / CSS":"HTML / CSS","Semantic, accessible, and responsive interface design.":"セマンティックでアクセシブルなレスポンシブUI設計。","Data processing, API integration, and interactive interfaces.":"データ処理、API連携、インタラクティブUI。","Divi, WooCommerce, and paid client websites.":"Divi・WooCommerce・有償クライアント案件。","Version control, GitHub Pages, and public releases.":"バージョン管理、GitHub Pages、公開運用。","Metadata, structure, performance, and internal architecture.":"メタ情報、構造、表示速度、内部設計。","Requirements, implementation support, review, and documentation with human oversight.":"要件整理、実装補助、レビュー、文書化を人が確認する形で活用。"},"zh-TW":{"Semantic, accessible, and responsive interface design.":"語意化、無障礙與響應式介面設計。","Data processing, API integration, and interactive interfaces.":"資料處理、API整合與互動介面。","Divi, WooCommerce, and paid client websites.":"Divi、WooCommerce與付費客戶網站。","Version control, GitHub Pages, and public releases.":"版本控制、GitHub Pages與公開發布。","Metadata, structure, performance, and internal architecture.":"中繼資料、結構、效能與站內架構。","Requirements, implementation support, review, and documentation with human oversight.":"在人工審核下運用於需求整理、實作支援、審查與文件。"}};const grid=document.createElement("div");grid.className="skill-group-grid core-skill-grid";coreSkills.forEach(([name,detail])=>{const card=document.createElement("article");card.className="skill-card skill-card-compact";card.innerHTML=`<h3>${name}</h3><p>${translations[language()]?.[detail]||detail}</p>`;grid.append(card);});const working=document.createElement("p");working.className="skill-line";working.innerHTML=`<strong>${tr("skills.alsoWorking","Also working with:")}</strong> Python / Node.js / SQL / REST APIs / Svelte / Docker`;const creative=document.createElement("p");creative.className="skill-line";creative.innerHTML=`<strong>${tr("skills.creativeBackground","Creative background:")}</strong> Photography / Video / Copywriting / Figma`;container.append(grid,working,creative);}

async function loadOtherProjects(){try{const response=await fetch(GITHUB_REPOS_ENDPOINT,{headers:{Accept:"application/vnd.github+json"}});if(!response.ok)throw new Error(response.status);const repos=await response.json();apiFallbackUsed=false;otherProjects=repos.filter(r=>!r.private&&!r.fork&&!featuredRepoNames.has(r.name)).map(r=>({title:r.name,summary:r.description||tr("project.noDescription"),technologies:[r.language,...(r.topics||[])].filter(Boolean),githubUrl:r.html_url,demoUrl:r.homepage||null,image:projectImages[r.name]||null}));renderProjects();}catch(error){console.warn("Public repositories could not be loaded",error);apiFallbackUsed=true;otherProjects=fallbackPublicProjects;renderProjects();}}
function renderAll(){renderSkills();renderProjects();}
document.addEventListener("DOMContentLoaded",()=>{renderAll();loadOtherProjects();});
document.addEventListener("languagechange",renderAll);
