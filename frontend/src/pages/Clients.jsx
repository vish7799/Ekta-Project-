import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { fetchApi, resolveMediaUrl } from '../api/apiClient';
import { VERIFIED_CLIENTS } from '../data/companyData';

const groupClients = (records) => records.reduce((groups, client) => {
  const category = client.industrySector || client.sector || 'Other Clients';
  const group = groups.find((item) => item.category === category);
  const record = {
    name: client.name,
    location: client.location || 'New Delhi, India',
    scope: client.scope || 'Electrical engineering services',
    logo: client.logo,
  };
  if (group) group.clients.push(record);
  else groups.push({ category, clients: [record] });
  return groups;
}, []);

export const Clients = () => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetchApi('/clients')
      .then((response) => {
        setSectors(groupClients(response.data?.length ? response.data : VERIFIED_CLIENTS));
      })
      .catch(() => setSectors(groupClients(VERIFIED_CLIENTS)));
  }, []);

  return (
    <>
      <SEOHead
        title="Client Portfolio & Enterprise Track Record | EKTA ELECTRICAL WORKS"
        description="Client and project references documented in the EKTA ELECTRICAL WORKS company profile, including hospitals, showrooms, warehouses, exhibitions, offices, and housing works."
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ekta-border bg-ekta-elevated engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <Badge variant="green" className="mb-4">
              COMPANY PROFILE // CLIENTS & PROJECT REFERENCES
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ekta-text tracking-tight mb-6">
              Client Directory
            </h1>
            <p className="text-base sm:text-lg text-ekta-secondary max-w-3xl leading-relaxed">
              Our company profile records work for healthcare facilities, showrooms, offices, exhibitions, warehouses, housing societies, banks, and other commercial sites.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sector Grouping */}
      <section className="py-20 border-b border-ekta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {sectors.map((sec, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 50}>
              <div>
                <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-ekta-border">
                  <span className="font-mono text-xs font-bold text-brand-green">
                    0{idx + 1} //
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ekta-text">
                    {sec.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sec.clients.map((client, cIdx) => (
                    <Card key={cIdx} className="p-6 border-l-2 border-l-brand-green">
                      <div className="mb-2 flex items-center gap-3">
                        {client.logo?.filePath && (
                          <img
                            src={resolveMediaUrl(client.logo.filePath)}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-10 w-10 rounded border border-ekta-border bg-white object-contain p-1"
                          />
                        )}
                        <h3 className="text-base font-bold text-ekta-text">
                          {client.name}
                        </h3>
                      </div>
                      <div className="text-xs font-mono text-brand-green mb-3">
                        {client.location}
                      </div>
                      <p className="text-xs text-ekta-secondary leading-relaxed">
                        <strong>Scope:</strong> {client.scope}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ekta-elevated text-center border-b border-ekta-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ekta-text mb-4">
            Partner With a Proven Class-A Electrical Contractor
          </h2>
          <p className="text-ekta-secondary mb-8 text-base">
            Reach out to discuss your infrastructure rollout, tender qualification, or statutory survey needs.
          </p>
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Request Engineering Consultation
          </Button>
        </div>
      </section>
    </>
  );
};
