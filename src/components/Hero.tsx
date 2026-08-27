import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { COMPANY_INFO } from '../data/content';
import whatsappImg from '../assets/whatsapp.png';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="inicio" className="relative pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 bg-transparent overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Location & Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-[#0B63CE] flex-shrink-0" />
              <span>Bragança Paulista - SP e Região</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B63CE] animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-[1.85rem] xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]">
              Contabilidade inteligente para empresas que querem{' '}
              <span className="text-[#0B63CE] relative inline-block">
                crescer.
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#4FA8FF]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,5 100,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
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
                <span>Solicitar Orçamento</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com um contador do Escritório Contábil JL Oliveira.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-sm sm:text-base rounded-2xl transition-all border border-slate-200 hover:border-slate-300 active:scale-98"
              >
                <img src={whatsappImg} alt="WhatsApp" className="w-5 h-5 object-contain" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 sm:pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B63CE] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Atendimento Humanizado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B63CE] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">+500 Clientes Atendidos</span>
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
