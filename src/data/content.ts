import { Service, Differential, ProcessStep, InstitutionalValue } from '../types';

export const COMPANY_INFO = {
  name: 'Escritório Contábil JL Oliveira',
  shortName: 'JL Oliveira',
  slogan: 'Contabilidade inteligente para empresas que querem crescer.',
  subtitle: 'Há anos ajudando empresas de Bragança Paulista e região com soluções contábeis, fiscais, trabalhistas e tributárias.',
  city: 'Bragança Paulista - SP',
  fullAddress: 'Rua Nicolino Nacaratti, 416, Bragança Paulista - SP',
  street: 'Rua Nicolino Nacaratti, 416',
  neighborhood: 'Centro',
  phone: '(11) 4033-0432',
  phoneRaw: '1140330432',
  whatsapp: '(11) 99899-1422',
  whatsappRaw: '5511998991422',
  email: 'contato@jloliveiracontabil.com.br',
  businessHours: 'Segunda a Sexta: 08h00 às 18h00',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.391605273752!2d-46.54341992383841!3d-22.954203879222384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cec980ee915d31%3A0xb655ca56beea02e8!2sRua%20Nicolino%20Nacaratti%2C%20416%20-%20Bragan%C3%A7a%20Paulista%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr'
};

export const SERVICES_LIST: Service[] = [
  {
    id: 'abertura-empresas',
    title: 'Abertura de Empresas',
    shortDesc: 'Orientação completa para início das suas atividades com segurança jurídica e rapidez em Bragança Paulista.',
    fullDesc: 'Abertura rápida e sem complicação. Cuidamos de todo o processo burocrático na Junta Comercial (JUCESP), Receita Federal, Prefeitura de Bragança Paulista e órgãos reguladores, garantindo a escolha do regime tributário mais econômico desde o primeiro dia.',
    category: 'empresarial',
    iconName: 'Building2',
    features: [
      'Elaboração de contrato social personalizado',
      'Obtenção de CNPJ, Inscrição Estadual e Municipal',
      'Análise prévia de viabilidade de endereço e zoneamento',
      'Licenciamento e alvarás de funcionamento em Bragança Paulista'
    ],
    benefits: [
      'Economia de tempo e eliminação de riscos burocráticos',
      'Enquadramento fiscal otimizado desde o primeiro mês',
      'Atendimento 100% acompanhado por contadores especialistas'
    ],
    targetAudience: 'Novos empreendedores, profissionais liberais e startups.'
  },
  {
    id: 'escrita-fiscal',
    title: 'Escrita Fiscal',
    shortDesc: 'Gestão rigorosa de obrigações tributárias para máxima economia e zero penalidades.',
    fullDesc: 'Apuração precisa de tributos federais, estaduais e municipais (ICMS, ISS, PIS/COFINS, IRPJ e CSLL). Realizamos a escrituração digital de livros e o envio rigoroso de todas as obrigações acessórias (SPED, EFD, GIA).',
    category: 'fiscal',
    iconName: 'Receipt',
    features: [
      'Apuração de impostos nos regimes Simples Nacional, Lucro Presumido e Lucro Real',
      'Escrituração fiscal digital e entrega de SPEDs',
      'Emissão e revisão de notas fiscais de serviços e mercadorias',
      'Acompanhamento contínuo de alterações na legislação tributária'
    ],
    benefits: [
      'Segurança contra multas e autuações do fisco',
      'Aproveitamento de créditos tributários legais',
      'Conformidade total com a legislação estadual de SP e municipal'
    ],
    targetAudience: 'Empresas comerciais, prestadores de serviços e indústrias.'
  },
  {
    id: 'departamento-pessoal',
    title: 'Departamento Pessoal',
    shortDesc: 'Gestão de folha de pagamento, eSocial e relações trabalhistas com total precisão.',
    fullDesc: 'Cuidamos de todas as rotinas trabalhistas e previdenciárias da sua equipe com sigilo e pontualidade. Gerenciamos eSocial, admissões, demissões, férias, 13º salário e rescões contratuais em conformidade com a CLT.',
    category: 'pessoal',
    iconName: 'Users',
    features: [
      'Processamento completo de folha de pagamento e pró-labore',
      'Gestão de encargos sociais (FGTS, INSS, IRRF)',
      'Envio de eventos ao eSocial e DCTFWeb',
      'Assessoramento em convenções coletivas e acordos de trabalho'
    ],
    benefits: [
      'Redução drástica de passivos e processos trabalhistas',
      'Prazos rigorosamente cumpridos para pagamentos e declarações',
      'Apoio humano para sanar dúvidas da sua equipe de RH'
    ],
    targetAudience: 'Empresas de todos os portes com colaboradores contratados.'
  },
  {
    id: 'contabilidade-empresarial',
    title: 'Contabilidade Empresarial',
    shortDesc: 'Demonstrativos financeiros estratégicos (DRE, Balanço) para tomada de decisão assertiva.',
    fullDesc: 'Transformamos dados brutos em inteligência financeira. Elaboramos o Balanço Patrimonial, Demonstração do Resultado do Exercício (DRE) e relatórios gerenciais claros que revelam a real saúde do seu negócio.',
    category: 'empresarial',
    iconName: 'BarChart3',
    features: [
      'Elaboração de Balanço Patrimonial e DRE periódico',
      'Análise de indicadores de liquidez, rentabilidade e endividamento',
      'Contabilidade adaptada às normas brasileiras e internacionais (IFRS)',
      'Relatórios gerenciais em formato executivo e fácil de interpretar'
    ],
    benefits: [
      'Visualização clara da lucratividade e margem operacional',
      'Documentação hábil para obtenção de linhas de crédito bancário',
      'Base sólida para novos investimentos ou expansão da empresa'
    ],
    targetAudience: 'Gestores, diretores e sócios que buscam decisões baseadas em dados reais.'
  },
  {
    id: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    shortDesc: 'Análise profunda para reduzir legalmente a carga fiscal e aumentar o lucro líquido.',
    fullDesc: 'Estudamos minuciosamente a estrutura da sua empresa para identificar o regime tributário mais rentável (Simples Nacional, Lucro Presumido ou Lucro Real). Reorganizamos operações para elisão fiscal legítima e recuperação de impostos pagos indevidamente.',
    category: 'consultoria',
    iconName: 'TrendingUp',
    features: [
      'Simulação comparativa detalhada entre cenários tributários',
      'Revisão fiscal de operações dos últimos 5 anos',
      'Identificação de incentivos e benefícios fiscais estaduais/federais',
      'Estruturação de operações com foco em eficiência de impostos'
    ],
    benefits: [
      'Economia financeira direta expressiva no orçamento da empresa',
      'Maior competitividade de preços no mercado regional',
      'Atuação 100% pautada pela legalidade e segurança jurídica'
    ],
    targetAudience: 'Empresas em fase de crescimento ou com alta carga fiscal.'
  },
  {
    id: 'imposto-de-renda',
    title: 'Imposto de Renda (IRPF / IRPJ)',
    shortDesc: 'Declarações para pessoas físicas e jurídicas com máxima segurança e cruzamento de dados.',
    fullDesc: 'Elaboramos e transmitimos a Declaração de Imposto de Renda Pessoa Física (IRPF) e Jurídica (IRPJ). Analisamos o ganho de capital, rendimentos isentos, bens e direitos, prevenindo malha fina.',
    category: 'fiscal',
    iconName: 'FileText',
    features: [
      'Declaração completa de IRPF para empresários, investidores e profissionais',
      'Cruzamento de informações com e-Financeira, DIMOF e cartórios',
      'Cálculo e orientação sobre Ganho de Capital em imóveis e ações',
      'Regularização de pendências e CPF retido na Malha Fina'
    ],
    benefits: [
      'Tranquilidade absoluta quanto ao sigilo e veracidade das informações',
      'Restituição otimizada respeitando os limites legais',
      'Orientação preventiva para a evolução patrimonial do cliente'
    ],
    targetAudience: 'Pessoas físicas, sócios de empresas, médicos, advogados e investidores.'
  },
  {
    id: 'consultoria-contabil',
    title: 'Consultoria Contábil',
    shortDesc: 'Orientação estratégica personalizada para otimização de fluxo de caixa e gestão.',
    fullDesc: 'Acompanhamento consultivo próximo aos proprietários e diretores. Oferecemos mentoria para precificação correta de produtos/serviços, controle de custos operacionais e reestruturação financeira.',
    category: 'consultoria',
    iconName: 'Compass',
    features: [
      'Reuniões de alinhamento estratégico trimestrais ou mensais',
      'Análise do fluxo de caixa e capital de giro',
      'Apoio em processos de fusão, cisão ou aquisição de cotas',
      'Valuation preliminar e diagnóstico de viabilidade financeira'
    ],
    benefits: [
      'Visão externa experiente aplicada diretamente no seu negócio',
      'Redução do desperdício operacional e custos desnecessários',
      'Crescimento estruturado e sustentável ao longo do tempo'
    ],
    targetAudience: 'Empresários que buscam um parceiro estratégico, além da contabilidade tradicional.'
  },
  {
    id: 'regularizacao-empresas',
    title: 'Regularização de Empresas',
    shortDesc: 'Solução rápida para pendências fiscais, débitos e certidões negativas (CND).',
    fullDesc: 'Sanamos pendências que impedem sua empresa de emitir certidões, participar de licitações ou obter empréstimos. Realizamos parcelamentos de débitos tributários (RFB, PGFN, Estado e Município) e reativação de CNPJ inativo.',
    category: 'empresarial',
    iconName: 'ShieldCheck',
    features: [
      'Levantamento completo de pendências na Receita, Estado e Prefeitura',
      'Negociação e adesão a programas de parcelamento (REFIS / Transação Excepcional)',
      'Emissão de Certidões Negativas de Débitos (CNDs)',
      'Baixa regular de empresas sem operação'
    ],
    benefits: [
      'Recuperação da credibilidade no mercado e junto a bancos',
      'Desbloqueio de certidões essenciais para emissão de notas e contratos',
      'Regularização financeira sem sobressaltos e com valores cabíveis'
    ],
    targetAudience: 'Empresas com restrições fiscais, CNPJ inapto ou débitos em aberto.'
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
    metric: '+10',
    numberValue: 10,
    suffix: ' Anos',
    label: 'Anos de Tradição',
    description: 'Histórico consolidado em Bragança Paulista e região com sólida reputação técnica e ética.',
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
    description: 'Entendemos o momento atual da sua empresa em Bragança Paulista ou os planos para novo negócio através de um atendimento acolhedor e direto.',
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
