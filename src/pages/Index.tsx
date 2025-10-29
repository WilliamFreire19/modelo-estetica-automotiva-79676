
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
    document.title = "Auto Detailing | Estética Automotiva Premium";
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <div className="py-16 section-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-autolux-white">
            Por que escolher a <span className="text-autolux-red">Auto Detailing</span>?
          </h2>
          <div className="w-24 h-1 bg-autolux-red mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-white p-8 hover:scale-105 transition-transform duration-300">
              <div className="mb-4">
                <img 
                  src="https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22325.jpg" 
                  alt="Profissionais Qualificados" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Profissionais Qualificados</h3>
              <p className="text-gray-700">Nossa equipe possui certificação internacional em estética automotiva de alto padrão.</p>
            </div>
            
            <div className="card-white p-8 hover:scale-105 transition-transform duration-300">
              <div className="mb-4">
                <img 
                  src="https://img.freepik.com/premium-photo/wash-service-hand-car-vehicle-garage-cleaning-auto-maintenance-transportation-automobile-detailing-care_163305-256240.jpg" 
                  alt="Produtos Premium" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Produtos Premium</h3>
              <p className="text-gray-700">Utilizamos apenas produtos importados de primeira linha para o cuidado do seu veículo.</p>
            </div>
            
            <div className="card-white p-8 hover:scale-105 transition-transform duration-300">
              <div className="mb-4">
                <img 
                  src="https://img.freepik.com/free-photo/happy-black-car-repairman-young-businessman-handshaking-auto-repair-shop_637285-4249.jpg" 
                  alt="Satisfação Garantida" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Satisfação Garantida</h3>
              <p className="text-gray-700">Oferecemos garantia em todos os nossos serviços para sua total tranquilidade.</p>
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
