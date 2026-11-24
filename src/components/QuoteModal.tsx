import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/content';
import { useDialog } from '../utils/useDialog';
import '../services.css';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

const quoteServices = [...SERVICES_LIST.map(({ title }) => title), 'Troca de contador', 'Outro assunto'];

export function QuoteModal({ isOpen, onClose, prefilledService }: QuoteModalProps) {
  const dialogRef = useDialog(isOpen, onClose);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [status, setStatus] = useState('Já tenho empresa');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) setService(prefilledService || '');
  }, [isOpen, prefilledService]);

  if (!isOpen) return null;

  const message = [
    'Olá! Gostaria de solicitar um orçamento.',
    `Nome: ${name.trim()}`,
    `Telefone: ${phone.trim()}`,
    email.trim() && `E-mail: ${email.trim()}`,
    `Serviço: ${service}`,
    `Situação: ${status}`,
    notes.trim() && `Observações: ${notes.trim()}`,
  ].filter(Boolean).join('\n');

  return (
    <div className="jl-dialog-overlay" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="jl-dialog jl-quote" role="dialog" aria-modal="true" aria-labelledby="orcamento-titulo">
        <div className="jl-dialog-head">
          <h2 id="orcamento-titulo">Solicitar orçamento</h2>
          <button className="jl-dialog-close" type="button" aria-label="Fechar orçamento" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <p className="jl-quote-intro">Preencha seus dados para conversar com o escritório. Você confere e envia a mensagem pelo WhatsApp.</p>
        <form className="jl-quote-form" onSubmit={(event) => {
          event.preventDefault();
          window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
        }}>
          <label>
            Nome
            <input id="orcamento-nome" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required pattern=".*\S.*" />
          </label>
          <label>
            Telefone com DDD
            <input id="orcamento-telefone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="(?:[^0-9]*[0-9]){10,15}[^0-9]*" title="Informe um telefone com DDD, incluindo de 10 a 15 dígitos." />
          </label>
          <label className="jl-quote-wide">
            <span>E-mail <small>(opcional)</small></span>
            <input id="orcamento-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="jl-quote-wide">
            Serviço de interesse
            <select id="orcamento-servico" value={service} onChange={(e) => setService(e.target.value)} required>
              <option value="" disabled>Selecione um serviço</option>
              {prefilledService && !quoteServices.includes(prefilledService) && <option>{prefilledService}</option>}
              {quoteServices.map((title) => <option key={title}>{title}</option>)}
            </select>
          </label>
          <fieldset className="jl-quote-wide jl-quote-status">
            <legend>Situação da empresa</legend>
            {['Já tenho empresa', 'Quero abrir uma empresa'].map((item) => (
              <label key={item}>
                <input type="radio" name="jl-situacao" checked={status === item} onChange={() => setStatus(item)} value={item} />
                {item}
              </label>
            ))}
          </fieldset>
          <label className="jl-quote-wide">
            <span>Observações <small>(opcional)</small></span>
            <textarea id="orcamento-observacoes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <div className="jl-dialog-actions jl-quote-wide">
            <button type="submit" className="jl-dialog-primary">Continuar no WhatsApp</button>
          </div>
        </form>
      </div>
    </div>
  );
}
