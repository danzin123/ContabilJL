import { MessagesSquare } from 'lucide-react';

export function Differentials() {
  return (
    <section id="diferenciais" className="jl-highlights" aria-label="O escritório em resumo">
      <ul className="site-container jl-highlights__list">
        <li><strong className="jl-stat-number">40<span>+</span></strong><p>anos de experiência<br />em contabilidade</p></li>
        <li><strong className="jl-stat-number">500<span>+</span></strong><p>empresas<br />atendidas</p></li>
        <li><MessagesSquare size={33} strokeWidth={1.2} aria-hidden="true" /><p>Atendimento direto<br />com o seu contador</p></li>
      </ul>
    </section>
  );
}
