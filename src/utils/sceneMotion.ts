export interface SceneFrame {
  elapsed: number;
  delta: number;
  pointerX: number;
  pointerY: number;
  reducedMotion: boolean;
}

/** One local, time-based animation loop. Pauses preserve phase instead of jumping. */
export function animateScene(container: HTMLElement, render: (frame: SceneFrame) => void) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let frameId = 0;
  let lastTime: number | null = null;
  let elapsed = 0;
  let visible = false;
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  const draw = (delta: number) => render({ elapsed, delta, pointerX, pointerY, reducedMotion: reduced.matches });
  const stop = () => { cancelAnimationFrame(frameId); lastTime = null; };
  const tick = (now: number) => {
    const delta = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, 0.04);
    lastTime = now;
    elapsed += delta;
    const damping = 1 - Math.exp(-4 * delta);
    pointerX += (targetX - pointerX) * damping;
    pointerY += (targetY - pointerY) * damping;
    draw(delta);
    frameId = requestAnimationFrame(tick);
  };
  const resume = () => {
    stop();
    if (!visible || document.hidden) return;
    if (reduced.matches) {
      pointerX = pointerY = targetX = targetY = 0;
      draw(0);
    } else frameId = requestAnimationFrame(tick);
  };
  const move = (event: PointerEvent) => {
    if (reduced.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
    const rect = container.getBoundingClientRect();
    targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
  };
  const leave = () => { targetX = targetY = 0; };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); }, { threshold: 0.05 });
  observer.observe(container);
  container.addEventListener('pointermove', move);
  container.addEventListener('pointerleave', leave);
  container.addEventListener('pointercancel', leave);
  document.addEventListener('visibilitychange', resume);
  reduced.addEventListener('change', resume);
  draw(0);

  return () => {
    stop();
    observer.disconnect();
    container.removeEventListener('pointermove', move);
    container.removeEventListener('pointerleave', leave);
    container.removeEventListener('pointercancel', leave);
    document.removeEventListener('visibilitychange', resume);
    reduced.removeEventListener('change', resume);
  };
}
