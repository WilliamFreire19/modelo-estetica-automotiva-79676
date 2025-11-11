
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  index: number;
  onClickSaibaMais: () => void;
}

interface ServiceDetails {
  title: string;
  fullDescription: string;
  priceRange: string;
  duration: string;
  process: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc, index, onClickSaibaMais }) => {
  return (
    <div className={`reveal-on-scroll ${index % 2 === 0 ? '' : 'md:mt-16'}`}>
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg border border-fernando-gray/10 hover:border-primary/30 transition-all duration-300 h-full group">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fernando-black to-transparent opacity-70"></div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-300 mb-6 text-sm">{description}</p>
          <Button 
            variant="ghost" 
            className="text-primary hover:text-white hover:bg-primary group"
            onClick={onClickSaibaMais}
          >
            Saiba Mais 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Funilaria e Pintura Geral",
      description: "Reparos completos de funilaria com pintura de alta qualidade, preservando a originalidade do veículo.",
      imageSrc: "https://images.unsplash.com/photo-1632823469850-37c28f402c6f?w=800&h=600&fit=crop",
      fullDescription: "Serviço completo de funilaria e pintura automotiva utilizando técnicas avançadas e produtos premium. Realizamos desde pequenos reparos até pintura completa, sempre focando na preservação da originalidade e qualidade de fábrica.",
      priceRange: "Consulte-nos",
      duration: "Varia conforme serviço",
      process: [
        "Avaliação técnica do dano",
        "Desmontagem quando necessário",
        "Reparo de funilaria",
        "Preparação da superfície",
        "Pintura em cabine",
        "Polimento e acabamento final"
      ]
    },
    {
      title: "Repintura Automotiva",
      description: "Repintura completa ou parcial com acabamento profissional e durabilidade garantida.",
      imageSrc: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop",
      fullDescription: "Processo completo de repintura automotiva com preparação adequada, aplicação de primers e tintas automotivas de alta qualidade, seguido de verniz e polimento para acabamento impecável.",
      priceRange: "Consulte-nos",
      duration: "3-7 dias",
      process: [
        "Lixamento e preparação",
        "Aplicação de massa e primer",
        "Pintura em cabine climatizada",
        "Aplicação de verniz UV",
        "Secagem controlada",
        "Polimento técnico"
      ]
    },
    {
      title: "Recuperação de Para-choque",
      description: "Restauração completa de para-choques com reparo estrutural e pintura perfeita.",
      imageSrc: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
      fullDescription: "Serviço especializado de recuperação de para-choques plásticos, incluindo reparo de trincas, furos e deformações, seguido de pintura com perfeita combinação de cor.",
      priceRange: "A partir de R$ 300,00",
      duration: "2-3 dias",
      process: [
        "Limpeza e avaliação",
        "Reparo estrutural com solda plástica",
        "Aplicação de massa flexível",
        "Lixamento progressivo",
        "Pintura e verniz",
        "Polimento final"
      ]
    },
    {
      title: "Micro Pintura",
      description: "Retoque localizado com aerógrafo para pequenos danos e riscos.",
      imageSrc: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=600&fit=crop",
      fullDescription: "Técnica especializada de micro pintura utilizando aerógrafo para correção de pequenos danos, riscos e lascas, com perfeita combinação de cor e acabamento invisível.",
      priceRange: "A partir de R$ 150,00",
      duration: "1-2 dias",
      process: [
        "Limpeza da área",
        "Lixamento fino localizado",
        "Preparação com primer",
        "Aplicação com aerógrafo",
        "Verniz localizado",
        "Polimento de integração"
      ]
    },
    {
      title: "Martelinho de Ouro",
      description: "Remoção de amassados sem pintura, preservando a pintura original do veículo.",
      imageSrc: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
      fullDescription: "Técnica especializada para remoção de amassados e pequenas deformações sem necessidade de pintura, preservando 100% da pintura original de fábrica.",
      priceRange: "A partir de R$ 200,00",
      duration: "2-4 horas",
      process: [
        "Avaliação do amassado",
        "Preparação de acesso",
        "Massageamento com ferramentas especiais",
        "Ajuste fino progressivo",
        "Verificação de resultado",
        "Polimento se necessário"
      ]
    },
    {
      title: "Polimento Técnico",
      description: "Remoção de riscos, manchas e oxidação com polimento profissional em múltiplas etapas.",
      imageSrc: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop",
      fullDescription: "Processo técnico de correção de pintura que remove imperfeições, riscos, hologramas e oxidação, restaurando o brilho e profundidade da cor original através de múltiplas etapas de polimento.",
      priceRange: "A partir de R$ 400,00",
      duration: "4-8 horas",
      process: [
        "Lavagem técnica preparatória",
        "Descontaminação com clay bar",
        "Polimento de corte",
        "Polimento de refino",
        "Acabamento com produto final",
        "Inspeção com luz específica"
      ]
    },
    {
      title: "Vitrificação Gyeon Official",
      description: "Proteção cerâmica de alta performance Gyeon Official contra riscos, sol e sujeiras.",
      imageSrc: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop",
      fullDescription: "Aplicação de vitrificação cerâmica Gyeon Official, proporcionando proteção superior contra riscos, raios UV, poluição e facilitando a limpeza. Durabilidade de até 3 anos com manutenção adequada.",
      priceRange: "A partir de R$ 800,00",
      duration: "1-2 dias",
      process: [
        "Lavagem técnica completa",
        "Descontaminação química e mecânica",
        "Polimento técnico",
        "Limpeza com IPA",
        "Aplicação da vitrificação Gyeon",
        "Cura de 24h"
      ]
    },
    {
      title: "Aplicação de Selante",
      description: "Proteção da pintura com selante de qualidade, proporcionando brilho e proteção.",
      imageSrc: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
      fullDescription: "Aplicação de selante sintético na pintura, criando uma camada protetora que realça o brilho, facilita a limpeza e protege contra elementos externos por até 6 meses.",
      priceRange: "A partir de R$ 250,00",
      duration: "3-4 horas",
      process: [
        "Lavagem técnica",
        "Descontaminação da pintura",
        "Limpeza com IPA",
        "Aplicação do selante",
        "Secagem e buffing",
        "Orientações de manutenção"
      ]
    }
  ];

  const openServiceDetails = (index: number) => {
    setOpenServiceIndex(index);
  };

  const closeServiceDetails = () => {
    setOpenServiceIndex(null);
  };

  return (
    <section id="servicos" className="section bg-fernando-black">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 reveal-on-scroll">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 reveal-on-scroll">
            Soluções completas de funilaria, pintura e estética automotiva com excelência técnica e produtos premium.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 reveal-on-scroll"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              index={index}
              onClickSaibaMais={() => openServiceDetails(index)}
            />
          ))}
        </div>

        {/* Service Details Dialog */}
        {openServiceIndex !== null && (
          <Dialog open={openServiceIndex !== null} onOpenChange={closeServiceDetails}>
            <DialogContent className="bg-[#1a1a1a] border-fernando-gray/20 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {services[openServiceIndex].title}
                </DialogTitle>
                <DialogDescription className="text-gray-300 pt-2">
                  {services[openServiceIndex].fullDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-fernando-black/50 p-4 rounded-lg">
                    <h4 className="text-primary font-medium mb-1">Faixa de Preço</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].priceRange}</p>
                  </div>
                  <div className="bg-fernando-black/50 p-4 rounded-lg">
                    <h4 className="text-primary font-medium mb-1">Tempo Estimado</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].duration}</p>
                  </div>
                </div>
                
                <div className="bg-fernando-black/50 p-4 rounded-lg">
                  <h4 className="text-primary font-medium mb-2">Processo de Aplicação</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-200">
                    {services[openServiceIndex].process.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full wine-gradient hover:opacity-90 text-white font-medium py-6"
                    onClick={() => {
                      closeServiceDetails();
                      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Solicitar Orçamento para este Serviço
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
