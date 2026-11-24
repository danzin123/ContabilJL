import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  Building2, ChartNoAxesCombined, ChevronDown, Compass,
  FileCheck2, FileText, Plus, ReceiptText, Scale, UsersRound,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/content';
import type { Service } from '../types';
import { ServiceModal } from './ServiceModal';
import '../services.css';

interface ServicesProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

const icons = {
  Building2, Receipt: ReceiptText, Users: UsersRound, BarChart3: ChartNoAxesCombined,
  TrendingUp: Scale, FileText, Compass, ShieldCheck: FileCheck2,
};

const areas = [
  { id: 'todos', label: 'Todas as áreas' },
  { id: 'empresarial', label: 'Empresarial' },
  { id: 'fiscal', label: 'Fiscal' },
  { id: 'pessoal', label: 'Departamento pessoal' },
  { id: 'consultoria', label: 'Consultoria' },
];

export function Services({ onOpenQuoteModal }: ServicesProps) {
  const [area, setArea] = useState('todos');
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<Service | null>(null);

  const list = useRef<HTMLUListElement>(null);
  const previous = useRef({ area, expanded });
  useLayoutEffect(() => {
    const prior = previous.current;
    previous.current = { area, expanded };
    if (area === prior.area && expanded === prior.expanded) return;
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const rows = Array.from(list.current?.children ?? []);
      gsap.from(expanded && area === prior.area ? rows.slice(3) : rows, {
        x: -14, opacity: .3, duration: .33, stagger: .04, ease: 'power2.out',
      });
    });
    return () => motion.revert();
  }, [area, expanded]);
  const services = area === 'todos'
    ? expanded ? SERVICES_LIST : SERVICES_LIST.slice(0, 3)
    : SERVICES_LIST.filter((service) => service.category === area);

  return (
    <section className="services-directory" id="servicos" aria-labelledby="servicos-titulo">
      <div className="site-container">
        <div className="directory-heading">
          <div>
            <h2 id="servicos-titulo">Serviços contábeis</h2>
            <p>Escolha um serviço para consultar o que está incluído.</p>
          </div>
          <div className="directory-filter">
            <select
              aria-label="Filtrar serviços por área"
              value={area}
              onChange={({ target }) => { setArea(target.value); setExpanded(false); }}
            >
              {areas.map(({ id, label }) => <option value={id} key={id}>{label}</option>)}
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </div>
        </div>
        <ul ref={list} className="directory-list" id="lista-de-servicos">
          {services.map((service) => {
            const Icon = icons[service.iconName as keyof typeof icons] ?? FileText;
            return (
              <li className="directory-item" key={service.id}>
                <Icon size={28} strokeWidth={1.45} className="directory-symbol" aria-hidden="true" />
                <h3>
                  <button
                    className="directory-open"
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setDetail(service)}
                  >
                    {service.title}
                    <Plus size={17} strokeWidth={1.6} className="directory-plus" aria-hidden="true" />
                  </button>
                </h3>
                <p>{service.shortDesc}</p>
              </li>
            );
          })}
        </ul>
        {area === 'todos' && (
          <div className="directory-bottom">
            <button
              className="directory-expand"
              type="button"
              aria-controls="lista-de-servicos"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Mostrar menos serviços' : 'Ver todos os serviços'}
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <ServiceModal
        service={detail}
        onClose={() => setDetail(null)}
        onRequestQuote={(title) => { setDetail(null); onOpenQuoteModal(title); }}
      />
    </section>
  );
}

