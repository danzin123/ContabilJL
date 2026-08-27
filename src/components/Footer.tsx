import React from 'react';
import { COMPANY_INFO } from '../data/content';
import logoImg from '../assets/logo.png';
import whatsappImg from '../assets/whatsapp.png';
import { MapPin, Phone, Mail, ArrowUp, Instagram, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white rounded-xl shadow-md flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Escritório Contábil JL Oliveira"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-lg tracking-tight">
                  JL Oliveira
                </span>
                <span className="text-xs text-slate-400">
                  Escritório Contábil
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Soluções contábeis, fiscais, trabalhistas e planejamento tributário estratégico com ética, tecnologia e proximidade em Bragança Paulista - SP.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-[#0B63CE] transition-colors flex items-center justify-center active:scale-95"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-[#0B63CE] transition-colors flex items-center justify-center active:scale-95"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-[#0B63CE] transition-colors flex items-center justify-center active:scale-95"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação Rápida
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs sm:text-sm">
              {['Início', 'Sobre', 'Serviços', 'Diferenciais', 'Simulador', 'Contato'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-colors block py-0.5"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services List */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Serviços
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Abertura de Empresas</li>
              <li>Escrita Fiscal</li>
              <li>Departamento Pessoal</li>
              <li>Contabilidade Geral</li>
              <li>Planejamento Tributário</li>
              <li>Imposto de Renda</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Localização & Contato
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0B63CE] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0B63CE] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <img src={whatsappImg} alt="WhatsApp" className="w-4 h-4 object-contain" />
                <a href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {COMPANY_INFO.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0B63CE] flex-shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hover:underline cursor-pointer">Privacidade</span>
            <span className="hover:underline cursor-pointer">Termos</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-[#0B63CE] transition-all cursor-pointer flex items-center gap-1 active:scale-95"
              aria-label="Voltar ao Topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
