// Curated work may include public repositories, confidential client work, and
// legacy sites. Only the automatic GitHub feed is restricted to public repos.
const GITHUB_USER = "koshijpn";
const GITHUB_REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?type=public&sort=pushed&per_page=100`;

const featuredProjects = [
  {
    id: "corporate-wordpress", title: "Corporate Website", image: null,
    summary: "A paid corporate website delivered from planning through launch.",
    purpose: "Organize existing business information and deliver a responsive corporate website.",
    role: "Planning / Information architecture / WordPress development / Responsive implementation / Basic SEO / Launch",
    result: "Delivered the agreed corporate website scope from planning through production release.",
    currentState: "Published client project · Client and URL confidential",
    technologies: ["WordPress", "Responsive Web Design", "SEO"], status: "client",
    sourceStatus: "Private / Not publicly available", projectValue: "¥300,000 + tax", year: "Confidential",
    links: [],
    translations: {
      ja: { summary: "企画から公開まで担当した、有償の企業Webサイト制作。", purpose: "既存情報を整理し、スマートフォンに対応した企業サイトを構築すること。", role: "企画 / 情報設計 / WordPress実装 / モバイル対応 / 基本SEO / 公開", result: "合意した制作範囲に沿って、企画から本番公開まで一貫して担当。", currentState: "公開済みクライアント案件・社名とURLは非公開", sourceStatus: "Private / 一般公開なし", year: "非公開" },
      "zh-TW": { summary: "從企劃到上線全程負責的付費企業網站專案。", purpose: "整理既有企業資訊，建立支援行動裝置的企業網站。", role: "企劃 / 資訊架構 / WordPress 實作 / 行動版 / 基礎 SEO / 上線", result: "依約定範圍完成從企劃到正式上線的工作。", currentState: "已上線客戶專案・公司名稱與網址不公開", sourceStatus: "Private / 不公開", year: "不公開" }
    }
  },
  {
    id: "photographer-koshi", title: "Photographer Koshi", image: null,
    summary: "A legacy photography portfolio built with WordPress and Divi.",
    purpose: "Present large-format photography and make individual series easy to explore.",
    role: "Planning / Information architecture / Design / WordPress development",
    result: "Built a restrained, image-led portfolio with clear navigation between photography series.",
    currentState: "Legacy website · Archive",
    technologies: ["WordPress", "Divi", "Responsive Web Design"], status: "legacy",
    sourceStatus: "Private / Not publicly available", year: "2023", links: [],
    translations: {
      ja: { summary: "写真作品を大きく見せるために制作したWordPress・Diviベースの旧ポートフォリオ。", purpose: "写真を大きく見せ、各シリーズを探しやすくすること。", role: "企画 / 情報設計 / デザイン / WordPress実装", result: "落ち着いた配色と明確な導線を備えた写真中心のサイトを構築。", currentState: "旧サイト・アーカイブ", sourceStatus: "Private / 一般公開なし" },
      "zh-TW": { summary: "以 WordPress 與 Divi 製作的舊版攝影作品集。", purpose: "以大型影像呈現作品，並讓訪客容易探索各系列。", role: "企劃 / 資訊架構 / 設計 / WordPress 實作", result: "完成具有沉穩配色與清楚系列導覽的攝影網站。", currentState: "舊網站・典藏", sourceStatus: "Private / 不公開" }
    }
  },
  {
    id: "vouvray-huguet", title: "Vouvray Huguet", image: null,
    summary: "A bilingual e-commerce website developed for a French winery.",
    purpose: "Present winery information in English and French and organize products into a usable online shop.",
    role: "Web development / WordPress implementation / Divi customization / Shop pages",
    result: "Implemented the Home, About, and Shop areas with categorized wine products and multilingual content.",
    currentState: "Legacy client website",
    technologies: ["WordPress", "Divi", "WooCommerce", "Multilingual Content"], status: "client",
    sourceStatus: "Private / Not publicly available", year: "2021", links: [],
    translations: {
      ja: { summary: "フランスのワイナリー向けに開発した英語・フランス語対応のECサイト。", purpose: "ワイナリー情報を英語・フランス語で伝え、商品を分類して購入できる構成をつくること。", role: "Web開発 / WordPress実装 / Diviカスタマイズ / 商品ページ構築", result: "Home、About、Shopを実装し、ワインの商品分類と多言語コンテンツを整備。", currentState: "クライアント案件・旧サイト", sourceStatus: "Private / 一般公開なし" },
      "zh-TW": { summary: "為法國酒莊開發的英法雙語電商網站。", purpose: "以英語與法語呈現酒莊資訊，並建立可分類瀏覽及購買商品的商店。", role: "網站開發 / WordPress 實作 / Divi 客製 / 商店頁面", result: "完成 Home、About、Shop，並整理葡萄酒商品分類與多語言內容。", currentState: "客戶專案・舊網站", sourceStatus: "Private / 不公開" }
    }
  },
  {
    id: "sleep-late-lab-legacy", title: "SLEEP LATE LAB — First Website", image: null,
    summary: "The first SLEEP LATE LAB website, built to communicate its early business activities.",
    purpose: "Create a compact business website connected to the studio's printed identity and QR-based contact path.",
    role: "Planning / Information architecture / Design / WordPress development",
    result: "Published a minimal site presenting the studio's early leather-goods and web-development activities.",
    currentState: "Legacy website · Archive",
    technologies: ["WordPress", "Divi", "Responsive Web Design"], status: "legacy",
    sourceStatus: "Private / Not publicly available", year: "2021", links: [],
    translations: {
      ja: { summary: "初期の事業内容を伝えるために制作した、SLEEP LATE LABの最初のWebサイト。", purpose: "印刷物のブランド表現とQRコードの問い合わせ導線をつなぐ、簡潔な事業サイトをつくること。", role: "企画 / 情報設計 / デザイン / WordPress実装", result: "革製品とWeb開発を扱っていた初期の活動内容を、ミニマルな構成で公開。", currentState: "旧サイト・アーカイブ", sourceStatus: "Private / 一般公開なし" },
      "zh-TW": { summary: "為呈現早期業務而製作的 SLEEP LATE LAB 初代網站。", purpose: "建立連結印刷品牌識別與 QR Code 聯絡流程的精簡商業網站。", role: "企劃 / 資訊架構 / 設計 / WordPress 實作", result: "以極簡架構公開早期皮革製品與網站開發業務。", currentState: "舊網站・典藏", sourceStatus: "Private / 不公開" }
    }
  },
  {
    id: "next-jobs", title: "Next Jobs", image: ["./img/projects/next-jobs.png", 1080, 675],
    summary: "A SvelteKit job-listing interface connected to a PocketBase API.",
    purpose: "Make PocketBase job data easier to browse through a focused, responsive interface.",
    role: "UI design / SvelteKit front-end / PocketBase API integration",
    result: "Implemented responsive job-listing flows with a SvelteKit front-end and PocketBase endpoints.",
    currentState: "Public portfolio prototype",
    technologies: ["SvelteKit", "Svelte", "PocketBase API"], status: "prototype",
    links: [["Frontend", "https://github.com/koshijpn/next-jobs-frontend"], ["Backend", "https://github.com/koshijpn/next-jobs-backend"]],
    translations: {
      ja: { summary: "PocketBase APIと接続するSvelteKit製の求人一覧インターフェース。", purpose: "PocketBaseから取得した求人情報を、レスポンシブUIで見やすく提示します。", role: "UI設計 / SvelteKitフロントエンド / PocketBase API連携", result: "SvelteKitとPocketBase endpointsを用いて、レスポンシブな求人一覧導線を実装。", currentState: "公開ポートフォリオ用プロトタイプ" },
      "zh-TW": { summary: "連接 PocketBase API 的 SvelteKit 職缺列表介面。", purpose: "以響應式介面清楚呈現 PocketBase 提供的職缺資料。", role: "UI設計 / SvelteKit 前端 / PocketBase API 整合", result: "以 SvelteKit 與 PocketBase endpoints 完成響應式職缺列表流程。", currentState: "公開作品集原型" }
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
    id: "developer-portfolio", title: "Developer Portfolio", image: ["./img/projects/developer-portfolio.jpg", 1265, 712],
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
const caseStudyPaths = { "developer-portfolio":"./projects/portfolio/", "next-jobs":"./projects/next-jobs/", "next-ecomm":"./projects/next-ecomm/" };
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
const projectUiLabels = {
  en: { "status.client": "Client Work", "status.legacy": "Legacy" },
  ja: { "status.client": "クライアント案件", "status.legacy": "旧サイト" },
  "zh-TW": { "status.client": "客戶專案", "status.legacy": "舊網站" }
};
const tr = (key, fallback = key) => window.getTranslation?.(key) || projectUiLabels[language()]?.[key] || fallback;
const language = () => window.getCurrentLanguage?.() || "ja";
const projectSummaryKeys = {"corporate-wordpress":"project.corporate","photographer-koshi":"project.photographer","next-jobs":"project.jobs","next-ecomm":"project.ecommerce","luno-premium":"project.luno","developer-portfolio":"project.portfolio"};
const localized = (project) => {
  const direct = project.translations?.[language()];
  if (direct) return { ...project, ...direct };
  const summaryKey = projectSummaryKeys[project.id];
  return { ...project, summary: summaryKey ? tr(summaryKey, project.summary) : project.summary };
};

function createLink(label, url) { const a=document.createElement("a"); a.href=url; a.target="_blank"; a.rel="noopener noreferrer"; a.textContent=`${label} ↗`; return a; }
function createVisual(project) { const v=document.createElement("div"); v.className="project-visual project-visual-placeholder"; if(project.image){const [src,w,h]=project.image;const img=document.createElement("img");img.src=src;img.width=w;img.height=h;img.loading="lazy";img.decoding="async";img.alt=`${project.title} ${language()==="ja"?"プロジェクト画面":language()==="zh-TW"?"專案畫面":"project preview"}`;v.classList.remove("project-visual-placeholder");v.append(img);}else{v.setAttribute("aria-hidden","true");v.textContent=project.title.slice(0,2).toUpperCase();}return v; }
function techList(items){const ul=document.createElement("ul");ul.className="tech-list";items.forEach(x=>{const li=document.createElement("li");li.textContent=x;ul.append(li);});return ul;}

function createFeaturedCard(source,index,detailed=false){const p=localized(source),article=document.createElement("article");article.id=p.id;article.className="project-card project-card-featured";article.append(createVisual(p));const body=document.createElement("div");body.className="project-card-body";const sourceBadge=p.sourceStatus?.startsWith("Private")?"Private":p.links.some(([,url])=>url.includes("github.com/"))?"GitHub Public":"";body.innerHTML=`<div class="project-meta"><span>${String(index+1).padStart(2,"0")}</span><span class="project-badges"><span>${tr(`status.${p.status}`,p.status)}</span>${sourceBadge?`<span>${sourceBadge}</span>`:""}</span></div><h3>${p.title}</h3><p class="project-summary">${p.summary}</p>`;if(detailed){body.insertAdjacentHTML("beforeend",`<dl class="project-facts"><div><dt>${tr("project.purpose","Purpose")}</dt><dd>${p.purpose}</dd></div><div><dt>${tr("project.role","Role")}</dt><dd>${p.role}</dd></div><div><dt>${tr("project.result","Result")}</dt><dd>${p.result}</dd></div><div><dt>${tr("project.currentState","Current state")}</dt><dd>${p.currentState}</dd></div><div><dt>${tr("project.tech","Technologies")}</dt><dd class="project-tech-slot"></dd></div><div><dt>Source code</dt><dd>${p.sourceStatus||"Public repository"}</dd></div>${p.projectValue?`<div><dt>Project value</dt><dd>${p.projectValue}</dd></div>`:""}${p.year?`<div><dt>${tr("project.year","Year")}</dt><dd>${p.year}</dd></div>`:""}<div><dt>${tr("project.repositories","Links")}</dt><dd class="project-repo-slot"></dd></div></dl>`);body.querySelector(".project-tech-slot").append(techList(p.technologies));const repositories=body.querySelector(".project-repo-slot");if(p.links.length)p.links.forEach(([label,url])=>repositories.append(createLink(label,url)));else repositories.textContent=p.sourceStatus||"Not publicly available";}else{body.append(techList(p.technologies.slice(0,3)));const facts=document.createElement("dl");facts.className="project-facts project-facts-compact";facts.innerHTML=`<div><dt>${tr("project.role","Role")}</dt><dd>${p.role}</dd></div><div><dt>${tr("project.currentState","Status")}</dt><dd>${p.currentState}</dd></div>`;body.append(facts);const links=document.createElement("div");links.className="project-links";const caseLink=document.createElement("a");caseLink.href=caseStudyPaths[p.id]||`./projects.html#${p.id}`;caseLink.textContent=`${tr("content.caseStudy","Case Study")} →`;links.append(caseLink);if(p.links[0])links.append(createLink(p.links[0][0],p.links[0][1]));body.append(links);}article.append(body);return article;}

