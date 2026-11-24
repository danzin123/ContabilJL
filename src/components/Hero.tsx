import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { Illustration } from './Illustration';
import { COMPANY_INFO } from '../data/content';

export function Hero() {
  const copy = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.jl-title-line > span', {
        yPercent: 75, opacity: .25, stagger: .1, duration: .85, ease: 'power3.out',
      });
    }, copy);
    return () => motion.revert();
  }, []);

  return (
    <section className="jl-hero" id="inicio" aria-labelledby="hero-title">
      <div className="site-container jl-hero__inner">
        <div className="jl-hero__copy" ref={copy}>
          <h1 id="hero-title">
            <span className="jl-title-line"><span>Contabilidade</span></span>{' '}
            <span className="jl-title-line"><span>para quem</span></span>{' '}
            <em className="jl-title-line"><span>empreende.</span></em>
          </h1>
          <p className="jl-hero__intro">Onde quer que sua empresa esteja no Brasil, você conversa direto com quem cuida da sua contabilidade.</p>
          <div className="jl-hero__actions">
            <a className="jl-hero__contact" href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Vim pelo site da JL Oliveira e gostaria de falar com um contador.')}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} strokeWidth={1.7} aria-hidden="true" /> Conversar com um contador
            </a>
            <a className="jl-hero__services" href="#servicos">Ver serviços <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <Illustration variant="growth" />
      </div>
    </section>
  );
}
