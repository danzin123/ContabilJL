import { X } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import type { Service } from '../types';
import { useDialog } from '../utils/useDialog';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export function ServiceModal({ service, onClose, onRequestQuote }: ServiceModalProps) {
  const dialogRef = useDialog(Boolean(service), onClose);
  if (!service) return null;

  const greeting = `Olá! Gostaria de saber mais sobre o serviço de ${service.title.toLocaleLowerCase('pt-BR')}.`;

  return (
    <div className="jl-dialog-overlay" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="jl-dialog" role="dialog" aria-modal="true" aria-labelledby="servico-nome">
        <div className="jl-dialog-head">
          <h2 id="servico-nome">{service.title}</h2>
          <button type="button" className="jl-dialog-close" aria-label="Fechar detalhes" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="jl-service-body">
          <p>{service.fullDesc}</p>
          <h3>O que a equipe faz</h3>
          <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <details className="jl-service-benefit">
            <summary>Como esse serviço ajuda</summary>
            {service.benefits.map((benefit) => <p key={benefit}>{benefit}</p>)}
          </details>
          <h3>Para quem</h3>
          <p>{service.targetAudience}</p>
        </div>
        <div className="jl-dialog-actions">
          <button type="button" className="jl-dialog-primary" onClick={() => onRequestQuote(service.title)}>
            Solicitar orçamento
          </button>
          <a className="jl-dialog-link" href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(greeting)}`} target="_blank" rel="noopener noreferrer">
            Tirar dúvidas pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
