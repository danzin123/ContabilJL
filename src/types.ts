export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'empresarial' | 'fiscal' | 'pessoal' | 'consultoria';
  iconName: string;
  features: string[];
  benefits: string[];
  targetAudience: string;
}

export interface Differential {
  id: string;
  metric: string;
  suffix?: string;
  numberValue: number;
  label: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  durationEstimate: string;
}

export interface InstitutionalValue {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface TaxCalculationInput {
  revenue: number; // Faturamento mensal em R$
  employeesCount: number;
  segment: 'servicos' | 'comercio' | 'industria';
  payrollCost: number; // Custo de folha mensal em R$
}

export interface TaxCalculationResult {
  simplesEstimated: number;
  lucroPresumidoEstimated: number;
  recommendedRegime: string;
  estimatedMonthlySavings: number;
  insights: string[];
}
