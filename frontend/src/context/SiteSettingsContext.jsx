import React, { createContext, useContext, useEffect, useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { fetchApi } from '../api/apiClient';

const fallbackSettings = {
  companyName: COMPANY_INFO.name,
  tagline: COMPANY_INFO.tagline,
  corporateAddress: `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city} - ${COMPANY_INFO.address.postalCode}, ${COMPANY_INFO.address.country}`,
  primaryPhone: COMPANY_INFO.contacts[0].phone,
  emergencyPhone: COMPANY_INFO.contacts[1].phone,
  email: COMPANY_INFO.emails[0],
  secondaryEmail: COMPANY_INFO.emails[1],
  businessHours: COMPANY_INFO.hours,
  socialLinks: {},
  seoDefaults: {},
};

const SiteSettingsContext = createContext(fallbackSettings);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(fallbackSettings);

  useEffect(() => {
    fetchApi('/site-settings')
      .then((response) => {
        if (response.data) {
          setSettings((current) => ({
            ...current,
            ...response.data,
            socialLinks: { ...current.socialLinks, ...response.data.socialLinks },
            seoDefaults: { ...current.seoDefaults, ...response.data.seoDefaults },
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);

export const toTelHref = (phone) => `tel:${String(phone || '').replace(/[^\d+]/g, '')}`;
