import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

interface CTAProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#0B63CE] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4FA8FF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-white/90 border border-white/20">
          <ShieldCheck className="w-4 h-4 text-[#4FA8FF]" />
          <span>Atendimento Personalizado em Bragança Paulista - SP</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
          Vamos cuidar da sua contabilidade enquanto você cuida do seu negócio.
        </h2>

        <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Sua empresa livre de burocracias, com planejamento tributário inteligente e assessoria constante do Escritório Contábil JL Oliveira.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenQuoteModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-[#0B63CE] font-bold text-base rounded-2xl shadow-xl transition-all hover:scale-102 cursor-pointer"
          >
            <span>Solicitar Atendimento</span>
            <ArrowRight className="w-5 h-5 text-[#0B63CE]" />
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de agendar um atendimento com o Escritório Contábil JL Oliveira.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/20 backdrop-blur-md transition-all"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
