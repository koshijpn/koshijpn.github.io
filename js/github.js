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
  try {
    const headers = { Accept: "application/vnd.github+json" };
    const [reposResponse, eventsResponse] = await Promise.all([
      fetch(`${githubApi}/users/${githubUser}/repos?type=public&sort=pushed&per_page=100`, { headers }),
      fetch(`${githubApi}/users/${githubUser}/events/public?per_page=30`, { headers })
    ]);
    if (!reposResponse.ok) throw new Error(`GitHub repositories: ${reposResponse.status}`);
    const repos = (await reposResponse.json()).filter((repo) => !repo.private && !repo.fork);
    const events = eventsResponse.ok ? await eventsResponse.json() : [];
    const push = events.find((event) => event.type === "PushEvent" && event.payload?.commits?.length);
    const latestRepo = repos[0];
    const languageCounts = repos.reduce((counts, repo) => {
      if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
      return counts;
    }, {});
    const languages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name]) => name).join(" · ") || "—";

    container.textContent = "";
    const metrics = document.createElement("dl");
    metrics.className = "github-metric-list";
    metrics.append(
      metricBlock(githubTranslation("github.publicRepos", "Public repositories"), String(repos.length)),
      metricBlock(githubTranslation("github.languages", "Primary languages"), languages),
      metricBlock(githubTranslation("github.latestActivity", "Latest public activity"), push ? githubDate(push.created_at) : latestRepo ? githubDate(latestRepo.pushed_at) : "—")
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

    if (push) {
      const commit = document.createElement("p");
      commit.className = "github-latest-commit";
      const message = push.payload.commits[push.payload.commits.length - 1]?.message?.split("\n")[0];
      commit.textContent = `${githubTranslation("github.latestCommit", "Latest commit")}: ${message || push.repo.name}`;
      recent.append(commit);
    }
    container.append(metrics, recent);
  } catch (error) {
    console.warn("GitHub dashboard could not be loaded", error);
    container.textContent = "";
    const fallback = document.createElement("p");
    fallback.setAttribute("role", "status");
    fallback.textContent = githubTranslation("github.fallback", "GitHub data is temporarily unavailable. Public repositories remain available on the GitHub profile.");
    container.append(fallback);
  } finally {
    githubLoading = false;
  }
}

document.addEventListener("DOMContentLoaded", loadGitHubDashboard);
document.addEventListener("languagechange", loadGitHubDashboard);
