import React, { useState } from 'react';
import { TaxCalculationInput, TaxCalculationResult } from '../types';
import { Calculator, ArrowRight, CheckCircle2, TrendingDown, DollarSign, Sparkles } from 'lucide-react';

interface TaxCalculatorProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onOpenQuoteModal }) => {
  const [revenue, setRevenue] = useState<number>(50000); // R$ 50.000 / mês
  const [segment, setSegment] = useState<'servicos' | 'comercio' | 'industria'>('servicos');
  const [employees, setEmployees] = useState<number>(3);
  const [payrollCost, setPayrollCost] = useState<number>(12000);

  // Calculate estimated taxes
  const calculateTaxes = (): TaxCalculationResult => {
    let simplesRate = 0.06; // 6% Anexo III
    let presumidoRate = 0.1133; // ~11.33% (PIS/COFINS + ISS/ICMS + IRPJ/CSLL)

    if (segment === 'comercio') {
      simplesRate = 0.04; // Anexo I ~4%
      presumidoRate = 0.0593; // ICMS + PIS/COFINS + IRPJ
    } else if (segment === 'industria') {
      simplesRate = 0.045;
      presumidoRate = 0.075;
    } else {
      // Serviços: Fator R rule check
      const factorR = payrollCost / (revenue || 1);
      if (factorR >= 0.28) {
        simplesRate = 0.06; // Anexo III
      } else {
        simplesRate = 0.155; // Anexo V
      }
    }

    // Scale rate slightly with revenue
    if (revenue > 150000) {
      simplesRate += 0.025;
    } else if (revenue > 80000) {
      simplesRate += 0.015;
    }

    const simplesEstimated = Math.round(revenue * simplesRate);
    const lucroPresumidoEstimated = Math.round(revenue * presumidoRate);

    const isSimplesBetter = simplesEstimated <= lucroPresumidoEstimated;
    const recommendedRegime = isSimplesBetter ? 'Simples Nacional' : 'Lucro Presumido';
    const estimatedMonthlySavings = Math.abs(lucroPresumidoEstimated - simplesEstimated);

    return {
      simplesEstimated,
      lucroPresumidoEstimated,
      recommendedRegime,
      estimatedMonthlySavings,
      insights: [
        isSimplesBetter
          ? 'O Simples Nacional se destaca pela alíquota unificada e simplificação do DAS.'
          : 'O Lucro Presumido pode ser vantajoso para a margem de lucro e folha de pagamento atual.',
        segment === 'servicos' && payrollCost / revenue < 0.28
          ? 'Dica do Contador: Ajustar seu Pró-Labore para atingir o Fator R de 28% pode reduzir seus impostos de 15,5% para 6%!'
          : 'Planejamento Tributário regular pode identificar deduções e incentivos adicionais em SP.'
      ]
    };
  };

  const result = calculateTaxes();

  return (
    <section id="simulador" className="py-20 lg:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Ferramenta Interativa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simulador de Regime Tributário & Economia
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Estime em segundos qual o regime fiscal mais vantajoso para sua empresa em Bragança Paulista.
          </p>
        </div>

        {/* Simulator Card Container */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Segment Selector */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                Segmento de Atuação
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['servicos', 'comercio', 'industria'] as const).map((seg) => (
                  <button
                    key={seg}
                    onClick={() => setSegment(seg)}
                    className={`py-3 px-3 text-xs sm:text-sm font-bold rounded-xl capitalize transition-all cursor-pointer ${
                      segment === seg
                        ? 'bg-[#0B63CE] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {seg === 'servicos' ? 'Serviços' : seg === 'comercio' ? 'Comércio' : 'Indústria'}
                  </button>
                ))}
              </div>
            </div>

            {/* Revenue Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Faturamento Mensal Estimado
                </label>
                <span className="text-lg font-extrabold text-[#0B63CE]">
                  R$ {revenue.toLocaleString('pt-BR')}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B63CE]"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>R$ 10 mil</span>
                <span>R$ 150 mil</span>
                <span>R$ 300 mil+</span>
              </div>
            </div>

            {/* Payroll Cost Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Custo Mensal com Folha / Pró-Labore
                </label>
                <span className="text-base font-extrabold text-slate-800">
                  R$ {payrollCost.toLocaleString('pt-BR')}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max={Math.max(10000, revenue * 0.6)}
                step="1000"
                value={payrollCost}
                onChange={(e) => setPayrollCost(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B63CE]"
              />
            </div>

            {/* Number of Employees */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                Número de Colaboradores
              </label>
              <div className="flex items-center gap-3">
                {[1, 3, 5, 10, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => setEmployees(num)}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                      employees === num
                        ? 'bg-[#0B63CE] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {num === 20 ? '20+' : num}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between text-left">
            <div className="space-y-5">
              
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#0B63CE] tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Diagnóstico Preliminar</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-medium">Regime Recomendado:</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  {result.recommendedRegime}
                </h3>
              </div>

              {/* Comparison Boxes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Simples Nacional (est.)</span>
                  <span className="text-base font-extrabold text-slate-800">
                    R$ {result.simplesEstimated.toLocaleString('pt-BR')}/mês
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Lucro Presumido (est.)</span>
                  <span className="text-base font-extrabold text-slate-800">
                    R$ {result.lucroPresumidoEstimated.toLocaleString('pt-BR')}/mês
                  </span>
                </div>
              </div>

              {/* Monthly Savings Badge */}
              {result.estimatedMonthlySavings > 0 && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">Economia Estimada Potencial</span>
                    <span className="text-xl font-black text-emerald-700">
                      R$ {(result.estimatedMonthlySavings * 12).toLocaleString('pt-BR')} / ano
                    </span>
                  </div>
                  <TrendingDown className="w-7 h-7 text-emerald-600" />
                </div>
              )}

              {/* Insights */}
              <div className="space-y-2 text-xs text-slate-600">
                {result.insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B63CE] flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* CTA Action */}
            <div className="pt-6 mt-6 border-t border-slate-200">
              <button
                onClick={() => onOpenQuoteModal(`Diagnóstico Tributário (${result.recommendedRegime})`)}
                className="w-full py-3.5 px-4 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Diagnóstico Gratuito com Contador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
