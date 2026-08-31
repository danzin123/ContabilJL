import React, { useEffect, useState, useRef } from 'react';
import { DIFFERENTIALS } from '../data/content';
import { DifferentialsPerformanceMockup } from './DifferentialsPerformanceMockup';
import { Building, Award, Clock, HeartHandshake, ShieldCheck, Zap, Lock, Sparkles, TrendingUp } from 'lucide-react';

export const Differentials: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getMetricIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#0B63CE]' };
    switch (iconName) {
      case 'Building': return <Building {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="diferenciais" ref={sectionRef} className="py-14 sm:py-20 lg:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full">
            Por Que Escolher a JL Oliveira
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Excelência Comprovada em{' '}
            <span className="font-serif italic font-normal text-[#0B63CE]">
              Economia e Resultados.
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg">
            Combinamos solidez técnica, inovação contínua e foco absoluto na segurança fiscal dos nossos clientes.
          </p>
        </div>

        {/* Animated Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16">
          {DIFFERENTIALS.map((item) => (
            <div
              key={item.id}
              className="luxury-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center space-y-2 sm:space-y-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
                {getMetricIcon(item.iconName)}
              </div>

              <div className="text-2xl xs:text-3xl sm:text-4xl font-black text-[#0B63CE] tracking-tight">
                {item.metric}
              </div>

              <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {item.label}
              </div>

              <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Split Grid: Value Highlights + Performance Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column Key Differentials */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              O padrão de assessoria contábil que sua empresa merece:
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 sm:gap-4 hover:border-[#0B63CE]/40 transition-colors">
                <div className="p-2.5 sm:p-3 bg-[#0B63CE]/10 rounded-xl flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B63CE]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Planejamento Tributário Ativo
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Não esperamos o ano acabar para olhar seus impostos. Analisamos trimestralmente seu enquadramento para garantir que você pague apenas o estritamente necessário por lei.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 sm:gap-4 hover:border-[#0B63CE]/40 transition-colors">
                <div className="p-2.5 sm:p-3 bg-[#0B63CE]/10 rounded-xl flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B63CE]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Agilidade Digital Sem Burocracia
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Integração com sistemas de gestão e emissão de notas. Envio e recebimento de documentos via portal seguro e WhatsApp rápido.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 sm:gap-4 hover:border-[#0B63CE]/40 transition-colors">
                <div className="p-2.5 sm:p-3 bg-[#0B63CE]/10 rounded-xl flex-shrink-0">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B63CE]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Garantia Zero Autuação
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Processos com auditoria dupla de obrigações acessórias antes da transmissão aos órgãos governamentais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Performance Mockup */}
          <div className="lg:col-span-5 relative">
            <DifferentialsPerformanceMockup />
          </div>

        </div>

      </div>
    </section>
  );
};
