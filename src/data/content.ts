import { Service, Differential, ProcessStep, InstitutionalValue } from '../types';

export const COMPANY_INFO = {
  name: 'Escritório Contábil JL Oliveira',
  shortName: 'JL Oliveira',
  slogan: 'Contabilidade inteligente para empresas que querem crescer.',
  subtitle: 'Atendimento contábil, fiscal e trabalhista a empresas de todo o Brasil.',
  city: 'Bragança Paulista - SP',
  fullAddress: 'Rua Nicolino Nacaratti, 416, Bragança Paulista - SP',
  street: 'Rua Nicolino Nacaratti, 416',
  neighborhood: 'Centro',
  phone: '(11) 4033-0432',
  phoneRaw: '1140330432',
  whatsapp: '(11) 99899-1422',
  whatsappRaw: '5511998991422',
  email: 'contabilidade@contabiljloliveira.com.br',
  instagram: 'https://www.instagram.com/contabil_jloliveira/',
  instagramHandle: '@contabil_jloliveira',
  businessHours: 'Segunda a sexta, das 8h às 17h30',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.391605273752!2d-46.54341992383841!3d-22.954203879222384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cec980ee915d31%3A0xb655ca56beea02e8!2sRua%20Nicolino%20Nacaratti%2C%20416%20-%20Bragan%C3%A7a%20Paulista%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr'
};

