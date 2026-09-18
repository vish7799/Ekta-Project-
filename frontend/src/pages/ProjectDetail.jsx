import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, CheckCircle2, ShieldCheck, PhoneCall, ArrowRight, Zap } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { LightboxModal } from '../components/ui/LightboxModal';
import { COMPANY_INFO } from '../data/companyData';
import { fetchApi, resolveMediaUrl } from '../api/apiClient';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchApi(`/projects/slug/${slug}`)
      .then((res) => {
        setProject(res.data || null);
      })
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-ekta-muted font-mono text-xs">
        RETRIEVING PROJECT CASE STUDY...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center">
        <h1 className="text-2xl font-bold text-ekta-text mb-3">Project Record Not Found</h1>
        <p className="text-ekta-secondary mb-6 text-sm">
          The requested engineering case study could not be located.
        </p>
        <Button to="/projects" variant="secondary" icon={ArrowLeft} iconPosition="left">
          Back to Projects Portfolio
        </Button>
      </div>
    );
  }

  const projectImages = [
    ...(project.featuredImage?.filePath ? [project.featuredImage] : []),
    ...(project.gallery || []),
  ].map((image) => ({
    src: resolveMediaUrl(image.filePath || image),
    alt: image.altText || project.title,
    caption: image.caption,
  }));
  const primaryImage = projectImages[0];

  const showPreviousImage = () => {
    setActiveImageIndex((current) => (
      current > 0 ? current - 1 : projectImages.length - 1
    ));
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => (
      current < projectImages.length - 1 ? current + 1 : 0
    ));
  };

  return (
    <>
      <SEOHead
        title={`${project.title} | Case Study | EKTA ELECTRICAL WORKS`}
        description={project.summary || 'Turnkey electrical engineering case study.'}
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="text-xs font-mono text-brand-green hover:underline inline-flex items-center mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> ALL TURNKEY PROJECTS
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="teal">{project.category || 'Engineering Execution'}</Badge>
            {project.voltage && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-ekta-surface border border-ekta-border text-brand-orange font-bold">
                VOLTAGE: {project.voltage}
              </span>
            )}
            {project.year && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-ekta-surface border border-ekta-border text-ekta-secondary">
                YEAR: {project.year}
              </span>
            )}
          </div>

          <h1 className="break-all text-3xl sm:text-5xl font-bold text-ekta-text tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="max-w-3xl break-all text-base sm:text-lg text-ekta-secondary leading-relaxed">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="min-w-0 lg:col-span-8 space-y-8">
              {/* Scope & Execution */}
              <div className="ekta-card min-w-0 overflow-hidden p-8">
                <h2 className="text-xl font-bold text-ekta-text mb-4">
                  Scope of Work & Technical Execution
                </h2>
                <p className="mb-6 break-all text-sm sm:text-base text-ekta-secondary leading-relaxed">
                  {project.description || project.summary}
                </p>

                {primaryImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(0);
                      setLightboxOpen(true);
                    }}
                    className="group relative block w-full cursor-zoom-in text-left"
                    aria-label={`Open project image gallery with ${projectImages.length} images`}
                  >
                    <img
                      src={primaryImage.src}
                      alt={primaryImage.alt}
                      className="h-72 w-full rounded object-cover"
                    />
                    <span className="absolute bottom-3 right-3 rounded bg-black/75 px-3 py-1.5 text-xs font-mono text-white">
                      {projectImages.length} {projectImages.length === 1 ? 'image' : 'images'}
                    </span>
                  </button>
                )}

                {(project.scope || project.highlights)?.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-ekta-border">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-ekta-text mb-4">
                      Detailed Technical Deliverables:
                    </h3>
                    <ul className="space-y-3">
                      {(project.scope || project.highlights).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-ekta-secondary">
                          <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Metrics Box */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="ekta-card p-8">
                  <h3 className="text-lg font-bold text-ekta-text mb-4 font-mono">
                    VERIFIED TECHNICAL METRICS
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded bg-ekta-elevated border border-ekta-border font-mono">
                        <div className="text-[10px] uppercase text-ekta-muted">{m.label}</div>
                        <div className="text-base font-bold text-brand-green mt-1">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Sidebar */}
            <div className="lg:col-span-4">
              <div className="ekta-card p-6 lg:sticky lg:top-28 border-t-4 border-t-brand-green space-y-5">
                <h3 className="text-lg font-bold text-ekta-text border-b border-ekta-border pb-3">
                  Project Parameters
                </h3>

                <div className="text-xs font-mono space-y-3">
                  <div>
                    <div className="text-ekta-muted">CLIENT ENTITY</div>
                    <div className="font-semibold text-ekta-text mt-0.5">{project.client || project.clientName}</div>
                  </div>

                  <div>
                    <div className="text-ekta-muted">FACILITY LOCATION</div>
                    <div className="font-semibold text-ekta-text mt-0.5">{project.location}</div>
                  </div>

                  <div>
                    <div className="text-ekta-muted">SYSTEM VOLTAGE</div>
                    <div className="font-semibold text-brand-orange mt-0.5">{project.voltage}</div>
                  </div>

                  <div>
                    <div className="text-ekta-muted">CONTRACTOR</div>
                    <div className="font-semibold text-ekta-text mt-0.5">EKTA ELECTRICAL WORKS (Class-A)</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-ekta-border space-y-3">
                  <Button
                    to="/contact"
                    variant="primary"
                    className="w-full"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Discuss Similar Scope
                  </Button>

                  <a
                    href="tel:+919899442333"
                    className="w-full flex items-center justify-center py-2.5 px-4 text-xs font-mono font-medium rounded-sm border border-ekta-border bg-ekta-elevated text-ekta-text hover:bg-ekta-surface transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-2 text-brand-green" />
                    CALL DESK: +91 9899442333
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LightboxModal
        isOpen={lightboxOpen}
        images={projectImages}
        currentIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={showPreviousImage}
        onNext={showNextImage}
      />
    </>
  );
};
