// Shared analytics bootstrap. GTM provides the event layer; GA4 and Clarity
// are loaded directly once because neither is in the published container.
(() => {
  const containerId = "GTM-T6BQ47G3";
  const measurementId = "G-ZKZNCJZ6DF";
  const clarityId = "xy6zsg56uc";
  const csp = "default-src 'self'; connect-src 'self' https://koshijpn.com https://api.github.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms; img-src 'self' data: https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' https://www.googletagmanager.com https://www.clarity.ms; frame-src https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; form-action 'self' https://koshijpn.com; upgrade-insecure-requests";
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const policy = document.createElement("meta");
    policy.httpEquiv = "Content-Security-Policy";
    policy.content = csp;
    document.head.prepend(policy);
  }
  const existingLoader = document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${containerId}"]`);
  window.dataLayer = window.dataLayer || [];
  if (!window.__koshiGtmLoaded && !existingLoader) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
    document.head.append(script);
  }
  window.__koshiGtmLoaded = true;

  if (!window.__koshiGaConfigured) {
    window.__koshiGaConfigured = true;
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(ga);
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
  }

  // Clarity is absent from the current GTM container and is initialized once
  // here for every page.
  if (!document.querySelector(`script[src*="clarity.ms/tag/${clarityId}"]`)) {
    window.clarity = window.clarity || function clarity(){ (window.clarity.q = window.clarity.q || []).push(arguments); };
    const clarityScript = document.createElement("script");
    clarityScript.async = true;
    clarityScript.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
    document.head.append(clarityScript);
  }
})();

// Shared navigation and scroll behavior. No framework is required for GitHub Pages.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".site-nav");
  const backToTop = document.querySelector(".back-to-top");
  const footer = document.getElementById("footer");

  document.querySelectorAll('a[href="#contact"], a[href$="index.html#contact"]').forEach((link) => {
    link.href = new URL('/contact/', window.location.origin).href;
  });

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

  document.querySelectorAll("footer nav, .site-footer-groups > div:last-of-type").forEach((nav) => {
    if (!nav.querySelector('a[href$="/contact/"]')) {
      const contactLink = document.createElement("a");
      contactLink.href = "/contact/";
      contactLink.textContent = "Contact";
      nav.append(contactLink);
    }
    [["Terms", "/terms.html"], ["Affiliate Disclosure", "/affiliate-disclosure.html"]].forEach(([label, href]) => {
      if (nav.querySelector(`a[href$="${href.replace('/', '')}"]`)) return;
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      nav.append(link);
    });
  });

  // GTM event names are intentionally stable so analytics can be configured
  // without embedding GA4, Clarity, or other trackers a second time.
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.href || "";
    const rel = link.rel || "";
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    const isOtherDomain = isExternal && !href.includes(location.hostname);
    const isMailto = href.startsWith("mailto:");
    const isSponsored = rel.includes("sponsored") || Boolean(link.dataset.affiliateProvider);

    const eventName = link.dataset.track
      || (isMailto ? "email_click" : null)
      || (isSponsored ? "affiliate_click" : null)
      || (href.includes("github.com/") ? "github_click" : null)
      || (href.includes("linkedin.com/in/") ? "linkedin_click" : null)
      || (href.includes("sleeplatelab.com/contact") || href.includes("/contact/") ? "contact_click" : null)
      || (href.includes("sleeplatelab.com/services") ? "service_click" : null)
      || (href.includes("sleeplatelab.com/") ? "commercial_services_click" : null)
      || (href.includes("/projects/") && link.closest(".case-actions") ? "portfolio_demo_click" : null)
      || (link.closest(".project-card") ? "project_click" : null)
      || (isOtherDomain ? "outbound_click" : null);

    if (!eventName) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, link_url: href, link_text: link.textContent.trim() });
  });
});
