import { gsap } from 'gsap';

const bars = [[58, 39], [90, 63], [75, 50], [112, 79], [98, 67], [137, 94]];
const baseline = 164;

export function CashFlow() {
  return (
    <div className="cash-flow" aria-hidden="true">
      <svg viewBox="0 0 480 184">
        <defs>
          <linearGradient id="flow-ink" x2="0" y2="1">
            <stop stopColor="#4566da" /><stop offset="1" stopColor="#002abe" />
          </linearGradient>
        </defs>
        {[48, 87, 126, baseline].map(y => <path key={y} d={`M8 ${y}H472`} className="cash-rule" />)}
        {bars.map(([incoming, outgoing], index) => (
          <g key={index}>
            <rect className="cash-in" x={23 + index * 77} y={baseline-incoming} width="24" height={incoming} rx="4" />
            <rect className="cash-out" x={51 + index * 77} y={baseline-outgoing} width="17" height={outgoing} rx="3" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function animateCashFlow(panel: HTMLElement, timeline: gsap.core.Timeline) {
  panel.querySelectorAll<SVGRectElement>('.cash-in, .cash-out').forEach((bar, index) => {
    const height = bar.height.baseVal.value;
    const low = height * (index % 2 ? .57 : .68);
    timeline.to(bar, {
      attr: { y: baseline-low, height: low }, duration: 1.8, ease: 'sine.inOut',
      repeat: 1, yoyo: true,
    }, index * .12);
  });
}
