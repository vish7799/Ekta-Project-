import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Activity,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Layers,
  Sparkles,
  Building2,
  ExternalLink,
  ChevronRight,
  Gauge,
  CircuitBoard,
  Cable,
  HardDrive,
} from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import {
  COMPANY_INFO,
  COMPANY_STATS,
  CORE_SERVICES,
  VERIFIED_PROJECTS,
  VERIFIED_CLIENTS,
  INDUSTRIES_SERVED,
  VERIFIED_TESTIMONIALS,
} from '../data/companyData';
import { fetchApi } from '../api/apiClient';
import { useSiteSettings, toTelHref } from '../context/SiteSettingsContext';

export const Home = () => {
  const settings = useSiteSettings();
  const [cmsServices, setCmsServices] = useState([]);
  const [cmsProjects, setCmsProjects] = useState([]);
  const [cmsClients, setCmsClients] = useState([]);
  const [cmsTestimonials, setCmsTestimonials] = useState([]);

  // Fetch optional CMS data, falling back smoothly to verified company records
  useEffect(() => {
    fetchApi('/services')
      .then((res) => {
        setCmsServices(res.data || []);
      })
      .catch(() => {});

    fetchApi('/projects')
      .then((res) => {
        setCmsProjects(res.data || []);
      })
      .catch(() => {});

    fetchApi('/clients')
      .then((res) => {
        setCmsClients(res.data || []);
      })
      .catch(() => {});

    fetchApi('/testimonials')
      .then((res) => {
        setCmsTestimonials(res.data || []);
      })
      .catch(() => {});
  }, []);

  const displayServices = cmsServices.length ? cmsServices : CORE_SERVICES;
  const displayProjects = cmsProjects.length ? cmsProjects : VERIFIED_PROJECTS;
  const displayClients = cmsClients.length ? cmsClients : VERIFIED_CLIENTS;
  const displayTestimonials = cmsTestimonials.length
    ? cmsTestimonials.map((testimonial) => ({
        id: testimonial._id,
        quote: testimonial.statement,
        author: testimonial.designation || testimonial.clientName,
        organization: testimonial.companyName,
        project: testimonial.projectRef?.title || 'Engineering project reference',
      }))
    : VERIFIED_TESTIMONIALS;

  const homeServices = displayServices.slice(0, 3);
  const latestProjects = [...displayProjects]
    .sort((firstProject, secondProject) => {
      const firstAddedAt = firstProject.createdAt ? new Date(firstProject.createdAt).getTime() : 0;
      const secondAddedAt = secondProject.createdAt ? new Date(secondProject.createdAt).getTime() : 0;
      return secondAddedAt - firstAddedAt;
    })
    .slice(0, 4);
  const engineeringFlow = [
    { step: '01', title: 'Design', icon: CircuitBoard, text: 'Load studies, one-line design, and switchgear sizing.' },
    { step: '02', title: 'Install', icon: Cable, text: 'Cable routing, busbars, panels, and field execution.' },
    { step: '03', title: 'Test', icon: Gauge, text: 'Megger checks, protection testing, and QA sign-off.' },
    { step: '04', title: 'Operate', icon: HardDrive, text: 'Commissioning, uptime support, and emergency response.' },
  ];

  return (
    <>
      <SEOHead
        title="EKTA ELECTRICAL WORKS | Turnkey Industrial Electrical Infrastructure & Power Engineering"
        description="Class-A electrical contractor established in 1983, delivering industrial power, distribution, testing, and maintenance."
      />

      {/* 01 // HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-ekta-border engineering-grid">
        {/* Subtle architectural gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ekta-bg/60 to-ekta-bg pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Technical Telemetry Bar */}
          <ScrollReveal animation="fade-in" duration={400} className="mb-8">
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 py-1.5 px-3 rounded-sm border border-ekta-border bg-ekta-surface/80 backdrop-blur-sm text-xs font-mono text-ekta-secondary">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
              </span>
              <span className="text-brand-green font-bold uppercase tracking-wider">
                Electrical Contractor
              </span>
              <span className="text-ekta-muted">•</span>
              <span>EST. 1983</span>
              <span className="text-ekta-muted hidden sm:inline">•</span>
              <span className="text-ekta-muted hidden sm:inline">
                LOCATION: New Delhi, India
              </span>
            </div>
          </ScrollReveal>

          {/* Hero Editorial Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <ScrollReveal animation="fade-up" duration={600} delay={100}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ekta-text leading-[1.08]">
                  Engineering <br className="hidden sm:inline" />
                  <span className="text-brand-gradient">Reliable Electrical</span>
                  <br />
                  Solutions.
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" duration={600} delay={200}>
                <p className="mt-6 text-lg sm:text-xl text-ekta-secondary max-w-2xl leading-relaxed font-normal">
                  Industrial electrical contracting, power distribution, testing, and maintenance for mission-critical facilities.
                </p>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal animation="fade-up" duration={600} delay={300} className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Request Technical Proposal
                </Button>
                <Button
                  to="/projects"
                  variant="secondary"
                  size="lg"
                >
                  Explore Turnkey Projects
                </Button>
              </ScrollReveal>
            </div>

            {/* Technical Specification Box (Hero Asymmetric Column) */}
            <div className="lg:col-span-4">
              <ScrollReveal animation="slide-right" duration={600} delay={200}>
                <div className="ekta-card p-6 border-l-4 border-l-brand-green bg-ekta-surface/90 backdrop-blur-sm tech-corner-marks">
                  <div className="flex items-center justify-between pb-3 border-b border-ekta-border">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-green font-bold">
                      SYSTEM CAPABILITIES
                    </span>
                    <span className="font-mono text-[10px] text-ekta-muted">
                      SAFETY STANDARDS
                    </span>
                  </div>

                  <ul className="mt-4 space-y-3 text-xs font-mono text-ekta-secondary">
                    <li className="flex items-start justify-between">
                      <span className="text-ekta-muted">VOLTAGE SCOPE:</span>
                      <span className="font-semibold text-ekta-text">415V LT to 33kV HT</span>
                    </li>
                    <li className="flex items-start justify-between">
                      <span className="text-ekta-muted">AUTHORIZATION:</span>
                      <span className="font-semibold text-ekta-text">Government Class-A</span>
                    </li>
                    <li className="flex items-start justify-between">
                      <span className="text-ekta-muted">TRANSFORMERS:</span>
                      <span className="font-semibold text-ekta-text">Up to 3,000 kVA Dry/Oil</span>
                    </li>
                    <li className="flex items-start justify-between">
                      <span className="text-ekta-muted">SWITCHGEAR:</span>
                      <span className="font-semibold text-ekta-text">Form-4 ACB / VCB / RMU</span>
                    </li>
                    <li className="flex items-start justify-between">
                      <span className="text-ekta-muted">EMERGENCY RESPONSE:</span>
                      <span className="font-semibold text-brand-teal">24/7 Breakdown Dispatch</span>
                    </li>
                  </ul>

                  <div className="mt-5 pt-4 border-t border-ekta-border flex items-center justify-between">
                    <span className="text-[11px] text-ekta-muted">Direct Engineering Desk</span>
                    <a
                      href={toTelHref(settings.primaryPhone)}
                      className="text-xs font-mono text-brand-green font-bold hover:underline flex items-center"
                    >
                      <PhoneCall className="w-3 h-3 mr-1" />
                      {settings.primaryPhone}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02 // STATISTICS / TRUST BAR */}
      <section className="py-12 md:py-16 bg-ekta-elevated border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {COMPANY_STATS.map((stat, idx) => (
              <ScrollReveal key={stat.id} animation="fade-up" delay={idx * 80}>
                <div className="border-l-2 border-brand-green pl-4 sm:pl-6">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ekta-text tracking-tight font-display flex items-baseline">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-semibold text-ekta-text mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-ekta-muted font-mono mt-0.5">
                    {stat.subtext}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 // CLIENT & PARTNER PROOF STRIP */}
      <section className="py-8 bg-ekta-surface border-b border-ekta-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-ekta-muted">
              Client & Project References
            </span>
            <Link
              to="/clients"
              className="text-xs font-mono text-brand-green hover:underline flex items-center"
            >
              View Client Directory <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex space-x-8 animate-marquee-slow whitespace-nowrap py-2">
            {displayClients.concat(displayClients).map((client, index) => (
              <div
                key={`${client._id || client.name}-${index}`}
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-sm border border-ekta-border bg-ekta-elevated/40 text-xs font-mono text-ekta-secondary hover:border-brand-green/40 hover:text-ekta-text transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-brand-green/60" />
                <span className="font-semibold text-ekta-text">{client.name}</span>
                <span className="text-ekta-muted">({client.sector || client.industrySector || 'Enterprise'})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 // ENGINEERING PROCESS VISUAL FLOW */}
      <section className="py-20 lg:py-28 border-b border-ekta-border bg-ekta-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="01"
            eyebrow="EXECUTION FLOW"
            title="From Design to Commissioning"
            description="A four-stage delivery method focused on safety, compliance, and uptime."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {engineeringFlow.map(({ step, title, text, icon: Icon }, index) => (
              <ScrollReveal key={title} animation="fade-up" delay={index * 80}>
                <div className="ekta-card h-full p-6 border-t-4 border-t-red-600">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ekta-muted">{step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-red-500/10 text-red-600 dark:text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-ekta-text mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-ekta-secondary">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 // ASYMMETRIC SERVICES COMPONENT SYSTEM */}
      <section className="py-20 lg:py-28 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="01"
            eyebrow="CAPABILITIES ARCHITECTURE"
            title="Electrical Systems Built for Continuity"
            description="Substations, switchgear, cable networks, automation, and emergency power."
            align="split"
            linkText="View All Engineering Services"
            linkTo="/services"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {homeServices.map((service, idx) => (
              <ScrollReveal key={service.id || idx} animation="fade-up" delay={idx * 70} className="flex">
                <Card className="flex h-full min-h-[250px] w-full flex-col justify-between p-6 hover:border-brand-green/40">
                  <div>
                    <h3 className="text-xl font-bold text-ekta-text mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-ekta-secondary leading-relaxed line-clamp-4">
                      {service.shortDescription || service.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ekta-border">
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs font-semibold text-brand-green hover:underline inline-flex items-center group"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 // FEATURED ENGINEERING PROJECTS PORTFOLIO */}
      <section className="py-20 lg:py-28 bg-ekta-elevated border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="02"
            eyebrow="ENGINEERING TRACK RECORD"
            title="Executed Turnkey Projects"
            description="Selected turnkey work across critical facilities and commercial sites."
            align="split"
            linkText="View Complete Project Archive"
            linkTo="/projects"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProjects.map((project, idx) => (
              <ScrollReveal key={project.id || idx} animation="fade-up" delay={idx * 80}>
                <Card className="h-full flex flex-col justify-between p-6 group">
                  <div>
                    <h3 className="text-xl font-bold text-ekta-text mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>

                    <div className="space-y-2 font-mono text-xs text-ekta-muted">
                      <div>CLIENT: <strong className="text-ekta-text">{project.client || project.clientName || 'N/A'}</strong></div>
                      <div>LOCATION: <strong className="text-ekta-text">{project.location || 'Not specified'}</strong></div>
                    </div>
                  </div>

                  <div className="border-t border-ekta-border px-6 py-4">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs font-semibold text-brand-green hover:underline inline-flex items-center group/link"
                    >
                      <span>View Engineering Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 // INDUSTRIES SERVED — ALTERNATING EDITORIAL COMPOSITION */}
      <section className="py-20 lg:py-28 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="03"
            eyebrow="SECTOR EXPERTISE"
            title="Industry-Specific Power Design"
            description="Power systems matched to each facility’s code, load, and uptime needs."
            align="center"
          />

          <div className="space-y-12 mt-16">
            {INDUSTRIES_SERVED.slice(0, 3).map((ind, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <ScrollReveal
                  key={ind.id}
                  animation={isEven ? 'slide-right' : 'slide-left'}
                  duration={600}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-sm border border-ekta-border bg-ekta-surface ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Visual & Metric Column */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="p-6 rounded-sm bg-ekta-elevated border border-ekta-border font-mono text-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-ekta-border pb-3">
                          <span className="text-brand-green font-bold text-sm">
                            SECTOR PROFILE // {ind.number}
                          </span>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase text-ekta-muted">Primary Engineering Scope:</div>
                          <div className="font-semibold text-ekta-text mt-1 text-xs">
                            {ind.specs}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase text-ekta-muted">Representative Clients:</div>
                          <div className="text-ekta-secondary mt-1 text-xs">
                            {ind.clients}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Content Column */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <span className="font-mono text-xs text-brand-green font-bold">
                        INDUSTRY {ind.number}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ekta-text mt-1 mb-4">
                        {ind.title}
                      </h3>
                      <p className="text-ekta-secondary text-base leading-relaxed mb-6">
                        {ind.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <Button
                          to="/contact"
                          variant="outline"
                          size="sm"
                          icon={ArrowRight}
                          iconPosition="right"
                        >
                          Request Sector Survey
                        </Button>
                        <Link
                          to="/industries"
                          className="text-xs font-mono text-ekta-muted hover:text-ekta-text underline"
                        >
                          View sector standards →
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08 // CLIENT FEEDBACK */}
      <section className="py-20 lg:py-28 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="04"
            eyebrow="STAKEHOLDER ENDORSEMENTS"
            title="Trusted by Facility and Project Leaders"
            description="Feedback from engineering and procurement stakeholders."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((t, idx) => (
              <ScrollReveal key={t.id} animation="fade-up" delay={idx * 100}>
                <Card className="h-full flex flex-col justify-between p-8 border-t-2 border-t-brand-green">
                  <div>
                    <div className="text-brand-green font-mono text-3xl font-bold mb-4">“</div>
                    <p className="text-sm text-ekta-secondary leading-relaxed italic mb-6">
                      {t.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ekta-border">
                    <div className="font-bold text-sm text-ekta-text">{t.author}</div>
                    <div className="text-xs text-brand-green font-medium">{t.organization}</div>
                    <div className="text-[11px] font-mono text-ekta-muted mt-1">
                      Project: {t.project}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 09 // FINAL CONVERSION CTA SECTION */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-ekta-surface via-ekta-elevated to-ekta-surface border-b border-ekta-border engineering-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal animation="fade-up">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-bold mb-4 inline-block">
              ELECTRICAL WORKS • ESTABLISHED 1983
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ekta-text tracking-tight uppercase leading-tight mb-6">
              Let's Build a Brighter, <br className="hidden sm:inline" />
              Safer Tomorrow.
            </h2>

            <p className="text-base sm:text-lg text-ekta-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Electrical infrastructure and project execution backed by 38+ years of experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                REQUEST TECHNICAL SURVEY & QUOTE
              </Button>
              <a
                href={toTelHref(settings.primaryPhone)}
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-mono font-medium rounded-sm border border-ekta-border bg-ekta-surface hover:bg-ekta-elevated text-ekta-text transition-colors shadow-sm min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4 mr-2 text-brand-green" />
                CALL {settings.primaryPhone}
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-6 text-xs font-mono text-ekta-muted">
              <span>GSTIN: {COMPANY_INFO.gstin}</span>
              <span>•</span>
              <span>Class-A Govt. Contractor</span>
              <span>•</span>
              <span>New Delhi, India</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox Modal for Photo Inspection */}
    </>
  );
};
