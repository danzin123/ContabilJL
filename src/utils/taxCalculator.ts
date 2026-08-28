/**
 * Motor de Cálculo Tributário - Escritório Contábil JL Oliveira
 * 
 * Fontes Oficiais & Legislação Verídica:
 * - Lei Complementar nº 123/2006 e Lei Complementar nº 155/2016 (Simples Nacional)
 * - Tabela dos Anexos I, II, III e V da LC 123/2006
 * - Regra do Fator R (Art. 18, § 5º-J da LC 123/2006)
 * - Lei nº 9.249/1995, Lei nº 9.718/1998, Lei nº 10.637/2002, Lei nº 10.833/2003 (Lucro Presumido)
 * - Instruções Normativas da Receita Federal do Brasil (RFB)
 */

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

export interface DetailedTaxBreakdown {
  // Simples Nacional
  simplesTotal: number;
  simplesEffectiveRate: number;
  simplesAnexo: string;
  simplesFaixaIndex: number;
  simplesNominalRate: number;
  simplesDeduction: number;
  
  // Lucro Presumido
  lucroPresumidoTotal: number;
  lucroPresumidoEffectiveRate: number;
  presumidoPis: number;
  presumidoCofins: number;
  presumidoIrpjBase: number;
  presumidoIrpjAdicional: number;
  presumidoIrpjTotal: number;
  presumidoCsll: number;
  presumidoLocalTax: number; // ISS ou ICMS
  presumidoLocalTaxLabel: string;
  presumidoInssPatronal: number; // CPP + Terceiros + RAT (~27,8% sobre folha)

  // Comparativo e Fator R
  factorR: number;
  factorRPercentage: number;
  factorREligible: boolean;
  recommendedRegime: 'Simples Nacional' | 'Lucro Presumido';
  monthlySavings: number;
  annualSavings: number;
  insights: string[];
}

/**
 * Calcula a Alíquota Efetiva do Simples Nacional conforme a fórmula oficial da LC 123/2006:
 * Alíquota Efetiva = ((RBT12 * Alíquota Nominal) - Parcela a Deduzir) / RBT12
 */
export function calculateSimplesNacional(
  monthlyRevenue: number,
  table: TaxBracket[]
): {
  taxAmount: number;
  effectiveRate: number;
  faixaIndex: number;
  nominalRate: number;
  deduction: number;
} {
  if (monthlyRevenue <= 0) {
    return { taxAmount: 0, effectiveRate: table[0].rate, faixaIndex: 1, nominalRate: table[0].rate, deduction: 0 };
  }

  // Receita Bruta Total em 12 meses (RBT12)
  const rbt12 = Math.min(monthlyRevenue * 12, 4800000);
  
  // Localiza a faixa na tabela oficial
  let faixaIndex = table.findIndex((f) => rbt12 <= f.max);
  if (faixaIndex === -1) {
    faixaIndex = table.length - 1;
  }

  const faixa = table[faixaIndex];
  let effectiveRate = faixa.rate;

  if (rbt12 > 180000) {
    effectiveRate = ((rbt12 * faixa.rate) - faixa.deduction) / rbt12;
  }

  // Garante que a alíquota não seja negativa
  effectiveRate = Math.max(effectiveRate, 0.04);
  const taxAmount = monthlyRevenue * effectiveRate;

  return {
    taxAmount,
    effectiveRate,
    faixaIndex: faixaIndex + 1,
    nominalRate: faixa.rate,
    deduction: faixa.deduction,
  };
}

/**
 * Calcula os tributos no Lucro Presumido conforme a legislação federal e municipal:
 * - PIS: 0,65%
 * - COFINS: 3,00%
 * - IRPJ: 15% sobre a base de presunção (32% serviços / 8% comércio/indústria) + Adicional de 10% sobre excedente a R$ 20.000/mês
 * - CSLL: 9% sobre a base de presunção (32% serviços / 12% comércio/indústria)
 * - ISS / ICMS: Alíquota efetiva local
 * - INSS Patronal / CPP: 27,8% a 28% sobre a folha de pagamento e pró-labore
 */
