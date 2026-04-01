import { useNavigate } from 'react-router-dom';
import { Scissors, Shirt, Palette } from 'lucide-react';

const roles = [
  { icon: Scissors, title: 'Sou uma Costureira / Facção', description: 'Receba pedidos e aumente sua renda', path: '/faccao', delay: 100 },
  { icon: Shirt, title: 'Sou uma Marca / Fábrica', description: 'Encontre facções e produza com eficiência', path: '/marca', delay: 200 },
  { icon: Palette, title: 'Sou Artesão', description: 'Adquira retalhos e venda suas criações', path: '/artesao', delay: 300 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col" style={{ height: '100dvh', maxWidth: 390, margin: '0 auto', backgroundColor: '#F5F0EB', overflow: 'hidden' }}>
      {/* Header */}
      <div className="shrink-0 flex flex-col items-center" style={{ padding: '32px 24px 24px', backgroundColor: '#F5F0EB' }}>
        {/* Chain link symbol */}
        <svg width="48" height="28" viewBox="0 0 48 28" fill="none" style={{ filter: 'drop-shadow(0 2px 6px rgba(26,122,74,0.2))' }}>
          <ellipse cx="17" cy="14" rx="13" ry="10" stroke="#1A7A4A" strokeWidth="2.5" transform="rotate(-10 17 14)" />
          <ellipse cx="31" cy="14" rx="13" ry="10" stroke="#1A7A4A" strokeWidth="2.5" transform="rotate(10 31 14)" />
        </svg>

        {/* Logo */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, fontStyle: 'italic', color: '#1C1C1E', lineHeight: 1, margin: '10px 0 0' }}>elo</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: 4, color: '#9C8B7A', textTransform: 'uppercase', margin: '3px 0 0' }}>MODA CONNECT</p>

        {/* Tagline */}
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, fontStyle: 'italic', color: '#5C4A38', textAlign: 'center', maxWidth: 280, lineHeight: 1.5, margin: '20px 0 0' }}>
          Conectamos você às melhores oportunidades da moda
        </p>

        {/* Divider */}
        <div style={{ width: 40, height: 1, backgroundColor: '#C4A882', borderRadius: 2, margin: '20px auto 0' }} />
      </div>

      {/* Cards */}
      <div className="flex flex-col flex-1 min-h-0 justify-center" style={{ padding: '16px 16px 0', gap: 10, display: 'flex' }}>
        {roles.map((role) => (
          <button
            key={role.path}
            onClick={() => navigate(role.path)}
            className="animate-slide-up active:scale-[0.97] transition-transform duration-[120ms] ease-out"
            style={{
              background: '#fff', borderRadius: 16, padding: '14px 16px',
              boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: 'none',
              display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              animationDelay: `${role.delay}ms`, animationFillMode: 'both',
            }}
          >
            <div className="shrink-0 flex items-center justify-center" style={{ width: 44, height: 44, backgroundColor: '#F5EDE3', borderRadius: 10 }}>
              <role.icon size={20} style={{ color: '#8B6B4A' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: '#1C1C1E', margin: 0, lineHeight: 1.2 }}>{role.title}</p>
              <div style={{ height: 1, backgroundColor: '#F0EBE5', margin: '4px 0' }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#A89880', margin: 0, lineHeight: 1.3 }}>{role.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="shrink-0 flex flex-col items-center" style={{ paddingBottom: 20, paddingTop: 12 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#B0A090', margin: 0 }}>Ainda não tenho certeza</p>
        <button
          onClick={() => navigate('/marca')}
          className="active:scale-[0.97] transition-transform duration-[120ms]"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: '#5C4A38', backgroundColor: '#E8DDD4', borderRadius: 50, padding: '11px 32px', border: 'none', cursor: 'pointer', marginTop: 8 }}
        >
          Explorar plataforma
        </button>
      </div>
    </div>
  );
};

export default Index;
