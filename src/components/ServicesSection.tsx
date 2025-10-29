
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
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg border border-autolux-gray/10 hover:border-autolux-red/30 transition-all duration-300 h-full group">
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
            className="text-autolux-red hover:text-white hover:bg-autolux-red group"
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
      title: "Polimento Técnico",
      description: "Recuperação da pintura com remoção de riscos, oxidações e marcas de uso, devolvendo o brilho original do veículo.",
      imageSrc: "https://img.freepik.com/free-photo/beautiful-car-polishing-service_23-2149212247.jpg",
      fullDescription: "O Polimento Técnico é um processo avançado que remove riscos, marcas de swirl, oxidações e imperfeições da pintura do veículo. Utilizamos politrizes profissionais e compostos abrasivos específicos para cada tipo de pintura, devolvendo o brilho e a profundidade original da cor.",
      priceRange: "R$ 350 - R$ 950",
      duration: "4 a 8 horas",
      process: [
        "Lavagem e descontaminação da pintura",
        "Análise detalhada sob luz específica",
        "Polimento em múltiplos estágios",
        "Refinamento e acabamento final"
      ]
    },
    {
      title: "Vitrificação de Pintura",
      description: "Proteção avançada que forma uma camada vítrea sobre a pintura, garantindo maior durabilidade, brilho intenso e proteção UV.",
      imageSrc: "https://img.freepik.com/free-photo/close-up-car-care-process_23-2149193578.jpg",
      fullDescription: "A Vitrificação cria uma camada protetora sobre a pintura do veículo que proporciona brilho intenso e proteção duradoura contra raios UV, chuva ácida e contaminantes. Esta proteção cerâmica forma um escudo transparente que facilita a limpeza e mantém o veículo com aspecto de recém-encerado por meses.",
      priceRange: "R$ 600 - R$ 1.800",
      duration: "1 a 2 dias",
      process: [
        "Lavagem e descontaminação completa",
        "Polimento para remoção de imperfeições",
        "Aplicação da vitrificação em múltiplas camadas",
        "Tempo de cura controlado"
      ]
    },
    {
      title: "Hidratação de Couro",
      description: "Tratamento especializado para bancos e revestimentos em couro, restaurando a maciez, evitando ressecamentos e trincas.",
      imageSrc: "https://img.freepik.com/premium-photo/applying-nanoceramic-coating-interior-leather-car-s-seat-brown-upholstery-by-worker-blue-gloves-with-sponge-bottle-chemical-composition-auto-service-industry_136863-1759.jpg",
      fullDescription: "A Hidratação de Couro é um processo especializado que restaura a maciez e a flexibilidade natural dos revestimentos em couro do veículo. Utilizamos produtos específicos que penetram profundamente no material, prevenindo ressecamentos, rachaduras e desgaste prematuro, além de proporcionar proteção contra raios UV.",
      priceRange: "R$ 250 - R$ 500",
      duration: "2 a 4 horas",
      process: [
        "Limpeza profunda do couro",
        "Remoção de manchas e sujeiras incrustadas",
        "Aplicação de hidratantes específicos",
        "Proteção final com acabamento acetinado"
      ]
    },
    {
      title: "Higienização Interna",
      description: "Limpeza profunda e descontaminação de todo o interior do veículo, incluindo bancos, carpetes e sistema de ar-condicionado.",
      imageSrc: "https://img.freepik.com/free-photo/beautiful-car-interior-clean-up-service_23-2149212256.jpg",
      fullDescription: "A Higienização Interna é um processo minucioso que elimina sujeira, bactérias, ácaros e odores do interior do veículo. Utilizamos equipamentos de extração, vapor e produtos específicos para cada superfície, garantindo um ambiente limpo, saudável e com aspecto de novo.",
      priceRange: "R$ 280 - R$ 650",
      duration: "3 a 6 horas",
      process: [
        "Aspiração profunda de todas as superfícies",
        "Higienização de bancos, carpetes e forros",
        "Limpeza e sanitização do sistema de ar-condicionado",
        "Hidratação de plásticos e borrachas",
        "Aplicação de proteção anti-UV nos painéis"
      ]
    },
    {
      title: "Remoção de Chuva Ácida",
      description: "Tratamento específico para remover manchas causadas por chuva ácida e contaminantes ambientais na pintura do veículo.",
      imageSrc: "https://img.freepik.com/free-photo/handsomen-man-black-sweater-washing-his-car_1157-35954.jpg",
      fullDescription: "A Remoção de Chuva Ácida é um tratamento especializado que elimina manchas e danos causados pela poluição ambiental e precipitações contaminadas. Utilizamos produtos químicos específicos e técnicas de polimento suave que removem os contaminantes sem danificar a camada de verniz da pintura.",
      priceRange: "R$ 200 - R$ 450",
      duration: "2 a 5 horas",
      process: [
        "Análise do nível de contaminação",
        "Descontaminação com clay bar específica",
        "Polimento localizado nas áreas afetadas",
        "Aplicação de selante para proteção futura"
      ]
    },
    {
      title: "Enceramento Profissional",
      description: "Aplicação de ceras de carnaúba premium para proteção e brilho duradouros, realçando a beleza da pintura original.",
      imageSrc: "https://img.freepik.com/free-photo/close-up-car-care-process_23-2149193628.jpg",
      fullDescription: "O Enceramento Profissional utiliza ceras naturais de carnaúba da mais alta qualidade que proporcionam brilho profundo e proteção à pintura. Este tratamento cria uma camada hidrofóbica que repele água e sujeira, facilita a limpeza e realça a profundidade da cor do veículo.",
      priceRange: "R$ 180 - R$ 380",
      duration: "2 a 4 horas",
      process: [
        "Lavagem e descontaminação completa",
        "Preparação da superfície",
        "Aplicação manual da cera em camadas",
        "Remoção e polimento final para máximo brilho"
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
            Nossos <span className="text-autolux-red">Serviços</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 reveal-on-scroll">
            Soluções completas de estética automotiva com produtos premium e técnicas avançadas para veículos exigentes.
          </p>
          <div className="w-24 h-1 bg-autolux-red mx-auto mt-4 reveal-on-scroll"></div>
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
                    <h4 className="text-autolux-red font-medium mb-1">Faixa de Preço</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].priceRange}</p>
                  </div>
                  <div className="bg-autolux-black/50 p-4 rounded-lg">
                    <h4 className="text-autolux-red font-medium mb-1">Tempo Estimado</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].duration}</p>
                  </div>
                </div>
                
                <div className="bg-autolux-black/50 p-4 rounded-lg">
                  <h4 className="text-autolux-red font-medium mb-2">Processo de Aplicação</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-200">
                    {services[openServiceIndex].process.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full red-gradient hover:opacity-90 text-white font-medium py-6"
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
