import React from 'react';
import { COMPANY_INFO } from '../data/content';
import whatsappImg from '../assets/whatsapp.png';

export const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de atendimento do Escritório Contábil JL Oliveira.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
        aria-label="Atendimento no WhatsApp"
      >
        <img
          src={whatsappImg}
          alt="WhatsApp Escritório Contábil JL Oliveira"
          className="w-13 h-13 sm:w-16 sm:h-16 drop-shadow-2xl"
        />
      </a>
    </div>
  );
};
