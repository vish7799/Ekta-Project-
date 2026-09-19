import React from 'react';
import { ShieldCheck, Award, Wrench, Users, CheckCircle2, PhoneCall, ArrowRight, Zap } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { COMPANY_INFO, COMPANY_STATS } from '../data/companyData';

export const About = () => {
  const milestones = [
    {
      year: '1983',
      title: 'Foundation',
      description: 'Started in New Delhi with a focus on practical industrial and commercial electrical contracting.',
    },
    {
      year: '1990s+',
      title: 'Growth',
      description: 'Expanded across housing, healthcare, retail, warehouse, and exhibition electrical works.',
    },
    {
      year: '2000s+',
      title: 'Scale',
      description: 'Handled larger infrastructure, switchgear, and high-load site execution projects.',
    },
    {
      year: 'Today',
      title: 'Execution',
      description: 'Active in substations, power distribution, testing, and maintenance across critical facilities.',
    },
  ];

  return (
    <>
      <SEOHead
        title="About EKTA ELECTRICAL WORKS | 38+ Years of Electrical Contracting"
        description="Learn about EKTA ELECTRICAL WORKS, a Class-A electrical contractor established in 1983."
      />

      {/* Page Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <Badge variant="green" className="mb-4">
              EST. 1983 // 38+ YEARS OF EXPERIENCE
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ekta-text tracking-tight mb-6">
              Engineering Heritage & Technical Rigor
            </h1>
            <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
              Electrical contracting and infrastructure support since 1983, focused on safe execution and continuity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Corporate Identity & Statutory Verification */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs text-brand-green font-bold tracking-wider">
                01 // STATUTORY INTEGRITY & CREDENTIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-ekta-text leading-tight">
                Licensed. Safety-led. Execution-focused.
              </h2>
              <p className="text-ekta-secondary leading-relaxed">
                Compliance, safety, and practical execution across industrial and commercial systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-sm border border-ekta-border bg-ekta-surface">
                  <div className="text-xs font-mono text-ekta-muted">LEGAL ENTITY</div>
                  <div className="font-bold text-sm text-ekta-text mt-1">{COMPANY_INFO.legalName}</div>
                </div>
                <div className="p-4 rounded-sm border border-ekta-border bg-ekta-surface">
                  <div className="text-xs font-mono text-ekta-muted">GST IDENTIFICATION NUMBER</div>
                  <div className="font-mono font-bold text-sm text-brand-orange mt-1">{COMPANY_INFO.gstin}</div>
                </div>
                <div className="p-4 rounded-sm border border-ekta-border bg-ekta-surface">
                  <div className="text-xs font-mono text-ekta-muted">CONTRACTOR CATEGORY</div>
                  <div className="font-bold text-sm text-brand-green mt-1">Class-A Licensed (Govt. of NCT Delhi)</div>
                </div>
                <div className="p-4 rounded-sm border border-ekta-border bg-ekta-surface">
                  <div className="text-xs font-mono text-ekta-muted">HEADQUARTERS</div>
                  <div className="font-mono font-bold text-sm text-ekta-text mt-1">New Delhi, India</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="ekta-card p-5 border border-ekta-border flex items-center gap-4 bg-ekta-surface tech-corner-marks">
                <img
                  src="/logo.png"
                  alt="EKTA ELECTRICAL WORKS Corporate Seal"
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-20 rounded-full border border-ekta-border bg-white object-contain p-1 shadow-sm shrink-0"
                />
                <div>
                  <div className="text-xs font-mono text-brand-green font-semibold uppercase tracking-wider">
                    Official Corporate Seal
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-ekta-text mt-0.5">
                    EKTA ELECTRICAL WORKS (EEW)
                  </h4>
                  <p className="text-xs text-ekta-secondary mt-1 leading-relaxed">
                    Class-A Indian electrical contracting since 1983.
                  </p>
                </div>
              </div>

              <div className="ekta-card p-8 border-t-4 border-t-brand-green tech-corner-marks">
                <h3 className="text-lg font-bold text-ekta-text mb-4">Key Working Standards</h3>
                <ul className="space-y-3.5 text-sm text-ekta-secondary">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span>Safety-first execution with active site controls.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span>Testing and commissioning using calibrated diagnostics.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span>End-to-end coordination for compliance and energization.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-ekta-elevated border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="02"
            eyebrow="ENGINEERING LEADERSHIP"
            title="Hands-On Technical Oversight"
            description="Direct leadership across site execution, testing, and client coordination."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {COMPANY_INFO.contacts.map((executive, idx) => (
              <Card key={idx} className="p-8 border-l-4 border-l-brand-green">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-sm bg-brand-green/10 text-brand-green flex items-center justify-center font-mono font-bold text-lg">
                    {executive.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ekta-text">{executive.name}</h3>
                    <p className="text-xs font-mono text-brand-green">{executive.role}</p>
                  </div>
                </div>
                <p className="text-sm text-ekta-secondary leading-relaxed mb-6">
                  Substation execution, compliance checks, and safe project delivery.
                </p>
                <div className="pt-4 border-t border-ekta-border flex items-center justify-between">
                  <span className="text-xs font-mono text-ekta-muted">Direct Phone:</span>
                  <a
                    href={executive.telHref}
                    className="font-mono text-sm font-bold text-brand-green hover:underline flex items-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                    {executive.phone}
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Decades Timeline */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="03"
            eyebrow="CHRONOLOGY"
            title="A Longstanding Electrical Execution Record"
            description="From workshop works to multi-site infrastructure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="border-t-2 border-brand-green pt-6">
                <span className="font-mono text-2xl font-bold text-brand-green block mb-2">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-ekta-text mb-2">{m.title}</h3>
                <p className="text-xs text-ekta-secondary leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ekta-surface text-center border-b border-ekta-border">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ekta-text mb-4">
            Discuss Your Electrical Project
          </h2>
          <p className="text-ekta-secondary mb-8 text-base">
            Speak with our engineering team for a site review and recommendation.
          </p>
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Connect With Engineering Team
          </Button>
        </div>
      </section>
    </>
  );
};
