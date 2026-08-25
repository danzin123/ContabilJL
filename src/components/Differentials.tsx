import React, { useEffect, useState, useRef } from 'react';
import { DIFFERENTIALS } from '../data/content';
import { Growth3DGraphic } from './Growth3DGraphic';
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
    <section id="diferenciais" ref={sectionRef} className="py-20 lg:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full">
            Por Que Escolher a JL Oliveira
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Excelência Comprovada em Números e Resultados
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Combinamos solidez técnica, inovação contínua e foco absoluto na segurança fiscal dos nossos clientes.
          </p>
        </div>

        {/* Animated Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {DIFFERENTIALS.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 rounded-3xl text-center space-y-3 hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
                {getMetricIcon(item.iconName)}
              </div>

              <div className="text-3xl sm:text-4xl font-black text-[#0B63CE] tracking-tight">
                {item.metric}
              </div>

              <div className="text-sm font-bold text-slate-900">
                {item.label}
              </div>

              <p className="text-slate-500 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Split Grid: Value Highlights + 3D Growth Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Key Differentials */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl font-bold text-slate-900">
              O padrão de agência corporativa que sua empresa merece:
            </h3>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="p-3 bg-[#0B63CE]/10 rounded-xl flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#0B63CE]" />
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

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="p-3 bg-[#0B63CE]/10 rounded-xl flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#0B63CE]" />
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

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="p-3 bg-[#0B63CE]/10 rounded-xl flex-shrink-0">
                  <Lock className="w-6 h-6 text-[#0B63CE]" />
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

          {/* Right Column: 3D Growth Scene */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card p-4 rounded-3xl relative">
              <Growth3DGraphic />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#0B63CE] shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0B63CE] animate-pulse" />
                Crescimento Sustentável
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
