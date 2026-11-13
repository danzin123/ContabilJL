import { useEffect } from 'react';

/** Reveal each content block once, preserving native browser scrolling. */
export function PageMotion() {
  useEffect(() => {
    const art = document.querySelector<HTMLElement>('.hero-art');
    if (!art) return;
    let inView = false;
    const update = () => { art.dataset.motionRunning = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: 0.05 });
    update();
    observer.observe(art);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); delete art.dataset.motionRunning; };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const reset = () => {
      observer?.disconnect();
      document.querySelectorAll('[data-reveal]').forEach((node) => {
        node.removeAttribute('data-reveal');
        node.removeAttribute('data-visible');
      });
    };
    const setup = () => {
      reset();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('main section:not(#inicio) > div > div').forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight) return;
        node.setAttribute('data-reveal', 'true');
        observer?.observe(node);
      });
    };
    setup();
    preference.addEventListener('change', setup);
    return () => { reset(); preference.removeEventListener('change', setup); };
  }, []);
  return null;
}
