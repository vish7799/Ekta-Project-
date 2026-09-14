import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <>
      <SEOHead title="404 Page Not Found | EKTA ELECTRICAL WORKS" description="The requested page could not be located." />

      <section className="py-28 text-center bg-ekta-bg engineering-grid">
        <div className="max-w-xl mx-auto px-4">
          <div className="w-16 h-16 rounded-sm bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <span className="font-mono text-xs text-brand-green font-bold tracking-widest block mb-2">
            ERROR 404 // ROUTE MISMATCH
          </span>
          <h1 className="text-4xl font-bold text-ekta-text mb-4">404 — Page Not Found</h1>
          <p className="text-ekta-secondary mb-8 text-base">
            The engineering route or specification document you requested does not exist or has been relocated.
          </p>
          <Button to="/" variant="primary" icon={ArrowLeft} iconPosition="left">
            Return to Homepage
          </Button>
        </div>
      </section>
    </>
  );
};
