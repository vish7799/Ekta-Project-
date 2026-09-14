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
      title: 'Company Foundation',
      description: 'Established in New Delhi under the engineering leadership of Naresh Kumar, providing specialized electrical contracting for industrial workshops and commercial institutions.',
    },
    {
      year: '1998',
      title: 'Electrical Contracting Experience',
      description: 'The company profile records 38 years of electrical contracting experience across housing, commercial, exhibition, healthcare, showroom, and warehouse works.',
    },
    {
      year: '2010',
      title: 'Expansion into Diverse Works',
      description: 'The documented work includes hospitals, showrooms, offices, exhibitions, housing societies, warehouses, electrical interiors, and consultancy assignments.',
    },
    {
      year: '2020 – Present',
      title: 'Recent Project Experience',
      description: 'Recent profile entries include TVS warehouses, Max Hospital Shalimar Bagh, National Testing House, Industry Buying, JayaShree Polymers, and TDI Infrastructure.',
    },
  ];

  return (
    <>
      <SEOHead
        title="About EKTA ELECTRICAL WORKS | 38+ Years of Electrical Contracting"
        description="Learn about EKTA ELECTRICAL WORKS, a dedicated electrical contractor established in 1983 with 38+ years of experience."
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
              EKTA ELECTRICAL WORKS is a dedicated electrical contractor established in 1983. The company profile records 38+ years of experience in electrical installation, interior works, exhibition works, solar panel installation, cable laying, panel work, and related services.
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
                Grounded in Safety Standards, Licensed by Government Authorities
              </h2>
              <p className="text-ekta-secondary leading-relaxed">
                Operating under strict compliance with the Central Electricity Authority (CEA) Regulations, Indian Electricity Rules, and National Electrical Code of India (NEC 2023). Every project is overseen by licensed electrical supervisors with calibrated diagnostic tools.
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
                  <div className="text-xs font-mono text-ekta-muted">HEADQUARTERS COORDINATES</div>
                  <div className="font-mono font-bold text-sm text-ekta-text mt-1">{COMPANY_INFO.coordinates}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="ekta-card p-8 border-t-4 border-t-brand-green tech-corner-marks">
                <h3 className="text-lg font-bold text-ekta-text mb-4">Core Operational Principles</h3>
                <ul className="space-y-3.5 text-sm text-ekta-secondary">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span><strong>Zero-Incident Safety Policy:</strong> Mandatory PPE, lockout/tagout (LOTO) protocols, and daily safety briefings.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span><strong>Calibrated Diagnostic Tools:</strong> 5kV motorized megger testing, micro-ohm meters, and FLIR thermal imagers.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span><strong>Statutory Liaisoning:</strong> Complete facilitation of Chief Electrical Inspectorate (CEI) approvals and energization certificates.</span>
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
            title="Experienced Technical Directors"
            description="Our project execution is led by seasoned power systems practitioners with hands-on site management and testing experience."
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
                  Direct technical oversight across HT/LT substation commissioning, statutory compliance, client coordination, and high-voltage safety protocols.
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
            title="Four Decades of Engineering Milestones"
            description="From early industrial workshops to multi-state healthcare and telecom infrastructure."
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
            Discuss Your Technical Infrastructure Project
          </h2>
          <p className="text-ekta-secondary mb-8 text-base">
            Speak directly with our senior power engineers to schedule a statutory site survey.
          </p>
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Connect With Engineering Team
          </Button>
        </div>
      </section>
    </>
  );
};
