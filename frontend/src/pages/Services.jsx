import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck, Cpu, Activity, Sun, Flame, Settings } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { CORE_SERVICES } from '../data/companyData';
import { fetchApi, resolveMediaUrl } from '../api/apiClient';

export const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchApi('/services')
      .then((res) => {
        setServices(res.data || []);
      })
      .catch(() => {
        // Keep verified company data fallback
      });
  }, []);

  return (
    <>
      <SEOHead
        title="Industrial Electrical Engineering Services | EKTA ELECTRICAL WORKS"
        description="Comprehensive electrical contracting: LT Panels, HT/LT Cable Laying up to 33kV, DG/AMF Systems, Rooftop Solar, and 24/7 Breakdown AMC."
      />

      {/* Page Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <Badge variant="green" className="mb-4">
              CAPABILITIES DIRECTORY // 10 CORE DISCIPLINES
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ekta-text tracking-tight mb-6">
              Industrial Electrical Engineering Services
            </h1>
            <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
              Complete turnkey design, procurement, erection, testing, and commissioning across high-voltage and low-voltage power distribution systems, executed under Class-A statutory licensing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="01"
            eyebrow="TECHNICAL DISCIPLINES"
            title="Engineered to Statutory Standards (IS & IEC)"
            description="Every service encompasses design calculations, statutory documentation, physical erection, and calibrated instrument verification."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id || index} animation="fade-up" delay={index * 60}>
                <Card className="min-w-0 h-full flex flex-col justify-between overflow-hidden p-8 group hover:border-brand-green/50">
                  <div>
                    {(service.featuredImage?.filePath || service.gallery?.[0]) && (
                      <img src={resolveMediaUrl(service.featuredImage?.filePath || service.gallery[0].filePath || service.gallery[0])} alt={service.featuredImage?.altText || service.title} className="mb-6 h-40 w-full rounded object-cover" />
                    )}
                    <h2 className="break-all text-xl font-bold text-ekta-text mb-3 group-hover:text-brand-green transition-colors">
                      {service.title}
                    </h2>

                    <p className="break-all line-clamp-4 text-xs text-ekta-secondary leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ekta-border flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs font-semibold text-brand-green hover:underline inline-flex items-center group/link"
                    >
                      <span>Full Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                    <span className="font-mono text-[10px] text-ekta-muted">Class-A Verified</span>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ekta-elevated text-center border-b border-ekta-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ekta-text mb-4">
            Need a Custom Electrical System Engineering Proposal?
          </h2>
          <p className="text-ekta-secondary mb-8 text-base">
            Submit your single-line diagram (SLD), estimated load calculations, or tender document for rapid technical review.
          </p>
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Submit Engineering Tender / Enquiry
          </Button>
        </div>
      </section>
    </>
  );
};
