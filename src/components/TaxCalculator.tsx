import { useEffect, useState } from 'react';
import { Calculator, ChevronDown, Minus, Plus } from 'lucide-react';
import { estimateTaxes, segments, type Segment } from '../utils/taxCalculator';
import '../simulator.css';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const rate = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 });
const optionalAmount = (text: string) => text === '' ? null : Number(text);
const requiredAmount = (text: string) => text === '' ? NaN : Number(text);

interface MoneyFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
}

function MoneyField({ id, label, value, onChange, hint, placeholder }: MoneyFieldProps) {
  return (
    <div className="sim-field">
      <label htmlFor={id}>{label}</label>
      <div className="sim-currency">
        <span aria-hidden="true">R$</span>
        <input id={id} type="number" inputMode="decimal" min="0" step="0.01" value={value}
          placeholder={placeholder} aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={event => onChange(event.currentTarget.value)} />
      </div>
      {hint && <small id={`${id}-hint`} className="sim-hint">{hint}</small>}
    </div>
  );
}

interface TaxCalculatorProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export function TaxCalculator({ onOpenQuoteModal }: TaxCalculatorProps) {
  const [open, setOpen] = useState(() => window.location.hash === '#simulador');
  const [activity, setActivity] = useState<Segment | 'outra'>('servicos');
  const [month, setMonth] = useState('45000');
  const [year, setYear] = useState('540000');
  const [payroll, setPayroll] = useState('168000');
  const [local, setLocal] = useState('');
  const [charges, setCharges] = useState('');
  const [taxable, setTaxable] = useState('');

