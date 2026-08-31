import React from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DifferentialsPerformanceMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none py-4">
      
      {/* Background Accent Glow */}
      <div className="absolute inset-0 bg-radial from-[#0B63CE]/10 to-transparent rounded-3xl blur-xl -z-10" />

      {/* Main Comparative Performance Card */}
      <div className="luxury-card p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-2.5 py-1 rounded-md inline-block">
              Impacto Financeiro Real
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-1">
              Antes vs Depois da JL Oliveira
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        {/* Comparative Columns: Before vs After */}
        <div className="grid grid-cols-2 gap-3.5">
          
          {/* Scenario Before (Outros Contadores / Despreparo) */}
          <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100/80 space-y-2.5">
            <div className="flex items-center gap-1.5 text-red-700">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Sem Estratégia</span>
            </div>
            <div className="text-lg font-black text-slate-900">
              15,50% <span className="text-xs font-bold text-red-600">imposto</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600">
              <li>❌ Enquadrado no Anexo V</li>
              <li>❌ Pagando INSS patronal alto</li>
              <li>❌ Risco de multas em atrasos</li>
            </ul>
          </div>

          {/* Scenario After (JL Oliveira) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 space-y-2.5 relative shadow-sm">
            <div className="flex items-center justify-between text-emerald-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Com JL Oliveira</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#0B63CE]" />
            </div>
            <div className="text-lg font-black text-emerald-700">
              6,00% <span className="text-xs font-bold text-emerald-600">imposto</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-700 font-medium">
              <li className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> Fator R otimizado (Anexo III)
              </li>
              <li className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> DAS com alíquota mínima
              </li>
              <li className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> Auditoria dupla de guias
              </li>
            </ul>
          </div>

        </div>

        {/* Real Metrics Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4FA8FF] block">
              Economia Média por Empresa
            </span>
            <span className="text-xl sm:text-2xl font-black text-white block mt-0.5">
              -61% de Carga Tributária
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-800/80 inline-block">
              100% Legal (RFB)
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
