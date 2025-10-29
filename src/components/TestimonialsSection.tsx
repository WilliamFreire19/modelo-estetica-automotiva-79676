
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

interface Testimonial {
  id: number;
  name: string;
  car: string;
  comment: string;
  rating: number;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ricardo Alves",
      car: "BMW X6",
      comment: "Incrível trabalho de polimento e vitrificação. Meu carro ficou com um brilho impressionante, como se tivesse acabado de sair da concessionária.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: 2,
      name: "Amanda Costa",
      car: "Audi A4",
      comment: "Atendimento diferenciado e resultados excepcionais na limpeza interna. Tudo perfeitamente higienizado, incluindo os dutos do ar condicionado.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: 3,
      name: "Paulo Mendes",
      car: "Mercedes C300",
      comment: "A equipe da AutoLux é extremamente profissional e cuidadosa. O tratamento de couro nos bancos devolveu a aparência de novo ao meu carro de 5 anos.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: 4,
      name: "Carla Rodrigues",
      car: "Range Rover Evoque",
      comment: "Já utilizei várias empresas de estética automotiva, mas a AutoLux está em outro nível. O cuidado com os detalhes é impressionante.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: 5,
      name: "Fernando Melo",
      car: "Porsche 911",
      comment: "O serviço de vitrificação foi excepcional. A proteção da pintura é notável e o aspecto visual superou todas as minhas expectativas.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
    },
    {
      id: 6,
      name: "Juliana Ribeiro",
      car: "Volvo XC60",
      comment: "Profissionalismo e perfeccionismo definem a AutoLux. Meu carro recebeu um tratamento completo e o resultado é simplesmente impressionante.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
    }
  ];

  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    if (!api) {
      return;
    }
    
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="depoimentos" className="section bg-gradient-to-b from-[#1a1a1a] to-autolux-black">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 reveal-on-scroll">
            O Que Nossos <span className="text-primary">Clientes</span> Dizem
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto reveal-on-scroll mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto reveal-on-scroll">
            Excelência reconhecida por nossos clientes. Confira os depoimentos de quem confiou seus veículos aos nossos cuidados.
          </p>
        </div>

        <div className="reveal-on-scroll">
          <Carousel 
            setApi={setApi} 
            className="max-w-5xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full">
                    <Card className="bg-[#1a1a1a] border border-autolux-gray/20 p-6 h-full shadow-lg hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-primary">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-400">{testimonial.car}</p>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < testimonial.rating ? "#FDCC01" : "none"}
                                stroke={i < testimonial.rating ? "#FDCC01" : "#5a5a5a"}
                                className="mr-1"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic">&ldquo;{testimonial.comment}&rdquo;</p>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-8 gap-2">
              <CarouselPrevious className="static bg-black/50 border-primary/30 hover:bg-primary/80 transform-none translate-y-0 h-10 w-10" />
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`h-2.5 w-2.5 p-0 rounded-full border-0 ${
                      current === index ? 'bg-primary' : 'bg-autolux-gray/30'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  >
                    <span className="sr-only">Ver depoimento {index + 1}</span>
                  </Button>
                ))}
              </div>
              <CarouselNext className="static bg-black/50 border-primary/30 hover:bg-primary/80 transform-none translate-y-0 h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
