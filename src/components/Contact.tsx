import { useState, type FormEvent } from 'react';
import { ArrowUpRight, ChevronDown, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/content';
import '../office.css';

const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY_INFO.fullAddress)}`;

function prepareConversation(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const get = (field: string) => String(data.get(field) ?? '').trim();
  const message = [
    `Olá! Meu nome é ${get('name')} e gostaria de falar sobre ${get('service')}.`,
    get('company') && `Empresa: ${get('company')}`,
    get('email') && `E-mail: ${get('email')}`,
    get('phone') && `Telefone: ${get('phone')}`,
    get('message'),
  ].filter(Boolean).join('\n');
  window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export function Contact() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section id="contato" aria-labelledby="office-contact-title" className="office-contact">
      <div className="site-container office-contact-layout">
        <div className="office-contact-info">
          <h2 id="office-contact-title">Fale com o escritório.</h2>
          <div className="office-contact-address">
            <MapPin size={19} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <address>{COMPANY_INFO.street}<br />{COMPANY_INFO.neighborhood}, {COMPANY_INFO.city}</address>
              <div className="office-map-links">
                <button type="button" aria-controls="office-map" aria-expanded={mapOpen} onClick={() => setMapOpen(!mapOpen)}>
                  {mapOpen ? 'Fechar mapa' : 'Ver mapa'}
                  <ChevronDown size={14} aria-hidden="true" />
                </button>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  Traçar rota <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div id="office-map" hidden={!mapOpen}>
            {mapOpen && (
              <iframe title="Localização do Escritório Contábil JL Oliveira" src={COMPANY_INFO.mapsEmbedUrl}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            )}
          </div>
          <p className="office-contact-time">
            <Clock3 size={18} strokeWidth={1.6} aria-hidden="true" /> {COMPANY_INFO.businessHours}
          </p>
          <div className="office-contact-methods">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /><span>WhatsApp</span> {COMPANY_INFO.whatsapp}
            </a>
            <a href={`tel:+55${COMPANY_INFO.phoneRaw}`}>
              <Phone size={18} aria-hidden="true" /><span>Telefone</span> {COMPANY_INFO.phone}
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`}>
              <Mail size={18} aria-hidden="true" /><span>E-mail</span> {COMPANY_INFO.email}
            </a>
          </div>
        </div>
        <form className="office-contact-form" onSubmit={prepareConversation} aria-labelledby="office-form-title">
          <h3 id="office-form-title">Como podemos ajudar?</h3>
          <p>Conte um pouco sobre a sua empresa. Você pode revisar a mensagem no WhatsApp antes de enviar.</p>
          <div className="office-form-fields">
            <label>Seu nome<input name="name" autoComplete="name" required pattern={'.*\\S.*'} /></label>
            <label><span>Empresa <small>(opcional)</small></span><input name="company" autoComplete="organization" /></label>
            <label><span>E-mail <small>(opcional)</small></span><input type="email" name="email" autoComplete="email" /></label>
            <label><span>Telefone <small>(opcional)</small></span><input type="tel" name="phone" autoComplete="tel" minLength={8} /></label>
            <label className="office-form-wide">Serviço de interesse
              <span className="office-select">
                <select name="service" required defaultValue="">
                  <option value="" disabled>Selecione um serviço</option>
                  {SERVICES_LIST.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}
                  <option value="outro assunto">Outro assunto</option>
                </select>
                <ChevronDown size={16} aria-hidden="true" />
              </span>
            </label>
            <label className="office-form-wide"><span>Mensagem <small>(opcional)</small></span>
              <textarea name="message" rows={2} />
            </label>
          </div>
          <button className="office-form-submit" type="submit">
            Continuar no WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}

