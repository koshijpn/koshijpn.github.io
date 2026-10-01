// Time-sensitive education records live here so every page and language can
// be updated from one place when enrolment status changes.
const career2026 = {
  education: {
    ja: ["北海道情報大学 経営情報学部：卒業・学士（経営情報学）", "文藻外語大学 新媒體暨管理學院 国際企業管理系修士課程：在学中"],
    en: ["Hokkaido Information University: Bachelor of Business Administration and Information Science degree", "Wenzao Ursuline University of Languages, College of New Media and Management, Master’s Program of International Business Administration (MBA Program): currently enrolled"],
    "zh-TW": ["北海道情報大學經營情報學部：畢業・學士（經營情報學）", "文藻外語大學新媒體暨管理學院國際企業管理系碩士班：在學中"],
    "zh-CN": ["北海道情报大学：毕业", "文藻外语大学国际企业管理硕士课程：在读"],
    ko: ["홋카이도정보대학교: 졸업", "원자오외국어대학교 국제기업관리 석사과정: 재학 중"],
    th: ["มหาวิทยาลัยสารสนเทศฮอกไกโด: สำเร็จการศึกษา", "หลักสูตรปริญญาโทบริหารธุรกิจระหว่างประเทศ มหาวิทยาลัยภาษาเหวินจ่าว: กำลังศึกษา"],
    vi: ["Đại học Thông tin Hokkaido: đã tốt nghiệp", "Thạc sĩ Quản trị Kinh doanh Quốc tế tại Wenzao: đang theo học"],
    es: ["Hokkaido Information University: graduado", "Máster en Administración de Empresas Internacionales de Wenzao: actualmente matriculado"]
  },
  international: {
    ja: ["文藻外語大学 華語中心（2025年9月〜2026年8月）"],
    en: ["Wenzao Chinese Language Center (September 2025–August 2026)"],
    "zh-TW": ["文藻外語大學華語中心（2025年9月至2026年8月）"],
    "zh-CN": ["在文藻外语大学华语中心完成四期华语课程，并完成校内最高级别"],
    ko: ["원자오외국어대학교 중국어센터에서 4개 학기 과정을 이수하고 교내 최고 레벨 수료"],
    th: ["เรียนภาษาจีนครบสี่ภาคเรียนที่ศูนย์ภาษาจีน มหาวิทยาลัยภาษาเหวินจ่าว และจบระดับสูงสุดของสถาบัน"],
    vi: ["Hoàn thành bốn học kỳ tiếng Hoa tại Trung tâm Hoa ngữ, Đại học Ngoại ngữ Wenzao và đạt cấp độ cao nhất của trường"],
    es: ["Cuatro períodos de chino completados en el Centro de Lengua China de Wenzao, alcanzando su nivel más alto"]
  }
};

function renderCareer2026(event) {
  const requestedLanguage = typeof event?.detail === "string" ? event.detail : null;
  const language = requestedLanguage || window.getCurrentLanguage?.() || "ja";
  document.querySelectorAll("[data-career-2026]").forEach((container) => {
    const group = container.dataset.career2026;
    const entries = career2026[group]?.[language] || career2026[group]?.en || [];
    container.replaceChildren(...entries.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    }));
  });
}

document.addEventListener("DOMContentLoaded", renderCareer2026);
document.addEventListener("languagechange", renderCareer2026);
