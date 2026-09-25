import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, PhoneCall, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData';
import { fetchApi, resolveMediaUrl } from '../api/apiClient';
import { useSiteSettings, toTelHref } from '../context/SiteSettingsContext';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const settings = useSiteSettings();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi(`/services/slug/${slug}`)
      .then((res) => {
        setService(res.data || CORE_SERVICES.find((item) => item.slug === slug) || null);
      })
      .catch(() => setService(CORE_SERVICES.find((item) => item.slug === slug) || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-ekta-muted font-mono text-xs">
        RETRIEVING SPECIFICATION RECORD...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center">
        <h1 className="text-2xl font-bold text-ekta-text mb-3">Service Record Not Found</h1>
        <p className="text-ekta-secondary mb-6 text-sm">
          The requested engineering service specification could not be located.
        </p>
        <Button to="/services" variant="secondary" icon={ArrowLeft} iconPosition="left">
          Back to Services Directory
        </Button>
      </div>
    );
  }

  const serviceImages = [
    ...(service.featuredImage?.filePath ? [service.featuredImage] : []),
    ...(service.gallery || []),
  ];
  const primaryImage = serviceImages[0];

  return (
    <>
      <SEOHead
        title={`${service.title} | EKTA ELECTRICAL WORKS`}
        description={service.shortDescription || 'Class-A industrial electrical engineering specification.'}
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="text-xs font-mono text-brand-green hover:underline inline-flex items-center mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> ALL 10 ENGINEERING SERVICES
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="green">SERVICE SPECIFICATION // {service.number || '01'}</Badge>
            {(service.voltageRange || service.specifications?.voltageRange) && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-ekta-surface border border-ekta-border text-ekta-secondary">
                VOLTAGE: {service.voltageRange || service.specifications?.voltageRange}
              </span>
            )}
            {(service.standard || service.specifications?.standard) && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-ekta-surface border border-ekta-border text-brand-teal">
                STD: {service.standard || service.specifications?.standard}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-ekta-text tracking-tight mb-4">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
            {service.shortDescription}
          </p>
          {primaryImage && (
            <img src={resolveMediaUrl(primaryImage.filePath || primaryImage)} alt={primaryImage.altText || service.title} loading="eager" decoding="async" className="mt-8 h-64 w-full max-w-3xl rounded object-cover" />
          )}
          {serviceImages.length > 1 && (
            <div className="mt-6 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
              {serviceImages.slice(1).map((image, index) => (
                <img key={image._id || index} src={resolveMediaUrl(image.filePath || image)} alt={`${service.title} gallery ${index + 1}`} loading="lazy" decoding="async" className="h-32 w-full rounded object-cover" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specification Content */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="min-w-0 lg:col-span-8 space-y-8">
              {/* Detailed Technical Scope */}
              <div className="ekta-card min-w-0 overflow-hidden p-8">
                <h2 className="text-xl font-bold text-ekta-text mb-4">
                  Engineering Scope & Standards
                </h2>
                <p className="break-all text-sm sm:text-base text-ekta-secondary leading-relaxed mb-6">
                  {service.technicalScope || service.specifications?.technicalScope || service.fullDescription || service.shortDescription}
                </p>

                <div className="p-4 rounded-sm bg-ekta-elevated border border-ekta-border text-xs font-mono space-y-2">
                  <div className="text-brand-green font-bold uppercase">Contractor Authorization:</div>
                  <div className="text-ekta-text">{COMPANY_INFO.license}</div>
                  <div className="text-ekta-muted">
                    Execution follows Indian Electricity Rules and CEA Safety Regulations.
                  </div>
                </div>
              </div>

              {/* Features / Capabilities */}
              {(service.features || service.keyFeatures)?.length > 0 && (
                <div className="ekta-card p-8">
                  <h3 className="text-xl font-bold text-ekta-text mb-6">
                    Core Technical Deliverables
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(service.features || service.keyFeatures).map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm text-ekta-secondary">
                        <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky Action Sidebar */}
            <div className="lg:col-span-4">
              <div className="ekta-card p-6 lg:sticky lg:top-28 border-t-4 border-t-brand-green">
                <h3 className="text-lg font-bold text-ekta-text mb-2">
                  Request Technical BOQ
                </h3>
                <p className="text-xs text-ekta-secondary mb-6 leading-relaxed">
                  Submit SLDs or load requirements for an itemized, compliant proposal.
                </p>

                <div className="space-y-3">
                  <Button
                    to="/contact"
                    variant="primary"
                    className="w-full"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Request Technical Survey
                  </Button>

                  <a
                    href={toTelHref(settings.primaryPhone)}
                    className="w-full flex items-center justify-center py-2.5 px-4 text-xs font-mono font-medium rounded-sm border border-ekta-border bg-ekta-elevated text-ekta-text hover:bg-ekta-surface transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-2 text-brand-green" />
                    CALL DESK: {settings.primaryPhone}
                  </a>
                </div>

                <div className="mt-6 pt-4 border-t border-ekta-border text-[11px] font-mono text-ekta-muted">
                  <div>GSTIN: {COMPANY_INFO.gstin}</div>
                  <div className="text-brand-orange mt-1">24/7 Breakdown Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
