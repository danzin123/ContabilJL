import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { CashFlow, animateCashFlow } from './CashFlow';
import '../illustrations.css';

const reducedMotion = '(prefers-reduced-motion: reduce)';

function Ledger() {
  return (
    <svg viewBox="0 0 520 330" aria-hidden="true">
      <defs>
        <linearGradient id="cover-blue" x2=".9" y2="1"><stop stopColor="#506bb1"/><stop offset="1" stopColor="#142871"/></linearGradient>
        <linearGradient id="paper-white" x2=".8" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#e3eef5"/></linearGradient>
        <filter id="book-shadow" x="-40%" y="-70%" width="180%" height="250%"><feGaussianBlur stdDeviation="12"/></filter>
      </defs>
      <ellipse cx="264" cy="263" rx="136" ry="18" fill="#193c5a" opacity=".22" filter="url(#book-shadow)"/>
      <g transform="translate(207 94) matrix(.98 .35 -.82 .47 0 0)">
        <rect x="0" y="-3" width="238" height="152" rx="4" fill="#102945"/>
        <rect y="5" width="238" height="152" rx="4" fill="#c3d4e3" stroke="#7090ad"/>
        <rect y="11" width="238" height="152" rx="4" fill="url(#cover-blue)" stroke="#6489a7"/>
      </g>
      {[0,1,2].map((layer) => (
        <g key={layer} className="ledger-leaf">
          <g transform={`translate(207 ${90-layer*12}) matrix(.98 .35 -.82 .47 0 0)`}>
            <rect width="229" height="148" rx="2" fill="url(#paper-white)" stroke="#92afc6" />
            <path d="M15 24h54" stroke="#506bb1" strokeWidth="4" strokeLinecap="round" />
            <path d="M14 46h199 M110 46v80 M165 46v80" stroke="#c6d3e6" fill="none" />
            <path d="M16 68h43 M16 90h62 M16 121h34" stroke="#aabbcf" strokeWidth="2" strokeLinecap="round" />
            <path d="M13 54h200m-200 21h200m-200 21h200m-200 13h200" fill="none" stroke="#b8cfdf"/>
            <path className="ledger-entry" d="M122 68h29 M178 89h21 M163 121h36" fill="none" stroke="#889bd3" strokeWidth="2" pathLength="1" strokeDasharray="1"/>
          </g>
        </g>
      ))}
    </svg>
  );
}

export function Illustration({ variant }: { variant: 'growth' | 'office' }) {
  const root = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(() => !window.matchMedia(reducedMotion).matches);
  useEffect(() => {
    const preference = window.matchMedia(reducedMotion);
    const update = () => setPlaying(!preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  const animation = useRef<gsap.core.Timeline | null>(null);
  const sync = useRef<() => void>(() => {});
  const enabled = useRef(playing);
  useLayoutEffect(() => {
    const node = root.current!;
    let visible = false;
    const context = gsap.context(() => {
      const loop = gsap.timeline({ paused: true, repeat: -1, yoyo: variant === 'office', defaults: { ease: 'sine.inOut' } });
      if (variant === 'growth') {
        animateCashFlow(node, loop);
      } else {
        loop.to('.ledger-leaf', { y: (i: number) => -8 - i * 13, x: (i: number) => i * 3, stagger: .18, duration: 2.8 })
          .to('.ledger-entry', { strokeDashoffset: 1, duration: 2.4 }, .3);
      }
      animation.current = loop;
    }, node);
    sync.current = () => animation.current?.paused(!visible || !enabled.current || document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync.current(); });
    observer.observe(node);
    const onVisibility = () => sync.current();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      context.revert();
      animation.current = null;
    };
  }, [variant]);

  useLayoutEffect(() => { enabled.current = playing; sync.current(); }, [playing]);
  const growth = variant === 'growth';
  const label = growth ? 'do fluxo de caixa' : 'do livro contábil';
  return (
    <div ref={root} className={`jl-art jl-art--${variant}`}>
      <div className="jl-art__toolbar">
        {growth && <span className="jl-art__title">Fluxo de caixa</span>}
        <button className="jl-art__play" type="button" onClick={() => setPlaying(!playing)} aria-label={`${playing ? 'Pausar' : 'Reproduzir'} animação ${label}`} title={playing ? 'Pausar animação' : 'Reproduzir animação'}>
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>
      {growth ? <CashFlow /> : <Ledger />}
      {growth && <a className="jl-art__link" href="#sobre"><span>Escritório Contábil</span><span>Conheça o escritório <ArrowUpRight size={16} /></span></a>}
    </div>
  );
}
