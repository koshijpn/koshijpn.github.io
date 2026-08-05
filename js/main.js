// Shared navigation and scroll behavior. No framework is required for GitHub Pages.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".site-nav");
  const backToTop = document.querySelector(".back-to-top");
  const footer = document.getElementById("footer");

  const closeMenu = (restoreFocus = false) => {
    navigation?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", window.getTranslation?.("a11y.openMenu") || "Open menu");
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuButton?.focus();
  };

  menuButton?.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    if (!opening) {
      closeMenu(true);
      return;
    }
    navigation?.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", window.getTranslation?.("a11y.closeMenu") || "Close menu");
    document.body.classList.add("menu-open");
    navigation?.querySelector("a")?.focus();
  });

  navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu(false)));
  navigation?.addEventListener("click", (event) => {
    if (!navigation.classList.contains("open")) return;
    if (!event.target.closest("a, select, label")) closeMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation?.classList.contains("open")) closeMenu(true);
    if (event.key !== "Tab" || !navigation?.classList.contains("open")) return;
    const focusable = [menuButton, ...navigation.querySelectorAll("a, select")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 1100) closeMenu(); });

  const updateScrollState = () => {
    const scrolled = window.scrollY > 32;
    header?.classList.toggle("scrolled", scrolled);
    backToTop?.classList.toggle("visible", window.scrollY > 500);
  };
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  if (footer) footer.textContent = `© ${new Date().getFullYear()} KOSHI. All Rights Reserved.`;
});
