import React, { useState } from 'react';
import { AuroraBackground } from './components/AuroraBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Differentials } from './components/Differentials';
import { TaxCalculator } from './components/TaxCalculator';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (serviceName?: string) => {
    setPrefilledService(serviceName);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen relative bg-transparent text-[#202124] flex flex-col font-sans selection:bg-[#0B63CE] selection:text-white">
      {/* Living Ambient Aurora Background */}
      <AuroraBackground />

      {/* Navigation Bar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Institutional About Section */}
        <About />

        {/* Services Showcase */}
        <Services onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Key Differentials & Metrics */}
        <Differentials />

        {/* Interactive Tax Optimization Simulator */}
        <TaxCalculator onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Call To Action */}
        <CTA onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Contact Form & Google Map */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        prefilledService={prefilledService}
      />
    </div>
  );
}
