import React from 'react';
import { HeroFinancialMockup } from './HeroFinancialMockup';
import { COMPANY_INFO } from '../data/content';
import whatsappImg from '../assets/whatsapp.png';
import { ArrowRight, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="inicio" className="relative pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 bg-transparent overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center bg-blueprint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-10 items-center">
          
          {/* Left Column Text & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Location & Certification Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B63CE] flex-shrink-0" />
              <span>Bragança Paulista - SP • CRC Ativo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B63CE] animate-ping" />
            </div>

            {/* Main Headline with Luxury Editorial Typography */}
            <h1 className="text-[2.1rem] xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Contabilidade de precisão para empresas que querem{' '}
              <span className="font-serif italic font-normal text-[#0B63CE] block sm:inline">
                crescer com segurança.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {COMPANY_INFO.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-[#0B63CE]/20 transition-all hover:shadow-2xl hover:shadow-[#0B63CE]/30 hover:-translate-y-0.5 active:scale-98 cursor-pointer group"
              >
                <span>Solicitar Proposta de Honorários</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com um contador do Escritório Contábil JL Oliveira.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-2xl transition-all border border-slate-200 hover:border-slate-300 active:scale-98 shadow-xs"
              >
                <img src={whatsappImg} alt="WhatsApp" className="w-5 h-5 object-contain" />
                <span>Atendimento no WhatsApp</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 sm:pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-700">Atendimento 100% Humano</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-700">Auditoria Fiscal Sem Erros</span>
              </div>
            </div>

          </div>

          {/* Right Column: Real Financial Dashboard Mockup */}
          <div className="lg:col-span-6 relative">
            <HeroFinancialMockup />
          </div>

        </div>
      </div>
    </section>
  );
};
