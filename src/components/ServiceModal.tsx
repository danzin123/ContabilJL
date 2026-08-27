import React from 'react';
import { Service } from '../types';
import { COMPANY_INFO } from '../data/content';
import whatsappImg from '../assets/whatsapp.png';
import { X, CheckCircle, ArrowRight, Building2, Receipt, Users, BarChart3, TrendingUp, FileText, Compass, ShieldCheck } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onRequestQuote }) => {
  if (!service) return null;

  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 sm:w-7 sm:h-7 text-[#0B63CE]' };
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[88vh] sm:max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 pr-2">
            <div className="p-2.5 sm:p-3 bg-white rounded-2xl shadow-sm border border-slate-200 flex-shrink-0">
              {renderIcon(service.iconName)}
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#0B63CE]/10 px-2.5 py-0.5 rounded-full">
                {service.category}
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-0.5 leading-snug">
                {service.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer flex-shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-5 sm:space-y-6 text-left">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Visão Geral</h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">O que está incluído</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-[#0B63CE] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Principais Benefícios</h4>
            <ul className="space-y-2">
              {service.benefits.map((ben, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B63CE] mt-1.5 flex-shrink-0" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <span className="text-[11px] sm:text-xs font-bold text-[#0B63CE] uppercase tracking-wider block mb-1">
              Público Alvo Recomendado
            </span>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              {service.targetAudience}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(`Olá! Gostaria de tirar dúvidas sobre o serviço de ${service.title}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-200/80 hover:bg-slate-300/80 text-slate-800 font-bold text-xs rounded-xl transition-all active:scale-98"
          >
            <img src={whatsappImg} alt="WhatsApp" className="w-4 h-4 object-contain" />
            <span>Tirar dúvidas no WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-xs rounded-xl shadow-md shadow-[#0B63CE]/20 transition-all active:scale-98 cursor-pointer"
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
