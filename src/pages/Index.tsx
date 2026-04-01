import { useNavigate } from 'react-router-dom';
import { Scissors, Shirt, Palette, ChevronRight } from 'lucide-react';

const roles = [
  { icon: Scissors, title: 'Sou uma Costureira / Facção', description: 'Receba pedidos e aumente sua renda', path: '/faccao', delay: 100 },
  { icon: Shirt, title: 'Sou uma Marca / Fábrica', description: 'Encontre facções e produza com eficiência', path: '/marca', delay: 200 },
  { icon: Palette, title: 'Sou Artesão', description: 'Adquira retalhos e venda suas criações', path: '/artesao', delay: 300 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-background" style={{ height: '100dvh', maxWidth: 390, margin: '0 auto', overflow: 'hidden' }}>
      {/* Header */}
      <div className="shrink-0 flex flex-col items-center" style={{ padding: '40px 24px 28px' }}>
        {/* Chain link symbol */}
        <svg width="48" height="28" viewBox="0 0 48 28" fill="none" style={{ filter: 'drop-shadow(0 2px 8px hsla(152,65%,29%,0.25))' }}>
          <ellipse cx="17" cy="14" rx="13" ry="10" stroke="hsl(var(--primary))" strokeWidth="2.5" transform="rotate(-10 17 14)" />
          <ellipse cx="31" cy="14" rx="13" ry="10" stroke="hsl(var(--primary))" strokeWidth="2.5" transform="rotate(10 31 14)" />
        </svg>

        {/* Logo */}
        <h1 className="font-heading text-foreground" style={{ fontSize: 44, fontWeight: 700, fontStyle: 'italic', lineHeight: 1, marginTop: 12 }}>elo</h1>
        <p className="font-sans text-muted-foreground" style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', marginTop: 4 }}>MODA CONNECT</p>

        {/* Tagline */}
        <p className="font-heading text-accent" style={{ fontSize: 18, fontWeight: 400, fontStyle: 'italic', textAlign: 'center', maxWidth: 280, lineHeight: 1.5, marginTop: 24 }}>
          Conectamos você às melhores oportunidades da moda
        </p>

        {/* Divider */}
        <div className="bg-accent/30" style={{ width: 40, height: 1, borderRadius: 2, marginTop: 24 }} />
      </div>

      {/* Cards */}
      <div className="flex flex-col flex-1 min-h-0 justify-center" style={{ padding: '16px 16px 0', gap: 12 }}>
        {roles.map((role) => (
          <button
            key={role.path}
            onClick={() => navigate(role.path)}
            className="card-elevated animate-slide-up active:scale-[0.97] transition-transform duration-[120ms] ease-out text-left"
            style={{
              padding: '16px 18px',
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
            <ChevronRight size={18} className="text-muted-foreground/50 shrink-0" />
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="shrink-0 flex flex-col items-center" style={{ paddingBottom: 24, paddingTop: 16 }}>
        <p className="font-sans text-[12px] text-muted-foreground">Ainda não tenho certeza</p>
        <button
          onClick={() => navigate('/marca')}
          className="btn-secondary mt-2 active:scale-[0.97] transition-transform duration-[120ms]"
          style={{ padding: '11px 32px', fontSize: 13 }}
        >
          Explorar plataforma
        </button>
      </div>
    </div>
  );
};

export default Index;
