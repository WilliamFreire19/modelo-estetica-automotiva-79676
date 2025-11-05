
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, X } from 'lucide-react';
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
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg border border-autolux-gray/10 hover:border-primary/30 transition-all duration-300 h-full group">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-autolux-black to-transparent opacity-70"></div>
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
      title: "Lavagem Comercial Interna e Externa",
      description: "Limpeza completa interna e externa do veículo, incluindo aspiração, lavagem de estofados e acabamento impecável.",
      imageSrc: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop",
      fullDescription: "Serviço completo de lavagem comercial que inclui limpeza interna detalhada com aspiração de carpetes e estofados, limpeza de painéis e acabamentos internos, além da lavagem externa completa com produtos de qualidade.",
      priceRange: "A partir de R$ 80,00",
      duration: "1h - 1h30min",
      process: [
        "Aspiração completa do interior",
        "Limpeza de painéis e console",
        "Lavagem externa com shampoo automotivo",
        "Limpeza de vidros internos e externos",
        "Aplicação de pretinho nos pneus",
        "Secagem e acabamento final"
      ]
    },
    {
      title: "Lavagem Técnica Detalhada",
      description: "Lavagem profissional com técnicas especializadas para limpeza profunda e proteção da pintura.",
      imageSrc: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop",
      fullDescription: "Lavagem técnica que utiliza métodos profissionais de duas baldes, clay bar quando necessário, e produtos específicos para cada tipo de superfície, garantindo limpeza profunda sem riscar a pintura.",
      priceRange: "A partir de R$ 120,00",
      duration: "2h - 2h30min",
      process: [
        "Pré-lavagem com foam lance",
        "Lavagem com técnica de dois baldes",
        "Descontaminação com clay bar (se necessário)",
        "Limpeza detalhada de rodas e pneus",
        "Lavagem dos vidros com produtos específicos",
        "Secagem com microfibra de qualidade"
      ]
    },
    {
      title: "Lavagem de Bancos e Carpetes",
      description: "Higienização profunda de bancos e carpetes com equipamentos especializados e produtos específicos.",
      imageSrc: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
      fullDescription: "Serviço especializado de limpeza profunda de estofados, utilizando extratora e produtos de higienização que removem sujeira, manchas e odores, deixando o interior do veículo completamente renovado.",
      priceRange: "A partir de R$ 100,00",
      duration: "1h30min - 2h",
      process: [
        "Aspiração inicial dos bancos e carpetes",
        "Aplicação de produto higienizador",
        "Escovação para remoção de sujeira",
        "Extração com equipamento profissional",
        "Secagem e acabamento",
        "Aplicação de protetor (opcional)"
      ]
    },
    {
      title: "Lavagem de Motor",
      description: "Limpeza segura e profissional do motor, removendo sujeira e gordura acumuladas.",
      imageSrc: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
      fullDescription: "Lavagem especializada do compartimento do motor com proteção de componentes elétricos e eletrônicos, utilizando produtos desengordurantes específicos e finalização com protetor de plásticos e borrachas.",
      priceRange: "A partir de R$ 80,00",
      duration: "40min - 1h",
      process: [
        "Proteção de componentes elétricos",
        "Aplicação de desengordurante",
        "Limpeza com vapor ou jato d'água controlado",
        "Secagem com ar comprimido",
        "Aplicação de silicone revitalizador",
        "Inspeção final"
      ]
    },
    {
      title: "Polimento",
      description: "Remoção de riscos, manchas e oxidação da pintura, devolvendo o brilho original do veículo.",
      imageSrc: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=600&fit=crop",
      fullDescription: "Serviço de correção de pintura que remove imperfeições, riscos leves, manchas e oxidação através de processo de polimento em múltiplas etapas, restaurando o brilho e profundidade da cor original.",
      priceRange: "A partir de R$ 300,00",
      duration: "4h - 6h",
      process: [
        "Lavagem técnica preparatória",
        "Descontaminação da pintura",
        "Polimento de corte (remoção de riscos)",
        "Polimento de refino",
        "Aplicação de cera protetora ou selante",
        "Inspeção e acabamento final"
      ]
    },
    {
      title: "Recuperação de Faróis",
      description: "Restauração de faróis opacos e amarelados, melhorando a iluminação e estética do veículo.",
      imageSrc: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
      fullDescription: "Processo de restauração que remove a oxidação e opacidade dos faróis através de lixamento progressivo e polimento, seguido de aplicação de verniz protetor UV para durabilidade prolongada.",
      priceRange: "A partir de R$ 150,00",
      duration: "1h30min - 2h",
      process: [
        "Limpeza inicial dos faróis",
        "Lixamento úmido progressivo (600 a 2000)",
        "Polimento com massa específica",
        "Aplicação de verniz protetor UV",
        "Secagem e inspeção",
        "Teste de iluminação"
      ]
    },
    {
      title: "Revitalização de Vidros",
      description: "Limpeza profunda e polimento de vidros, removendo manchas, riscos leves e chuva ácida.",
      imageSrc: "https://images.unsplash.com/photo-1622283477373-4e7942f72f8a?w=800&h=600&fit=crop",
      fullDescription: "Tratamento especializado para vidros que remove manchas de água, chuva ácida, resíduos e micro riscos, utilizando compostos específicos e polimento, resultando em vidros cristalinos e visibilidade perfeita.",
      priceRange: "A partir de R$ 120,00",
      duration: "1h - 1h30min",
      process: [
        "Limpeza inicial com produto específico",
        "Aplicação de composto para remoção de manchas",
        "Polimento com máquina e feltro específico",
        "Limpeza final com microfibra",
        "Aplicação de repelente de água (opcional)",
        "Inspeção de transparência"
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
    <section id="servicos" className="section bg-autolux-black">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 reveal-on-scroll">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 reveal-on-scroll">
            Soluções completas de estética automotiva com produtos premium e técnicas avançadas para veículos exigentes.
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
            <DialogContent className="bg-[#1a1a1a] border-autolux-gray/20 text-white max-w-2xl">
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
                  <div className="bg-autolux-black/50 p-4 rounded-lg">
                    <h4 className="text-primary font-medium mb-1">Faixa de Preço</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].priceRange}</p>
                  </div>
                  <div className="bg-autolux-black/50 p-4 rounded-lg">
                    <h4 className="text-primary font-medium mb-1">Tempo Estimado</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].duration}</p>
                  </div>
                </div>
                
                <div className="bg-autolux-black/50 p-4 rounded-lg">
                  <h4 className="text-primary font-medium mb-2">Processo de Aplicação</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-200">
                    {services[openServiceIndex].process.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full blue-gradient hover:opacity-90 text-white font-medium py-6"
                    onClick={() => {
                      closeServiceDetails();
                      // Scroll to contact form
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
