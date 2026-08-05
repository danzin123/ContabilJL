import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { MessageSquare, Search, FileCheck2, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenQuoteModal }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-[#0B63CE]' };
    switch (name) {
      case 'MessageSquareCircle':
      case 'MessageSquare': return <MessageSquare {...props} />;
      case 'Search': return <Search {...props} />;
      case 'FileCheck2': return <FileCheck2 {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <CheckCircle2 {...props} />;
    }
  };

  const currentStepData = PROCESS_STEPS.find(s => s.stepNumber === activeStep) || PROCESS_STEPS[0];

  return (
    <section id="processo" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full">
            Jornada do Cliente
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Como Funciona Nossa Parceria Contábil
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Um processo transparente, ágil e sem complicações do primeiro atendimento ao acompanhamento diário.
          </p>
        </div>

        {/* Horizontal Timeline (Desktop) & Step Stepper */}
        <div className="relative mb-12">
          {/* Connecting Line behind */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
            {PROCESS_STEPS.map((step) => {
              const isActive = activeStep === step.stepNumber;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all text-center flex flex-col items-center gap-3 ${
                    isActive
                      ? 'bg-white border-[#0B63CE] shadow-lg ring-2 ring-[#0B63CE]/20 scale-105'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-colors ${
                      isActive
                        ? 'bg-[#0B63CE] text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    0{step.stepNumber}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {step.title}
                    </h3>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {step.durationEstimate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Step Detailed Showcase Box */}
        <div className="glass-card p-8 rounded-3xl border border-slate-200 shadow-lg text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0B63CE]/10 rounded-2xl">
                {getStepIcon(currentStepData.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-wider">
                  Etapa 0{currentStepData.stepNumber} de 05
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {currentStepData.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-700 text-base leading-relaxed">
              {currentStepData.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-2">
              <CheckCircle2 className="w-4 h-4 text-[#0B63CE]" />
              <span>Prazo Estimado: {currentStepData.durationEstimate}</span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-stretch justify-center gap-3 pt-4 md:pt-0 md:border-l border-slate-200 md:pl-8">
            <button
              onClick={() => onOpenQuoteModal(`Início do Processo - ${currentStepData.title}`)}
              className="w-full py-3.5 px-4 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Iniciar Etapa 01 Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-[11px] text-center text-slate-500">
              Sem compromisso inicial ou taxa de adesão.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
