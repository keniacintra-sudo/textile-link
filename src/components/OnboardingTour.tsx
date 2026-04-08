import { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles, Package, Search, ShoppingBag, MessageCircle, Leaf, BarChart3, Bell, RefreshCw } from 'lucide-react';

interface TourStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface OnboardingTourProps {
  userType: 'marca' | 'faccao' | 'artesao';
}

const stepHeader: TourStep = {
  icon: (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
        <Bell size={16} className="text-accent" />
      </div>
      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
        <Leaf size={16} className="text-accent" />
      </div>
      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
        <BarChart3 size={16} className="text-accent" />
      </div>
      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
        <RefreshCw size={16} className="text-accent" />
      </div>
    </div>
  ),
  title: 'Botões do topo',
  description:
    '🔔 Notificações de propostas e mensagens  •  🌿 Relatório de impacto ambiental  •  📊 Dashboard com gráficos  •  🔄 Trocar de perfil (Marca, Facção ou Artesão)',
  highlight: 'Todos os atalhos importantes ficam aqui',
};

const tourSteps: Record<string, TourStep[]> = {
  marca: [
    {
      icon: <Package size={28} className="text-accent" />,
      title: 'Seus pedidos de produção',
      description:
        'Aqui ficam todos os seus pedidos. Toque em qualquer um para ver detalhes, propostas recebidas e o andamento da produção.',
      highlight: 'Toque nos cards para explorar',
    },
    {
      icon: <Sparkles size={28} className="text-accent" />,
      title: 'IA sugere as melhores facções',
      description:
        'Dentro de cada pedido, o botão verde usa inteligência artificial para recomendar as facções mais adequadas para o seu produto.',
      highlight: 'Procure o botão verde "Sugerir facções"',
    },
    {
      icon: <MessageCircle size={28} className="text-accent" />,
      title: 'Propostas e mensagens',
      description:
        'Use as abas na barra inferior para ver propostas recebidas das facções, gerenciar resíduos têxteis e conversar diretamente com seus parceiros.',
      highlight: 'Explore as abas no rodapé',
    },
    stepHeader,
  ],
  faccao: [
    {
      icon: <Search size={28} className="text-accent" />,
      title: 'Oportunidades de produção',
      description:
        'Esta aba mostra pedidos de marcas que estão buscando facções. Analise cada pedido e envie sua proposta com preço e prazo.',
      highlight: 'Toque em "Enviar Proposta" para participar',
    },
    {
      icon: <Package size={28} className="text-accent" />,
      title: 'Acompanhe suas propostas',
      description:
        'Na aba "Propostas" você vê o status de cada proposta enviada — se foi aceita, recusada ou ainda está em análise pela marca.',
      highlight: 'Fique de olho nas atualizações',
    },
    {
      icon: <ShoppingBag size={28} className="text-accent" />,
      title: 'Gerencie seus resíduos',
      description:
        'Na aba "Resíduos" você pode registrar sobras de tecido e vendê-las para artesãos. Isso gera renda extra e reduz desperdício.',
      highlight: 'Registre seus resíduos têxteis',
    },
    stepHeader,
  ],
  artesao: [
    {
      icon: <ShoppingBag size={28} className="text-accent" />,
      title: 'Marketplace de resíduos',
      description:
        'Aqui você encontra resíduos têxteis de marcas e facções disponíveis para compra. Use a busca ou os filtros para encontrar o material ideal.',
      highlight: 'Toque em qualquer item para ver detalhes e opções',
    },
    {
      icon: <Search size={28} className="text-accent" />,
      title: 'Busca e filtros',
      description:
        'Use a barra de busca para encontrar materiais por nome, cidade ou vendedor. Os chips coloridos filtram por tipo de tecido.',
      highlight: 'Experimente buscar "algodão" ou "jeans"',
    },
    {
      icon: <MessageCircle size={28} className="text-accent" />,
      title: 'Solicite e negocie',
      description:
        'Ao tocar num material, você pode solicitar o lote, enviar mensagem ao vendedor ou favoritar para ver depois.',
      highlight: 'Toque num item e use os botões de ação',
    },
    stepHeader,
  ],
};

const STORAGE_KEY = 'elo_tour_visto';

const OnboardingTour = ({ userType }: OnboardingTourProps) => {
  const [visivel, setVisivel] = useState(false);
  const [step, setStep] = useState(0);
  const [saindo, setSaindo] = useState(false);
  const steps = tourSteps[userType] || tourSteps.marca;

  useEffect(() => {
    const vistos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!vistos[userType]) {
      const t = setTimeout(() => setVisivel(true), 800);
      return () => clearTimeout(t);
    }
  }, [userType]);

  const fechar = () => {
    setSaindo(true);
    setTimeout(() => {
      const vistos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      vistos[userType] = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vistos));
      setVisivel(false);
      setSaindo(false);
    }, 300);
  };

  const avancar = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      fechar();
    }
  };

  if (!visivel) return null;

  const atual = steps[step];
  const isUltimo = step === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center"
      style={{ opacity: saindo ? 0 : 1, transition: 'opacity 0.3s ease' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        style={{ backdropFilter: 'blur(2px)' }}
        onClick={fechar}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-[460px] bg-background rounded-t-3xl px-5 pt-6 pb-8"
        style={{
          animation: saindo ? 'none' : 'slide-up 0.4s ease-out forwards',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Fechar */}
        <button
          onClick={fechar}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <X size={15} className="text-muted-foreground" />
        </button>

        {/* Barra de progresso */}
        <div className="flex gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                flex: i === step ? 2 : 1,
                background: i <= step ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
              }}
            />
          ))}
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col items-center text-center animate-fade-in" key={step}>
          {/* Ícone */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: 'hsl(160 84% 39% / 0.1)',
              border: '1px solid hsl(160 84% 39% / 0.2)',
            }}
          >
            {atual.icon}
          </div>

          <h2 className="font-sans font-extrabold text-[19px] text-foreground tracking-tight mb-2">
            {atual.title}
          </h2>

          <p className="font-sans text-[13.5px] text-muted-foreground leading-relaxed max-w-[300px]">
            {atual.description}
          </p>

          {atual.highlight && (
            <div
              className="flex items-center gap-2 mt-4 px-4 py-2.5 rounded-full"
              style={{
                background: 'hsl(160 84% 39% / 0.08)',
                border: '1px solid hsl(160 84% 39% / 0.18)',
              }}
            >
              <Sparkles size={12} className="text-accent shrink-0" />
              <p className="font-sans text-[12px] font-semibold text-accent">{atual.highlight}</p>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex gap-3 mt-6">
          {!isUltimo && (
            <button
              onClick={fechar}
              className="flex-1 h-12 rounded-2xl font-sans font-semibold text-[14px] text-muted-foreground bg-muted hover:bg-secondary transition-colors active:scale-[0.97]"
            >
              Pular
            </button>
          )}
          <button
            onClick={avancar}
            className="flex items-center justify-center gap-2 h-12 rounded-2xl font-sans font-bold text-[14px] text-white active:scale-[0.97] transition-transform"
            style={{
              flex: isUltimo ? 1 : 2,
              background: 'linear-gradient(135deg, hsl(160 84% 39%), hsl(160 55% 28%))',
              boxShadow: '0 4px 14px hsl(160 84% 39% / 0.3)',
            }}
          >
            {isUltimo ? 'Começar a usar' : (<>Próximo <ArrowRight size={16} /></>)}
          </button>
        </div>

        <p className="font-sans text-[11px] text-muted-foreground text-center mt-3">
          {step + 1} de {steps.length}
        </p>
      </div>
    </div>
  );
};

export default OnboardingTour;