export function calculateLucroPresumido(
  monthlyRevenue: number,
  payrollCost: number,
  segment: 'servicos' | 'comercio' | 'industria'
): {
  total: number;
  pis: number;
  cofins: number;
  irpjBase: number;
  irpjAdicional: number;
  irpjTotal: number;
  csll: number;
  localTax: number;
  localTaxLabel: string;
  inssPatronal: number;
} {
  if (monthlyRevenue <= 0) {
    return {
      total: 0,
      pis: 0,
      cofins: 0,
      irpjBase: 0,
      irpjAdicional: 0,
      irpjTotal: 0,
      csll: 0,
      localTax: 0,
      localTaxLabel: 'ISS',
      inssPatronal: 0,
    };
  }

  // 1. PIS (0,65%) e COFINS (3,00%) cumulativos
  const pis = monthlyRevenue * 0.0065;
  const cofins = monthlyRevenue * 0.0300;

  // 2. IRPJ (Base de presunção: 32% para serviços, 8% para comércio/indústria)
  const irpjPresumptionRate = segment === 'servicos' ? 0.32 : 0.08;
  const presumedProfitMonthly = monthlyRevenue * irpjPresumptionRate;
  
  // Alíquota básica de IRPJ: 15% sobre o lucro presumido
  const irpjBase = presumedProfitMonthly * 0.15;
  
  // Adicional de IRPJ: 10% sobre o lucro presumido mensal que exceder R$ 20.000 (R$ 60.000/trimestre)
  const irpjAdicional = presumedProfitMonthly > 20000 ? (presumedProfitMonthly - 20000) * 0.10 : 0;
  const irpjTotal = irpjBase + irpjAdicional;

  // 3. CSLL (Base de presunção: 32% para serviços, 12% para comércio/indústria)
  const csllPresumptionRate = segment === 'servicos' ? 0.32 : 0.12;
  const csll = monthlyRevenue * csllPresumptionRate * 0.09;

  // 4. Tributos Locais (ISS para serviços / ICMS para comércio / ICMS+IPI para indústria)
  let localTax = 0;
  let localTaxLabel = 'ISS Municipal (4%)';

  if (segment === 'servicos') {
    localTax = monthlyRevenue * 0.04; // ISS municipal padrão (média de 4% em SP)
    localTaxLabel = 'ISS Municipal (4,0%)';
  } else if (segment === 'comercio') {
    localTax = monthlyRevenue * 0.045; // ICMS líquido médio apurado em SP (~4,5%)
    localTaxLabel = 'ICMS Líquido Estimado SP (4,5%)';
  } else {
    localTax = monthlyRevenue * 0.060; // ICMS + IPI líquido estimado (~6,0%)
    localTaxLabel = 'ICMS + IPI Estimado (6,0%)';
  }

  // 5. Encargos Previdenciários (INSS Patronal de 20% + RAT 2% + Terceiros 5,8% = 27,8% sobre folha e pró-labore)
  // No Simples Nacional, o INSS patronal JÁ ESTÁ INCLUSO no DAS. No Lucro Presumido, é pago à parte pela GPS.
  const inssPatronal = (payrollCost || 0) * 0.278;

  const total = pis + cofins + irpjTotal + csll + localTax + inssPatronal;

  return {
    total,
    pis,
    cofins,
    irpjBase,
    irpjAdicional,
    irpjTotal,
    csll,
    localTax,
    localTaxLabel,
    inssPatronal,
  };
}

/**
 * Realiza o diagnóstico tributário completo e comparativo 100% verídico
 */
