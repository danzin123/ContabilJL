import React, { useState, useMemo } from 'react';
import { runCompleteTaxDiagnosis } from '../utils/taxCalculator';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  Sparkles, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Building2,
  Percent,
  FileSpreadsheet
} from 'lucide-react';

interface TaxCalculatorProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onOpenQuoteModal }) => {
  const [revenue, setRevenue] = useState<number>(45000); // R$ 45.000 / mês padrão
  const [segment, setSegment] = useState<'servicos' | 'comercio' | 'industria'>('servicos');
  const [payrollCost, setPayrollCost] = useState<number>(14000); // R$ 14.000 / mês padrão
  const [employees, setEmployees] = useState<number>(3);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState<boolean>(false);

  // Executa diagnóstico completo 100% verídico baseado na legislação da Receita Federal
  const result = useMemo(() => {
    return runCompleteTaxDiagnosis(revenue, payrollCost, segment);
  }, [revenue, payrollCost, segment]);

  const handleRevenueChange = (val: number) => {
    const cleanVal = Math.max(1000, Math.min(val, 400000));
    setRevenue(cleanVal);
    // Ajusta folha proporcional se necessário
    if (payrollCost > cleanVal * 0.8) {
      setPayrollCost(Math.round(cleanVal * 0.28));
    }
  };

  const handlePayrollChange = (val: number) => {
    const cleanVal = Math.max(0, Math.min(val, revenue * 0.9));
    setPayrollCost(cleanVal);
  };

