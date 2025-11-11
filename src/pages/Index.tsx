
import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { setupAnimations } from '../utils/animations';

const Index = () => {
  useEffect(() => {
    // Set up scroll animations
    const cleanup = setupAnimations();
    
    // Clean up the observers when component unmounts
    return cleanup;
    
    // Add metadata for better SEO
    document.title = "Fernando Auto Pintura | Funilaria e Pintura Automotiva Criciúma - SC";
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <div className="py-16 section-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-fernando-white">
            Por que escolher a <span className="text-primary">Fernando Auto Pintura</span>?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-white p-8 hover:scale-105 transition-transform duration-300">
              <div className="mb-4">
                <img 
                  src="https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22325.jpg" 
                  alt="Serviço Completo" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Excelência Técnica</h3>
              <p className="text-gray-700">Funilaria e pintura com qualificação e experiência para veículos modernos e clássicos.</p>
            </div>
            
            <div className="card-white p-8 hover:scale-105 transition-transform duration-300">
              <div className="mb-4">
                <img 
                  src="https://img.freepik.com/premium-photo/wash-service-hand-car-vehicle-garage-cleaning-auto-maintenance-transportation-automobile-detailing-care_163305-256240.jpg" 
                  alt="Gyeon Official" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Gyeon Official</h3>
              <p className="text-gray-700">Vitrificação e produtos premium Gyeon para máxima proteção e durabilidade.</p>
            </div>
            
            <div className="card-white p-8 hover:scale-105 transition-transform duration-300">
              <div className="mb-4">
                <img 
                  src="https://img.freepik.com/free-photo/happy-black-car-repairman-young-businessman-handshaking-auto-repair-shop_637285-4249.jpg" 
                  alt="Tradição Local" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Tradição em Criciúma</h3>
              <p className="text-gray-700">Paixão pela arte automotiva com preservação da originalidade do seu veículo.</p>
            </div>
          </div>
        </div>
      </div>
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
