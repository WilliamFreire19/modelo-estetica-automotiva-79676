
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, MapPin, MessageSquare, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { galleryServices } from './GallerySection';

interface FormData {
  name: string;
  carModel: string;
  services: string[];
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    carModel: '',
    services: [],
  });

  // Listen for URL hash changes to handle direct navigation from gallery
  useEffect(() => {
    // Check if we have a service parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        services: [serviceParam]
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.carModel || formData.services.length === 0) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    // Get service names
    const serviceNames = formData.services
      .map(serviceId => galleryServices.find(s => s.id === serviceId)?.name)
      .filter(Boolean)
      .join(', ');
    
    // Create WhatsApp URL with form data
    const message = `Olá! Meu nome é ${formData.name}. Gostaria de um orçamento para meu ${formData.carModel} para os serviços de: ${serviceNames}.`;
    const whatsappURL = `https://wa.me/5591984494962?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp with pre-filled message
    window.open(whatsappURL, '_blank');
    
    // Success message
    toast.success('Seu orçamento foi solicitado com sucesso!', {
      description: 'Um especialista entrará em contato em breve.'
    });
    
    // Reset form
    setFormData({
      name: '',
      carModel: '',
      services: [],
    });
  };

  return (
    <section id="contato" className="section bg-gradient-to-b from-autolux-black to-[#1a1a1a]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 reveal-on-scroll">
            Entre em <span className="text-autolux-red">Contato</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 reveal-on-scroll">
            Solicite um orçamento ou tire suas dúvidas com nossa equipe especializada.
          </p>
          <div className="w-24 h-1 bg-autolux-red mx-auto mt-4 reveal-on-scroll"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="reveal-on-scroll">
            <div className="bg-[#1a1a1a] border border-autolux-gray/20 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Solicite um Orçamento</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-autolux-black border border-autolux-gray/30 rounded-md focus:outline-none focus:ring-2 focus:ring-autolux-red/50 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="carModel" className="block text-sm font-medium mb-1">
                      Modelo do Veículo
                    </label>
                    <input
                      type="text"
                      id="carModel"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-autolux-black border border-autolux-gray/30 rounded-md focus:outline-none focus:ring-2 focus:ring-autolux-red/50 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Serviços Desejados
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                      {galleryServices.map((service) => (
                        <label 
                          key={service.id} 
                          className={`
                            relative flex items-center justify-center p-4 rounded-lg cursor-pointer
                            transition-all duration-300 border-2
                            ${formData.services.includes(service.id) 
                              ? 'bg-autolux-red/10 border-autolux-red shadow-lg shadow-autolux-red/20' 
                              : 'bg-[#0a0a0a] border-autolux-gray/20 hover:border-autolux-red/50 hover:bg-autolux-red/5'
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service.id)}
                            onChange={() => handleServiceChange(service.id)}
                            className="sr-only"
                          />
                          <span className={`text-sm font-medium text-center ${formData.services.includes(service.id) ? 'text-autolux-red' : 'text-gray-300'}`}>
                            {service.name}
                          </span>
                          {formData.services.includes(service.id) && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-autolux-red rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full red-gradient hover:opacity-90 text-white font-medium py-6 shadow-[0_4px_12px_rgba(217,4,41,0.3)] flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="h-5 w-5" />
                      Solicitar Orçamento
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="reveal-on-scroll">
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-autolux-red mr-4 mt-1" />
                  <div>
                    <p className="font-bold">Telefone</p>
                    <a href="tel:+5591984494962" className="text-gray-300 hover:text-autolux-red transition-colors">
                      (91) 98449-4962
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-autolux-red mr-4 mt-1" />
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <a href="https://wa.me/5591984494962" className="text-gray-300 hover:text-autolux-red transition-colors">
                      (91) 98449-4962
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-autolux-red mr-4 mt-1" />
                  <div>
                    <p className="font-bold">Endereço</p>
                    <address className="text-gray-300 not-italic">
                      Av. Paulista, 1578<br />
                      Bela Vista, São Paulo - SP<br />
                      CEP: 01310-200
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-[300px] rounded-lg overflow-hidden border border-autolux-gray/20 shadow-lg">
                <iframe 
                  title="Mapa de localização"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.138726210514!2d-46.6584324!3d-23.5617301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201578%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1spt-BR!2sbr!4v1712613514945!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <Button
                onClick={() => window.open('https://waze.com/ul?ll=-23.5617301,-46.6584324&navigate=yes', '_blank')}
                className="w-full bg-[#33CCFF] hover:bg-[#2AB8E6] text-white font-medium py-3 flex items-center justify-center gap-2"
              >
                <Navigation className="h-5 w-5" />
                Traçar Rota com Waze
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