  return (
    <section id="simulador" className="py-14 sm:py-20 lg:py-28 bg-transparent relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-2.5 sm:space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Simulador Tributário Oficial
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Simulador de Regime Tributário & Economia Real
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg">
            Cálculo verídico conforme a <strong>Lei Complementar nº 123/2006 (LC 155/2016)</strong> e tabelas oficiais da Receita Federal.
          </p>
        </div>

        {/* Simulator Main Card */}
        <div className="glass-card p-4 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Segment Selector */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                1. Ramo de Atividade da Empresa
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { id: 'servicos', label: 'Serviços', desc: 'TI, Consultoria, Saúde, Geral' },
                  { id: 'comercio', label: 'Comércio', desc: 'Lojas, Varejo, E-commerce' },
                  { id: 'industria', label: 'Indústria', desc: 'Fábricas e Produção' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSegment(item.id as any)}
                    className={`py-3 px-2.5 sm:px-3 text-center rounded-2xl transition-all cursor-pointer active:scale-95 border ${
                      segment === item.id
                        ? 'bg-[#0B63CE] text-white border-[#0B63CE] shadow-md'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="block text-xs sm:text-sm font-extrabold">{item.label}</span>
                    <span className={`block text-[10px] sm:text-[11px] mt-0.5 ${segment === item.id ? 'text-blue-100' : 'text-slate-500'}`}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Revenue Input & Slider */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  2. Faturamento Bruto Mensal (R$)
                </label>
                <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-400">R$</span>
                  <input
                    type="number"
                    min="1000"
                    max="400000"
                    step="1000"
                    value={revenue}
                    onChange={(e) => handleRevenueChange(Number(e.target.value))}
                    className="w-24 sm:w-28 text-base font-extrabold text-[#0B63CE] bg-transparent focus:outline-none text-right"
                  />
                </div>
              </div>

              <input
                type="range"
                min="5000"
                max="350000"
                step="5000"
                value={revenue}
                onChange={(e) => handleRevenueChange(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B63CE]"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>R$ 5.000/mês</span>
                <span>R$ 150.000/mês</span>
                <span>R$ 350.000+/mês</span>
              </div>
            </div>

            {/* Payroll & Pro-Labore Input & Slider */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                <div className="space-y-0.5">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">
                    3. Folha de Pagamento + Pró-Labore (R$/mês)
                  </label>
                  <span className="text-[11px] text-slate-500 block">
                    Salários brutos dos funcionários + Pró-labore dos sócios
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-400">R$</span>
                  <input
                    type="number"
                    min="0"
                    max={revenue * 0.9}
                    step="500"
                    value={payrollCost}
                    onChange={(e) => handlePayrollChange(Number(e.target.value))}
                    className="w-24 sm:w-28 text-base font-extrabold text-slate-800 bg-transparent focus:outline-none text-right"
                  />
                </div>
              </div>

              <input
                type="range"
                min="0"
                max={Math.max(15000, Math.round(revenue * 0.6))}
                step="500"
                value={payrollCost}
                onChange={(e) => handlePayrollChange(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B63CE]"
              />

              {/* Fator R Indicator for Services */}
              {segment === 'servicos' && (
                <div className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                  result.factorREligible
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Percent className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Fator R Apurado: <strong>{result.factorRPercentage.toFixed(1)}%</strong></span>
                  </div>
                  <span className="font-bold text-[11px] px-2 py-0.5 rounded-md bg-white/80">
                    {result.factorREligible ? 'Anexo III (A partir de 6%)' : 'Anexo V (A partir de 15,5%)'}
                  </span>
                </div>
              )}
            </div>

            {/* Number of Employees */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                4. Quantidade de Colaboradores / Sócios
              </label>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[1, 2, 4, 8, 15, 25].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setEmployees(num)}
                    className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer active:scale-95 ${
                      employees === num
                        ? 'bg-[#0B63CE] text-white shadow-xs'
                        : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {num === 25 ? '25+' : num}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#0B63CE] tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Diagnóstico Fiscal Oficial</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Receita Federal</span>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                  Regime Mais Vantajoso:
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {result.recommendedRegime}
                </h3>
                <span className="text-xs text-[#0B63CE] font-bold block pt-0.5">
                  {result.recommendedRegime === 'Simples Nacional' ? result.simplesAnexo : 'Tributação com Base Presumida'}
                </span>
              </div>

              {/* Direct Comparison Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* Simples Nacional */}
                <div className={`p-3.5 rounded-2xl border transition-all ${
                  result.recommendedRegime === 'Simples Nacional'
                    ? 'bg-blue-50/70 border-[#0B63CE]/40 ring-1 ring-[#0B63CE]/20'
                    : 'bg-white border-slate-200'
                }`}>
                  <span className="text-[11px] font-bold text-slate-500 block">Simples Nacional</span>
                  <span className="text-base sm:text-lg font-black text-slate-900 mt-1 block">
                    R$ {Math.round(result.simplesTotal).toLocaleString('pt-BR')}
                    <span className="text-xs font-normal text-slate-500">/mês</span>
                  </span>
                  <span className="text-[11px] font-bold text-[#0B63CE] block mt-0.5">
                    Alíquota: {(result.simplesEffectiveRate * 100).toFixed(2)}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    INSS Patronal: R$ 0 (incluso no DAS)
                  </span>
                </div>

                {/* Lucro Presumido */}
                <div className={`p-3.5 rounded-2xl border transition-all ${
                  result.recommendedRegime === 'Lucro Presumido'
                    ? 'bg-blue-50/70 border-[#0B63CE]/40 ring-1 ring-[#0B63CE]/20'
                    : 'bg-white border-slate-200'
                }`}>
                  <span className="text-[11px] font-bold text-slate-500 block">Lucro Presumido</span>
                  <span className="text-base sm:text-lg font-black text-slate-900 mt-1 block">
                    R$ {Math.round(result.lucroPresumidoTotal).toLocaleString('pt-BR')}
                    <span className="text-xs font-normal text-slate-500">/mês</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 block mt-0.5">
                    Alíquota: {(result.lucroPresumidoEffectiveRate * 100).toFixed(2)}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    INSS Folha: R$ {Math.round(result.presumidoInssPatronal).toLocaleString('pt-BR')}
                  </span>
                </div>

              </div>

              {/* Annual Savings Highlight */}
              {result.annualSavings > 0 && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Economia Tributária Estimada:
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-700 block mt-0.5">
                      R$ {Math.round(result.annualSavings).toLocaleString('pt-BR')}
                      <span className="text-xs font-bold text-emerald-600"> / ano</span>
                    </span>
                    <span className="text-xs text-emerald-700/90 font-medium block mt-0.5">
                      R$ {Math.round(result.monthlySavings).toLocaleString('pt-BR')} por mês economizados
                    </span>
                  </div>
                  <TrendingDown className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                </div>
              )}

              {/* Insights List */}
              <div className="space-y-2 text-xs text-slate-600">
                {result.insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B63CE] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug text-slate-700">{insight}</span>
                  </div>
                ))}
              </div>

              {/* Toggle Detailed Breakdown Table */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                  className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#0B63CE]" />
                  <span>{showDetailedBreakdown ? 'Ocultar Detalhamento Tributo a Tributo' : 'Ver Detalhamento Tributo a Tributo'}</span>
                  {showDetailedBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Detailed Table */}
                {showDetailedBreakdown && (
                  <div className="mt-3 p-3 rounded-2xl bg-white border border-slate-200 text-xs space-y-2 animate-in fade-in duration-200">
                    <div className="font-bold text-slate-800 border-b pb-1 flex justify-between text-[11px] uppercase tracking-wider text-slate-500">
                      <span>Tributo</span>
                      <span>Simples</span>
                      <span>Lucro Presumido</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>PIS / COFINS (3,65%)</span>
                      <span className="font-semibold text-[#0B63CE]">No DAS</span>
                      <span className="font-semibold text-slate-800">R$ {Math.round(result.presumidoPis + result.presumidoCofins).toLocaleString('pt-BR')}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>IRPJ (15% + Adicional)</span>
                      <span className="font-semibold text-[#0B63CE]">No DAS</span>
                      <span className="font-semibold text-slate-800">R$ {Math.round(result.presumidoIrpjTotal).toLocaleString('pt-BR')}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>CSLL (9% sobre base)</span>
                      <span className="font-semibold text-[#0B63CE]">No DAS</span>
                      <span className="font-semibold text-slate-800">R$ {Math.round(result.presumidoCsll).toLocaleString('pt-BR')}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>{result.presumidoLocalTaxLabel}</span>
                      <span className="font-semibold text-[#0B63CE]">No DAS</span>
                      <span className="font-semibold text-slate-800">R$ {Math.round(result.presumidoLocalTax).toLocaleString('pt-BR')}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span className="font-medium text-slate-700">INSS Patronal (27,8% Folha)</span>
                      <span className="font-bold text-emerald-600">R$ 0,00 (Isento)</span>
                      <span className="font-semibold text-slate-800">R$ {Math.round(result.presumidoInssPatronal).toLocaleString('pt-BR')}</span>
                    </div>

                    <div className="flex justify-between pt-1 font-black text-slate-900 text-xs">
                      <span>Total Mensal Estimado:</span>
                      <span className="text-[#0B63CE]">R$ {Math.round(result.simplesTotal).toLocaleString('pt-BR')}</span>
                      <span>R$ {Math.round(result.lucroPresumidoTotal).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenQuoteModal(`Diagnóstico Tributário: ${result.recommendedRegime} (Faturamento R$ ${revenue.toLocaleString('pt-BR')})`)}
                className="w-full py-3.5 px-4 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Planejamento com Contador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
