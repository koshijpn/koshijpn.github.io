// Qualifications and course completions. Evidence links are intentionally not published.
const certificationGroups = [
  { id: "technology", items: [
    ["Codecademy Back-End Engineer", "2024-02-03"], ["Codecademy Full-Stack Engineer", "2024-02-03"],
    ["Codecademy Front-End Engineer", "2024-02-01"], ["NEXT ACADEMY Full-Stack Web Development Bootcamp", "2023-07"],
    ["Codecademy Learn Bash Scripting", "2023-06-19"], ["Codecademy Learn the Command Line", "2023-06-19"],
    ["Codecademy Learn CSS", "2022-05-19"],
    ["Codecademy Learn Bootstrap", "2020-11-12"], ["Coursera Use WordPress to Create a Blog for Your Business", "2020-11-05"],
    ["Udemy はじめてのデジタルマーケティング（Google）", "2020-10-29"], ["Udemy はじめての働き方改革（Google）", "2020-10-29"],
    ["Codecademy Learn HTML", "2020-10-27"], ["Sololearn HTML Course", "2020-10-27"], ["Udemy はじめてのAI（Google）", "2019-09-28"]
  ]},
  { id: "creative", items: [
    ["Adobe Creative College: Premiere Pro", "2023-04-30"], ["Web Courses Bangkok Photography Essentials", "2020-11"],
    ["Coursera Fundamentals of Graphic Design", "2020-10-30"],
    ["Web Courses Bangkok Professional Web Design and Management", "2020-12-22"]
  ]}
];

const featuredCredentials = [
  ["NEXT ACADEMY Full-Stack Web Development Bootcamp", "2023-07"],
  ["Codecademy Full-Stack Engineer", "2024-02-03"],
  ["Web Courses Bangkok Professional Web Design and Management", "2020-12-22"]
];

function renderCertifications() {
  const container = document.getElementById("certification-groups");
  if (!container) return;
  container.textContent = "";
  certificationGroups.forEach((group, index) => {
    const details = document.createElement("details");
    details.className = "certification-group";
    if (index === 0) details.open = true;
    const summary = document.createElement("summary");
    summary.innerHTML = `<span>${window.getTranslation?.(`certifications.${group.id}`) || group.id}</span><small>${group.items.length}</small>`;
    const list = document.createElement("ul");
    group.items.forEach(([name, date]) => {
      const item = document.createElement("li");
      const title = document.createElement("span");
      title.textContent = name;
      const time = document.createElement("time");
      time.textContent = date;
      item.append(title, time);
      list.append(item);
    });
    details.append(summary, list);
    container.append(details);
  });
}

function renderFeaturedCredentials() {
  const container = document.getElementById("featured-credentials");
  if (!container) return;
  container.textContent = "";
  featuredCredentials.forEach(([name, date]) => {
    const article = document.createElement("article");
    article.innerHTML = `<h3>${name}</h3><time>${date}</time>`;
    container.append(article);
  });
}

document.addEventListener("DOMContentLoaded", () => { renderFeaturedCredentials(); renderCertifications(); });
document.addEventListener("languagechange", () => { renderFeaturedCredentials(); renderCertifications(); });
