import { useNavigate } from 'react-router-dom';
import { Scissors, Shirt, Palette } from 'lucide-react';

const roles = [
  {
    icon: Scissors,
    title: 'Sou uma Costureira / Facção',
    description: 'Receba pedidos de marcas e aumente sua renda',
    path: '/faccao',
    delay: 100,
  },
  {
    icon: Shirt,
    title: 'Sou uma Marca / Fábrica',
    description: 'Encontre facções e produza com eficiência',
    path: '/marca',
    delay: 200,
  },
  {
    icon: Palette,
    title: 'Sou Artesão',
    description: 'Venda suas criações e encontre oportunidades',
    path: '/artesao',
    delay: 300,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F0EB', maxWidth: 390, margin: '0 auto' }}>
      {/* Header */}
      <div className="pt-12 pb-6 text-center">
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, fontStyle: 'italic', color: '#1C1C1E', lineHeight: 1 }}
        >
          elo
        </h1>
        <p
          className="mt-2"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 4, color: '#9C8B7A', textTransform: 'uppercase' }}
        >
          MODA CONNECT
        </p>
      </div>

      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center px-8"
        style={{
          height: 260,
          background: 'linear-gradient(180deg, rgba(180,160,140,0.3) 0%, rgba(120,100,80,0.6) 100%), #C4A882',
        }}
      >
        <h2
          className="text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            maxWidth: 300,
            lineHeight: 1.2,
          }}
        >
          Conectamos você às melhores oportunidades da moda.
        </h2>
        <p
          className="text-center mt-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 300,
          }}
        >
          Encontre parceiros, aumente sua produção e gere mais renda com facilidade
        </p>
      </div>

      {/* Profile Cards */}
      <div className="px-5 pt-5 pb-2 flex-1">
        {roles.map((role) => (
          <button
            key={role.path}
            onClick={() => navigate(role.path)}
            className="w-full text-left mb-3 animate-slide-up active:scale-[0.97] transition-transform duration-150"
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: 20,
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              border: 'none',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 16,
              animationDelay: `${role.delay}ms`,
              animationFillMode: 'both',
            }}
          >
            <div
              className="shrink-0 flex items-center justify-center"
              style={{ width: 64, height: 64, backgroundColor: '#F5EDE3', borderRadius: 12 }}
            >
              <role.icon size={32} style={{ color: '#8B6B4A' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#1C1C1E', margin: 0 }}>
                {role.title}
              </p>
              <div style={{ height: 1, backgroundColor: '#F0EBE5', margin: '8px 0' }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9C8B7A', margin: 0, lineHeight: 1.4 }}>
                {role.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center pb-10 pt-2">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9C8B7A' }}>
          Ainda não tenho certeza
        </p>
        <button
          onClick={() => navigate('/marca')}
          className="mt-2 active:scale-[0.97] transition-transform duration-150"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#5C4A38',
            backgroundColor: '#E8DDD4',
            borderRadius: 50,
            padding: '14px 40px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Explorar plataforma
        </button>
      </div>
    </div>
  );
};

export default Index;
