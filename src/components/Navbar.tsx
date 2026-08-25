import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/content';
import logoImg from '../assets/logo.png';
import whatsappImg from '../assets/whatsapp.png';
import { Phone, Menu, X, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Simulador', href: '#simulador' },
    { name: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/60 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img
              src={logoImg}
              alt="Escritório Contábil JL Oliveira"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-lg leading-tight tracking-tight group-hover:text-[#0B63CE] transition-colors">
                JL Oliveira
              </span>
              <span className="text-xs font-medium text-slate-500 tracking-wide">
                Escritório Contábil
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0B63CE] hover:bg-slate-50 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com o Escritório Contábil JL Oliveira.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-[#0B63CE] bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-all"
            >
              <img src={whatsappImg} alt="WhatsApp" className="w-4 h-4 object-contain" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0B63CE] hover:bg-[#0952ae] rounded-xl shadow-md shadow-[#0B63CE]/25 transition-all hover:shadow-lg hover:shadow-[#0B63CE]/30 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366] bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              aria-label="WhatsApp"
            >
              <img src={whatsappImg} alt="WhatsApp" className="w-5 h-5 object-contain" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0B63CE] hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1 mb-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-3 text-base font-semibold text-slate-800 hover:text-[#0B63CE] hover:bg-slate-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#0B63CE] text-white font-bold text-sm rounded-xl shadow-md shadow-[#0B63CE]/20"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de atendimento do Escritório Contábil JL Oliveira.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 text-slate-800 font-bold text-sm rounded-xl"
            >
              <img src={whatsappImg} alt="WhatsApp" className="w-4 h-4 object-contain" />
              <span>Falar no WhatsApp: {COMPANY_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
