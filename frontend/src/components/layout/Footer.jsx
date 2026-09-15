import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../../data/companyData';
import { useSiteSettings, toTelHref } from '../../context/SiteSettingsContext';
import { fetchApi } from '../../api/apiClient';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const settings = useSiteSettings();
  const [services, setServices] = useState(CORE_SERVICES);

  useEffect(() => {
    fetchApi('/services')
      .then((response) => setServices(response.data || []))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[#0B0F0D] text-[#CBD5E1] border-t border-[#26332D]">
      {/* Top Engineering CTA Strip */}
      <div className="border-b border-[#26332D]/80 bg-[#111816]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#14B8A6] block mb-1">
                Turnkey Industrial Power Infrastructure
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Plan Your Substation, Switchgear, or HT/LT Project
              </h3>
              <p className="text-sm text-[#94A3B8] mt-1 max-w-2xl">
                Consult directly with Class-A certified high-voltage engineers for statutory site surveys and detailed Bill of Quantities (BOQ).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#0E7A4A] hover:bg-[#075E38] text-white text-sm font-semibold rounded-sm transition-colors border border-[#0E7A4A] shadow-sm group"
              >
                <span>Request Technical Proposal</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+919899442333"
                className="inline-flex items-center justify-center px-5 py-3 border border-[#26332D] bg-[#17201C] hover:bg-[#1D2B24] text-white text-sm font-mono transition-colors rounded-sm"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-[#0E7A4A]" />
                +91 9899442333
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="EKTA ELECTRICAL WORKS logo"
                className="h-10 w-10 shrink-0 rounded-full border border-[#26332D] bg-white object-contain shadow-sm sm:h-12 sm:w-12"
              />
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  {settings.companyName}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                  Engineering Works (Est. 1983)
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {settings.tagline || COMPANY_INFO.license}. Over four decades of specialized high-voltage infrastructure, substation engineering, switchboard fabrication, and industrial automation.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs font-mono text-[#CBD5E1]">
              <div className="flex items-center space-x-2 text-[#F59E0B]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#F59E0B]" />
                <span>GSTIN: {COMPANY_INFO.gstin}</span>
              </div>
              <div className="text-[#94A3B8]">
                Coordinates: {COMPANY_INFO.coordinates}
              </div>
            </div>
          </div>

          {/* Column 2: Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white font-semibold border-b border-[#26332D] pb-2">
              Core Engineering Services
            </div>
            <ul className="space-y-2 text-xs">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-[#14B8A6] transition-colors flex items-center justify-between group"
                  >
                    <span>{service.title}</span>
                    <span className="font-mono text-[10px] text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation & Sector Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white font-semibold border-b border-[#26332D] pb-2">
              Sectors & Scope
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Company History
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Turnkey Projects
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link to="/clients" className="hover:text-white transition-colors">
                  Client Directory
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-white transition-colors">
                  Engineering References
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Technical Surveys
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white font-semibold border-b border-[#26332D] pb-2">
              Corporate Headquarters
            </div>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#0E7A4A] shrink-0 mt-0.5" />
                <span className="text-[#94A3B8] leading-relaxed">
                  {settings.corporateAddress}
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-[#0E7A4A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a
                    href={toTelHref(settings.primaryPhone)}
                    className="block text-white hover:text-[#14B8A6] font-mono"
                  >
                    {settings.primaryPhone}
                  </a>
                  <a
                    href={toTelHref(settings.emergencyPhone)}
                    className="block text-[#94A3B8] hover:text-white font-mono"
                  >
                    {settings.emergencyPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-[#0E7A4A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a
                    href={`mailto:${settings.secondaryEmail || COMPANY_INFO.emails[1]}`}
                    className="block text-[#94A3B8] hover:text-white"
                  >
                    {settings.secondaryEmail || COMPANY_INFO.emails[1]}
                  </a>
                </div>
              </li>
              <li className="pt-2">
                <div className="p-2.5 rounded bg-[#17201C] border border-[#26332D] text-[11px] font-mono text-[#F59E0B]">
                  24/7 Breakdown Emergency Response Active
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Bar with restrained accent rule */}
        <div className="tech-rule-accent mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-[#94A3B8] font-mono gap-4">
          <div>
            © {currentYear} {COMPANY_INFO.name}. All rights reserved. Registered Indian Class-A Electrical Contractor.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="text-[#CBD5E1]">New Delhi, India</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-white">
              Compliance & Safety
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white">
              Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
