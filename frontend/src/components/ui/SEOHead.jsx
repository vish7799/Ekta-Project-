import React, { useEffect } from 'react';

export const SEOHead = ({ title, description, canonicalUrl, ogImage }) => {
  useEffect(() => {
    const siteTitle = title
      ? `${title} | EKTA ELECTRICAL WORKS`
      : 'EKTA ELECTRICAL WORKS | Industrial Electrical Engineering Solutions';
    
    const siteDesc = description ||
      'Turnkey industrial electrical engineering, high-voltage substations, power distribution, and electrical automation services.';

    document.title = siteTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', siteDesc);
    }
  }, [title, description, canonicalUrl, ogImage]);

  return null;
};
