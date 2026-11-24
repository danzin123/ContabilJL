import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Differentials } from './components/Differentials';
import { TaxCalculator } from './components/TaxCalculator';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>();
  const openQuote = (serviceName?: string) => {
    setPrefilledService(serviceName);
    setQuoteModalOpen(true);
  };

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Navbar onOpenQuoteModal={openQuote} />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Differentials />
        <Services onOpenQuoteModal={openQuote} />
        <About />
        <TaxCalculator onOpenQuoteModal={openQuote} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} prefilledService={prefilledService} />
    </>
  );
}
