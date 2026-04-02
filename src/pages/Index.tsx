import { useNavigate } from 'react-router-dom';
import { Scissors, Shirt, Palette, ChevronRight, Sparkles, Handshake, TrendingUp, Zap, Shield, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-fashion.png';

const roleColors = [
  { bg: 'hsl(160 84% 39% / 0.08)', border: 'hsl(160 84% 39% / 0.18)', iconBg: 'hsl(160 84% 39% / 0.15)' },
  { bg: 'hsl(217 91% 60% / 0.06)', border: 'hsl(217 91% 60% / 0.15)', iconBg: 'hsl(217 91% 60% / 0.12)' },
  { bg: 'hsl(43 96% 56% / 0.06)', border: 'hsl(43 96% 56% / 0.15)', iconBg: 'hsl(43 96% 56% / 0.12)' },
];

const roleIconColors = ['hsl(160 84% 39%)', 'hsl(217 91% 60%)', 'hsl(43 96% 56%)'];

const roles = [
  { icon: Shirt, title: 'Sou uma Marca', description: 'Crie pedidos e encontre produção', path: '/marca', delay: 100 },
  { icon: Scissors, title: 'Sou uma Facção', description: 'Receba pedidos e aumente sua produção', path: '/faccao', delay: 200 },
  { icon: Palette, title: 'Sou um Artesão', description: 'Venda materiais e conecte-se com marcas', path: '/artesao', delay: 300 },
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
      {/* ── Hero ── */}
      <div
        className="shrink-0 relative overflow-hidden flex flex-col items-center text-center"
        style={{
          background: 'linear-gradient(160deg, hsl(222 84% 11%) 0%, hsl(222 47% 16%) 50%, hsl(217 33% 22%) 100%)',
          padding: '48px 24px 0',
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-[0.07] blur-2xl" style={{ background: 'hsl(160 84% 50%)' }} />
        <div className="absolute bottom-12 -left-12 w-36 h-36 rounded-full opacity-[0.05] blur-2xl" style={{ background: 'hsl(217 91% 60%)' }} />

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-7 animate-fade-in">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, hsl(160 84% 39%), hsl(160 60% 45%))' }}
          >
            <Zap size={20} className="text-accent-foreground" />
          </div>
          <span className="font-sans font-extrabold text-[18px] tracking-tight" style={{ color: 'hsl(210 40% 98%)' }}>
            ELO Moda
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-sans animate-fade-in"
          style={{
            fontSize: 30,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            color: 'hsl(210 40% 98%)',
            maxWidth: 320,
          }}
        >
          A Conexão Inteligente para a Cadeia Produtiva da Moda
        </h1>

        <p
          className="font-sans animate-fade-in"
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            marginTop: 14,
            color: 'hsl(215 20% 72%)',
            maxWidth: 280,
            fontWeight: 400,
          }}
        >
          Marcas, facções e artesãos em um só lugar
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('/marca')}
          className="btn-primary animate-fade-in mt-7 relative z-10"
          style={{ animationDelay: '250ms', animationFillMode: 'both', fontSize: 15, padding: '14px 36px', letterSpacing: '-0.01em' }}
        >
          Começar agora
        </button>

        {/* Hero illustration */}
        <img
          src={heroImage}
          alt="Tecidos entrelaçados representando conexão têxtil"
          width={640}
          height={512}
          className="animate-fade-in mt-6 w-[85%] max-w-[320px] h-auto object-contain relative z-0 pointer-events-none select-none"
          style={{ animationDelay: '400ms', animationFillMode: 'both', opacity: 0.85 }}
        />
      </div>

      {/* ── Role Cards ── */}
      <div className="flex flex-col px-5 pt-7 pb-1 gap-3">
        <p className="font-sans text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase pl-1 mb-0.5">
          Escolha seu perfil
        </p>
        {roles.map((role, i) => (
          <button
            key={role.path}
            onClick={() => navigate(role.path)}
            className="animate-slide-up active:scale-[0.97] transition-all duration-200 text-left cursor-pointer group"
            style={{
              padding: '18px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              animationDelay: `${role.delay}ms`,
              animationFillMode: 'both',
              borderRadius: 16,
              background: roleColors[i].bg,
              border: `1px solid ${roleColors[i].border}`,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl transition-transform duration-200 group-hover:scale-105"
              style={{ background: roleColors[i].iconBg }}
            >
              <role.icon size={22} style={{ color: roleIconColors[i] }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans font-bold text-[15px] text-foreground leading-snug">{role.title}</p>
              <p className="font-sans text-[12.5px] text-muted-foreground mt-0.5 leading-relaxed">{role.description}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground/30 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>

      {/* ── How it works ── */}
      <div className="px-5 pt-8">
        <p className="font-sans text-foreground text-[18px] font-bold tracking-tight pl-1 mb-4">
          Como funciona
        </p>
        <div className="flex gap-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="card-elevated flex-1 flex flex-col items-center text-center animate-slide-up"
              style={{
                padding: '20px 8px 16px',
                animationDelay: `${step.delay}ms`,
                animationFillMode: 'both',
              }}
            >
              <div className="flex items-center justify-center w-11 h-11 bg-accent/10 rounded-2xl mb-3">
                <step.icon size={20} className="text-accent" />
              </div>
              <p className="font-sans font-bold text-[13px] text-foreground">{step.title}</p>
              <p className="font-sans text-[11px] text-muted-foreground mt-1.5 leading-snug">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div
        className="mx-5 mt-7 rounded-2xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 16%))',
          padding: '24px 20px',
        }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.06] blur-xl" style={{ background: 'hsl(160 84% 50%)' }} />
        <div className="flex justify-around text-center relative z-10">
          {[
            { value: '500+', label: 'Conexões' },
            { value: '120+', label: 'Facções' },
            { value: '98%', label: 'Satisfação' },
          ].map((stat) => (
            <div key={stat.label} className="animate-fade-in">
              <p className="font-sans font-extrabold text-[24px] tracking-tight" style={{ color: 'hsl(160 84% 50%)' }}>{stat.value}</p>
              <p className="font-sans text-[11px] mt-1 font-medium" style={{ color: 'hsl(215 20% 65%)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="shrink-0 flex flex-col items-center px-5 pt-7 pb-3">
        <button
          onClick={() => navigate('/marca')}
          className="btn-primary w-full animate-fade-in"
          style={{ animationDelay: '700ms', animationFillMode: 'both', fontSize: 15, padding: '15px 28px' }}
        >
          Começar agora
        </button>
        <button
          onClick={() => navigate('/marca')}
          className="font-sans text-[13px] text-muted-foreground mt-4 active:scale-[0.97] transition-all duration-150 hover:text-foreground"
        >
          Explorar plataforma →
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border mt-4" style={{ padding: '24px 20px 28px' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary shadow-sm">
              <Zap size={13} className="text-primary-foreground" />
            </div>
            <span className="font-sans font-bold text-[14px] text-foreground">ELO Moda</span>
          </div>
          <div className="flex items-center gap-3.5">
            <Globe size={17} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
            <Shield size={17} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Plataforma</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Para Marcas</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Para Facções</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Para Artesãos</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sobre</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Como funciona</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Impacto</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Contato</span>
          </div>
        </div>
        <p className="font-sans text-[11px] text-muted-foreground mt-5">
          © 2026 ELO Moda. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
