import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { MessageCircle, X, ArrowRight } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Tooltip Popover */}
      {showTooltip && (
        <div className="mb-3 p-4 bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xs text-left animate-in slide-in-from-bottom duration-200 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 rounded-full"
            aria-label="Fechar"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-xs font-bold text-slate-800">Atendimento Online</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Dúvidas sobre abertura de empresa ou impostos? Fale diretamente com nossa equipe no WhatsApp!
          </p>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de falar com o Escritório Contábil JL Oliveira.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            <span>Iniciar Conversa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de atendimento do Escritório Contábil JL Oliveira.')}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative group p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-[#25D366]/30 transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Atendimento no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7" />
      </a>

    </div>
  );
};
