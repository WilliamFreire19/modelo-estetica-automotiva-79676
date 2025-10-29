
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
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg border border-autolux-gray/10 hover:border-[#FDCC01]/30 transition-all duration-300 h-full group">
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
            className="text-[#FDCC01] hover:text-black hover:bg-[#FDCC01] group"
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
      title: "Lavação Completa",
      description: "Lavagem externa e interna completa do veículo, incluindo limpeza de rodas, vidros e acabamentos.",
      imageSrc: "https://img.freepik.com/free-photo/handsomen-man-black-sweater-washing-his-car_1157-35954.jpg",
      fullDescription: "A Lavação Completa é o serviço básico essencial para manter seu veículo sempre limpo e bem cuidado. Inclui lavagem externa detalhada, limpeza de rodas, vidros, acabamentos e aspiração interna.",
      priceRange: "Consulte",
      duration: "1 a 2 horas",
      process: [
        "Pré-lavagem com espuma ativa",
        "Lavagem manual detalhada",
        "Limpeza de rodas e pneus",
        "Secagem e finalização"
      ]
    },
    {
      title: "Espelhamento / Polimento",
      description: "Recuperação da pintura com remoção de riscos, oxidações e marcas de uso, devolvendo o brilho intenso do veículo.",
      imageSrc: "https://img.freepik.com/free-photo/beautiful-car-polishing-service_23-2149212247.jpg",
      fullDescription: "O Espelhamento é um processo avançado que remove riscos, marcas de swirl, oxidações e imperfeições da pintura do veículo. Utilizamos politrizes profissionais e compostos específicos para cada tipo de pintura, devolvendo o brilho profundo e aspecto de novo.",
      priceRange: "Consulte",
      duration: "4 a 8 horas",
      process: [
        "Lavagem e descontaminação da pintura",
        "Análise detalhada das imperfeições",
        "Polimento em múltiplos estágios",
        "Refinamento e acabamento espelhado"
      ]
    },
    {
      title: "Higienização Completa",
      description: "Limpeza profunda de todo o interior do veículo, eliminando sujeira, bactérias e odores indesejados.",
      imageSrc: "https://img.freepik.com/free-photo/beautiful-car-interior-clean-up-service_23-2149212256.jpg",
      fullDescription: "A Higienização Completa é um processo minucioso que elimina sujeira, bactérias, ácaros e odores do interior do veículo. Utilizamos equipamentos profissionais e produtos específicos para garantir um ambiente limpo e saudável.",
      priceRange: "Consulte",
      duration: "3 a 5 horas",
      process: [
        "Aspiração profunda de todas as superfícies",
        "Higienização de bancos e carpetes",
        "Limpeza de painéis e forros",
        "Tratamento anti-odor"
      ]
    },
    {
      title: "Aplicação de Cera",
      description: "Proteção e brilho para a pintura do veículo com ceras de alta qualidade.",
      imageSrc: "https://img.freepik.com/free-photo/close-up-car-care-process_23-2149193628.jpg",
      fullDescription: "A Aplicação de Cera proporciona proteção à pintura e um brilho duradouro. Utilizamos ceras de alta qualidade que criam uma camada protetora contra raios UV, água e contaminantes.",
      priceRange: "Consulte",
      duration: "1 a 2 horas",
      process: [
        "Lavagem e descontaminação",
        "Preparação da superfície",
        "Aplicação da cera em camadas",
        "Polimento final para máximo brilho"
      ]
    },
    {
      title: "Limpeza de Bancos",
      description: "Limpeza profunda dos bancos do veículo, removendo manchas e sujeiras incrustadas.",
      imageSrc: "https://img.freepik.com/premium-photo/applying-nanoceramic-coating-interior-leather-car-s-seat-brown-upholstery-by-worker-blue-gloves-with-sponge-bottle-chemical-composition-auto-service-industry_136863-1759.jpg",
      fullDescription: "A Limpeza de Bancos é especializada na remoção de manchas, sujeiras e odores dos bancos. Trabalhamos com tecido, couro e outros materiais, utilizando produtos específicos para cada tipo.",
      priceRange: "Consulte",
      duration: "1 a 3 horas",
      process: [
        "Aspiração profunda",
        "Pré-tratamento de manchas",
        "Limpeza com produtos específicos",
        "Hidratação (para bancos de couro)"
      ]
    },
    {
      title: "Lavação de Motor",
      description: "Limpeza completa do compartimento do motor, removendo sujeiras e garantindo melhor desempenho.",
      imageSrc: "https://img.freepik.com/free-photo/close-up-car-care-process_23-2149193578.jpg",
      fullDescription: "A Lavação de Motor remove sujeiras, graxas e resíduos do compartimento do motor. Um motor limpo facilita a manutenção, melhora a dissipação de calor e valoriza o veículo.",
      priceRange: "Consulte",
      duration: "1 a 2 horas",
      process: [
        "Proteção de componentes elétricos",
        "Aplicação de produtos desengordurantes",
        "Lavagem detalhada",
        "Secagem e finalização"
      ]
    },
    {
      title: "Remoção de Chuva Ácida",
      description: "Tratamento especializado para remover manchas de chuva ácida e contaminantes da pintura.",
      imageSrc: "https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22325.jpg",
      fullDescription: "A Remoção de Chuva Ácida elimina manchas causadas por precipitações contaminadas e poluição. Utilizamos produtos químicos específicos e técnicas que removem os contaminantes sem danificar a pintura.",
      priceRange: "Consulte",
      duration: "2 a 4 horas",
      process: [
        "Análise do nível de contaminação",
        "Descontaminação química",
        "Polimento localizado",
        "Aplicação de selante protetor"
      ]
    },
    {
      title: "Troca de Filtro do Ar Condicionado",
      description: "Serviço de manutenção para troca do filtro do ar condicionado, garantindo ar limpo e puro no interior do veículo.",
      imageSrc: "https://img.freepik.com/premium-photo/wash-service-hand-car-vehicle-garage-cleaning-auto-maintenance-transportation-automobile-detailing-care_163305-256240.jpg",
      fullDescription: "A Troca do Filtro do Ar Condicionado é um serviço de manutenção essencial que garante a qualidade do ar dentro do veículo, removendo poeira, pólen e bactérias.",
      priceRange: "Consulte",
      duration: "30 min a 1 hora",
      process: [
        "Localização do filtro",
        "Remoção do filtro antigo",
        "Instalação do filtro novo",
        "Verificação do sistema"
      ]
    },
    {
      title: "Higienização para Cabines de Caminhão",
      description: "Serviço especializado de higienização completa para cabines de caminhão.",
      imageSrc: "https://img.freepik.com/free-photo/happy-black-car-repairman-young-businessman-handshaking-auto-repair-shop_637285-4249.jpg",
      fullDescription: "A Higienização para Cabines de Caminhão é um serviço especializado que atende as necessidades específicas de motoristas profissionais, garantindo um ambiente limpo e confortável.",
      priceRange: "Consulte",
      duration: "3 a 6 horas",
      process: [
        "Limpeza completa de todos os compartimentos",
        "Higienização de estofados e carpetes",
        "Limpeza de painéis e controles",
        "Desinfecção e tratamento anti-odor"
      ]
    },
    {
      title: "Planos Especiais para Frotas",
      description: "Soluções personalizadas para empresas com frotas de veículos, com condições especiais.",
      imageSrc: "https://img.freepik.com/free-photo/front-view-luxurious-modern-black-car-parked-indoors-daytime-garage_146671-17010.jpg",
      fullDescription: "Os Planos Especiais para Frotas oferecem soluções personalizadas para empresas que precisam manter seus veículos sempre limpos e bem apresentados. Oferecemos condições especiais e agendamento flexível.",
      priceRange: "Consulte",
      duration: "Variável",
      process: [
        "Análise das necessidades da frota",
        "Elaboração de plano personalizado",
        "Agendamento flexível",
        "Relatórios de serviços realizados"
      ]
    },
    {
      title: "Lavação de Moto",
      description: "Serviço completo de lavação para motocicletas, com atenção aos detalhes específicos.",
      imageSrc: "https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22325.jpg",
      fullDescription: "A Lavação de Moto é um serviço especializado que cuida de todos os detalhes da sua motocicleta, desde a lavagem externa até a limpeza de componentes específicos.",
      priceRange: "Consulte",
      duration: "1 a 2 horas",
      process: [
        "Lavagem externa completa",
        "Limpeza de rodas e corrente",
        "Limpeza de componentes cromados",
        "Secagem e finalização"
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
            Nossos <span className="text-[#FDCC01]">Serviços</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 reveal-on-scroll">
            Soluções completas de estética automotiva com produtos premium e técnicas avançadas para veículos exigentes.
          </p>
          <div className="w-24 h-1 bg-[#FDCC01] mx-auto mt-4 reveal-on-scroll"></div>
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
                    <h4 className="text-[#FDCC01] font-medium mb-1">Faixa de Preço</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].priceRange}</p>
                  </div>
                  <div className="bg-autolux-black/50 p-4 rounded-lg">
                    <h4 className="text-[#FDCC01] font-medium mb-1">Tempo Estimado</h4>
                    <p className="text-white text-lg font-bold">{services[openServiceIndex].duration}</p>
                  </div>
                </div>
                
                <div className="bg-autolux-black/50 p-4 rounded-lg">
                  <h4 className="text-[#FDCC01] font-medium mb-2">Processo de Aplicação</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-200">
                    {services[openServiceIndex].process.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full gold-gradient hover:opacity-90 text-black font-medium py-6"
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
