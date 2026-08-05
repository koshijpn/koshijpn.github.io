// Qualifications and course completions. Evidence links are intentionally not published.
const certificationGroups = [
  { id: "languages", items: [
    ["TOEIC L&R 660", "2025-09-21"], ["華語文能力測驗（TOCFL）進階級 Level 3", "2025-09-27"],
    ["Busuu Korean Level A2", "2024-02-17"], ["Babbel The Russian Alphabet Course", "2023-02-25"],
    ["Babbel The Russian Course: Newcomer (A1) – Course 1", "2023-02-24"], ["Duolingo English Test 105", "2022-09-30"],
    ["Coursera 是誰在說話—可愛的臺灣（Intermediate Chinese）", "2020-11-07"], ["TOEFL iBT 64", "2017-04-01"],
    ["英語応対能力検定 A評価", "2017-06"], ["実用英語技能検定 準2級", "2014-07-11"], ["日本漢字能力検定 四級", "2011-07-06"]
  ]},
  { id: "education", items: [
    ["社会調査士（一般社団法人 社会調査協会）", "2024-12-20"], ["認定心理士（公益社団法人 日本心理学会）", "2024-12-07"],
    ["大手前大学 日本語教員養成課程 修了", "2024-09-30"]
  ]},
  { id: "technology", items: [
    ["Codecademy Back-End Engineer", "2024-02-03"], ["Codecademy Full-Stack Engineer", "2024-02-03"],
    ["Codecademy Front-End Engineer", "2024-02-01"], ["NEXT ACADEMY Full-Stack Web Development Bootcamp", "2023-07"],
    ["Codecademy Learn Bash Scripting", "2023-06-19"], ["Codecademy Learn the Command Line", "2023-06-19"],
    ["Adobe Creative College: Premiere Pro", "2023-04-30"], ["Codecademy Learn CSS", "2022-05-19"],
    ["Codecademy Learn Bootstrap", "2020-11-12"], ["Coursera Use WordPress to Create a Blog for Your Business", "2020-11-05"],
    ["Udemy はじめてのデジタルマーケティング（Google）", "2020-10-29"], ["Udemy はじめての働き方改革（Google）", "2020-10-29"],
    ["Codecademy Learn HTML", "2020-10-27"], ["Sololearn HTML Course", "2020-10-27"], ["Udemy はじめてのAI（Google）", "2019-09-28"]
  ]},
  { id: "health", items: [
    ["Alison Meditation", "2023-01-23"], ["認知症介助士", "2021-04-14"], ["LIVING Yoga School 200 Hours Yoga Teacher Training", "2020-09-25"],
    ["National CPR Foundation Standard First-Aid", "2020-06-20"], ["ALL Natural DIY Aromatherapy for Home Spa", "2020-10-13"],
    ["Sabai De Ka Thai Massage School: Thai Foot Massage and Reflexology", "2020-07-25"],
    ["Watpo Thai Traditional Medical and Ayuravate Association: General Thai Massage", "2018-07-13"],
    ["青雲会 空手 6級", "2008-09-26"], ["日本空手道丸與志會 10級", "2006-07-12"]
  ]},
  { id: "creative", items: [
    ["文藻華語中心直式短片競賽 第2位", "2025-11-14"], ["Coursera Modern and Contemporary Art and Design – MoMA", "2024-01-13"],
    ["書道三段（書道道学院）", "2021-12-03"], ["Web Courses Bangkok Photography Essentials", "2020-11"],
    ["Centre of Excellence Calligraphy Diploma (Distinction)", "2020-11-08"], ["Coursera Fundamentals of Graphic Design", "2020-10-30"],
    ["Web Courses Bangkok Professional Web Design and Management", "2020-12-22"]
  ]},
  { id: "other", items: [
    ["日本占い師協会 四柱推命占術士", "2024-03-21"], ["Gold Sounds Academy Complete DJ Course", "2023-07"],
    ["タイ国政府観光庁 第五回タイランド・スペシャリスト", "2021-09-24"], ["さっぽろ起業道場", "2021-08-07"],
    ["123test IQ Test 116", "2021-03-26"],
    ["New Skills Academy Tarot Card Reading", "2020-07-07"], ["Manifa Elephant Camp Mahout Training Course", "2018-05-07"],
    ["SDI Advanced Adventure Diver", "2016-02-07"], ["北海道『道の駅』スタンプラリー2005 完全制覇", "2006-03-30"]
  ]}
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

document.addEventListener("DOMContentLoaded", renderCertifications);
document.addEventListener("languagechange", renderCertifications);
