import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Building2, Server, Factory, Store, Landmark } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { INDUSTRIES_SERVED } from '../data/companyData';
import { fetchApi } from '../api/apiClient';

const normalizeIndustry = (industry, index) => ({ ...industry, id: industry.slug || industry.id, number: industry.number || String(index + 1).padStart(2, '0'), title: industry.title || industry.name, description: industry.description || industry.shortDescription, specs: industry.specs || (industry.solutionsProvided || []).join(', ') });

export const Industries = () => {
  const [industries, setIndustries] = useState(INDUSTRIES_SERVED);

  useEffect(() => {
    fetchApi('/industries').then((res) => { if (res.data?.length) setIndustries(res.data.map(normalizeIndustry)); }).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Industries Served & Sector Engineering | EKTA ELECTRICAL WORKS"
        description="Specialized high-voltage electrical engineering for Healthcare, Telecom Data Centers, Industrial Warehousing, Commercial Towers, and Banking Networks."
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <Badge variant="green" className="mb-4">
              SECTORS // STATUTORY SPECIALIZATION
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ekta-text tracking-tight mb-6">
              Industries & Mission-Critical Sectors
            </h1>
            <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
              Every facility type carries unique electrical load profiles, statutory mandates, and redundancy requirements. We engineer power networks tailored to specific operational demands.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Alternating Industry Sections */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {industries.map((ind, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <ScrollReveal
                key={ind.id}
                animation={isEven ? 'slide-right' : 'slide-left'}
                duration={600}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 rounded-sm border border-ekta-border bg-ekta-surface ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Technical Spec Box (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="p-6 rounded-sm bg-ekta-elevated border border-ekta-border font-mono text-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-ekta-border pb-3">
                        <span className="text-brand-green font-bold text-sm">
                          SECTOR PROFILE // {ind.number}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-brand-green/10 text-brand-green text-[10px] font-semibold">
                          CLASS-A LICENSED
                        </span>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase text-ekta-muted">Primary Engineering Scope:</div>
                        <div className="font-semibold text-ekta-text mt-1 text-xs leading-relaxed">
                          {ind.specs}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase text-ekta-muted">Representative Clients:</div>
                        <div className="text-ekta-secondary mt-1 text-xs leading-relaxed">
                          {ind.clients}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-ekta-border text-[10px] text-ekta-muted">
                        Statutory compliance verified with State Discoms & CEI.
                      </div>
                    </div>
                  </div>

                  {/* Editorial Description (7 cols) */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <span className="font-mono text-xs text-brand-green font-bold">
                      SECTOR {ind.number} // ELECTRICAL INFRASTRUCTURE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-ekta-text mt-1 mb-4">
                      {ind.title}
                    </h2>
                    <p className="text-ekta-secondary text-base leading-relaxed mb-6">
                      {ind.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        to="/contact"
                        variant="primary"
                        size="sm"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        Request Sector Feasibility Survey
                      </Button>
                      <Button
                        to="/projects"
                        variant="secondary"
                        size="sm"
                      >
                        View Executed Projects
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ekta-elevated text-center border-b border-ekta-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ekta-text mb-4">
            Operating in a Specialized Industrial Sector?
          </h2>
          <p className="text-ekta-secondary mb-8 text-base">
            Our engineering team assesses fault current ratings, harmonic distortions, and statutory clearances for your specific plant or facility.
          </p>
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Request Specialized Sector Consultation
          </Button>
        </div>
      </section>
    </>
  );
};
