
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Phone, Instagram, Facebook, MessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-autolux-black/90 bg-blur py-2 shadow-lg' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <a href="#home" className="h-12 md:h-16">
            <img 
              src="/lovable-uploads/26c0aac2-694c-48ba-8532-4d4ff68af2dc.png" 
              alt="Auto Detailing Logo" 
              className="h-full"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-white hover:text-autolux-red transition-colors font-montserrat font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex space-x-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
               className="text-white hover:text-autolux-red transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
               className="text-white hover:text-autolux-red transition-colors">
              <Facebook size={20} />
            </a>
          </div>
          <Button 
            className="red-gradient text-white shadow-lg hover:opacity-90"
            size="sm"
            onClick={scrollToContact}
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Agende Agora
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-autolux-black/95 absolute top-full left-0 right-0 py-4 px-4 shadow-lg backdrop-blur-md animate-slide-in-right">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-white hover:text-autolux-red transition-colors font-montserrat font-medium py-2 border-b border-gray-800"
              >
                {link.name}
              </a>
            ))}
            <div className="flex justify-between mt-4 pt-4">
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="text-white hover:text-autolux-red transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="text-white hover:text-autolux-red transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="tel:+5591984494962" className="text-white hover:text-autolux-red transition-colors">
                  <Phone size={24} />
                </a>
              </div>
              <Button 
                className="red-gradient text-white shadow-md hover:opacity-90"
                size="sm"
                onClick={scrollToContact}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Agende
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
