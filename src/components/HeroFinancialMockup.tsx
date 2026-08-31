import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  DollarSign, 
  Building2, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  Receipt
} from 'lucide-react';
import { AuthenticitySeal } from './AuthenticitySeal';

export const HeroFinancialMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto select-none py-6">
      
      {/* Background Subtle Glow Grid */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0B63CE]/10 via-[#4FA8FF]/5 to-transparent rounded-3xl blur-2xl -z-10" />

      {/* Main Executive Financial Dashboard Card */}
      <div className="luxury-card p-5 sm:p-7 border border-slate-200/90 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B63CE] to-[#084298] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#0B63CE]/20">
              JL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                  Painel de Gestão & Compliance
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[11px] font-medium text-slate-500 block">
                Escritório Contábil JL Oliveira • Bragança Paulista - SP
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Regular</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
          
          {/* Revenue Metric */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Faturamento Trimestral</span>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +18.4%
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              R$ 384.920<span className="text-xs font-bold text-slate-400">,00</span>
            </div>
            
            {/* Sparkline Visual Bars */}
            <div className="flex items-end gap-1.5 h-6 mt-3 pt-1">
              <div className="w-full bg-[#0B63CE]/20 rounded-t h-[40%]" />
              <div className="w-full bg-[#0B63CE]/30 rounded-t h-[60%]" />
              <div className="w-full bg-[#0B63CE]/45 rounded-t h-[75%]" />
              <div className="w-full bg-[#0B63CE]/60 rounded-t h-[55%]" />
              <div className="w-full bg-[#0B63CE]/80 rounded-t h-[90%]" />
              <div className="w-full bg-[#0B63CE] rounded-t h-[100%]" />
            </div>
          </div>

          {/* Tax Savings Metric */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-white border border-blue-100/90 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B63CE]">Economia Gerada</span>
              <Sparkles className="w-3.5 h-3.5 text-[#0B63CE]" />
            </div>
            <div className="text-lg sm:text-2xl font-black text-[#0B63CE] tracking-tight">
              R$ 31.450<span className="text-xs font-bold text-blue-400">,00</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-600 block mt-1">
              Otimização de Fator R & deduções fiscais em SP
            </span>
          </div>

        </div>

        {/* Real-Time Compliance Timeline Checklist */}
        <div className="space-y-2.5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 text-xs">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>Rotina Fiscal & Trabalhista</span>
            <span className="text-slate-500">Status em Tempo Real</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold text-slate-800">Emissão de DAS & SPED Fiscal</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Auditado sem multas
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold text-slate-800">Folha de Pagamento & eSocial</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Transmitido
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold text-slate-800">Certidões Negativas (CND Federal/Estadual)</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              100% Válidas
            </span>
          </div>
        </div>

      </div>

      {/* Floating Card 1: Official Paid Tax Receipt (Top-Right overlap) */}
      <div className="hidden sm:block absolute -top-5 -right-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 w-60 animate-float-soft">
        <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Receipt className="w-4 h-4 text-[#0B63CE]" />
            <span className="text-[11px] font-extrabold text-slate-800">Guia DAS • Simples</span>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
            PAGO
          </span>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between text-slate-500">
            <span>Competência:</span>
            <span className="font-bold text-slate-800">Mês Vigente</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Total Tributos:</span>
            <span className="font-extrabold text-slate-900">R$ 5.480,00</span>
          </div>
        </div>
        {/* Decorative mini barcode */}
        <div className="h-3 w-full bg-slate-200 mt-2.5 rounded flex items-center gap-0.5 px-1 opacity-70">
          <div className="w-1 h-full bg-slate-800" />
          <div className="w-2 h-full bg-slate-800" />
          <div className="w-1 h-full bg-slate-800" />
          <div className="w-3 h-full bg-slate-800" />
          <div className="w-1 h-full bg-slate-800" />
          <div className="w-2 h-full bg-slate-800" />
          <div className="w-4 h-full bg-slate-800" />
        </div>
      </div>

      {/* Floating Element 2: Rotating Authenticity Seal (Bottom-Left overlap) */}
      <div className="absolute -bottom-6 -left-6 z-20 hidden sm:block">
        <AuthenticitySeal size="md" />
      </div>

    </div>
  );
};
