import React from 'react';
import { ShieldCheck, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Card, Badge } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const Clients = () => {
  const sectors = [
    {
      category: 'Healthcare & Hospitals',
      clients: [
        { name: 'Max Super Speciality Hospital', location: 'Shalimar Bagh, New Delhi', scope: '33kV HT Substation, Transformers & Critical ICU Distribution' },
        { name: 'Max Covid Hospital', location: 'Saket, New Delhi', scope: 'Rapid Oxygen & Emergency Ventilator Power Distribution' },
        { name: 'Covid-19 Healthcare Hospital', location: 'Bhagwati Nagar, Jammu & Kashmir', scope: 'Turnkey Hospital Electrification & DG Backup' },
        { name: 'AIIMS Hospital Consultancy', location: 'Delhi & Bhopal (DTU Team)', scope: 'Substation Assessment & Grounding Grid Consultancy' },
      ],
    },
    {
      category: 'Data Centres & Telecommunications',
      clients: [
        { name: 'Bharti Airtel Data Centre', location: 'Guwahati, Assam', scope: 'Electrical work for the data centre' },
        { name: 'DD News Studios', location: 'Delhi & Mumbai', scope: 'Broadcast Studio Clean Power & Acoustic Isolation Transformers' },
        { name: 'Media One Broadcasting Hub', location: 'National Capital Region', scope: 'UPS Redundancy, Studio DBs & Noise Filtration' },
        { name: 'Home Shop 18 Network', location: 'Film City, Noida', scope: 'High-Density Studio Switchboards & Power Cabling' },
      ],
    },
    {
      category: 'Logistics Parks & Warehousing',
      clients: [
        { name: 'TVS Logistics Parks (Pataudi Hub)', location: 'Haryana', scope: 'Multi-Bay Electrification, AMF Synchronizing Panels' },
        { name: 'TVS Logistics Parks (Lucknow & Sohna)', location: 'Uttar Pradesh & Haryana', scope: 'Warehouse electrical work and power distribution' },
        { name: 'Industry Buying Mega Facility', location: 'Ghitorni, Delhi NCR', scope: 'Warehouse Busducts, High-Bay LED & DG Backup' },
      ],
    },
    {
      category: 'Banking & Financial Institutions',
      clients: [
        { name: 'IndusInd Bank Regional Hubs', location: 'Kota, Bikaner, Dehradun, Indore, Chandigarh', scope: 'Standardized Branch Power, UPS Isolators & Earth Grids' },
        { name: 'Federal Bank Commercial Branches', location: 'Karol Bagh & Pitampura, Delhi', scope: 'Commercial Power Panels & Server Room Security Circuits' },
      ],
    },
    {
      category: 'Retail Networks & Flagship Showrooms',
      clients: [
        { name: 'Kajaria Tiles Flagship Showrooms', location: 'Rewari & Pan-India', scope: 'Architectural Lighting, DALI Control DBs & Chiller Power' },
        { name: 'Reliance Trends Megastore', location: 'Kerala', scope: 'Turnkey Retail Fit-Out, HVAC Power & Distribution Boards' },
        { name: 'Grotto Showrooms & Purple Retail', location: 'Delhi NCR', scope: 'Commercial Panel Installation & Display Electrification' },
      ],
    },
    {
      category: 'Housing Societies & Residential Sub-Townships',
      clients: [
        { name: 'Pacific State Township (370 Flats)', location: 'Dehradun, Uttarakhand', scope: '11kV Complete Substation, Rising Mains & Prepaid Meters' },
        { name: 'Air Men & Sailors Co-op Group Housing', location: 'Rohini Sector-9, New Delhi', scope: 'Substation Erection, LT Distribution & Pump Wiring' },
        { name: 'Saket & Rama Krishna Co-op Societies', location: 'Delhi NCR', scope: 'HT Cable Laying, Transformer Maintenance & Panel Upgrades' },
      ],
    },
  ];

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
              Verified Client Directory
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
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-bold text-ekta-text">
                          {client.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ekta-elevated text-ekta-muted border border-ekta-border">
                          VERIFIED
                        </span>
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
