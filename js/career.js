// Time-sensitive education records live here so every page and language can
// be updated from one place when enrolment status changes.
const career2026 = {
  education: {
    ja: ["北海道情報大学：卒業要件に関する最終結果待ち", "文藻外語大学 国際企業管理系修士課程：合格済み・2026年9月入学予定"],
    en: ["Hokkaido Information University: awaiting final degree-completion results", "Wenzao Master’s Program in International Business Administration: admitted; expected enrollment September 2026"],
    "zh-TW": ["北海道情報大學：等待學位完成的最終結果", "文藻外語大學國際企業管理系碩士班：已錄取，預計2026年9月入學"],
    "zh-CN": ["北海道情报大学：等待学位完成的最终结果", "文藻外语大学国际企业管理硕士课程：已录取，预计2026年9月入学"],
    ko: ["홋카이도정보대학교: 학위 완료 최종 결과 대기 중", "원자오외국어대학교 국제기업관리 석사과정: 합격, 2026년 9월 입학 예정"],
    th: ["มหาวิทยาลัยสารสนเทศฮอกไกโด: กำลังรอผลสุดท้ายเกี่ยวกับการสำเร็จการศึกษา", "หลักสูตรปริญญาโทบริหารธุรกิจระหว่างประเทศ มหาวิทยาลัยภาษาเหวินจ่าว: ผ่านการคัดเลือกและคาดว่าจะเข้าเรียนในเดือนกันยายน 2026"],
    vi: ["Đại học Thông tin Hokkaido: đang chờ kết quả cuối cùng về việc hoàn tất bằng cấp", "Thạc sĩ Quản trị Kinh doanh Quốc tế tại Wenzao: đã trúng tuyển, dự kiến nhập học tháng 9/2026"],
    es: ["Hokkaido Information University: a la espera del resultado final de finalización del grado", "Máster en Administración de Empresas Internacionales de Wenzao: admitido; ingreso previsto en septiembre de 2026"]
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
