import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowRight, Quote } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { fetchApi } from '../api/apiClient';

export const Testimonials = () => {
  const [extendedTestimonials, setExtendedTestimonials] = useState([]);

  useEffect(() => {
    fetchApi('/testimonials')
      .then((response) => setExtendedTestimonials((response.data || []).map((testimonial) => ({
        id: testimonial._id,
        quote: testimonial.statement,
        author: testimonial.designation || testimonial.clientName,
        organization: testimonial.companyName,
        project: testimonial.projectRef?.title || 'Engineering project reference',
        verified: true,
      }))))
      .catch(() => setExtendedTestimonials([]));
  }, []);

  return (
    <>
      <SEOHead
        title="Engineering References & Client Testimonials | EKTA ELECTRICAL WORKS"
        description="Read verified project endorsements and technical references from hospital directors, data center heads, and supply chain project managers."
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <Badge variant="green" className="mb-4">
              VERIFIED ENDORSEMENTS // STAKEHOLDER REPUTATION
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ekta-text tracking-tight mb-6">
              Engineering References & Testimonials
            </h1>
            <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
              Read direct assessments from facility directors, technical consultants, and chief electrical engineers who entrust their high-voltage power systems to EKTA ELECTRICAL WORKS.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extendedTestimonials.map((t, idx) => (
              <ScrollReveal key={t.id || idx} animation="fade-up" delay={idx * 60}>
                <Card className="h-full flex flex-col justify-between p-8 border-t-2 border-t-brand-green">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-3xl font-bold text-brand-green">“</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-green/10 text-brand-green font-semibold">
                        VERIFIED CLIENT
                      </span>
                    </div>

                    <p className="text-sm text-ekta-secondary leading-relaxed italic mb-6">
                      {t.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ekta-border">
                    <div className="font-bold text-sm text-ekta-text">{t.author}</div>
                    <div className="text-xs text-brand-green font-medium mt-0.5">{t.organization}</div>
                    <div className="text-[11px] font-mono text-ekta-muted mt-2">
                      Scope: {t.project}
                    </div>
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
            Request Formal Engineering Client References
          </h2>
          <p className="text-ekta-secondary mb-8 text-base">
            For major tenders and high-capacity substation contracts, we provide direct contact information for past client engineering directors upon request.
          </p>
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Request Reference Contacts
          </Button>
        </div>
      </section>
    </>
  );
};
