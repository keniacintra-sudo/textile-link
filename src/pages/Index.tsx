import { useNavigate } from 'react-router-dom';
import { Tag, Scissors, Recycle } from 'lucide-react';

const roles = [
  {
    emoji: '🏷️',
    icon: Tag,
    title: 'Marca / Designer',
    description: 'Encontre facções e gerencie sua produção',
    path: '/marca',
    delay: 100,
  },
  {
    emoji: '🧵',
    icon: Scissors,
    title: 'Facção / Confecção',
    description: 'Receba pedidos e oferte sua capacidade',
    path: '/faccao',
    delay: 200,
  },
  {
    emoji: '♻️',
    icon: Recycle,
    title: 'Artesão / Reciclador',
    description: 'Adquira retalhos e resíduos têxteis',
    path: '/artesao',
    delay: 300,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-primary">ELO</span>
          <span className="text-accent">_</span>
          <span className="text-foreground">Moda</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
          Conectando a cadeia produtiva da moda
        </p>
      </div>

      {/* Role Cards */}
      <div className="w-full max-w-sm space-y-4">
        {roles.map((role) => (
          <button
            key={role.path}
            onClick={() => navigate(role.path)}
            className="w-full bg-card rounded-2xl p-5 shadow-sm border border-border text-left 
                       active:scale-[0.97] hover:shadow-md transition-all duration-200
                       animate-slide-up flex items-start gap-4"
            style={{ animationDelay: `${role.delay}ms`, animationFillMode: 'both' }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
              {role.emoji}
            </div>
            <div>
              <h2 className="font-heading font-semibold text-base">{role.title}</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-snug">{role.description}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-12 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
        v1.0 — Moda circular e colaborativa
      </p>
    </div>
  );
};

export default Index;