export function runCompleteTaxDiagnosis(
  monthlyRevenue: number,
  payrollCost: number,
  segment: 'servicos' | 'comercio' | 'industria'
): DetailedTaxBreakdown {
  const factorR = monthlyRevenue > 0 ? payrollCost / monthlyRevenue : 0;
  const factorRPercentage = factorR * 100;
  const factorREligible = factorR >= 0.28;

  // Determinação da tabela do Simples Nacional
  let simplesTable = ANEXO_III;
  let simplesAnexo = 'Anexo III (Serviços)';

  if (segment === 'comercio') {
    simplesTable = ANEXO_I;
    simplesAnexo = 'Anexo I (Comércio)';
  } else if (segment === 'industria') {
    simplesTable = ANEXO_II;
    simplesAnexo = 'Anexo II (Indústria)';
  } else {
    // Serviços: Regra do Fator R (LC 123/2006)
    if (factorREligible) {
      simplesTable = ANEXO_III;
      simplesAnexo = 'Anexo III (Fator R ≥ 28% - Reduzido)';
    } else {
      simplesTable = ANEXO_V;
      simplesAnexo = 'Anexo V (Fator R < 28% - Intelectual)';
    }
  }

  const simplesResult = calculateSimplesNacional(monthlyRevenue, simplesTable);
  const presumidoResult = calculateLucroPresumido(monthlyRevenue, payrollCost, segment);

  const isSimplesBetter = simplesResult.taxAmount <= presumidoResult.total;
  const recommendedRegime = isSimplesBetter ? 'Simples Nacional' : 'Lucro Presumido';
  const monthlySavings = Math.abs(presumidoResult.total - simplesResult.taxAmount);
  const annualSavings = monthlySavings * 12;

  const insights: string[] = [];

  if (isSimplesBetter) {
    insights.push(
      `O Simples Nacional (${simplesAnexo}) é o mais vantajoso, gerando uma alíquota efetiva de ${(simplesResult.effectiveRate * 100).toFixed(2)}% contra ${((presumidoResult.total / (monthlyRevenue || 1)) * 100).toFixed(2)}% no Lucro Presumido.`
    );
    insights.push(
      'Vantagem extra: No Simples Nacional, o INSS Patronal de ~28% sobre a folha de pagamento já está 100% incluso no DAS, sem custos previdenciários adicionais.'
    );
  } else {
    insights.push(
      `O Lucro Presumido é mais econômico para este volume, com carga tributária de ${((presumidoResult.total / (monthlyRevenue || 1)) * 100).toFixed(2)}% frente a ${(simplesResult.effectiveRate * 100).toFixed(2)}% no Simples Nacional.`
    );
  }

  if (segment === 'servicos') {
    if (factorREligible) {
      insights.push(
        `Excelente! Seu Fator R é de ${factorRPercentage.toFixed(1)}% (≥ 28%), garantindo o enquadramento na menor alíquota (Anexo III).`
      );
    } else {
      const targetPayroll = monthlyRevenue * 0.28;
      const neededDifference = targetPayroll - payrollCost;
      insights.push(
        `Dica Contábil Estratégica: Seu Fator R atual é ${factorRPercentage.toFixed(1)}%. Se ajustar seu Pró-Labore em R$ ${Math.round(neededDifference).toLocaleString('pt-BR')}/mês, sua empresa migra do Anexo V para o Anexo III, reduzindo drasticamente os impostos!`
      );
    }
  } else {
    insights.push(
      'Emissão mensal de DAS com conferência preventiva de notas fiscais e aproveitamento seguro de benefícios de ICMS em SP.'
    );
  }

  return {
    simplesTotal: simplesResult.taxAmount,
    simplesEffectiveRate: simplesResult.effectiveRate,
    simplesAnexo,
    simplesFaixaIndex: simplesResult.faixaIndex,
    simplesNominalRate: simplesResult.nominalRate,
    simplesDeduction: simplesResult.deduction,
    
    lucroPresumidoTotal: presumidoResult.total,
    lucroPresumidoEffectiveRate: presumidoResult.total / (monthlyRevenue || 1),
    presumidoPis: presumidoResult.pis,
    presumidoCofins: presumidoResult.cofins,
    presumidoIrpjBase: presumidoResult.irpjBase,
    presumidoIrpjAdicional: presumidoResult.irpjAdicional,
    presumidoIrpjTotal: presumidoResult.irpjTotal,
    presumidoCsll: presumidoResult.csll,
    presumidoLocalTax: presumidoResult.localTax,
    presumidoLocalTaxLabel: presumidoResult.localTaxLabel,
    presumidoInssPatronal: presumidoResult.inssPatronal,

    factorR,
    factorRPercentage,
    factorREligible,
    recommendedRegime,
    monthlySavings,
    annualSavings,
    insights,
  };
}
