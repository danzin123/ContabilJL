import React, { useState, Suspense, lazy } from 'react';
import { INSTITUTIONAL_VALUES, COMPANY_INFO } from '../data/content';
import { Shield, UserCheck, Zap, Lock, MapPin, CheckCircle } from 'lucide-react';

const About3DGraphic = lazy(() => import('./About3DGraphic'));

export const About: React.FC = () => {
  const [activeValueIndex, setActiveValueIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-[#0B63CE]" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#0B63CE]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#0B63CE]" />;
      case 'Lock': return <Lock className="w-5 h-5 text-[#0B63CE]" />;
      default: return <CheckCircle className="w-5 h-5 text-[#0B63CE]" />;
    }
  };

  return (
    <section id="sobre" className="py-14 sm:py-20 lg:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full">
            Sobre o Escritório
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Tradição, Tecnologia e Segurança para o seu Negócio
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg">
            Conheça a história e os pilares do Escritório Contábil JL Oliveira em Bragança Paulista - SP.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: 3D Graphic */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="glass-card p-4 rounded-3xl relative">
              <Suspense fallback={
                <div className="w-full h-[260px] xs:h-[300px] sm:h-[380px] lg:h-[420px] flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-[#0B63CE]/5 animate-pulse" />
                </div>
              }>
                <About3DGraphic />
              </Suspense>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg text-center">
                <span className="text-xs font-extrabold text-[#0B63CE] uppercase tracking-wider block">
                  Presença Regional
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  Atendimento em Bragança Paulista, Atibaia, Itatiba e Região
                </p>
              </div>
            </div>
          </div>

          {/* Right: Institutional Text & Values */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Mais do que apurar impostos, somos parceiros estratégicos do seu crescimento.
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Fundado com a missão de simplificar a rotina tributária e financeira das empresas de Bragança Paulista e região, o <strong className="text-slate-800 font-semibold">{COMPANY_INFO.name}</strong> une a tradição do atendimento próximo ao uso das tecnologias contábeis mais avançadas do mercado.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Acreditamos que a contabilidade moderna deve ir além do cumprimento de obrigações fiscais. Atuamos com visão consultiva proativa, identificando oportunidades de planejamento tributário e redução de custos com total transparência e rigor ético.
              </p>
            </div>

            {/* Core Values Selector Tabs */}
            <div className="pt-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Nossos Pilares Fundamentais:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INSTITUTIONAL_VALUES.map((item, idx) => (
                  <button
                    type="button"
                    aria-pressed={activeValueIndex === idx}
                    key={item.title}
                    onClick={() => setActiveValueIndex(idx)}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      activeValueIndex === idx
                        ? 'bg-white border-[#0B63CE] shadow-md ring-2 ring-[#0B63CE]/20'
                        : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100">
                        {getIcon(item.iconName)}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                        <span className="text-xs text-slate-500">{item.subtitle}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Value Description Box */}
              <div className="mt-4 p-5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm leading-relaxed shadow-xs">
                <span className="font-bold text-[#0B63CE] block mb-1">
                  {INSTITUTIONAL_VALUES[activeValueIndex].title}:
                </span>
                {INSTITUTIONAL_VALUES[activeValueIndex].description}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
