
import React from 'react';
import { Facebook, Instagram, MessageSquare, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-fernando-gray/20 text-white">
      <div className="container mx-auto">
        <div className="py-12 px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-2xl font-montserrat font-bold mb-6">
              <span className="text-white">FERNANDO</span>
              <span className="text-primary"> AUTO PINTURA</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Funilaria e Pintura Automotiva em Criciúma - SC. Especialistas em repintura, polimento técnico e vitrificação Gyeon Official.
            </p>
            <div className="flex space-x-4">
              <a 
                href="tel:+554834429554" 
                className="h-10 w-10 rounded-full flex items-center justify-center border border-fernando-gray hover:border-primary transition-colors"
              >
                <Phone size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a 
                href="https://wa.me/5548996140000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center border border-fernando-gray hover:border-primary transition-colors"
              >
                <MessageSquare size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Menu Rápido</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-primary transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-primary transition-colors">Serviços</a>
              </li>
              <li>
                <a href="#galeria" className="text-gray-400 hover:text-primary transition-colors">Galeria</a>
              </li>
              <li>
                <a href="#depoimentos" className="text-gray-400 hover:text-primary transition-colors">Depoimentos</a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-primary transition-colors">Contato</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-primary transition-colors">Funilaria e Pintura</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-primary transition-colors">Repintura</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-primary transition-colors">Martelinho de Ouro</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-primary transition-colors">Polimento Técnico</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-primary transition-colors">Vitrificação Gyeon</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">(48) 3442-9554</p>
                  <a href="tel:+554834429554" className="text-xs text-primary hover:underline">Ligar agora</a>
                </div>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-5 w-5 text-primary mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">WhatsApp</p>
                  <a href="https://wa.me/5548996140000" className="text-xs text-primary hover:underline">Enviar mensagem</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-fernando-gray/20 py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Fernando Auto Pintura. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <a href="/privacidade" className="hover:text-primary transition-colors">Política de Privacidade</a>
              <span>|</span>
              <a href="/termos" className="hover:text-primary transition-colors">Termos de Uso</a>
              <span>|</span>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span>Site Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
