/* Dormant developer-article AdSense component. No IDs are configured. */
(() => {
  "use strict";
  const config = window.SiteAdsConfig || Object.freeze({ enabled: false });
  const pageType = document.body.dataset.page || "unknown";
  const allowed = new Set(config.allowedPageTypes || []);
  const publisherId = String(config.publisherId || "");
  const hasConsent = config.requireConsent === false || window.__siteAdConsent === true;
  const canRender = config.enabled === true && hasConsent && allowed.has(pageType) && /^ca-pub-\d{16}$/.test(publisherId);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_context", page_type: pageType, ad_eligible: allowed.has(pageType), ad_enabled: canRender });
  if (!canRender) return;
  const slots = [...document.querySelectorAll("[data-ad-slot]")].filter((slot) => {
    const id = String(config.units?.[slot.dataset.placement] || "");
    if (!/^\d+$/.test(id)) return false;
    slot.hidden = false;
    Object.assign(slot.style, { minHeight: "280px", margin: "3rem 0", contain: "layout paint" });
    const ad = document.createElement("ins");
    ad.className = "adsbygoogle"; ad.style.display = "block";
    ad.dataset.adClient = publisherId; ad.dataset.adSlot = id;
    ad.dataset.adFormat = slot.dataset.format || "auto"; ad.dataset.fullWidthResponsive = "true";
    slot.append(ad); return true;
  });
  if (!slots.length) return;
  if (!document.querySelector("script[data-adsense-loader]")) {
    const loader = document.createElement("script"); loader.async = true;
    loader.crossOrigin = "anonymous"; loader.dataset.adsenseLoader = "true";
    loader.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
    document.head.append(loader);
  }
  slots.forEach(() => (window.adsbygoogle = window.adsbygoogle || []).push({}));
})();
