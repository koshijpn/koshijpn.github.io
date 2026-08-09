// Shared navigation and scroll behavior. No framework is required for GitHub Pages.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".site-nav");
  const backToTop = document.querySelector(".back-to-top");
  const footer = document.getElementById("footer");

  const ecosystemLinks = [["Koshi", "https://koshijpn.com/"], ["SLEEP LATE LAB", "https://sleeplatelab.com/"]];
  if (navigation && !navigation.querySelector(".ecosystem-nav")) {
    const ecosystemNav = document.createElement("div");
    ecosystemNav.className = "ecosystem-nav";
    ecosystemNav.setAttribute("aria-label", "Other Koshi websites");
    ecosystemLinks.forEach(([label, url]) => {
      const link = document.createElement("a");
      Object.assign(link, { href: url, textContent: label, target: "_blank", rel: "noopener noreferrer" });
      ecosystemNav.appendChild(link);
    });
    navigation.appendChild(ecosystemNav);
  }

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

  // GTM event names are intentionally stable so analytics can be configured
  // without embedding GA4, Clarity, or other trackers a second time.
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.href || "";
    const eventName = link.dataset.track
      || (href.includes("github.com/") ? "github_click" : null)
      || (href.includes("linkedin.com/in/") ? "linkedin_click" : null)
      || (href.includes("sleeplatelab.com/") ? "commercial_services_click" : null)
      || (link.closest(".project-card") ? "project_click" : null);
    if (!eventName) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, link_url: href, link_text: link.textContent.trim() });
  });
});
