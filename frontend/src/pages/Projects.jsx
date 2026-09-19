import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { LightboxModal } from '../components/ui/LightboxModal';
import { VERIFIED_PROJECTS } from '../data/companyData';
import { fetchApi, resolveMediaUrl } from '../api/apiClient';

const buildProjectVisual = (project, fallbackLabel = 'Project') => {
  const key = (project.title || fallbackLabel).replace(/[^a-zA-Z0-9]/g, '').slice(0, 18) || 'project';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480">
      <defs>
        <linearGradient id="bg-${key}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#111827"/>
        </linearGradient>
        <linearGradient id="line-${key}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#60a5fa"/>
        </linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#bg-${key})"/>
      <g stroke="url(#line-${key})" stroke-width="4" fill="none">
        <path d="M90 330H270V220H420V300H620" opacity="0.8"/>
        <path d="M150 170L150 90M150 90H300M300 90V170M530 180V115H675M675 115V180" opacity="0.8"/>
        <circle cx="150" cy="170" r="18"/>
        <circle cx="420" cy="220" r="18"/>
        <circle cx="620" cy="300" r="18"/>
        <circle cx="675" cy="180" r="18"/>
      </g>
      <g fill="#e2e8f0" font-family="Arial, sans-serif" font-size="26" font-weight="700">
        <text x="90" y="390">${project.category || 'Electrical'}</text>
        <text x="90" y="430">${project.voltage || '415V / 11kV'}</text>
      </g>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchApi('/projects')
      .then((res) => {
        setProjects(res.data || []);
      })
      .catch(() => {});
  }, []);

  const sourceProjects = projects.length ? projects : VERIFIED_PROJECTS;
  const deliverySignals = [
    { label: 'Design', value: 'Load + protection studies', icon: Zap },
    { label: 'Install', value: 'HT/LT field execution', icon: Activity },
    { label: 'Verify', value: 'Testing + compliance', icon: ShieldCheck },
    { label: 'Commission', value: 'Handover + support', icon: ArrowRight },
  ];

  return (
    <>
      <SEOHead
        title="Executed Industrial Electrical Projects | EKTA ELECTRICAL WORKS"
        description="Selected electrical, interior, exhibition, hospital, showroom, warehouse, and consultancy works documented in the EKTA ELECTRICAL WORKS company profile."
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <Badge variant="green" className="mb-4">
              PORTFOLIO // COMPANY PROFILE PROJECT REFERENCES
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ekta-text tracking-tight mb-6">
              Turnkey Electrical Project Portfolio
            </h1>
            <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
              Documented track record of high-voltage substations, regional data center grids, industrial factory power routing, and statutory energization across India since 1983.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deliverySignals.map(({ label, value, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-3 border border-ekta-border bg-ekta-elevated px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-red-500/10 text-red-600 dark:text-red-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ekta-muted">0{index + 1} // {label}</div>
                  <div className="truncate text-xs font-semibold text-ekta-text">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sourceProjects.map((project, idx) => {
              const imageSrc = project.featuredImage?.filePath || project.gallery?.[0]?.filePath || project.gallery?.[0] || buildProjectVisual(project, project.title);
              return (
              <ScrollReveal key={project.id || idx} animation="fade-up" delay={idx * 70}>
                <Card className="h-full flex flex-col justify-between p-8 group">
                  <div>
                    <img
                      src={typeof imageSrc === 'string' && imageSrc.startsWith('data:image') ? imageSrc : resolveMediaUrl(imageSrc)}
                      alt={project.featuredImage?.altText || project.title}
                      loading="lazy"
                      decoding="async"
                      className="mb-6 h-40 w-full rounded object-cover"
                      onError={(event) => {
                        if (event.currentTarget.dataset.fallbackApplied) return;
                        event.currentTarget.dataset.fallbackApplied = 'true';
                        event.currentTarget.src = buildProjectVisual(project, project.title);
                      }}
                    />
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="teal">{project.category || project.industry?.name || 'Industrial Project'}</Badge>
                      <span className="font-mono text-xs font-bold text-brand-orange">
                        {project.voltage || '415V / 11kV'}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-ekta-text mb-3 group-hover:text-brand-green transition-colors">
                      {project.title}
                    </h2>

                    <div className="font-mono text-xs text-ekta-muted mb-4 space-y-1">
                        <div>CLIENT: <strong className="text-ekta-text">{project.client || project.clientName || 'N/A'}</strong></div>
                      <div className="flex items-center text-ekta-secondary">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-brand-green shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-ekta-secondary leading-relaxed mb-6 break-words line-clamp-4">
                      {project.summary}
                    </p>

                    {/* Metrics / Key highlights */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-sm bg-ekta-elevated border border-ekta-border text-xs font-mono">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-[10px] text-ekta-muted uppercase">{m.label}</div>
                            <div className="font-bold text-ekta-text mt-0.5">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-ekta-border flex items-center justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs font-semibold text-brand-green hover:underline inline-flex items-center group/link"
                    >
                      <span>Engineering Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                    <span className="font-mono text-[10px] text-ekta-muted">
                        {project.year || (project.completionDate ? new Date(project.completionDate).getFullYear() : 'Commissioned')}
                    </span>
                  </div>
                </Card>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ekta-elevated text-center border-b border-ekta-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ekta-text mb-4">
            Have a Similar Industrial Power Project in Mind?
          </h2>
          <p className="text-ekta-secondary mb-8 text-base">
            Our senior engineers can conduct an initial site assessment and advise on optimal transformer sizing, fault level calculations, and switchgear configuration.
          </p>
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Request Project Consultation
          </Button>
        </div>
      </section>
    </>
  );
};
