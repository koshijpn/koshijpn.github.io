// Public GitHub activity only. No token, private repository, or personal data is requested.
const githubUser = "koshijpn";
const githubApi = "https://api.github.com";
let githubLoading = false;

function githubTranslation(key, fallback) {
  return window.getTranslation?.(key) || fallback;
}

function githubDate(value) {
  const locale = window.getCurrentLanguage?.() === "ja" ? "ja-JP" : window.getCurrentLanguage?.() === "zh-TW" ? "zh-TW" : "en";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(value));
}

function metricBlock(label, value) {
  const block = document.createElement("div");
  const term = document.createElement("dt");
  const definition = document.createElement("dd");
  term.textContent = label;
  definition.textContent = value;
  block.append(term, definition);
  return block;
}

async function loadGitHubDashboard() {
  const container = document.getElementById("github-metrics");
  if (!container || githubLoading) return;
  githubLoading = true;
  const heroRepoCount = document.getElementById("hero-public-repos");
  if (heroRepoCount) heroRepoCount.textContent = "—";
  try {
    const headers = { Accept: "application/vnd.github+json" };
    const reposResponse = await fetch(`${githubApi}/users/${githubUser}/repos?type=public&sort=pushed&per_page=100`, { headers });
    if (!reposResponse.ok) throw new Error(`GitHub repositories: ${reposResponse.status}`);
    const repos = (await reposResponse.json()).filter((repo) => !repo.private && !repo.fork);
    const latestRepo = repos[0];
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    let latestCommit = latestRepo ? githubDate(latestRepo.pushed_at) : "—";
    if (latestRepo) {
      const commitResponse = await fetch(`${githubApi}/repos/${githubUser}/${latestRepo.name}/commits?per_page=1`, { headers });
      if (commitResponse.ok) {
        const commits = await commitResponse.json();
        const commitDate = commits[0]?.commit?.committer?.date;
        if (commitDate) latestCommit = githubDate(commitDate);
      }
    }
    if (heroRepoCount) heroRepoCount.textContent = String(repos.length);
    const allowedLanguages = new Set(["JavaScript", "TypeScript", "Svelte", "HTML", "CSS", "Python", "PHP"]);
    const languageCounts = repos.reduce((counts, repo) => {
      if (repo.language && allowedLanguages.has(repo.language)) counts[repo.language] = (counts[repo.language] || 0) + 1;
      return counts;
    }, {});
    const languages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name]) => name).join(" · ") || "—";

    container.textContent = "";
    const metrics = document.createElement("dl");
    metrics.className = "github-metric-list";
    metrics.append(
      metricBlock(githubTranslation("github.publicRepos", "Public repositories"), String(repos.length)),
      metricBlock(githubTranslation("github.stars", "Stars"), String(totalStars)),
      metricBlock(githubTranslation("github.forks", "Forks"), String(totalForks)),
      metricBlock(githubTranslation("github.languages", "Primary languages"), languages),
      metricBlock(githubTranslation("github.latestCommit", "Latest commit"), latestCommit),
      metricBlock(githubTranslation("github.lastSynced", "Last synced"), githubDate(new Date().toISOString()))
    );

    const recent = document.createElement("div");
    recent.className = "github-recent";
    const heading = document.createElement("h3");
    heading.textContent = githubTranslation("github.recent", "Recently updated");
    const list = document.createElement("ul");
    repos.slice(0, 3).forEach((repo) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const time = document.createElement("time");
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = repo.name;
      time.dateTime = repo.pushed_at;
      time.textContent = githubDate(repo.pushed_at);
      item.append(link, time);
      list.append(item);
    });
    recent.append(heading, list);

    container.append(metrics, recent);
  } catch (error) {
    console.warn("GitHub dashboard could not be loaded", error);
    container.textContent = "";
    const fallback = document.createElement("p");
    fallback.setAttribute("role", "status");
    fallback.textContent = githubTranslation("github.fallback", "GitHub data is temporarily unavailable. Public repositories remain available on the GitHub profile.");
    const link = document.createElement("a");
    link.className = "text-link";
    link.href = `https://github.com/${githubUser}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "GitHub →";
    container.append(fallback, link);
  } finally {
    githubLoading = false;
  }
}

document.addEventListener("DOMContentLoaded", loadGitHubDashboard);
document.addEventListener("languagechange", loadGitHubDashboard);
