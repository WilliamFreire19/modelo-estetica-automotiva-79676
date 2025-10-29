
import React from 'react';
import { Facebook, Instagram, MessageSquare, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-autolux-gray/20 text-white">
      <div className="container mx-auto">
        <div className="py-12 px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-2xl font-montserrat font-bold mb-6">
              <span className="text-white">VIP</span>
              <span className="text-[#FDCC01]"> LAVA CAR</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Estética Automotiva Completa em Erechim - RS. Da limpeza básica ao espelhamento, incluindo manutenção e serviços especiais para frotas e caminhões.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/viplavacar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center border border-autolux-gray hover:border-[#FDCC01] transition-colors"
              >
                <Instagram size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a 
                href="https://facebook.com/viplavacar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center border border-autolux-gray hover:border-[#FDCC01] transition-colors"
              >
                <Facebook size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a 
                href="https://wa.me/5554984217365" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center border border-autolux-gray hover:border-[#FDCC01] transition-colors"
              >
                <MessageSquare size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Menu Rápido</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Home</a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Serviços</a>
              </li>
              <li>
                <a href="#galeria" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Galeria</a>
              </li>
              <li>
                <a href="#depoimentos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Depoimentos</a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Contato</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Espelhamento/Polimento</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Higienização Completa</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Limpeza de Bancos</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Lavação de Motor</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Frotas e Caminhões</a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-[#FDCC01] transition-colors">Troca de Filtro A/C</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-[#FDCC01] mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">(54) 98421-7365</p>
                  <a href="tel:+5554984217365" className="text-xs text-[#FDCC01] hover:underline">Ligar agora</a>
                </div>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-5 w-5 text-[#FDCC01] mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">WhatsApp</p>
                  <a href="https://wa.me/5554984217365" className="text-xs text-[#FDCC01] hover:underline">Enviar mensagem</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-autolux-gray/20 py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Vip Lava Car. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <a href="/privacidade" className="hover:text-[#FDCC01] transition-colors">Política de Privacidade</a>
              <span>|</span>
              <a href="/termos" className="hover:text-[#FDCC01] transition-colors">Termos de Uso</a>
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
