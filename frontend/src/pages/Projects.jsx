import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, ShieldCheck, MapPin, Building2, Zap } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { LightboxModal } from '../components/ui/LightboxModal';
import { VERIFIED_PROJECTS } from '../data/companyData';
import { fetchApi } from '../api/apiClient';

export const Projects = () => {
  const [projects, setProjects] = useState(VERIFIED_PROJECTS);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchApi('/projects')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch(() => {});
  }, []);

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
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ScrollReveal key={project.id || idx} animation="fade-up" delay={idx * 70}>
                <Card className="h-full flex flex-col justify-between p-8 group">
                  <div>
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
            ))}
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
