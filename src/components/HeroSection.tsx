
import React from 'react';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-autolux-black">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-autolux-black/80 via-autolux-black/60 to-autolux-black z-10 backdrop-blur-sm"></div>
        <video 
          key="hero-video-playback"
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="https://v.ftcdn.net/05/73/55/12/700_F_573551276_ZNx62nAoNrkQRrWBZz1GzFOC2I158grG_ST.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img 
            src="https://img.freepik.com/free-photo/front-view-luxurious-modern-black-car-parked-indoors-daytime-garage_146671-17010.jpg" 
            alt="Carro premium polido" 
            className="w-full h-full object-cover object-center"
          />
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-autolux-white leading-tight">
            Vip Lava Car: O Cuidado Completo<br />
            <span className="text-[#FDCC01]">que Seu Veículo Merece em Erechim.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-slow text-gray-300 font-light">
            Estética Automotiva, Limpeza Profunda e Manutenção. Qualidade e Confiança Comprovadas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-slow">
            <Button size="lg" className="gold-gradient hover:opacity-90 text-black font-medium px-8 py-6 text-lg shadow-[0_4px_20px_rgba(253,204,1,0.5)]" onClick={scrollToContact}>
              <MessageSquare className="mr-2 h-5 w-5" /> Agende Seu Horário
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-autolux-white hover:bg-white/20 font-medium px-8 py-6 text-lg" onClick={scrollToServices}>
              Conheça Nossos Serviços
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-autolux-white to-transparent z-20"></div>
    </section>
  );
};

export default HeroSection;
