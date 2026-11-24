import { COMPANY_INFO } from '../data/content';
import whatsappImg from '../assets/whatsapp.png';

export function WhatsAppButton() {
  return (
    <a
        href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de atendimento do Escritório Contábil JL Oliveira.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="office-whatsapp"
        aria-label="Falar com a JL Oliveira pelo WhatsApp"
        title="Falar pelo WhatsApp"
    >
      <img src={whatsappImg} alt="" width="48" height="48" />
    </a>
  );
}
