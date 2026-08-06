// Time-sensitive education records live here so every page and language can
// be updated from one place when enrolment status changes.
const career2026 = {
  education: {
    ja: ["北海道情報大学で卒業に向けて履修中", "文藻外語大学 国際企業管理系修士課程 入学予定"],
    en: ["Currently completing degree requirements at Hokkaido Information University", "Expected to enter the Master’s Program in International Business Administration at Wenzao Ursuline University of Languages"],
    "zh-TW": ["目前於北海道情報大學完成學位所需課程", "預計入學文藻外語大學國際企業管理系碩士班"],
    "zh-CN": ["目前正在北海道情报大学完成学位要求", "计划进入文藻外语大学国际企业管理硕士课程"],
    ko: ["홋카이도정보대학교에서 학위 요건을 이수 중", "원자오외국어대학교 국제기업관리 석사과정 입학 예정"],
    th: ["กำลังเรียนรายวิชาที่จำเป็นสำหรับการสำเร็จการศึกษาที่มหาวิทยาลัยสารสนเทศฮอกไกโด", "มีแผนเข้าศึกษาหลักสูตรปริญญาโทสาขาบริหารธุรกิจระหว่างประเทศที่มหาวิทยาลัยภาษาเหวินจ่าว"],
    vi: ["Đang hoàn thành các yêu cầu bằng cấp tại Đại học Thông tin Hokkaido", "Dự kiến nhập học chương trình Thạc sĩ Quản trị Kinh doanh Quốc tế tại Đại học Ngoại ngữ Wenzao"],
    es: ["Actualmente completando los requisitos del título en Hokkaido Information University", "Próximo ingreso al máster en Administración de Empresas Internacionales de Wenzao Ursuline University of Languages"]
  },
  international: {
    ja: ["文藻外語大学 華語中心で4期にわたり中国語を学び、校内最高レベルを修了"],
    en: ["Completed four terms of Mandarin study at Wenzao’s Chinese Language Center, reaching its highest level"],
    "zh-TW": ["於文藻外語大學華語中心完成四期華語課程，並完成校內最高級別"],
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