export const SERVICES_LIST: Service[] = [
  {
    id: 'abertura-empresas',
    title: 'Abertura de empresas',
    shortDesc: 'Contrato social, CNPJ e licenças para começar a operar.',
    fullDesc: 'Antes do registro, conversamos sobre a atividade, o endereço e a composição da sociedade. A partir daí, acompanhamos o pedido em cada órgão responsável.',
    category: 'empresarial',
    iconName: 'Building2',
    features: [
      'Consulta de viabilidade do endereço e da atividade',
      'Elaboração do contrato social',
      'Registro na Junta Comercial e solicitação do CNPJ',
      'Inscrições e licenças exigidas para o negócio'
    ],
    benefits: ['Você sabe quais documentos separar e acompanha os próximos passos até a abertura.'],
    targetAudience: 'Quem vai começar um negócio ou formalizar uma atividade profissional.'
  },
  {
    id: 'escrita-fiscal',
    title: 'Escrita fiscal',
    shortDesc: 'Registro das notas fiscais, apuração dos impostos e entrega das declarações.',
    fullDesc: 'Conferimos os documentos fiscais da empresa e apuramos os impostos do período. A equipe também orienta sobre a emissão de notas e os prazos de recolhimento.',
    category: 'fiscal',
    iconName: 'Receipt',
    features: [
      'Escrituração de documentos fiscais',
      'Apuração dos tributos municipais, estaduais e federais',
      'Preparação das guias e entrega das obrigações acessórias',
      'Orientação sobre emissão e correção de notas fiscais'
    ],
    benefits: ['O escritório mantém o calendário fiscal da empresa organizado e ajuda a identificar divergências nas notas.'],
    targetAudience: 'Comércios, prestadores de serviços e indústrias.'
  },
  {
    id: 'departamento-pessoal',
    title: 'Departamento pessoal',
    shortDesc: 'Folha de pagamento, admissões e férias da sua equipe.',
    fullDesc: 'Acompanhamos o vínculo com cada colaborador, da admissão ao desligamento. No fechamento do mês, calculamos salários, descontos e encargos e preparamos os recibos.',
    category: 'pessoal',
    iconName: 'Users',
    features: [
      'Registro de admissões e desligamentos',
      'Cálculo de salários, férias, 13º salário e rescisões',
      'Folha de pró-labore e apuração dos encargos',
      'Envio de eventos ao eSocial'
    ],
    benefits: ['A equipe recebe apoio para organizar os documentos e se preparar para as datas de pagamento.'],
    targetAudience: 'Empresas com funcionários e sócios que recebem pró-labore.'
  },
  {
    id: 'contabilidade-empresarial',
    title: 'Contabilidade empresarial',
    shortDesc: 'Balanços e demonstrativos para acompanhar as contas da empresa.',
    fullDesc: 'Registramos as movimentações da empresa e fazemos o fechamento contábil. Ajudamos os sócios a interpretar o balanço e a demonstração do resultado do exercício.',
    category: 'empresarial',
    iconName: 'BarChart3',
    features: [
      'Escrituração e conciliação das contas',
      'Elaboração do balanço patrimonial e da DRE',
      'Relatórios de resultado e acompanhamento de indicadores'
    ],
    benefits: ['Os sócios conseguem acompanhar a evolução das receitas, despesas e do patrimônio da empresa.'],
    targetAudience: 'Empresários e gestores que acompanham os resultados de um negócio.'
  },
  {
    id: 'planejamento-tributario',
    title: 'Planejamento tributário',
    shortDesc: 'Comparação de regimes e revisão dos tributos da empresa.',
    fullDesc: 'Estudamos a atividade, a folha e o histórico de faturamento para comparar os regimes tributários aplicáveis à empresa. Explicamos o que cada cenário representa para o caixa.',
    category: 'consultoria',
    iconName: 'TrendingUp',
    features: [
      'Comparação entre cenários tributários',
      'Revisão de recolhimentos e operações anteriores',
      'Análise de créditos e incentivos aplicáveis à atividade'
    ],
    benefits: ['A empresa pode avaliar o enquadramento com antecedência e estimar o efeito de mudanças no negócio.'],
    targetAudience: 'Empresas em expansão, com mudança de atividade ou que desejam rever seu enquadramento.'
  },
  {
    id: 'imposto-de-renda',
    title: 'Imposto de renda',
    shortDesc: 'Preparação e revisão das declarações de pessoas físicas e jurídicas.',
    fullDesc: 'Reunimos os comprovantes e conferimos rendimentos, bens e movimentações antes da transmissão. Também acompanhamos pendências e orientamos sobre retificações.',
    category: 'fiscal',
    iconName: 'FileText',
    features: [
      'Organização e conferência dos informes de rendimento',
      'Preparação e transmissão das declarações',
      'Apuração de ganho de capital',
      'Acompanhamento de pendências e retificações'
    ],
    benefits: ['Você chega ao prazo de entrega com os informes e comprovantes organizados.'],
    targetAudience: 'Pessoas físicas, profissionais autônomos, sócios e empresas.'
  },
  {
    id: 'consultoria-contabil',
    title: 'Consultoria contábil',
    shortDesc: 'Acompanhamento do fluxo de caixa, dos custos e da formação de preços.',
    fullDesc: 'Em reuniões com os sócios, examinamos as contas e os planos para o negócio. Com esses dados, discutimos decisões de investimento, preço e capital de giro.',
    category: 'consultoria',
    iconName: 'Compass',
    features: [
      'Análise de custos e formação de preços',
      'Planejamento do fluxo de caixa e do capital de giro',
      'Avaliação financeira de mudanças societárias'
    ],
    benefits: ['Os gestores podem comparar alternativas com base nos números da própria empresa.'],
    targetAudience: 'Sócios e gestores que buscam orientação para uma decisão financeira.'
  },
  {
    id: 'regularizacao-empresas',
    title: 'Regularização de empresas',
    shortDesc: 'Levantamento de pendências, parcelamentos e emissão de certidões.',
    fullDesc: 'Identificamos onde está a pendência e quais documentos são necessários para resolvê-la. Acompanhamos o processo junto à Receita, ao estado ou à prefeitura.',
    category: 'empresarial',
    iconName: 'ShieldCheck',
    features: [
      'Consulta de pendências fiscais e cadastrais',
      'Acompanhamento de negociações e parcelamentos',
      'Emissão de certidões e regularização do CNPJ',
      'Baixa de empresas que encerraram as atividades'
    ],
    benefits: ['A empresa recebe um levantamento das pendências e uma sequência de providências para regularizá-las.'],
    targetAudience: 'Empresas com débitos, restrições cadastrais ou atividades encerradas.'
  }
];

