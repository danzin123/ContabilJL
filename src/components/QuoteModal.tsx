import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import logoImg from '../assets/logo.png';
import whatsappImg from '../assets/whatsapp.png';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, prefilledService }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(prefilledService || 'Abertura de Empresas');
  const [companyType, setCompanyType] = useState('Já possuo empresa');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMessage('Por favor informe seu Nome e Telefone.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(async () => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({ particleCount: 60, spread: 50 });
      } catch (err) {
        // Fallback gracefully
      }
    }, 600);
  };

  const handleWhatsAppRedirect = () => {
    const text = `*Solicitação de Orçamento Rápido*
*Nome:* ${name}
*Telefone:* ${phone}
*E-mail:* ${email || 'Não informado'}
*Serviço:* ${service}
*Situação:* ${companyType}
*Mensagem:* ${message || 'Gostaria de uma proposta de honorários.'}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-5 sm:p-8 text-left max-h-[88vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-6 sm:py-8 text-center space-y-4 sm:space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Solicitação Recebida!
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Um dos nossos contadores entrará em contato em breve para apresentar uma proposta personalizada para sua empresa.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <img src={whatsappImg} alt="WhatsApp" className="w-4 h-4 object-contain" />
                <span>Agilizar Atendimento via WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl active:bg-slate-200"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            
            <div className="flex items-center gap-3 pr-6">
              <img src={logoImg} alt="JL Oliveira" className="h-9 sm:h-10 w-auto object-contain flex-shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0B63CE] block">
                  Escritório Contábil JL Oliveira
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  Solicite uma Proposta Contábil
                </h3>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Roberto Oliveira"
                className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (11) 99899-0000"
                  className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Serviço de Interesse
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE]"
              >
                <option value="Abertura de Empresas">Abertura de Empresas</option>
                <option value="Troca de Contador / Migração">Troca de Contador / Migração</option>
                <option value="Escrita Fiscal & Impostos">Escrita Fiscal & Impostos</option>
                <option value="Departamento Pessoal & Folha">Departamento Pessoal & Folha</option>
                <option value="Planejamento Tributário">Planejamento Tributário</option>
                <option value="Imposto de Renda (IRPF/IRPJ)">Imposto de Renda (IRPF/IRPJ)</option>
                <option value="Consultoria Contábil">Consultoria Contábil</option>
                <option value="Regularização de Empresas">Regularização de Empresas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Situação Atual da Empresa
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Quero Abrir Empresa', 'Já Possuo CNPJ'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCompanyType(item)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 ${
                      companyType === item
                        ? 'bg-[#0B63CE] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Observações Adicionais (Opcional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Faturamento aproximado ou ramo de atividade..."
                className="w-full px-3.5 sm:px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98 mt-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enviar Solicitação de Orçamento</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
