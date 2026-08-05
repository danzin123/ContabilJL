import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { COMPANY_INFO } from '../data/content';
import { ArrowRight, MessageCircle, ShieldCheck, MapPin, Building, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="inicio" className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 bg-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background subtle ambient geometry */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 rounded-l-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#0B63CE]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text & Actions */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Location & Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-[#0B63CE]" />
              <span>Bragança Paulista - SP e Região</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B63CE] animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Contabilidade inteligente para empresas que querem{' '}
              <span className="text-[#0B63CE] relative inline-block">
                crescer.
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#4FA8FF]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,5 100,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {COMPANY_INFO.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenQuoteModal()}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#0B63CE]/20 transition-all hover:shadow-2xl hover:shadow-[#0B63CE]/30 hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Solicitar Orçamento</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com um contador do Escritório Contábil JL Oliveira.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-base rounded-2xl transition-all border border-slate-200 hover:border-slate-300"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B63CE] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Atendimento Humanizado</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B63CE] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">+500 Clientes Atendidos</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#0B63CE] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Conformidade Total SPED</span>
              </div>
            </div>

          </div>

          {/* Right Column 3D Scene */}
          <div className="lg:col-span-6 relative">
            <Hero3DCanvas />
          </div>

        </div>
      </div>
    </section>
  );
};
