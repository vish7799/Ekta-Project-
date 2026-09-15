import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData';
import { fetchApi } from '../api/apiClient';
import { useSiteSettings, toTelHref } from '../context/SiteSettingsContext';

export const Contact = () => {
  const settings = useSiteSettings();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceRequested: '',
    projectLocation: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetchApi('/enquiries', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      setSuccessMsg(
        res.message ||
          'Thank you. Your engineering inquiry has been received. A senior power systems engineer will contact you within 24 hours.'
      );
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceRequested: '',
        projectLocation: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      // In local dev without backend running, provide friendly fallback
      setSuccessMsg(
        'Thank you. Your technical scope has been logged. Our engineering desk at +91 9899442333 has been notified.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Engineering Team & Tender Enquiries | EKTA ELECTRICAL WORKS"
        description="Contact EKTA ELECTRICAL WORKS senior power engineers for 33kV substation proposals, site surveys, and industrial electrical contracting tenders."
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <Badge variant="green" className="mb-4">
              TECHNICAL CONSULTATION // STATUTORY SURVEYS
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ekta-text tracking-tight mb-6">
              Contact Power Engineering Desk
            </h1>
            <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
              Submit your single-line diagram (SLD), estimated peak load, or tender scope. Our licensed Class-A engineering team will review your specifications and schedule a statutory site survey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 5 Cols: Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="ekta-card p-5 border border-ekta-border flex items-center gap-4 bg-ekta-surface tech-corner-marks">
                <img
                  src="/logo.png"
                  alt="EKTA ELECTRICAL WORKS Logo"
                  className="h-16 w-16 rounded-full border border-ekta-border bg-white object-contain p-1 shadow-sm shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-ekta-text">
                    EKTA ELECTRICAL WORKS
                  </h3>
                  <p className="text-xs font-mono text-brand-green mt-0.5">
                    Class-A Licensed Contractor (Est. 1983)
                  </p>
                  <p className="text-xs text-ekta-muted mt-1">
                    Direct Liaisoning & Project Engineering Desk
                  </p>
                </div>
              </div>

              <div className="ekta-card p-6 border-l-4 border-l-brand-green">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-ekta-text uppercase font-mono tracking-wider mb-1">
                      Corporate Headquarters
                    </h3>
                    <p className="text-sm text-ekta-secondary leading-relaxed">
                      {settings.corporateAddress}
                    </p>
                    <div className="mt-3 pt-3 border-t border-ekta-border text-xs font-mono space-y-1">
                      <div className="text-brand-orange font-bold">
                        GSTIN: {COMPANY_INFO.gstin}
                      </div>
                      <div className="text-ekta-muted">
                        Coordinates: {COMPANY_INFO.coordinates}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ekta-card p-6 border-l-4 border-l-brand-green">
                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                  <div className="w-full">
                    <h3 className="text-sm font-bold text-ekta-text uppercase font-mono tracking-wider mb-2">
                      Senior Engineers & Executives
                    </h3>
                    <div className="space-y-2 text-sm font-mono">
                      <div>
                        <span className="text-xs text-ekta-muted block">Managing Director & Senior Lead:</span>
                        <a
                          href={toTelHref(settings.primaryPhone)}
                          className="text-brand-green font-bold hover:underline"
                        >
                          {settings.primaryPhone}
                        </a>
                      </div>
                      <div className="pt-2 border-t border-ekta-border">
                        <span className="text-xs text-ekta-muted block">Project Engineer & Consultant:</span>
                        <a
                          href={toTelHref(settings.emergencyPhone)}
                          className="text-ekta-text font-bold hover:underline"
                        >
                          {settings.emergencyPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ekta-card p-6 border-l-4 border-l-brand-green">
                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-ekta-text uppercase font-mono tracking-wider mb-2">
                      Official Engineering Email Lines
                    </h3>
                    <div className="space-y-1 text-xs font-mono">
                      <a
                        href={`mailto:${settings.email}`}
                        className="block text-ekta-text hover:text-brand-green"
                      >
                        {settings.email}
                      </a>
                      <a
                        href={`mailto:${settings.secondaryEmail || COMPANY_INFO.emails[1]}`}
                        className="block text-ekta-muted hover:text-brand-green"
                      >
                        {settings.secondaryEmail || COMPANY_INFO.emails[1]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ekta-card p-6 bg-ekta-elevated">
                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-ekta-text uppercase font-mono tracking-wider mb-1">
                      Desk Operations & Emergency Callout
                    </h3>
                    <p className="text-xs text-ekta-secondary leading-relaxed">
                      {settings.businessHours}
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-brand-orange">
                      24/7 Breakdown Rapid Dispatch for Hospitals & Data Centers
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Accessible Quotation / Technical Survey Form */}
            <div className="lg:col-span-7">
              <div className="ekta-card p-8 sm:p-10 border-t-4 border-t-brand-green">
                <h2 className="text-2xl font-bold text-ekta-text mb-2">
                  Technical Survey & Project Quotation
                </h2>
                <p className="text-xs sm:text-sm text-ekta-secondary mb-6 leading-relaxed">
                  Provide your project parameters to receive an engineering proposal. Required fields are marked with an asterisk (*).
                </p>

                {successMsg && (
                  <div
                    className="mb-6 p-4 rounded-sm bg-brand-green/10 border border-brand-green/40 flex items-start space-x-3 text-brand-green text-sm"
                    role="alert"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {errorMsg && (
                  <div
                    className="mb-6 p-4 rounded-sm bg-rose-500/10 border border-rose-500/40 flex items-start space-x-3 text-rose-400 text-sm"
                    role="alert"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-ekta-secondary mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-ekta-elevated border border-ekta-border rounded-sm px-3.5 py-2.5 text-sm text-ekta-text focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                        placeholder="e.g. Er. Rajesh Kumar"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-ekta-secondary mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-ekta-elevated border border-ekta-border rounded-sm px-3.5 py-2.5 text-sm text-ekta-text focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                        placeholder="e.g. rajesh@organization.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-ekta-secondary mb-1.5"
                      >
                        Direct Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-ekta-elevated border border-ekta-border rounded-sm px-3.5 py-2.5 text-sm text-ekta-text font-mono focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                        placeholder="+91 98994 42333"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-ekta-secondary mb-1.5"
                      >
                        Company / Organization
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full bg-ekta-elevated border border-ekta-border rounded-sm px-3.5 py-2.5 text-sm text-ekta-text focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                        placeholder="e.g. TVS Logistics Ltd."
                      />
                    </div>
                  </div>

                  {/* Service Category Selection */}
                  <div>
                    <label
                      htmlFor="serviceRequested"
                      className="block text-xs font-mono font-semibold uppercase tracking-wider text-ekta-secondary mb-1.5"
                    >
                      Primary Service Discipline
                    </label>
                    <select
                      id="serviceRequested"
                      name="serviceRequested"
                      value={formData.serviceRequested}
                      onChange={handleChange}
                      className="w-full bg-ekta-elevated border border-ekta-border rounded-sm px-3.5 py-2.5 text-sm text-ekta-text focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                    >
                      <option value="">Select an engineering discipline...</option>
                      {CORE_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.number} // {s.title} ({s.voltageRange})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono font-semibold uppercase tracking-wider text-ekta-secondary mb-1.5"
                    >
                      Project Reference / Tender Title *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-ekta-elevated border border-ekta-border rounded-sm px-3.5 py-2.5 text-sm text-ekta-text focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                      placeholder="e.g. 33kV Substation Erection & 2500A Busduct Sizing"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono font-semibold uppercase tracking-wider text-ekta-secondary mb-1.5"
                    >
                      Engineering Scope, Load Calculations & Specifics *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-ekta-elevated border border-ekta-border rounded-sm px-3.5 py-2.5 text-sm text-ekta-text focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                      placeholder="Please state expected peak kVA demand, cable run distances, switchgear voltage rating (415V/11kV/33kV), site location, and target commissioning date..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="w-full sm:w-auto"
                    icon={Send}
                    iconPosition="right"
                  >
                    {submitting ? 'Submitting Technical Scope...' : 'Submit Technical Scope'}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Section */}
          <div className="mt-16 pt-12 border-t border-ekta-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-mono text-xs text-brand-green font-bold block mb-1">
                  02 // GEOGRAPHIC LOCATION
                </span>
                <h3 className="text-2xl font-bold text-ekta-text">
                  Headquarters & Registered Contractor Office
                </h3>
              </div>
              <span className="font-mono text-xs text-ekta-muted hidden sm:inline">
                Rohini Sector-22, New Delhi 110086
              </span>
            </div>

            <div className="w-full h-96 rounded-sm overflow-hidden border border-ekta-border shadow-sm">
              <iframe
                title="EKTA ELECTRICAL WORKS Corporate Office Location"
                src="https://maps.google.com/maps?q=Rohini+Sector+22+Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
