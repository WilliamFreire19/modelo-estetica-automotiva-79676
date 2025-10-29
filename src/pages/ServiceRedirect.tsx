
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ServiceRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    
    // Redirect to home with hash for contact section
    setTimeout(() => {
      navigate(`/#contato`, { state: { selectedService: service } });
    }, 100);
    
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-autolux-black">
      <div className="text-center">
        <Loader2 size={48} className="mx-auto animate-spin text-autolux-red mb-4" />
        <h2 className="text-2xl font-bold text-autolux-white">Redirecionando para o formulário...</h2>
      </div>
    </div>
  );
};

export default ServiceRedirect;