function createOtherCard(project,index){const article=document.createElement("article");article.className="project-card";article.append(createVisual(project));const body=document.createElement("div");body.className="project-card-body";body.innerHTML=`<div class="project-meta"><span>${String(index+1).padStart(2,"0")}</span><span class="project-badges"><span>${tr("status.public","Public")}</span></span></div><h3>${project.title}</h3><p class="project-summary">${project.summary}</p>`;body.append(techList(project.technologies));const links=document.createElement("div");links.className="project-links";links.append(createLink("GitHub",project.githubUrl));if(project.demoUrl)links.append(createLink("Demo",project.demoUrl));body.append(links);article.append(body);return article;}

function renderProjects(){const featured=document.getElementById("featured-project-grid"),other=document.getElementById("other-project-grid"),isDetails=document.body.dataset.page==="projects";if(featured){featured.textContent="";const selected=isDetails?featuredProjects:[featuredProjects.find(p=>p.id==="developer-portfolio"),featuredProjects.find(p=>p.id==="corporate-wordpress"),featuredProjects.find(p=>p.id==="next-jobs")].filter(Boolean);selected.forEach((p,i)=>featured.append(createFeaturedCard(p,i,isDetails)));}if(other){other.textContent="";if(apiFallbackUsed){const notice=document.createElement("p");notice.className="project-api-notice";notice.setAttribute("role","status");notice.textContent=tr("projects.apiFallback","GitHub could not be reached. Showing a locally stored list of public projects.");other.append(notice);}otherProjects.forEach((p,i)=>other.append(createOtherCard(p,i)));}}
function renderSkills(){const container=document.getElementById("skills-grid");if(!container)return;container.textContent="";const translations={ja:{"HTML / CSS":"HTML / CSS","Semantic, accessible, and responsive interface design.":"セマンティックでアクセシブルなレスポンシブUI設計。","Data processing, API integration, and interactive interfaces.":"データ処理、API連携、インタラクティブUI。","Divi, WooCommerce, and paid client websites.":"Divi・WooCommerce・有償クライアント案件。","Version control, GitHub Pages, and public releases.":"バージョン管理、GitHub Pages、公開運用。","Metadata, structure, performance, and internal architecture.":"メタ情報、構造、表示速度、内部設計。","Requirements, implementation support, review, and documentation with human oversight.":"要件整理、実装補助、レビュー、文書化を人が確認する形で活用。"},"zh-TW":{"Semantic, accessible, and responsive interface design.":"語意化、無障礙與響應式介面設計。","Data processing, API integration, and interactive interfaces.":"資料處理、API整合與互動介面。","Divi, WooCommerce, and paid client websites.":"Divi、WooCommerce與付費客戶網站。","Version control, GitHub Pages, and public releases.":"版本控制、GitHub Pages與公開發布。","Metadata, structure, performance, and internal architecture.":"中繼資料、結構、效能與站內架構。","Requirements, implementation support, review, and documentation with human oversight.":"在人工審核下運用於需求整理、實作支援、審查與文件。"}};const grid=document.createElement("div");grid.className="skill-group-grid core-skill-grid";coreSkills.forEach(([name,detail])=>{const card=document.createElement("article");card.className="skill-card skill-card-compact";card.innerHTML=`<h3>${name}</h3><p>${translations[language()]?.[detail]||detail}</p>`;grid.append(card);});const working=document.createElement("p");working.className="skill-line";working.innerHTML=`<strong>${tr("skills.alsoWorking","Also working with:")}</strong> Python / Node.js / SQL / REST APIs / Svelte / Docker`;const creative=document.createElement("p");creative.className="skill-line";creative.innerHTML=`<strong>${tr("skills.creativeBackground","Creative background:")}</strong> Photography / Video / Copywriting / Figma`;container.append(grid,working,creative);}

async function loadOtherProjects(){if(!document.getElementById("other-project-grid"))return;try{const response=await fetch(GITHUB_REPOS_ENDPOINT,{headers:{Accept:"application/vnd.github+json"}});if(!response.ok)throw new Error(response.status);const repos=await response.json();apiFallbackUsed=false;otherProjects=repos.filter(r=>!r.private&&!r.fork&&!featuredRepoNames.has(r.name)).map(r=>({title:r.name,summary:r.description||tr("project.noDescription"),technologies:[r.language,...(r.topics||[])].filter(Boolean),githubUrl:r.html_url,demoUrl:r.homepage||null,image:projectImages[r.name]||null}));renderProjects();}catch(error){console.warn("Public repositories could not be loaded",error);apiFallbackUsed=true;otherProjects=fallbackPublicProjects;renderProjects();}}
function renderAll(){renderSkills();renderProjects();}
document.addEventListener("DOMContentLoaded",()=>{renderAll();loadOtherProjects();});
document.addEventListener("languagechange",renderAll);
