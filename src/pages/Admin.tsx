import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { BarChart2, Image, Settings, Users, Video, MessageSquare, X } from 'lucide-react';

const Admin = () => {
  // Track visits (mock data for demonstration)
  const [visitStats, setVisitStats] = useState({
    totalVisits: 1245,
    todayVisits: 34,
    weekVisits: 187,
    monthVisits: 752,
    contactClicks: 89,
    whatsappClicks: 112,
  });

  // Site settings
  const [settings, setSettings] = useState({
    companyName: 'Auto Detailing',
    heroTitle: 'Transforme Seu Carro. Valorize Seu Estilo.',
    heroSubtitle: 'Especialistas em Estética Automotiva de Alto Padrão em São Paulo.',
    phone: '(91) 98449-4962',
    address: 'Av. Paulista, 1578, Bela Vista, São Paulo - SP',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-high-end-sports-car-in-a-studio-49879-large.mp4',
  });

  // Mock login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Visitor logs (mock data)
  const recentVisitors = [
    { id: 1, time: '14:23', page: 'Home', ip: '192.168.1.1', device: 'Mobile', action: 'View' },
    { id: 2, time: '14:15', page: 'Serviços', ip: '192.168.1.2', device: 'Desktop', action: 'WhatsApp Click' },
    { id: 3, time: '13:58', page: 'Galeria', ip: '192.168.1.3', device: 'Tablet', action: 'View' },
    { id: 4, time: '13:45', page: 'Contato', ip: '192.168.1.4', device: 'Mobile', action: 'Form Submit' },
    { id: 5, time: '13:30', page: 'Home', ip: '192.168.1.5', device: 'Desktop', action: 'View' },
  ];

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      toast.success('Login realizado com sucesso!');
    } else {
      toast.error('Credenciais inválidas');
    }
  };

  // Handle settings update
  const handleSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configurações atualizadas com sucesso!');
  };

  // Handle image upload (mock)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      toast.success(`${type} atualizado com sucesso!`);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-autolux-black to-[#1a1a1a] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-[#1a1a1a] border-autolux-gray/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Painel Administrativo</CardTitle>
            <CardDescription className="text-gray-400">
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-200">
                  Usuário
                </label>
                <Input
                  id="username"
                  placeholder="Seu nome de usuário"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="bg-autolux-black border-autolux-gray/30 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-200">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-autolux-black border-autolux-gray/30 text-white"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full red-gradient hover:opacity-90 text-white font-medium"
              >
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-autolux-black to-[#1a1a1a]">
      <div className="container mx-auto p-4">
        <header className="py-6 flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie seu site Auto Detailing</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="border-autolux-red text-autolux-red hover:bg-autolux-red hover:text-white"
              onClick={() => {
                setIsLoggedIn(false);
                toast.info('Sessão encerrada');
              }}
            >
              Sair
            </Button>
          </div>
        </header>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="bg-[#1a1a1a] border border-autolux-gray/20 w-full md:w-auto flex flex-wrap md:inline-flex h-auto p-1">
            <TabsTrigger className="data-[state=active]:bg-autolux-red data-[state=active]:text-white flex items-center gap-2" value="dashboard">
              <BarChart2 className="h-4 w-4" /> Painel
            </TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-autolux-red data-[state=active]:text-white flex items-center gap-2" value="settings">
              <Settings className="h-4 w-4" /> Configurações
            </TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-autolux-red data-[state=active]:text-white flex items-center gap-2" value="media">
              <Image className="h-4 w-4" /> Mídia
            </TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-autolux-red data-[state=active]:text-white flex items-center gap-2" value="visitors">
              <Users className="h-4 w-4" /> Visitantes
            </TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-autolux-red data-[state=active]:text-white flex items-center gap-2" value="messages">
              <MessageSquare className="h-4 w-4" /> Mensagens
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stats Cards */}
              <Card className="bg-[#1a1a1a] border-autolux-gray/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Visitas Totais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{visitStats.totalVisits}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1a1a] border-autolux-gray/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Visitas Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{visitStats.todayVisits}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1a1a] border-autolux-gray/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Cliques no Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{visitStats.contactClicks}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a1a1a] border-autolux-gray/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Cliques no WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{visitStats.whatsappClicks}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-[#1a1a1a] border-autolux-gray/20">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription className="text-gray-400">Últimas interações dos visitantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-autolux-gray/20">
                        <th className="pb-2 pt-1 font-medium text-gray-400">Horário</th>
                        <th className="pb-2 pt-1 font-medium text-gray-400">Página</th>
                        <th className="pb-2 pt-1 font-medium text-gray-400">Dispositivo</th>
                        <th className="pb-2 pt-1 font-medium text-gray-400">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentVisitors.map((visitor) => (
                        <tr key={visitor.id} className="border-b border-autolux-gray/10">
                          <td className="py-2 text-gray-300">{visitor.time}</td>
                          <td className="py-2 text-gray-300">{visitor.page}</td>
                          <td className="py-2 text-gray-300">{visitor.device}</td>
                          <td className="py-2 text-gray-300">{visitor.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab Content */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-[#1a1a1a] border-autolux-gray/20">
              <CardHeader>
                <CardTitle>Configurações do Site</CardTitle>
                <CardDescription className="text-gray-400">
                  Atualize as informações principais do seu site
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSettingsUpdate}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Nome da Empresa</label>
                    <Input
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="bg-autolux-black border-autolux-gray/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Título Principal (Hero)</label>
                    <Input
                      value={settings.heroTitle}
                      onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                      className="bg-autolux-black border-autolux-gray/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Subtítulo Principal</label>
                    <Input
                      value={settings.heroSubtitle}
                      onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                      className="bg-autolux-black border-autolux-gray/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Telefone para Contato</label>
                    <Input
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="bg-autolux-black border-autolux-gray/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Endereço</label>
                    <Textarea
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="bg-autolux-black border-autolux-gray/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">URL do Vídeo do Hero</label>
                    <Input
                      value={settings.videoUrl}
                      onChange={(e) => setSettings({ ...settings, videoUrl: e.target.value })}
                      className="bg-autolux-black border-autolux-gray/30 text-white"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit"
                    className="red-gradient hover:opacity-90 text-white font-medium"
                  >
                    Salvar Alterações
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Media Tab Content */}
          <TabsContent value="media" className="space-y-4">
            <Card className="bg-[#1a1a1a] border-autolux-gray/20">
              <CardHeader>
                <CardTitle>Gerenciador de Mídia</CardTitle>
                <CardDescription className="text-gray-400">
                  Atualize imagens e vídeos do site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Update */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">Logo da Empresa</h3>
                  <div className="bg-autolux-black/50 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="h-16 w-32 bg-autolux-black flex items-center justify-center rounded border border-autolux-gray/20">
                      <img 
                        src="/lovable-uploads/09d0c67c-5340-46ea-b082-9ad49f347947.png" 
                        alt="Logo atual" 
                        className="h-full object-contain" 
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'Logo')}
                        className="bg-autolux-black border-autolux-gray/30 text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Recomendado: PNG transparente, 240x80px
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hero Video Update */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">Vídeo do Hero</h3>
                  <div className="bg-autolux-black/50 p-4 rounded-lg flex flex-col sm:flex-row items-start gap-4">
                    <div className="h-24 w-40 bg-autolux-black flex items-center justify-center rounded border border-autolux-gray/20 overflow-hidden">
                      <Video className="h-8 w-8 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="file" 
                        accept="video/*"
                        onChange={(e) => handleImageUpload(e, 'Vídeo do Hero')}
                        className="bg-autolux-black border-autolux-gray/30 text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Recomendado: MP4, resolução HD ou superior, max 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">Imagens da Galeria</h3>
                  <div className="bg-autolux-black/50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div 
                          key={item} 
                          className="aspect-square bg-autolux-black flex items-center justify-center rounded border border-autolux-gray/20 relative group"
                        >
                          <Image className="h-8 w-8 text-gray-500" />
                          <button className="absolute inset-0 bg-autolux-red/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="h-6 w-6 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e, 'Galeria')}
                      className="bg-autolux-black border-autolux-gray/30 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Adicione múltiplas imagens para a galeria. Recomendado: JPEG/PNG, proporção 16:9
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="red-gradient hover:opacity-90 text-white font-medium">
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Visitors Tab Content */}
          <TabsContent value="visitors">
            <Card className="bg-[#1a1a1a] border-autolux-gray/20">
              <CardHeader>
                <CardTitle>Analytics de Visitantes</CardTitle>
                <CardDescription className="text-gray-400">
                  Dados de tráfego e interação com o site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Weekly stats graph placeholder */}
                  <div className="h-64 bg-autolux-black/50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de visitantes por dia (últimos 7 dias)</p>
                  </div>

                  {/* Traffic sources */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Origem do Tráfego</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Google</span>
                        <span className="text-gray-300">62%</span>
                      </div>
                      <div className="w-full bg-autolux-black rounded-full h-2">
                        <div className="bg-autolux-red h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Direto</span>
                        <span className="text-gray-300">23%</span>
                      </div>
                      <div className="w-full bg-autolux-black rounded-full h-2">
                        <div className="bg-autolux-red h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Redes Sociais</span>
                        <span className="text-gray-300">15%</span>
                      </div>
                      <div className="w-full bg-autolux-black rounded-full h-2">
                        <div className="bg-autolux-red h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent visitors table */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Visitantes Recentes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left border-b border-autolux-gray/20">
                            <th className="pb-2 pt-1 font-medium text-gray-400">Horário</th>
                            <th className="pb-2 pt-1 font-medium text-gray-400">Página</th>
                            <th className="pb-2 pt-1 font-medium text-gray-400">IP</th>
                            <th className="pb-2 pt-1 font-medium text-gray-400">Dispositivo</th>
                            <th className="pb-2 pt-1 font-medium text-gray-400">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentVisitors.map((visitor) => (
                            <tr key={visitor.id} className="border-b border-autolux-gray/10">
                              <td className="py-2 text-gray-300">{visitor.time}</td>
                              <td className="py-2 text-gray-300">{visitor.page}</td>
                              <td className="py-2 text-gray-300">{visitor.ip}</td>
                              <td className="py-2 text-gray-300">{visitor.device}</td>
                              <td className="py-2 text-gray-300">{visitor.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab Content */}
          <TabsContent value="messages">
            <Card className="bg-[#1a1a1a] border-autolux-gray/20">
              <CardHeader>
                <CardTitle>Mensagens de Contato</CardTitle>
                <CardDescription className="text-gray-400">
                  Solicitações de orçamento e mensagens recebidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Message cards */}
                  {[1, 2, 3].map((index) => (
                    <Card key={index} className="bg-autolux-black border-autolux-gray/20">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-medium text-white">
                            João Silva {index}
                          </CardTitle>
                          <span className="text-xs text-gray-400">Hoje, 15:3{index}</span>
                        </div>
                        <CardDescription className="text-gray-400">
                          Veículo: BMW X5 • Serviço: Polimento Técnico
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm text-gray-300">
                          Gostaria de agendar um polimento técnico para meu veículo. 
                          Podem me enviar um orçamento detalhado e disponibilidade?
                        </p>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-between">
                        <span className="text-xs text-gray-400">Tel: (91) 9876-543{index}</span>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-autolux-red text-autolux-red hover:bg-autolux-red hover:text-white"
                          onClick={() => {
                            window.open(`https://wa.me/5591987654${index}`, '_blank');
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Responder
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

                  {/* Empty state */}
                  <div className="text-center py-8">
                    <p className="text-gray-400">Não há mais mensagens para exibir.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