  useEffect(() => {
    const openFromLink = () => {
      if (window.location.hash === '#simulador') setOpen(true);
    };
    const openFromClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href="#simulador"]')) setOpen(true);
    };
    window.addEventListener('hashchange', openFromLink);
    document.addEventListener('click', openFromClick);
    return () => {
      window.removeEventListener('hashchange', openFromLink);
      document.removeEventListener('click', openFromClick);
    };
  }, []);

  const revenue = requiredAmount(month);
  const result = activity === 'outra'
    ? { issue: 'A comparação para esta atividade depende de uma análise individual do enquadramento.' }
    : estimateTaxes({
      segment: activity, monthlyRevenue: revenue, revenue12: requiredAmount(year), payroll12: requiredAmount(payroll),
      pisCofinsBase: optionalAmount(taxable) ?? revenue, localTaxes: optionalAmount(local), employerCharges: optionalAmount(charges),
    });
  const localLabel = activity === 'comercio' ? 'ICMS líquido' : activity === 'industria' ? 'ICMS e IPI líquidos' : 'ISS';
  const breakdown: [string, number | null][] = 'das' in result ? [
    ['PIS e Cofins', result.pisCofins], ['IRPJ e adicional', result.irpj], ['CSLL', result.csll],
    [localLabel, optionalAmount(local)], ['Encargos patronais', optionalAmount(charges)],
  ] : [];

  return (
    <section id="simulador" className="sim-section" aria-labelledby="sim-title">
      <div className="site-container">
        <header className="sim-intro">
          <div className="sim-heading">
            <span className="sim-symbol" aria-hidden="true"><Calculator size={29} strokeWidth={1.4} /></span>
            <div>
              <h2 id="sim-title">Simulador tributário</h2>
              <p>Estime os tributos da sua empresa no Simples Nacional e no Lucro Presumido pelas regras de 2026.</p>
            </div>
          </div>
          <button className="sim-toggle" type="button" aria-expanded={open} aria-controls="sim-body" onClick={() => setOpen(!open)}>
            {open ? 'Fechar simulador' : 'Abrir simulador'}
            {open ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
          </button>
        </header>

        <div id="sim-body" className="sim-body" hidden={!open}>
          <div className="sim-fields">
            <h3>Dados da empresa</h3>
            <p className="sim-field-intro">Comece pelos valores de exemplo ou use os da sua empresa.</p>
            <div className="sim-field">
              <label htmlFor="sim-segment">Atividade</label>
              <select id="sim-segment" value={activity} onChange={event => {
                setActivity(event.target.value as typeof activity);
                setLocal('');
                setTaxable('');
              }}>
                {Object.entries(segments).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
                <option value="outra">Anexo IV, atividade mista ou outra atividade</option>
              </select>
            </div>
            {activity !== 'outra' && <>
              <MoneyField id="sim-revenue" label="Faturamento do mês" value={month} onChange={setMonth} />
              <input className="sim-slider" type="range" min={1000} max={400000} step={1000}
                value={Number.isFinite(revenue) ? revenue : 1000} aria-label="Ajustar faturamento do mês"
                onChange={event => setMonth(event.currentTarget.value)} />
              <MoneyField id="sim-rbt12" label="Receita dos 12 meses anteriores" value={year} onChange={setYear} />
              {activity === 'servicos' && <MoneyField id="sim-payroll" label="Folha dos 12 meses anteriores" value={payroll} onChange={setPayroll}
                hint="Some salários, pró-labore, FGTS e contribuição patronal efetivamente recolhida no período." />}
              <details className="sim-breakdown sim-adjustments">
                <summary>Completar o Lucro Presumido <ChevronDown size={16} aria-hidden="true" /></summary>
                <p>Informe os valores mensais previstos nesse regime. Preencha com zero quando não houver recolhimento.</p>
                <MoneyField id="sim-local" label={localLabel} value={local} onChange={setLocal} placeholder="A informar" />
                <MoneyField id="sim-charges" label="Encargos patronais sobre a folha" value={charges} onChange={setCharges} placeholder="A informar"
                  hint="Inclua CPP, RAT e terceiros quando devidos. Exclua FGTS e valores descontados dos trabalhadores." />
                <MoneyField id="sim-base" label="Base de PIS e Cofins" value={taxable} onChange={setTaxable}
                  placeholder={month} hint="Usamos o faturamento do mês. Ajuste a base se houver exclusões, como o ICMS destacado." />
              </details>
            </>}
          </div>

          <div className="sim-results">
            <h3>Estimativa mensal</h3>
            {'das' in result ? <>
              <dl className="sim-comparison">
                <div><dt>Simples Nacional</dt><dd>{money.format(result.das)}</dd><dd>DAS · Anexo {result.annex} · {rate.format(result.effectiveRate)}</dd></div>
                <div><dt>Lucro Presumido</dt><dd>{money.format(result.presumedTotal ?? result.federal)}</dd>
                  <dd>{result.presumedTotal === null ? 'IRPJ, CSLL, PIS e Cofins' : 'Total do cenário'}</dd></div>
              </dl>
              <p className="sim-reading" role="status">
                {result.presumedTotal === null
                  ? `Para comparar os totais, informe ${localLabel} e encargos patronais em “Completar o Lucro Presumido”.`
                  : result.presumedTotal === result.das
                    ? 'Os dois regimes têm o mesmo total neste cenário.'
                    : <>Com os valores informados, o <strong>{result.das < result.presumedTotal ? 'Simples Nacional' : 'Lucro Presumido'}</strong> fica <strong>{money.format(Math.abs(result.das - result.presumedTotal))}</strong> abaixo do outro regime neste mês.</>}
              </p>
              <details className="sim-breakdown">
                <summary>Detalhar os tributos <ChevronDown size={16} aria-hidden="true" /></summary>
                <p>O DAS usa a faixa {result.bracket} do Anexo {result.annex}.
                  {result.factorR !== null && ` O Fator R divide a folha pela receita dos 12 meses anteriores. Neste cenário, a folha ${result.annex === 'III' ? 'atinge' : 'fica abaixo de'} 28% da receita.`}</p>
                <div className="sim-table-wrap">
                  <table><caption>Lucro Presumido por tributo</caption><tbody>
                    {breakdown.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value === null ? 'A informar' : money.format(value)}</td></tr>)}
                  </tbody></table>
                </div>
              </details>
            </> : <p className="sim-reading" role="status">{result.issue}</p>}
            <details className="sim-breakdown">
              <summary>Premissas e fontes <ChevronDown size={16} aria-hidden="true" /></summary>
              <p>Cenário de 2026 para empresa com pelo menos 13 meses de atividade, uma única atividade no mercado interno e ICMS ou ISS dentro do DAS. A simulação abrange receita de até R$ 3,6 milhões em 12 meses e até R$ 400 mil no mês.</p>
              <p>No Presumido, projetamos três meses iguais no trimestre. A base de IRPJ e CSLL é de 32% para os serviços simulados. Para comércio e indústria, usamos 8% no IRPJ e 12% na CSLL. O adicional de IRPJ incide sobre a base trimestral acima de R$ 60 mil.</p>
              <p>Consideramos PIS e Cofins cumulativos, tributação comum, sem benefícios, substituição tributária, receitas monofásicas ou outras receitas. O cenário pressupõe a dispensa de recolhimento de IBS e CBS no ano de teste de 2026.</p>
              <ul className="sim-sources">
                <li><a href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm" target="_blank" rel="noopener noreferrer">Anexos do Simples Nacional</a></li>
                <li><a href="https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=92278" target="_blank" rel="noopener noreferrer">Regras de apuração do Fator R</a></li>
                <li><a href="https://www.planalto.gov.br/ccivil_03/leis/l9249.htm" target="_blank" rel="noopener noreferrer">Bases de cálculo do Lucro Presumido</a></li>
                <li><a href="https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2025/dezembro/comunicado-conjunto" target="_blank" rel="noopener noreferrer">Orientações da Receita para 2026</a></li>
                <li><a href="https://github.com/ReceitaFederal/calculadora-rtc-simples-nacional" target="_blank" rel="noopener noreferrer">GitHub da Receita Federal · IBS e CBS por operação</a></li>
              </ul>
            </details>
            <button className="sim-consult" type="button" onClick={() => onOpenQuoteModal(
              'das' in result && activity !== 'outra' ? `Simulação tributária de 2026 — ${segments[activity]}, faturamento mensal de ${money.format(revenue)}` : 'Análise de enquadramento tributário'
            )}>Conversar sobre a simulação</button>
          </div>
        </div>
      </div>
    </section>
  );
}
