import { useNavigate } from 'react-router-dom';
import { Scissors, Shirt, Palette, ArrowRight } from 'lucide-react';

const profiles = [
  {
    icon: Scissors,
    title: 'Costureira / Facção',
    description: 'Receba pedidos e aumente sua renda',
    path: '/faccao',
    bg: 'hsl(152 40% 95%)',
    border: 'transparent',
    shadow: '0 2px 12px -4px hsla(152,30%,40%,0.08)',
  },
  {
    icon: Shirt,
    title: 'Marca / Fábrica',
    description: 'Encontre facções e produza com eficiência',
    path: '/marca',
    bg: 'hsl(0 0% 100%)',
    border: 'hsl(var(--primary) / 0.25)',
    shadow: '0 8px 30px -8px hsla(152,40%,30%,0.14), 0 2px 8px -2px hsla(0,0%,0%,0.04)',
    elevated: true,
  },
  {
    icon: Palette,
    title: 'Artesão',
    description: 'Adquira retalhos e venda suas criações',
    path: '/artesao',
    bg: 'hsl(30 40% 95%)',
    border: 'transparent',
    shadow: '0 2px 12px -4px hsla(30,30%,40%,0.08)',
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col bg-background"
      style={{ minHeight: '100dvh', maxWidth: 430, margin: '0 auto' }}
    >
      {/* Logo */}
      <div className="flex justify-center" style={{ paddingTop: 56 }}>
        <div className="flex flex-col items-center gap-1">
          <svg width="36" height="22" viewBox="0 0 48 28" fill="none" style={{ opacity: 0.85 }}>
            <ellipse cx="17" cy="14" rx="13" ry="10" stroke="hsl(var(--primary))" strokeWidth="2.2" transform="rotate(-10 17 14)" />
            <ellipse cx="31" cy="14" rx="13" ry="10" stroke="hsl(var(--primary))" strokeWidth="2.2" transform="rotate(10 31 14)" />
          </svg>
          <span
            className="font-heading text-foreground"
            style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.5 }}
          >
            elo moda
          </span>
        </div>
      </div>

      {/* Headline */}
      <div
        className="flex flex-col items-center animate-fade-in"
        style={{ padding: '48px 28px 0', textAlign: 'center' }}
      >
        <h1
          className="font-heading text-foreground"
          style={{
            fontSize: 32,
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.2,
            maxWidth: 320,
            letterSpacing: -0.5,
          }}
        >
          Produza melhor.
          <br />
          Conecte-se.
          <br />
          Cresça na moda.
        </h1>
        <p
          className="font-sans text-muted-foreground"
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            marginTop: 16,
            maxWidth: 280,
          }}
        >
          Para marcas, facções e artesãos que querem evoluir juntos
        </p>
      </div>

      {/* Profile Cards */}
      <div className="flex flex-col" style={{ padding: '44px 20px 0', gap: 14 }}>
        {profiles.map((p, i) => (
          <button
            key={p.path}
            onClick={() => navigate(p.path)}
            className="animate-slide-up text-left"
            style={{
              background: p.bg,
              border: `1.5px solid ${p.border}`,
              borderRadius: 20,
              padding: '22px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: p.shadow,
              transform: p.elevated ? 'scale(1.02)' : undefined,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              animationDelay: `${100 + i * 80}ms`,
              animationFillMode: 'both',
              cursor: 'pointer',
            }}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)';
            }}
            onPointerUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = p.elevated ? 'scale(1.02)' : 'scale(1)';
            }}
            onPointerLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = p.elevated ? 'scale(1.02)' : 'scale(1)';
            }}
          >
            <div
              className="shrink-0 flex items-center justify-center rounded-2xl"
              style={{
                width: 52,
                height: 52,
                background: 'hsl(var(--primary) / 0.1)',
              }}
            >
              <p.icon size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-foreground" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>
                {p.title}
              </p>
              <p className="font-sans text-muted-foreground" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>
                {p.description}
              </p>
            </div>
            <ArrowRight size={18} className="text-muted-foreground/30 shrink-0" />
          </button>
        ))}
      </div>

      {/* CTA */}
      <div
        className="flex flex-col items-center animate-fade-in"
        style={{ padding: '48px 20px 40px', animationDelay: '500ms', animationFillMode: 'both' }}
      >
        <p className="font-sans text-muted-foreground" style={{ fontSize: 13, marginBottom: 12 }}>
          Ainda não sei por onde começar
        </p>
        <button
          onClick={() => navigate('/marca')}
          className="font-sans text-primary"
          style={{
            fontSize: 14,
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: 100,
            border: '1.5px solid hsl(var(--primary) / 0.25)',
            background: 'hsl(var(--primary) / 0.05)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Ver como funciona
        </button>
      </div>
    </div>
  );
};

export default Index;
