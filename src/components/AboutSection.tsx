
import React, { useEffect, useRef } from 'react';
import { Shield, Award, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="sobre" ref={sectionRef} className="section section-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 reveal-on-scroll text-autolux-black">
            Sobre a <span className="text-autolux-red">Auto Detailing</span>
          </h2>
          <div className="w-24 h-1 bg-autolux-red mx-auto reveal-on-scroll"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-on-scroll">
            <h3 className="text-2xl font-semibold mb-6 text-autolux-black">Excelência em Estética Automotiva</h3>
            <p className="text-gray-700 mb-6">
              Há mais de 10 anos no mercado, a Auto Detailing se especializou em proporcionar o melhor em estética automotiva para veículos premium. Nossa equipe de profissionais altamente qualificados e certificados utiliza produtos de primeira linha e técnicas avançadas para garantir resultados excepcionais.
            </p>
            <p className="text-gray-700 mb-8">
              Buscamos constantemente a inovação e a excelência em nossos processos, mantendo um compromisso inabalável com a satisfação dos clientes mais exigentes do mercado.
            </p>
            
            <div className="mt-8">
              <h4 className="font-bold mb-3 text-xl text-autolux-black">Nossos Valores</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-autolux-red mr-3"></div>
                  <span>Excelência em cada detalhe</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-autolux-red mr-3"></div>
                  <span>Compromisso com resultados</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-autolux-red mr-3"></div>
                  <span>Respeito ao cliente e seu patrimônio</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-autolux-red mr-3"></div>
                  <span>Inovação e tecnologia</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative reveal-on-scroll">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/ab58136b-ec87-4a08-bf0b-b02088cf4d0c.png" 
                alt="Profissionais detalhando carro vermelho" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 glass-white p-6 rounded-lg z-20">
              <div className="flex flex-wrap gap-6 justify-around">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto text-autolux-red mb-2" />
                  <p className="text-xl font-bold text-autolux-black">100%</p>
                  <p className="text-sm text-gray-600">Garantia</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto text-autolux-red mb-2" />
                  <p className="text-xl font-bold text-autolux-black">10+</p>
                  <p className="text-sm text-gray-600">Anos de experiência</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto text-autolux-red mb-2" />
                  <p className="text-xl font-bold text-autolux-black">5000+</p>
                  <p className="text-sm text-gray-600">Clientes satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
