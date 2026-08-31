import React from 'react';
import { 
  ShieldCheck, 
  Building, 
  Award, 
  CheckCircle, 
  MapPin, 
  Lock, 
  FileCheck,
  Users2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const AboutInstitutionalMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none py-4">
      
      {/* Background Accent Glow */}
      <div className="absolute inset-0 bg-radial from-[#0B63CE]/10 to-transparent rounded-3xl blur-xl -z-10" />

      {/* Main Dossier Card */}
      <div className="luxury-card p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-6">
        
        {/* Certificate Header Banner */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-2.5 py-1 rounded-md inline-block">
              Registro Profissional Ativo
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Certidão de Regularidade Contábil
            </h3>
            <p className="text-xs text-slate-500">
              Escritório Contábil JL Oliveira • CRC-SP
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#0B63CE]/10 text-[#0B63CE] flex items-center justify-center flex-shrink-0 border border-[#0B63CE]/20">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Core Pillars List (Executive dossier visual) */}
        <div className="space-y-3.5">
          
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover:bg-slate-100/80 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Auditoria Preventiva & Zero Autuação</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Todas as declarações e apurações fiscais passam por conferência dupla antes do envio à Receita.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover:bg-slate-100/80 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0B63CE] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Sede Própria em Bragança Paulista</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Presença sólida em {COMPANY_INFO.city} com atendimento ágil em toda a Região Bragantina.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover:bg-slate-100/80 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Sigilo Absoluto & Proteção LGPD</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Dados financeiros e fiscais armazenados com criptografia bancária de ponta a ponta.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Verification Badge */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Documentação 100% em Conformidade</span>
          </div>
          <span className="text-[11px] font-bold text-[#0B63CE]">
            Desde 2005
          </span>
        </div>

      </div>

    </div>
  );
};
