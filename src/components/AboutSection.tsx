
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
          <h2 className="text-3xl md:text-4xl font-bold mb-3 reveal-on-scroll text-fernando-black">
            Sobre a <span className="text-primary">Fernando Auto Pintura</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto reveal-on-scroll"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-on-scroll">
            <h3 className="text-2xl font-semibold mb-6 text-fernando-black">A Arte da Funilaria e Pintura Automotiva</h3>
            <p className="text-gray-700 mb-6">
              A Fernando Auto Pintura é especializada em funilaria e pintura automotiva de alta qualidade em Criciúma - SC. Oferecemos serviços completos de repintura, recuperação de para-choque, micro pintura com aerógrafo, martelinho de ouro, polimento técnico, vitrificação Gyeon Official e aplicação de selante.
            </p>
            <p className="text-gray-700 mb-8">
              Com paixão pela arte automotiva e qualificação técnica, cuidamos de veículos modernos e clássicos, preservando a originalidade e superando expectativas. Cada serviço é executado com precisão e dedicação.
            </p>
            
            <div className="mt-8">
              <h4 className="font-bold mb-3 text-xl text-fernando-black">Nossos Valores</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-primary mr-3"></div>
                  <span>Excelência Técnica</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-primary mr-3"></div>
                  <span>Paixão pelo Trabalho</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-primary mr-3"></div>
                  <span>Preservação da Originalidade</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="h-1 w-6 bg-primary mr-3"></div>
                  <span>Produtos Premium Gyeon</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative reveal-on-scroll">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/ab58136b-ec87-4a08-bf0b-b02088cf4d0c.png" 
                alt="Profissionais de funilaria e pintura" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 glass-white p-6 rounded-lg z-20">
              <div className="flex flex-wrap gap-6 justify-around">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-xl font-bold text-fernando-black">100%</p>
                  <p className="text-sm text-gray-600">Garantia</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-xl font-bold text-fernando-black">Gyeon</p>
                  <p className="text-sm text-gray-600">Oficial</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-xl font-bold text-fernando-black">+500</p>
                  <p className="text-sm text-gray-600">Clientes</p>
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
