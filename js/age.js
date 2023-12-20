const currentDate = new Date();
const birthDate = new Date("1997-08-17"); // 誕生日を指定

let age = currentDate.getFullYear() - birthDate.getFullYear();

// 誕生日がまだ来ていない場合、年齢を修正
if (
  currentDate.getMonth() < birthDate.getMonth() ||
  (currentDate.getMonth() === birthDate.getMonth() &&
    currentDate.getDate() < birthDate.getDate())
) {
  age--;
}

document.getElementById("age").textContent = "(" + age + ")";
