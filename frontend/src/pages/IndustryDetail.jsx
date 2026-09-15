import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, ArrowRight, PhoneCall } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { COMPANY_INFO } from '../data/companyData';
import { fetchApi } from '../api/apiClient';

export const IndustryDetail = () => {
  const { slug } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi(`/industries/slug/${slug}`)
      .then((res) => {
        setIndustry(res.data ? { ...res.data, id: res.data.slug, title: res.data.name, description: res.data.shortDescription, specs: (res.data.solutionsProvided || []).join(', ') } : null);
      })
      .catch(() => setIndustry(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-ekta-muted font-mono text-xs">
        RETRIEVING SECTOR PROFILE...
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center">
        <h1 className="text-2xl font-bold text-ekta-text mb-3">Industry Profile Not Found</h1>
        <p className="text-ekta-secondary mb-6 text-sm">
          The requested industry sector specification could not be located.
        </p>
        <Button to="/industries" variant="secondary" icon={ArrowLeft} iconPosition="left">
          Back to Industries Directory
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${industry.title || industry.name} | EKTA ELECTRICAL WORKS`}
        description={industry.description || industry.shortDescription}
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/industries"
            className="text-xs font-mono text-brand-green hover:underline inline-flex items-center mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> ALL INDUSTRY SECTORS
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="green">SECTOR PROFILE // {industry.number || '01'}</Badge>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ekta-surface border border-ekta-border text-ekta-secondary">
              CLASS-A LICENSED
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-ekta-text tracking-tight mb-4">
            {industry.title || industry.name}
          </h1>
          <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
            {industry.description || industry.shortDescription}
          </p>
        </div>
      </section>

      {/* Sector Content */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="ekta-card p-8">
                <h2 className="text-xl font-bold text-ekta-text mb-4">
                  Sector Engineering Requirements & Solution Design
                </h2>
                <p className="text-sm sm:text-base text-ekta-secondary leading-relaxed mb-6">
                  {industry.overview || industry.description}
                </p>

                {industry.specs && (
                  <div className="p-4 rounded-sm bg-ekta-elevated border border-ekta-border font-mono text-xs space-y-2">
                    <div className="text-brand-green font-bold uppercase">Standard Technical Parameters:</div>
                    <div className="text-ekta-text">{industry.specs}</div>
                  </div>
                )}
              </div>

              {industry.clients && (
                <div className="ekta-card p-8">
                  <h3 className="text-lg font-bold text-ekta-text mb-3 font-mono">
                    VERIFIED CLIENT DEPLOYMENTS IN THIS SECTOR
                  </h3>
                  <p className="text-sm text-ekta-secondary leading-relaxed">
                    {industry.clients}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="ekta-card p-6 lg:sticky lg:top-28 border-t-4 border-t-brand-green space-y-4">
                <h3 className="text-lg font-bold text-ekta-text border-b border-ekta-border pb-3">
                  Sector Survey
                </h3>
                <p className="text-xs text-ekta-secondary leading-relaxed">
                  Request a dedicated power quality and single-line diagram consultation for your facility.
                </p>

                <div className="space-y-3 pt-2">
                  <Button
                    to="/contact"
                    variant="primary"
                    className="w-full"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Request Sector Proposal
                  </Button>
                  <a
                    href="tel:+919899442333"
                    className="w-full flex items-center justify-center py-2.5 px-4 text-xs font-mono font-medium rounded-sm border border-ekta-border bg-ekta-elevated text-ekta-text hover:bg-ekta-surface transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-2 text-brand-green" />
                    +91 9899442333
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
