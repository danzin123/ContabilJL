import React from 'react';
import { COMPANY_INFO } from '../data/content';
import whatsappImg from '../assets/whatsapp.png';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface CTAProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Boxed High-Impact CTA Card */}
        <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-[#0B63CE] via-[#0952ae] to-[#043372] text-white p-8 sm:p-12 lg:p-16 shadow-2xl shadow-[#0B63CE]/20 border border-white/20 overflow-hidden text-center">
          
          {/* Subtle Ambient Lighting Inside Card */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>Atendimento Ágil & Personalizado em Bragança Paulista e Região</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-xs">
              Vamos cuidar da sua contabilidade enquanto você faz seu negócio crescer.
            </h2>

            {/* Subtitle */}
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Sua empresa livre de burocracias, com planejamento tributário estratégico e assessoria constante de contadores dedicados.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-[#0B63CE] font-extrabold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Solicitar Proposta</span>
                <ArrowRight className="w-5 h-5 text-[#0B63CE]" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de agendar um atendimento com o Escritório Contábil JL Oliveira.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-base rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <img src={whatsappImg} alt="WhatsApp" className="w-5 h-5 object-contain" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                <span>Troca de contador sem complicações</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                <span>Atendimento humanizado direto</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                <span>+40 anos de tradição e solidez</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
