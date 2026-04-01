import { useNavigate } from 'react-router-dom';
import { Scissors, Shirt, Palette, ChevronRight, Sparkles, Handshake, TrendingUp } from 'lucide-react';

const roles = [
  { icon: Shirt, title: 'Sou uma Marca', description: 'Crie pedidos e encontre produção', path: '/marca', delay: 100 },
  { icon: Scissors, title: 'Sou uma Facção', description: 'Receba pedidos e aumente sua produção', path: '/faccao', delay: 200 },
  { icon: Palette, title: 'Sou um Artesão', description: 'Venda materiais e conecte-se com marcas', path: '/artesao', delay: 300 },
];

const steps = [
  { icon: Sparkles, title: 'Encontre', description: 'Crie ou encontre oportunidades', delay: 400 },
  { icon: Handshake, title: 'Conecte', description: 'Conecte-se com parceiros', delay: 500 },
  { icon: TrendingUp, title: 'Cresça', description: 'Produza e cresça junto', delay: 600 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-background" style={{ minHeight: '100dvh', maxWidth: 430, margin: '0 auto' }}>
      {/* Hero */}
      <div className="shrink-0 flex flex-col items-center" style={{ padding: '48px 24px 32px' }}>
        {/* Logo mark */}
        <svg width="48" height="28" viewBox="0 0 48 28" fill="none" style={{ filter: 'drop-shadow(0 2px 8px hsla(152,65%,29%,0.25))' }}>
          <ellipse cx="17" cy="14" rx="13" ry="10" stroke="hsl(var(--primary))" strokeWidth="2.5" transform="rotate(-10 17 14)" />
          <ellipse cx="31" cy="14" rx="13" ry="10" stroke="hsl(var(--primary))" strokeWidth="2.5" transform="rotate(10 31 14)" />
        </svg>

        <h1 className="font-heading text-foreground" style={{ fontSize: 44, fontWeight: 700, fontStyle: 'italic', lineHeight: 1, marginTop: 12 }}>elo</h1>
        <p className="font-sans text-muted-foreground" style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', marginTop: 4 }}>MODA CONNECT</p>

        {/* Hero text */}
        <h2 className="font-heading text-foreground animate-fade-in" style={{ fontSize: 26, fontWeight: 700, fontStyle: 'italic', textAlign: 'center', lineHeight: 1.3, marginTop: 28, maxWidth: 300 }}>
          Conectando a cadeia da moda
        </h2>
        <p className="font-sans text-muted-foreground animate-fade-in" style={{ fontSize: 14, textAlign: 'center', marginTop: 8, maxWidth: 280, lineHeight: 1.5 }}>
          Marcas, facções e artesãos em um só lugar
        </p>

        <div className="bg-primary/20" style={{ width: 40, height: 2, borderRadius: 2, marginTop: 24 }} />
      </div>

      {/* Role cards */}
      <div className="flex flex-col" style={{ padding: '0 16px', gap: 10 }}>
        <p className="font-sans text-muted-foreground" style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', paddingLeft: 4, marginBottom: 2 }}>
          Escolha seu perfil
        </p>
        {roles.map((role) => (
          <button
            key={role.path}
            onClick={() => navigate(role.path)}
            className="card-elevated animate-slide-up active:scale-[0.97] transition-transform duration-[120ms] ease-out text-left"
            style={{
              padding: '18px 18px',
              display: 'flex', alignItems: 'center', gap: 14,
              animationDelay: `${role.delay}ms`, animationFillMode: 'both',
            }}
          >
            <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-primary/10 rounded-2xl">
              <role.icon size={22} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans font-bold text-[15px] text-foreground leading-snug">{role.title}</p>
              <p className="font-sans text-[12px] text-muted-foreground mt-1">{role.description}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground/40 shrink-0" />
          </button>
        ))}
      </div>

      {/* How it works */}
      <div style={{ padding: '32px 16px 0' }}>
        <p className="font-heading text-foreground" style={{ fontSize: 20, fontWeight: 600, fontStyle: 'italic', paddingLeft: 4, marginBottom: 16 }}>
          Como funciona
        </p>
        <div className="flex gap-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="card-elevated flex-1 flex flex-col items-center text-center animate-slide-up"
              style={{ padding: '20px 8px 16px', animationDelay: `${step.delay}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-3">
                <step.icon size={18} className="text-primary" />
              </div>
              <p className="font-sans font-bold text-[13px] text-foreground">{step.title}</p>
              <p className="font-sans text-[11px] text-muted-foreground mt-1 leading-snug">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 flex flex-col items-center" style={{ padding: '32px 16px 32px' }}>
        <button
          onClick={() => navigate('/marca')}
          className="btn-primary w-full animate-fade-in"
          style={{ animationDelay: '700ms', animationFillMode: 'both', fontSize: 15, padding: '15px 28px' }}
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
    </div>
  );
};

export default Index;
