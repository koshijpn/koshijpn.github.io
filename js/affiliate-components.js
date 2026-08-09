(() => {
  const config = window.PORTFOLIO_AFFILIATE_CONFIG;
  const externalLink = (url, label, affiliate = false, provider = "") => { const link = document.createElement('a'); link.href = url; link.textContent = label; link.target = '_blank'; link.rel = affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'; if (affiliate) link.dataset.affiliateProvider = provider; return link; };
  const disclosureNotice = () => { const notice = document.createElement('aside'); notice.className = 'affiliate-notice'; notice.innerHTML = `This page may contain affiliate links. <a href="${config?.disclosureUrl || '/affiliate-disclosure.html'}">Disclosure</a>`; return notice; };
  const productCard = (product) => { if (!config?.enabled || !config.providers?.[product?.provider]?.enabled || !product?.url) return null; const card = document.createElement('article'); const heading = document.createElement('h3'); heading.textContent = product.title; card.append(heading, externalLink(product.url, product.linkLabel || 'View details', true, product.provider)); return card; };
  const affiliateLink = (url, label, provider) => externalLink(url, label, true, provider);
  window.PortfolioAffiliate = Object.freeze({
    AffiliateLink: affiliateLink,
    ProductCard: productCard,
    ExternalLink: externalLink,
    DisclosureNotice: disclosureNotice,
    affiliateLink,
    productCard,
    externalLink,
    disclosureNotice
  });
})();
