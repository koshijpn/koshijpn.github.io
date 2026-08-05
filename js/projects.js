// Skills and public GitHub repositories are rendered from data.
// Repository cards use GitHub's public API, so private repositories can never
// be returned to or displayed by this page.
const GITHUB_USER = "koshijpn";
const GITHUB_REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?type=public&sort=pushed&per_page=100`;
const FEATURED_REPOSITORY_LIMIT = 5;
const EXPERIMENT_TOPICS = new Set(["experiment", "prototype", "learning", "study"]);
const PROJECT_IMAGES = {
  "next-ecomm-frontend": { src: "./img/projects/next-ecomm.png", width: 1080, height: 675 },
  "next-ecomm-backend": { src: "./img/projects/next-ecomm.png", width: 1080, height: 675 },
  "next-jobs-frontend": { src: "./img/projects/next-jobs.png", width: 1080, height: 675 },
  "next-jobs-backend": { src: "./img/projects/next-jobs.png", width: 1080, height: 675 },
  "Project_Luno_Premium": { src: "./img/projects/luno-premium.png", width: 1080, height: 396 },
  "email-automator": { src: "./img/projects/email-automator.png", width: 1080, height: 675 },
  "koshijpn.github.io": { src: "./img/projects/developer-portfolio.png", width: 1024, height: 423 }
};

const skillGroups = [
  {
    id: "primary",
    skills: [
      ["HTML", "Semantic markup · Accessibility", ["koshijpn.github.io"]],
      ["CSS", "Responsive UI · Modern layouts", ["koshijpn.github.io"]],
      ["JavaScript", "Interactive UI · Data processing", ["Project_Luno_Premium", "email-automator"]],
      ["WordPress", "Client sites · Divi · WooCommerce", []],
      ["Git / GitHub", "Version control · GitHub Pages", ["koshijpn.github.io"]],
      ["Responsive Design", "Mobile-first interfaces", ["koshijpn.github.io", "next-jobs-frontend", "next-ecomm-frontend"]],
      ["SEO", "Metadata · Structure · Performance", ["koshijpn.github.io"]],
      ["AI-Assisted Development", "AI-supported planning · Coding · Review", ["koshijpn.github.io"]]
    ]
  },
  {
    id: "working",
    skills: [
      ["Python", "Automation · Data collection · Flask", []],
      ["Node.js", "Automation · Server-side JavaScript", ["email-automator"]],
      ["SQL", "SQLite · Cloudflare D1", []],
      ["APIs", "REST APIs · External data integration", ["Project_Luno_Premium"]],
      ["Svelte", "Component-based front-end development", ["next-jobs-frontend", "next-ecomm-frontend"]],
      ["Docker", "Containerized development", ["next-jobs-backend"]],
      ["Bash / Command Line", "Shell scripting · Development workflows", []],
      ["Bootstrap", "Responsive component-based layouts", []]
    ]
  },
  {
    id: "creative",
    skills: [
      ["Photography", "Visual direction · Image editing", []],
      ["Video Editing", "Premiere Pro · Final Cut Pro", []],
      ["Copywriting", "Clear multilingual content", []],
      ["Graphic Design", "Figma · Canva · Photoshop", []]
    ]
  }
];

const skillTranslations = {
  ja: {
    "Semantic markup · Accessibility":"セマンティックHTML・アクセシビリティ","Responsive UI · Modern layouts":"レスポンシブUI・モダンレイアウト","Interactive UI · Data processing":"インタラクティブUI・データ処理","Client sites · Divi · WooCommerce":"クライアントサイト・Divi・WooCommerce","Version control · GitHub Pages":"バージョン管理・GitHub Pages","Mobile-first interfaces":"モバイルファースト設計","Metadata · Structure · Performance":"メタデータ・構造・パフォーマンス","AI-supported planning · Coding · Review":"AIを活用した企画・実装・レビュー","Automation · Data collection · Flask":"自動化・データ収集・Flask","Automation · Server-side JavaScript":"自動化・サーバーサイドJavaScript","SQLite · Cloudflare D1":"SQLite・Cloudflare D1","REST APIs · External data integration":"REST API・外部データ連携","Component-based front-end development":"コンポーネント型フロントエンド開発","Containerized development":"コンテナ開発","Shell scripting · Development workflows":"シェルスクリプト・開発ワークフロー","Responsive component-based layouts":"レスポンシブなコンポーネント設計","Visual direction · Image editing":"ビジュアル設計・画像編集","Premiere Pro · Final Cut Pro":"Premiere Pro・Final Cut Pro","Clear multilingual content":"分かりやすい多言語コンテンツ","Figma · Canva · Photoshop":"Figma・Canva・Photoshop"
  },
  "zh-TW": {
    "Semantic markup · Accessibility":"語意化標記・無障礙設計","Responsive UI · Modern layouts":"響應式介面・現代版面","Interactive UI · Data processing":"互動介面・資料處理","Client sites · Divi · WooCommerce":"客戶網站・Divi・WooCommerce","Version control · GitHub Pages":"版本控制・GitHub Pages","Mobile-first interfaces":"行動優先介面","Metadata · Structure · Performance":"中繼資料・結構・效能","AI-supported planning · Coding · Review":"運用AI進行企劃・開發・程式審查","Automation · Data collection · Flask":"自動化・資料收集・Flask","Automation · Server-side JavaScript":"自動化・伺服器端JavaScript","SQLite · Cloudflare D1":"SQLite・Cloudflare D1","REST APIs · External data integration":"REST API・外部資料整合","Component-based front-end development":"元件式前端開發","Containerized development":"容器化開發","Shell scripting · Development workflows":"Shell腳本・開發流程","Responsive component-based layouts":"響應式元件版面","Visual direction · Image editing":"視覺指導・圖片編輯","Premiere Pro · Final Cut Pro":"Premiere Pro・Final Cut Pro","Clear multilingual content":"清楚的多語言內容","Figma · Canva · Photoshop":"Figma・Canva・Photoshop"
  }
};

let publicProjects = [];

function translation(key, fallback = key) {
  return window.getTranslation?.(key) || fallback;
}

function localizedSkillDetail(detail) {
  const language = window.getCurrentLanguage?.() || "en";
  return skillTranslations[language]?.[detail] || detail;
}

function projectPreviewLabel() {
  const language = window.getCurrentLanguage?.() || "ja";
  return language === "ja" ? "プロジェクト画面" : language === "zh-TW" ? "專案畫面" : "project preview";
}

function repositoryCategory(repository, featuredIndex) {
  const topics = repository.topics || [];
  if (topics.some((topic) => EXPERIMENT_TOPICS.has(topic.toLowerCase()))) return "experiment";
  return featuredIndex < FEATURED_REPOSITORY_LIMIT ? "featured" : "other";
}

function repositoryToProject(repository, featuredIndex) {
  const topics = repository.topics || [];
  const technologies = [...new Set([repository.language, ...topics].filter(Boolean))];
  return {
    id: repository.name,
    title: repository.name,
    category: repositoryCategory(repository, featuredIndex),
    summary: repository.description || translation("project.noDescription", "Description is being prepared."),
    technologies,
    status: repository.archived ? "archived" : "public",
    githubUrl: repository.html_url,
    demoUrl: repository.homepage || null,
    updatedAt: repository.pushed_at,
    stars: repository.stargazers_count || 0,
    image: PROJECT_IMAGES[repository.name] || null
  };
}

function createLink(labelKey, url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = `${translation(labelKey)} ↗`;
  return link;
}

function createProjectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card project-card-public";
  article.dataset.projectId = project.id;

  const visual = document.createElement("div");
  visual.className = "project-visual project-visual-placeholder";
  if (project.image) {
    const image = document.createElement("img");
    image.src = project.image.src;
    image.alt = `${project.title} ${projectPreviewLabel()}`;
    image.width = project.image.width;
    image.height = project.image.height;
    image.loading = "lazy";
    image.decoding = "async";
    visual.classList.remove("project-visual-placeholder");
    visual.append(image);
  } else {
    visual.setAttribute("aria-hidden", "true");
    visual.textContent = project.title.slice(0, 2).toUpperCase();
  }

  const body = document.createElement("div");
  body.className = "project-card-body";

  const meta = document.createElement("div");
  meta.className = "project-meta";
  const number = document.createElement("span");
  number.textContent = String(index + 1).padStart(2, "0");
  const badge = document.createElement("span");
  badge.className = "project-badges";
  badge.innerHTML = `<span>${translation(`status.${project.status}`, project.status)}</span>`;
  meta.append(number, badge);

  const title = document.createElement("h3");
  title.textContent = project.title;
  const summary = document.createElement("p");
  summary.className = "project-summary";
  summary.textContent = project.summary;

  const technologyList = document.createElement("ul");
  technologyList.className = "tech-list";
  technologyList.setAttribute("aria-label", translation("project.technologies", "Technologies"));
  const technologies = project.technologies.length ? project.technologies : [translation("project.notSpecified", "Not specified")];
  technologies.forEach((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    technologyList.append(item);
  });

  const details = document.createElement("p");
  details.className = "project-updated";
  const formattedDate = new Intl.DateTimeFormat(document.documentElement.lang || "en", { year: "numeric", month: "short" }).format(new Date(project.updatedAt));
  details.textContent = `${translation("project.updated", "Updated")} ${formattedDate}${project.stars ? ` · ★ ${project.stars}` : ""}`;

  const links = document.createElement("div");
  links.className = "project-links";
  links.append(createLink("project.github", project.githubUrl));
  if (project.demoUrl) links.append(createLink("project.demo", project.demoUrl));

  body.append(meta, title, summary, technologyList, details, links);
  article.append(visual, body);
  return article;
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;
  container.textContent = "";
  skillGroups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "skill-group";
    const heading = document.createElement("h3");
    heading.textContent = translation(`skills.${group.id}`, group.id);
    const grid = document.createElement("div");
    grid.className = "skill-group-grid";
    group.skills.forEach(([name, detail, repositoryNames]) => {
      const card = document.createElement("article");
      card.className = "skill-card";
      const title = document.createElement("h4");
      title.textContent = name;
      const copy = document.createElement("p");
      copy.textContent = localizedSkillDetail(detail);
      card.append(title, copy);
      if (repositoryNames.length) {
        const related = document.createElement("small");
        related.textContent = `${translation("skills.usedIn", "Used in")}: ${repositoryNames.join(", ")}`;
        card.append(related);
      }
      grid.append(card);
    });
    section.append(heading, grid);
    container.append(section);
  });
}

function setSectionVisibility(category, hasProjects) {
  const sectionId = category === "featured" ? "featured-projects" : category === "other" ? "other-projects" : "experiments";
  const section = document.getElementById(sectionId);
  if (section) section.hidden = !hasProjects;
  document.querySelectorAll(`a[href="#${sectionId}"]`).forEach((link) => {
    link.closest("li")?.toggleAttribute("hidden", !hasProjects);
  });
}

function renderProjects() {
  const targets = {
    featured: document.getElementById("featured-project-grid"),
    other: document.getElementById("other-project-grid"),
    experiment: document.getElementById("experiment-project-grid")
  };
  Object.entries(targets).forEach(([category, target]) => {
    if (!target) return;
    target.textContent = "";
    const projects = publicProjects.filter((project) => project.category === category);
    projects.forEach((project, index) => target.append(createProjectCard(project, index)));
    setSectionVisibility(category, projects.length > 0);
  });
}

function showRepositoryMessage(key) {
  const target = document.getElementById("featured-project-grid");
  if (!target) return;
  target.innerHTML = "";
  const message = document.createElement("p");
  message.className = "project-message";
  message.textContent = translation(key);
  target.append(message);
  setSectionVisibility("featured", true);
  setSectionVisibility("other", false);
  setSectionVisibility("experiment", false);
}

async function loadPublicRepositories() {
  showRepositoryMessage("projects.loading");
  try {
    const response = await fetch(GITHUB_REPOS_ENDPOINT, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
    const repositories = await response.json();
    const ownedRepositories = repositories.filter((repository) => !repository.private && !repository.fork);
    let featuredIndex = 0;
    publicProjects = ownedRepositories.map((repository) => {
      const project = repositoryToProject(repository, featuredIndex);
      if (project.category !== "experiment") featuredIndex += 1;
      return project;
    });
    if (!publicProjects.length) return showRepositoryMessage("projects.empty");
    renderProjects();
  } catch (error) {
    console.warn("Public repositories could not be loaded.", error);
    showRepositoryMessage("projects.error");
  }
}

function renderPortfolioContent() {
  renderSkills();
  if (publicProjects.length) renderProjects();
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  loadPublicRepositories();
});
document.addEventListener("languagechange", renderPortfolioContent);
