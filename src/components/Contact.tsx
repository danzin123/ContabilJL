import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { ContactFormData } from '../types';
import confetti from 'canvas-confetti';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Abertura de Empresas',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Por favor, preencha nome, e-mail e telefone.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  const handleSendToWhatsApp = () => {
    const text = `*Solicitação de Atendimento pelo Site*
*Nome:* ${formData.name}
*Empresa:* ${formData.company || 'Não informada'}
*E-mail:* ${formData.email}
*Telefone:* ${formData.phone}
*Serviço de Interesse:* ${formData.service}
*Mensagem:* ${formData.message || 'Sem mensagem adicional.'}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contato" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B63CE] bg-[#0B63CE]/10 px-3.5 py-1.5 rounded-full">
            Fale Conosco
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Estamos Prontos para Atender Sua Empresa
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Venha tomar um café em nosso escritório em Bragança Paulista ou solicite um atendimento digital imediato.
          </p>
        </div>

        {/* Split Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Google Maps */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="space-y-4">
              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-[#0B63CE] text-white rounded-xl flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Endereço</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                    {COMPANY_INFO.street}
                  </p>
                  <p className="text-slate-500 text-xs font-medium">
                    {COMPANY_INFO.city}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Rua+Nicolino+Nacaratti+416+Braganca+Paulista+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B63CE] hover:underline mt-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Como chegar via Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-[#0B63CE] text-white rounded-xl flex-shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Telefone Fixo</h4>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-slate-800 font-semibold text-sm hover:text-[#0B63CE] mt-0.5 block">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-[#25D366] text-white rounded-xl flex-shrink-0 shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 font-semibold text-sm hover:text-[#25D366] mt-0.5 block"
                  >
                    {COMPANY_INFO.whatsapp}
                  </a>
                  <span className="text-[11px] text-slate-500 block">Atendimento rápido em horário comercial</span>
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-[#0B63CE]" />
                <span><strong>Horário:</strong> {COMPANY_INFO.businessHours}</span>
              </div>
            </div>

            {/* Embedded Google Maps Box */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-64 relative bg-slate-100">
              <iframe
                title="Localização do Escritório Contábil JL Oliveira"
                src={COMPANY_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-left">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-2xl font-black text-slate-900">
                    Mensagem Enviada com Sucesso!
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Agradecemos seu contato, <strong className="text-slate-800">{formData.name}</strong>. Nossa equipe entrará em contato em breve via telefone ou e-mail.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Cópia via WhatsApp Agora</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        service: 'Abertura de Empresas',
                        message: ''
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    Solicite Atendimento ou Orçamento
                  </h3>
                  <p className="text-xs text-slate-500">
                    Preencha o formulário abaixo para retornarmos o contato rapidamente.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Carlos Silva"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE] transition-all"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: Silva Comercio Ltda"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ex: contato@empresa.com.br"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ex: (11) 99899-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE] transition-all"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Serviço de Interesse
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE] transition-all"
                  >
                    <option value="Abertura de Empresas">Abertura de Empresas</option>
                    <option value="Escrita Fiscal">Escrita Fiscal</option>
                    <option value="Departamento Pessoal">Departamento Pessoal</option>
                    <option value="Contabilidade Empresarial">Contabilidade Empresarial</option>
                    <option value="Planejamento Tributário">Planejamento Tributário</option>
                    <option value="Imposto de Renda">Imposto de Renda (IRPF / IRPJ)</option>
                    <option value="Consultoria Contábil">Consultoria Contábil</option>
                    <option value="Regularização de Empresas">Regularização de Empresas</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mensagem (Opcional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte-nos brevemente sobre sua necessidade..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B63CE] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#0B63CE] hover:bg-[#0952ae] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#0B63CE]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
