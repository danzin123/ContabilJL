import { Illustration } from './Illustration';
import { MapPin } from 'lucide-react';
import '../office.css';

export function About() {
  return (
    <section id="sobre" className="office-story" aria-labelledby="office-story-title">
      <div className="site-container office-story-layout">
        <Illustration variant="office" />
        <div className="office-story-copy">
          <h2 id="office-story-title">Quatro décadas de contabilidade.</h2>
          <p>
            Nossa sede fica em Bragança Paulista, SP. Atendemos empresas de todo o Brasil.
          </p>
          <p>
            Você conversa diretamente com a equipe que conhece a sua empresa.
            Da primeira contratação ao fechamento do balanço, explicamos o que os
            números mostram e quais decisões precisam da sua atenção.
          </p>
          <a className="office-inline-link" href="#contato">
            <MapPin aria-hidden="true" size={17} strokeWidth={1.65} />
            Conheça nosso endereço
          </a>
        </div>
      </div>
    </section>
  );
}
