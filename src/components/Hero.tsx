import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, CheckCircle2, ArrowDown, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import whatsappImg from '../assets/whatsapp.png';

interface HeroProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

const entrance = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => (
  <section id="inicio" className="hero-section">
    <div className="hero-grid site-container">
      <motion.div className="hero-copy" initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
        <motion.div variants={entrance} className="hero-location">
          <span className="status-dot" /><MapPin size={14} />
          <span>Bragança Paulista - SP e Região</span>
        </motion.div>
        <motion.h1 variants={entrance}>
          Contabilidade inteligente para empresas que querem <em>crescer.</em>
        </motion.h1>
        <motion.p variants={entrance} className="hero-description">{COMPANY_INFO.subtitle}</motion.p>
        <motion.div variants={entrance} className="hero-actions">
          <button onClick={() => onOpenQuoteModal()} className="premium-button primary-button">
            Solicitar Orçamento <ArrowUpRight size={19} />
          </button>
          <a className="premium-button secondary-button" href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com um contador do Escritório Contábil JL Oliveira.')}`} target="_blank" rel="noopener noreferrer">
            <img src={whatsappImg} alt="" width={20} height={20} /> Falar no WhatsApp
          </a>
        </motion.div>
        <motion.div variants={entrance} className="hero-trust">
          <span><CheckCircle2 size={16} /> Atendimento Humanizado</span>
          <span><CheckCircle2 size={16} /> +500 Clientes Atendidos</span>
        </motion.div>
      </motion.div>
      <motion.div className="hero-art" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2 }}>
        <div className="art-grid" aria-hidden="true" />
        <div className="art-orbit art-orbit-one" aria-hidden="true" /><div className="art-orbit art-orbit-two" aria-hidden="true" />
        <div className="art-heading"><span>JL OLIVEIRA</span><span>CONTABILIDADE</span></div>
        <div className="art-monogram" aria-hidden="true">JL</div>
        <div className="growth-sculpture" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className={`sculpture-column column-${index}`} style={{ '--column-index': index } as React.CSSProperties}>
              <div className="column-top" /><div className="column-front" /><div className="column-side" />
            </div>
          ))}
          <div className="sculpture-floor" />
        </div>
        <div className="art-caption"><span>Crescimento Sustentável</span><ArrowUpRight size={24} strokeWidth={1.2} /></div>
        <div className="art-seal"><ShieldCheck size={24} strokeWidth={1.3} /><div><strong>+40</strong><span>anos de tradição</span></div></div>
        <span className="art-corner" aria-hidden="true">+</span>
      </motion.div>
    </div>
    <div className="hero-baseline site-container"><span>{COMPANY_INFO.name}</span><a href="#sobre">Conheça o escritório <ArrowDown size={14} /></a></div>
  </section>
);