export const DIFFERENTIALS: Differential[] = [
  {
    id: 'empresas',
    metric: '+500',
    numberValue: 500,
    suffix: '+',
    label: 'Empresas Atendidas',
    description: 'Clientes de diversos portes e segmentos que confiam suas rotinas contábeis ao nosso escritório.',
    iconName: 'Building'
  },
  {
    id: 'experiencia',
    metric: '+40',
    numberValue: 40,
    suffix: ' Anos',
    label: 'Anos de Tradição',
    description: 'Experiência nas rotinas fiscais, trabalhistas e contábeis de empresas brasileiras.',
    iconName: 'Award'
  },
  {
    id: 'compromisso',
    metric: '100%',
    numberValue: 100,
    suffix: '%',
    label: 'Compromisso & Pontualidade',
    description: 'Entrega rigorosa de obrigações sem atrasos, zerando o risco de multas fiscais.',
    iconName: 'Clock'
  },
  {
    id: 'atendimento',
    metric: 'Humano',
    numberValue: 24,
    label: 'Atendimento Personalizado',
    description: 'Acesso direto aos nossos profissionais via WhatsApp e reuniões presenciais sem intermediários robóticos.',
    iconName: 'HeartHandshake'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Primeiro Contato',
    subtitle: 'Alinhamento de expectativas e escopo',
    description: 'Conversamos sobre o momento da sua empresa ou os planos para abrir um negócio.',
    iconName: 'MessageSquareCircle',
    durationEstimate: 'Atendimento imediato'
  },
  {
    stepNumber: 2,
    title: 'Diagnóstico',
    subtitle: 'Análise detalhada de dados e documentos',
    description: 'Avaliamos o enquadramento fiscal atual, pendências existentes e oportunidades de redução de impostos com total transparência.',
    iconName: 'Search',
    durationEstimate: '24 a 48 horas'
  },
  {
    stepNumber: 3,
    title: 'Planejamento',
    subtitle: 'Proposta customizada e plano de ação',
    description: 'Apresentamos o plano contábil ideal com os serviços necessários, datas de transição e estimativa transparente de economia.',
    iconName: 'FileCheck2',
    durationEstimate: 'Alinhamento rápido'
  },
  {
    stepNumber: 4,
    title: 'Execução',
    subtitle: 'Migração suave ou abertura guiada',
    description: 'Cuidamos de toda a transição com seu antigo escritório ou do processo na Junta Comercial sem interromper suas vendas.',
    iconName: 'Cpu',
    durationEstimate: 'Sem sobressaltos'
  },
  {
    stepNumber: 5,
    title: 'Suporte Contínuo',
    subtitle: 'Acompanhamento lado a lado',
    description: 'Sua empresa conta com envio mensal de obrigações, relatórios gerenciais e canal aberto permanente para dúvidas fiscais.',
    iconName: 'ShieldCheck',
    durationEstimate: 'Acompanhamento permanente'
  }
];

export const INSTITUTIONAL_VALUES: InstitutionalValue[] = [
  {
    title: 'Ética & Transparência',
    subtitle: 'Relacionamento baseado em clareza',
    description: 'Todas as nossas ações seguem rígidos padrões éticos e as normas do Conselho Federal de Contabilidade, com total clareza em honorários e processos.',
    iconName: 'Shield'
  },
  {
    title: 'Atendimento Personalizado',
    subtitle: 'Atendimento humano e próximo',
    description: 'Não tratamos sua empresa como um número de CNPJ. Conhecemos os sócios, a cultura do negócio e as particularidades do mercado local.',
    iconName: 'UserCheck'
  },
  {
    title: 'Tecnologia com Alma Humana',
    subtitle: 'Inovação a serviço da precisão',
    description: 'Utilizamos sistemas contábeis modernos, integração bancária e inteligência de dados para eliminar a burocracia do papel e agilizar seu dia a dia.',
    iconName: 'Zap'
  },
  {
    title: 'Segurança & Sigilo',
    subtitle: 'Proteção rigorosa das suas informações',
    description: 'Sistemas protegidos e rigorosamente adequados à LGPD (Lei Geral de Proteção de Dados), garantindo confidencialidade absoluta sobre suas finanças.',
    iconName: 'Lock'
  }
];
