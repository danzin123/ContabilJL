export interface TaxBracket {
  max: number;
  rate: number;
  deduction: number;
}

// Anexo I - Comércio (Venda de Mercadorias)
export const ANEXO_I: TaxBracket[] = [
  { max: 180000, rate: 0.0400, deduction: 0 },
  { max: 360000, rate: 0.0730, deduction: 5940 },
  { max: 720000, rate: 0.0950, deduction: 13860 },
  { max: 1800000, rate: 0.1070, deduction: 22500 },
  { max: 3600000, rate: 0.1430, deduction: 87300 },
  { max: 4800000, rate: 0.1900, deduction: 378000 },
];

// Anexo II - Indústria (Fabricação de Produtos)
export const ANEXO_II: TaxBracket[] = [
  { max: 180000, rate: 0.0450, deduction: 0 },
  { max: 360000, rate: 0.0780, deduction: 5940 },
  { max: 720000, rate: 0.1000, deduction: 13860 },
  { max: 1800000, rate: 0.1120, deduction: 22500 },
  { max: 3600000, rate: 0.1470, deduction: 85500 },
  { max: 4800000, rate: 0.3000, deduction: 720000 },
];

// Anexo III - Serviços em Geral & Serviços com Fator R >= 28%
export const ANEXO_III: TaxBracket[] = [
  { max: 180000, rate: 0.0600, deduction: 0 },
  { max: 360000, rate: 0.1120, deduction: 9360 },
  { max: 720000, rate: 0.1350, deduction: 17640 },
  { max: 1800000, rate: 0.1600, deduction: 35640 },
  { max: 3600000, rate: 0.2100, deduction: 125640 },
  { max: 4800000, rate: 0.3300, deduction: 648000 },
];

// Anexo V - Serviços Intelectuais / Técnicos quando Fator R < 28%
export const ANEXO_V: TaxBracket[] = [
  { max: 180000, rate: 0.1550, deduction: 0 },
  { max: 360000, rate: 0.1800, deduction: 4500 },
  { max: 720000, rate: 0.1950, deduction: 9900 },
  { max: 1800000, rate: 0.2050, deduction: 17100 },
  { max: 3600000, rate: 0.2300, deduction: 62100 },
  { max: 4800000, rate: 0.3050, deduction: 540000 },
];

export const segments = {
  servicos: 'Serviços sujeitos ao Fator R',
  servicosIII: 'Serviços do Anexo III sem Fator R',
  comercio: 'Comércio',
  industria: 'Indústria',
} as const;

export type Segment = keyof typeof segments;

export interface TaxScenario {
  segment: Segment;
  monthlyRevenue: number;
  revenue12: number;
  payroll12: number;
  pisCofinsBase: number;
  localTaxes: number | null;
  employerCharges: number | null;
}

const cents = (value: number) => Math.round(value * 100) / 100;
const isAmount = (value: number) => Number.isFinite(value) && value >= 0;

export function estimateTaxes(scenario: TaxScenario) {
  const { segment, monthlyRevenue, revenue12, payroll12, pisCofinsBase, localTaxes, employerCharges } = scenario;
  if (!isAmount(monthlyRevenue) || monthlyRevenue === 0 || !isAmount(revenue12) || revenue12 === 0)
    return { issue: 'Informe o faturamento do mês e a receita dos 12 meses anteriores.' } as const;
  if (revenue12 > 3600000)
    return { issue: 'Acima de R$ 3,6 milhões em 12 meses, o escritório precisa verificar o recolhimento de ICMS ou ISS e o enquadramento da empresa.' } as const;
  if (monthlyRevenue > 400000)
    return { issue: 'Este modelo cobre faturamento mensal de até R$ 400 mil. Para valores maiores, solicite uma análise do trimestre.' } as const;
  if (segment === 'servicos' && !isAmount(payroll12))
    return { issue: 'Informe a folha acumulada dos últimos 12 meses. Use zero se não houve folha.' } as const;
  if (!isAmount(pisCofinsBase) || pisCofinsBase > monthlyRevenue)
    return { issue: 'A base de PIS e Cofins precisa ficar entre zero e o faturamento do mês.' } as const;
  if ([localTaxes, employerCharges].some(value => value !== null && !isAmount(value)))
    return { issue: 'Informe valores mensais iguais ou superiores a zero para os encargos e tributos.' } as const;

  const factorR = segment === 'servicos' ? payroll12 / revenue12 : null;
  let annex = 'III';
  let table = ANEXO_III;
  if (segment === 'comercio') { annex = 'I'; table = ANEXO_I; }
  if (segment === 'industria') { annex = 'II'; table = ANEXO_II; }
  if (factorR !== null && factorR < 0.28) { annex = 'V'; table = ANEXO_V; }
  const bracketIndex = table.findIndex(band => revenue12 <= band.max);
  const band = table[bracketIndex];
  const effectiveRate = (revenue12 * band.rate - band.deduction) / revenue12;
  const das = cents(monthlyRevenue * effectiveRate);

  // Equivalente mensal de um trimestre com três meses de receita idêntica.
  const isService = segment === 'servicos' || segment === 'servicosIII';
  const quarterRevenue = monthlyRevenue * 3;
  const irpjBase = quarterRevenue * (isService ? 0.32 : 0.08);
  const irpj = cents((irpjBase * 0.15 + Math.max(0, irpjBase - 60000) * 0.10) / 3);
  const csll = cents(quarterRevenue * (isService ? 0.32 : 0.12) * 0.09 / 3);
  const pisCofins = cents(cents(pisCofinsBase * 0.0065) + cents(pisCofinsBase * 0.03));
  const federal = cents(pisCofins + irpj + csll);
  const presumedTotal = localTaxes !== null && employerCharges !== null
    ? cents(federal + localTaxes + employerCharges) : null;

  return { annex, bracket: bracketIndex + 1, factorR, effectiveRate, das, irpj, csll, pisCofins, federal, presumedTotal } as const;
}
