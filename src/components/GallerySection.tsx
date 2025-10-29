
import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Image, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: 'antes-depois' | 'processo';
  description?: string;
  serviceId: string; // Added serviceId to link with form services
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://tse2.mm.bing.net/th?id=OIP.cqOpQVahPIFp_NpRW2AjjgHaC1&pid=Api&P=0&h=180",
    title: "Polimento Técnico",
    category: "antes-depois",
    description: "Transformação completa de um BMW Serie 3 com polimento técnico em 3 etapas.",
    serviceId: "polimento"
  },
  {
    id: 2,
    src: "https://www.clubwash.com.br/wp-content/uploads/2023/09/Antes-e-depois-da-vitrificacao.-balneario-camboriu-ceramic-pro-carpro-nasiol-igl-coating-ceramic.png",
    title: "Vitrificação Premium",
    category: "processo",
    description: "Processo de preparação para vitrificação de um Audi A5.",
    serviceId: "vitrificacao"
  },
  {
    id: 3,
    src: "https://courotecabc.com.br/images/servicos/tingimento/z2.jpg",
    title: "Tratamento de Couro",
    category: "antes-depois",
    description: "Revitalização completa de bancos de couro em Mercedes C300.",
    serviceId: "hidratacao"
  },
  {
    id: 4,
    src: "https://lojaaprotex.com/wp-content/uploads/2021/04/Estofados-1.jpg",
    title: "Higienização Interna",
    category: "processo",
    description: "Processo de extração e limpeza profunda em estofados.",
    serviceId: "higienizacao"
  },
  {
    id: 5,
    src: "https://boxdetail.com.br/wp-content/uploads/2024/07/antes-e-depois-do-servico-de-polimento-por-empresa-profissional-de-revitalizacao-de-farois-automotivo-em-sao-paulo.jpg",
    title: "Polimento de Faróis",
    category: "antes-depois",
    description: "Restauração completa de faróis oxidados em um Volvo XC60.",
    serviceId: "chuvaAcida"
  },
  {
    id: 6,
    src: "https://www.jacsautocare.com/images/pulido-de-carros-grandes-en-guayaquil.jpg",
    title: "Aplicação Cerâmica",
    category: "processo",
    description: "Aplicação de proteção cerâmica com durabilidade de 3 anos.",
    serviceId: "enceramento"
  },
];

// Export to make services available to ContactSection
export const galleryServices = galleryImages.map(img => ({
  id: img.serviceId,
  name: img.title
}));

const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'todos' | 'antes-depois' | 'processo'>('todos');
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  const filteredImages = filter === 'todos'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  const handleServiceRequest = (serviceId: string) => {
    // Close the dialog
    setCurrentImage(null);
    
    // Scroll to the contact form
    const contactForm = document.getElementById('contato');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Set the selected service in the form
    const serviceSelect = document.getElementById('service') as HTMLSelectElement;
    if (serviceSelect) {
      serviceSelect.value = serviceId;
      
      // Trigger a change event to update form state
      const event = new Event('change', { bubbles: true });
      serviceSelect.dispatchEvent(event);
    }
  };

  return (
    <section id="galeria" className="section bg-gradient-to-b from-autolux-black to-[#1a1a1a]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 reveal-on-scroll">
            Nossa <span className="text-primary">Galeria</span> de Transformações
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 reveal-on-scroll"></div>
          <p className="text-gray-300 max-w-2xl mx-auto reveal-on-scroll">
            Confira os resultados impressionantes de nossos serviços de estética automotiva. Cada imagem representa nosso compromisso com a excelência e cuidado com os detalhes.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Button
            onClick={() => setFilter('todos')}
            variant={filter === 'todos' ? 'default' : 'outline'}
            className={cn(
              "border-autolux-gray/30",
              filter === 'todos' ? 'gold-gradient' : 'hover:border-primary/50'
            )}
          >
            <Image size={16} className="mr-2" />
            Todos
          </Button>
          <Button
            onClick={() => setFilter('antes-depois')}
            variant={filter === 'antes-depois' ? 'default' : 'outline'}
            className={cn(
              "border-autolux-gray/30",
              filter === 'antes-depois' ? 'gold-gradient' : 'hover:border-primary/50'
            )}
          >
            <Image size={16} className="mr-2" />
            Antes e Depois
          </Button>
          <Button
            onClick={() => setFilter('processo')}
            variant={filter === 'processo' ? 'default' : 'outline'}
            className={cn(
              "border-autolux-gray/30",
              filter === 'processo' ? 'gold-gradient' : 'hover:border-primary/50'
            )}
          >
            <Image size={16} className="mr-2" />
            Processo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll">
          {filteredImages.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <Card 
                  className="overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 border-autolux-gray/20 bg-black"
                  onClick={() => setCurrentImage(image)}
                >
                  <div className="relative h-64">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white font-semibold">{image.title}</h3>
                      <span className="inline-block px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full mt-2">
                        {image.category === 'antes-depois' ? 'Antes e Depois' : 'Processo'}
                      </span>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-[#121212] border-autolux-gray/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-[300px] md:h-auto">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                      <span className="inline-block px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full mb-4">
                        {image.category === 'antes-depois' ? 'Antes e Depois' : 'Processo'}
                      </span>
                      <p className="text-gray-300">{image.description}</p>
                    </div>
                    <div className="mt-auto">
                      <Button 
                        className="gold-gradient w-full"
                        onClick={() => handleServiceRequest(image.serviceId)}
                      >
                        Solicitar este serviço
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
