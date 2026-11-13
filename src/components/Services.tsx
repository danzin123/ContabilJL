import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/content';
import { Service } from '../types';
import { ServiceModal } from './ServiceModal';
import { Building2, Receipt, Users, BarChart3, TrendingUp, FileText, Compass, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'empresarial', label: 'Empresarial' },
    { id: 'fiscal', label: 'Fiscal & Tributário' },
    { id: 'pessoal', label: 'Departamento Pessoal' },
    { id: 'consultoria', label: 'Consultoria' },
  ];

  const filteredServices = selectedCategory === 'todos'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === selectedCategory);

  const renderServiceIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-[#0B63CE]' };
    switch (name) {
      case 'Building2': return <Building2 {...props} />;
      case 'Receipt': return <Receipt {...props} />;
      case 'Users': return <Users {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <Building2 {...props} />;
    }
  };

  return (
    <section id="servicos" className="py-14 sm:py-20 lg:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full">
            Especialidades Contábeis
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Soluções Completas para Cada Etapa do Seu Negócio
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg">
            Apoio contábil, tributário e fiscal sob medida para empresas em Bragança Paulista e região.
          </p>
        </div>

        {/* Category Filter Tabs (Swipeable on Mobile) */}
        <div className="flex items-center overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center gap-2 mb-8 sm:mb-12 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              aria-pressed={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex-shrink-0 active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#0B63CE] text-white shadow-md shadow-[#0B63CE]/20'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="service-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" key={selectedCategory}>
          {filteredServices.map((service) => (
            <button
              type="button"
              key={service.id}
              onClick={() => setActiveModalService(service)}
              className="service-card service-card-enter group luxury-card flex flex-col justify-between transition-all duration-300 active:scale-98 cursor-pointer relative overflow-hidden"
            >
              <span className="service-number" aria-hidden="true">{String(SERVICES_LIST.indexOf(service) + 1).padStart(2, '0')}</span>
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B63CE] to-[#4FA8FF] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-3.5 sm:space-y-4">
                {/* Micro Icon Container */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#0B63CE]/10 group-hover:border-[#0B63CE]/30 transition-colors shadow-xs">
                  {renderServiceIcon(service.iconName)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B63CE] transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 sm:pt-6 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B63CE] group-hover:translate-x-0.5 transition-transform">
                <span>Ver Detalhes do Serviço</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>

        {/* Custom Bottom CTA Box */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4FA8FF] flex-shrink-0" />
              <span>Não encontrou exatamente o que precisa?</span>
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              Montamos pacotes contábeis sob medida para a realidade do seu faturamento e segmento.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal('Atendimento Personalizado')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex-shrink-0"
          >
            Falar com um Contador Especialista
          </button>
        </div>

      </div>

      {/* Modal View */}
      <ServiceModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onRequestQuote={(title) => onOpenQuoteModal(title)}
      />
    </section>
  );
};
