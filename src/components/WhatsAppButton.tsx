import React from 'react';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5554984217365?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20na%20Vip%20Lava%20Car."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white/40"
      aria-label="Entre em contato pelo WhatsApp"
    >
      <MessageSquare size={28} />
    </a>
  );
};

export default WhatsAppButton;
