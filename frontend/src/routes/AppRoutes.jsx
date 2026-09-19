import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Services } from '../pages/Services';
import { ServiceDetail } from '../pages/ServiceDetail';
import { Projects } from '../pages/Projects';
import { ProjectDetail } from '../pages/ProjectDetail';
import { Industries } from '../pages/Industries';
import { IndustryDetail } from '../pages/IndustryDetail';
import { Clients } from '../pages/Clients';
import { Contact } from '../pages/Contact';
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/industries/:slug" element={<IndustryDetail />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
