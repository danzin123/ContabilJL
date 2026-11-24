import { useState } from 'react';
import { ArrowUp, Instagram, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { useDialog } from '../utils/useDialog';
import { Brand } from './Brand';
import '../office.css';

export function Footer() {
  const [document, setDocument] = useState<'privacy' | 'terms' | null>(null);
  const close = () => setDocument(null);
  const dialogRef = useDialog(document !== null, close);
  return (
    <footer className="office-footer">
      <div className="site-container">
        <div className="office-footer-main">
          <Brand />
          <nav aria-label="Navegação do rodapé">
            <a href="#servicos">Serviços</a>
            <a href="#sobre">O escritório</a>
            <a href="#simulador">Simulador</a>
            <a href="#contato">Contato</a>
          </nav>
          <a className="office-social" href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram size={17} aria-hidden="true" /> Instagram
          </a>
        </div>
        <div className="office-footer-base">
          <small>© {new Date().getFullYear()} {COMPANY_INFO.name}</small>
          <div className="office-legal-links">
            <button type="button" aria-haspopup="dialog" onClick={() => setDocument('privacy')}>Privacidade</button>
            <span aria-hidden="true">-</span>
            <button type="button" aria-haspopup="dialog" onClick={() => setDocument('terms')}>Termos</button>
          </div>
          <a href="#inicio">Voltar ao início <ArrowUp size={15} aria-hidden="true" /></a>
        </div>
      </div>
      {document && (
        <div className="jl-dialog-overlay" onClick={event => { if (event.target === event.currentTarget) close(); }}>
          <div ref={dialogRef} className="jl-dialog office-legal" role="dialog" aria-modal="true" aria-labelledby="office-legal-title">
            <div className="jl-dialog-head">
              <h2 id="office-legal-title">{document === 'privacy' ? 'Privacidade' : 'Termos de uso'}</h2>
              <button type="button" className="jl-dialog-close" aria-label="Fechar" onClick={close}><X size={20} /></button>
            </div>
            {document === 'privacy' ? <>
              <h3>Contato com o escritório</h3>
              <p>Usamos os dados que você envia para responder à sua solicitação. Ao continuar pelo WhatsApp, os campos preenchidos são encaminhados ao aplicativo como uma mensagem que você pode revisar antes de enviar à equipe.</p>
              <h3>Simulador e mapa</h3>
              <p>Os cálculos acontecem no seu navegador. Se escolher conversar sobre a simulação, você poderá conferir os dados incluídos no pedido de contato. O mapa só carrega quando você seleciona “Ver mapa”. Nesse momento, seu navegador se conecta ao Google Maps.</p>
              <h3>Seus dados</h3>
              <p>Para saber quais dados o escritório trata, pedir acesso, correção ou exclusão nos casos previstos em lei, escreva para <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>.</p>
            </> : <>
              <h3>Uso do site</h3>
              <p>Este site apresenta os serviços do Escritório Contábil JL Oliveira. Ao entrar em contato, você inicia uma conversa com a equipe. A contratação depende de uma proposta e do aceite das partes.</p>
              <h3>Simulações tributárias</h3>
              <p>Os resultados são estimativas para o período e as hipóteses indicados no simulador. A apuração de impostos e a escolha de regime dependem da atividade, dos documentos e do histórico da empresa.</p>
              <h3>Serviços externos</h3>
              <p>Ao abrir o WhatsApp, o Google Maps ou o Instagram, aplicam-se também os termos e as políticas desses serviços.</p>
            </>}
          </div>
        </div>
      )}
    </footer>
  );
}
