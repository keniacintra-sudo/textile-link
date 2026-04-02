import { useNavigate } from 'react-router-dom';
import { Scissors, Shirt, Palette, ChevronRight, Search, Sparkles, Handshake, TrendingUp, Layers, Ruler, PenTool, Zap, Shield, Globe } from 'lucide-react';

const roles = [
  { icon: Shirt, title: 'Sou uma Marca', description: 'Crie pedidos e encontre produção', path: '/marca', delay: 100 },
  { icon: Scissors, title: 'Sou uma Facção', description: 'Receba pedidos e aumente sua produção', path: '/faccao', delay: 200 },
  { icon: Palette, title: 'Sou um Artesão', description: 'Venda materiais e conecte-se com marcas', path: '/artesao', delay: 300 },
];

const categories = [
  { icon: Layers, label: 'Malharia' },
  { icon: Ruler, label: 'Jeans' },
  { icon: PenTool, label: 'Alfaiataria' },
  { icon: Scissors, label: 'Corte' },
];

const steps = [
  { icon: Sparkles, title: 'Encontre', description: 'Crie ou encontre oportunidades na cadeia têxtil', delay: 400 },
  { icon: Handshake, title: 'Conecte', description: 'Conecte-se com parceiros qualificados', delay: 500 },
  { icon: TrendingUp, title: 'Cresça', description: 'Produza com eficiência e cresça junto', delay: 600 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-background" style={{ minHeight: '100dvh' }}>
      {/* Hero with navy gradient */}
      <div
        className="shrink-0 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 18%), hsl(217 33% 22%))',
          padding: '40px 20px 36px',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.06]" style={{ background: 'hsl(160 84% 39%)' }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-[0.04]" style={{ background: 'hsl(160 84% 39%)' }} />

        {/* Brand */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(160 84% 39%)' }}>
            <Zap size={16} className="text-accent-foreground" />
          </div>
          <span className="font-sans font-bold text-[15px] tracking-tight" style={{ color: 'hsl(210 40% 98%)' }}>
            ELO Moda
          </span>
        </div>

        {/* Hero text */}
        <h1
          className="font-sans animate-fade-in"
          style={{
            fontSize: 24,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            color: 'hsl(210 40% 98%)',
            maxWidth: 320,
          }}
        >
          A Conexão Inteligente para a Cadeia Produtiva da Moda
        </h1>
        <p
          className="font-sans animate-fade-in"
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            marginTop: 10,
            color: 'hsl(215 20% 70%)',
            maxWidth: 300,
          }}
        >
          Marcas, facções e artesãos em um só lugar
        </p>

        {/* Search bar */}
        <div
          className="animate-slide-up mt-6 flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-xl border"
          style={{
            padding: '10px 14px',
            borderColor: 'hsla(210, 40%, 98%, 0.12)',
          }}
        >
          <Search size={16} style={{ color: 'hsl(215 20% 60%)' }} />
          <span className="font-sans text-[13px]" style={{ color: 'hsl(215 20% 55%)' }}>
            Buscar facções, serviços, materiais...
          </span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide" style={{ padding: '16px 20px 8px' }}>
        {categories.map((cat) => (
          <button
            key={cat.label}
            className="chip flex items-center gap-1.5 shrink-0 hover:border-accent/40 transition-colors"
          >
            <cat.icon size={14} className="text-accent" />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Role cards */}
      <div className="flex flex-col" style={{ padding: '12px 16px 0', gap: 10 }}>
        <p className="font-sans text-muted-foreground" style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', paddingLeft: 4, marginBottom: 2 }}>
          Escolha seu perfil
        </p>
        {roles.map((role) => (
          <button
            key={role.path}
            onClick={() => navigate(role.path)}
            className="card-elevated animate-slide-up active:scale-[0.97] transition-all duration-150 text-left cursor-pointer"
            style={{
              padding: '16px',
              display: 'flex', alignItems: 'center', gap: 14,
              animationDelay: `${role.delay}ms`, animationFillMode: 'both',
            }}
          >
            <div className="shrink-0 flex items-center justify-center w-11 h-11 bg-accent/10 rounded-xl">
              <role.icon size={20} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans font-semibold text-[14px] text-foreground leading-snug">{role.title}</p>
              <p className="font-sans text-[12px] text-muted-foreground mt-0.5">{role.description}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
          </button>
        ))}
      </div>

      {/* How it works */}
      <div style={{ padding: '28px 16px 0' }}>
        <p className="font-sans text-foreground" style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', paddingLeft: 4, marginBottom: 14 }}>
          Como funciona
        </p>
        <div className="flex gap-2.5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="card-elevated flex-1 flex flex-col items-center text-center animate-slide-up"
              style={{ padding: '18px 6px 14px', animationDelay: `${step.delay}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-xl mb-2.5">
                <step.icon size={18} className="text-accent" />
              </div>
              <p className="font-sans font-bold text-[13px] text-foreground">{step.title}</p>
              <p className="font-sans text-[11px] text-muted-foreground mt-1 leading-snug">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 16%))', padding: '20px' }}>
        <div className="flex justify-around text-center">
          {[
            { value: '500+', label: 'Conexões' },
            { value: '120+', label: 'Facções' },
            { value: '98%', label: 'Satisfação' },
          ].map((stat) => (
            <div key={stat.label} className="animate-fade-in">
              <p className="font-sans font-extrabold text-[22px]" style={{ color: 'hsl(160 84% 50%)' }}>{stat.value}</p>
              <p className="font-sans text-[11px] mt-0.5" style={{ color: 'hsl(215 20% 65%)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 flex flex-col items-center" style={{ padding: '24px 16px 12px' }}>
        <button
          onClick={() => navigate('/marca')}
          className="btn-primary w-full animate-fade-in"
          style={{ animationDelay: '700ms', animationFillMode: 'both', fontSize: 15, padding: '14px 28px' }}
        >
          Começar agora
        </button>
        <button
          onClick={() => navigate('/marca')}
          className="font-sans text-[13px] text-muted-foreground mt-3 active:scale-[0.97] transition-transform"
        >
          Explorar plataforma →
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-border" style={{ padding: '20px 20px 24px', marginTop: 8 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-primary">
              <Zap size={12} className="text-primary-foreground" />
            </div>
            <span className="font-sans font-bold text-[13px] text-foreground">ELO Moda</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-muted-foreground" />
            <Shield size={16} className="text-muted-foreground" />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Plataforma</span>
            <span className="font-sans text-[12px] text-foreground/70">Para Marcas</span>
            <span className="font-sans text-[12px] text-foreground/70">Para Facções</span>
            <span className="font-sans text-[12px] text-foreground/70">Para Artesãos</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sobre</span>
            <span className="font-sans text-[12px] text-foreground/70">Como funciona</span>
            <span className="font-sans text-[12px] text-foreground/70">Impacto</span>
            <span className="font-sans text-[12px] text-foreground/70">Contato</span>
          </div>
        </div>
        <p className="font-sans text-[11px] text-muted-foreground mt-4">
          © 2026 ELO Moda. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
