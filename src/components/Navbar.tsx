import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from './Brand';

const links = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'O escritório' },
  { id: 'simulador', label: 'Simulador' },
  { id: 'contato', label: 'Contato' },
];

export function Navbar({ onOpenQuoteModal }: { onOpenQuoteModal: () => void }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('inicio');
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = links.map(({ id }) => document.getElementById(id)).reverse();
    let frame = 0;
    function updateCurrent() {
      frame = 0;
      const readingLine = (header.current?.offsetHeight ?? 0) + 30;
      const section = sections.find((item) => item && item.getBoundingClientRect().top <= readingLine);
      setCurrent(section?.id ?? 'inicio');
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateCurrent);
    }
    updateCurrent();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function closeOutside(event: Event) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeMenu = () => setOpen(false);
    desktop.addEventListener('change', closeMenu);
    window.addEventListener('hashchange', closeMenu);
    document.addEventListener('keydown', onEscape);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    return () => {
      desktop.removeEventListener('change', closeMenu);
      window.removeEventListener('hashchange', closeMenu);
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
    };
  }, [open]);

  return (
    <header className="jl-header" ref={header}>
      <div className="site-container jl-header__bar">
        <Brand />
        <nav id="jl-nav" className={`jl-nav${open ? ' jl-nav--open' : ''}`} aria-label="Navegação principal">
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={current === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="jl-header__actions">
          <button className="jl-header__quote" onClick={() => { setOpen(false); onOpenQuoteModal(); }}>
            <span>Solicitar orçamento</span><ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <button ref={toggle} type="button" className="jl-header__toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="jl-nav" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
