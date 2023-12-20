document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.textContent = "© " + currentYear + " KOSHI - All Rights Reserved";
    }
  });
  