// Shared across Koshi sites.
// Priority: manual > stored > URL > browser > country hint > site default.
// Country is a fallback hint only and never overrides a manual, stored, URL, or
// supported browser-language choice.
(function (global) {
  "use strict";
  const STORAGE_KEY = "koshi.preferredLocale", LEGACY_STORAGE_KEY = "preferredLanguage";
  const ALIASES = {"zh-hant":"zh-TW","zh-tw":"zh-TW","zh-hk":"zh-TW","zh-mo":"zh-TW","zh-hans":"zh-CN","zh-cn":"zh-CN","zh-sg":"zh-CN"};
  const COUNTRY_LOCALES = {JP:"ja",TW:"zh-TW",HK:"zh-TW",MO:"zh-TW",CN:"zh-CN",KR:"ko",TH:"th",VN:"vi",ES:"es"};
  const TIMEZONE_COUNTRIES = {"Asia/Tokyo":"JP","Asia/Taipei":"TW","Asia/Hong_Kong":"HK","Asia/Macau":"MO","Asia/Shanghai":"CN","Asia/Seoul":"KR","Asia/Bangkok":"TH","Asia/Ho_Chi_Minh":"VN","Europe/Madrid":"ES"};
  function normalize(value){if(!value)return null;const normalized=String(value).trim().replace(/_/g,"-").toLowerCase();return ALIASES[normalized]||normalized.split("-")[0]||null;}
  function match(value,supported){const normalized=normalize(value);if(!normalized)return null;return supported.find(locale=>normalize(locale)===normalized)||supported.find(locale=>normalize(locale)?.split("-")[0]===normalized.split("-")[0])||null;}
  function readStoredPreference(){try{return global.localStorage?.getItem(STORAGE_KEY)||global.localStorage?.getItem(LEGACY_STORAGE_KEY)||null;}catch(_){return null;}}
  function urlLocale(){try{const url=new URL(global.location.href),queryLocale=url.searchParams.get("lang")||url.searchParams.get("locale");if(queryLocale)return queryLocale;const segment=url.pathname.split("/").filter(Boolean)[0]||"";return /^(?:en|ja|ko|th|vi|es|zh-(?:tw|cn|hant|hans))$/i.test(segment)?segment:null;}catch(_){return null;}}
  function resolve(options={}){const supported=options.supported||[];if(!supported.length)throw new Error("Locale Resolver requires supported locales");const candidates=[["manual",options.manualChoice],["stored",options.storedPreference??readStoredPreference()],["url",options.urlLocale??urlLocale()],["browser",options.browserLanguages||global.navigator?.languages||[global.navigator?.language]],["country",COUNTRY_LOCALES[String(options.countryHint||"").toUpperCase()]],["default",options.defaultLocale]];for(const[source,candidate]of candidates){for(const value of(Array.isArray(candidate)?candidate:[candidate])){const locale=match(value,supported);if(locale)return Object.freeze({locale,source});}}return Object.freeze({locale:supported[0],source:"default"});}
  async function countryHint(){const supplied=global.__KOSHI_COUNTRY_HINT__||global.document?.documentElement?.dataset.countryHint;if(supplied)return String(supplied).toUpperCase();try{return TIMEZONE_COUNTRIES[Intl.DateTimeFormat().resolvedOptions().timeZone]||null;}catch(_){return null;}}
  async function resolveAsync(options={}){const withoutCountry=resolve({...options,countryHint:null,defaultLocale:null});if(withoutCountry.source!=="default")return withoutCountry;const country=options.countryHint||await countryHint(options.countryLookup);return resolve({...options,countryHint:country});}
  function localizeUrl(value,locale){try{const url=new URL(value,global.location.href);if(url.origin!==global.location.origin||/^(?:mailto|tel|javascript):/i.test(value))return value;if(url.pathname.match(/\.(?:css|js|json|xml|png|jpe?g|gif|svg|webp|ico|pdf|zip)$/i))return value;url.searchParams.set("lang",locale);return url.href;}catch(_){return value;}}
  function setPreference(value,supported){const locale=match(value,supported||[]);if(!locale)return null;try{global.localStorage?.setItem(STORAGE_KEY,locale);}catch(_){}return locale;}
  function remember(value,options={}){return setPreference(value,options.supported||[]);}const api=Object.freeze({resolve,resolveAsync,countryHint,localizeUrl,setPreference,remember,normalize,storageKey:STORAGE_KEY});global.KoshiLocale=api;global.KoshiLocaleResolver=api;
})(window);
