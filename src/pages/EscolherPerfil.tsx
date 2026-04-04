import { useNavigate } from 'react-router-dom';
import { Shirt, Scissors, Palette, ChevronRight } from 'lucide-react';

const profiles = [
  { icon: Shirt, title: 'Sou uma Marca', description: 'Crie pedidos e encontre produção', type: 'marca' as const, color: 'hsl(160 84% 39%)' },
  { icon: Scissors, title: 'Sou uma Facção', description: 'Receba pedidos e aumente sua produção', type: 'faccao' as const, color: 'hsl(217 91% 60%)' },
  { icon: Palette, title: 'Sou um Artesão', description: 'Venda materiais e conecte-se com marcas', type: 'artesao' as const, color: 'hsl(43 96% 56%)' },
];

const EscolherPerfil = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <h1 className="font-sans text-[24px] font-extrabold text-foreground tracking-tight text-center mb-2">
          Qual é o seu perfil?
        </h1>
        <p className="text-muted-foreground text-[14px] text-center mb-8">
          Escolha como você deseja usar a plataforma
        </p>

        <div className="flex flex-col gap-3">
          {profiles.map((p) => (
            <button
              key={p.type}
              onClick={() => navigate(`/cadastro?tipo=${p.type}`)}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-md active:scale-[0.97] transition-all duration-200 text-left group"
            >
              <div
                className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `color-mix(in srgb, ${p.color} 12%, transparent)` }}
              >
                <p.icon size={22} style={{ color: p.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-[15px] text-foreground">{p.title}</p>
                <p className="font-sans text-[12.5px] text-muted-foreground mt-0.5">{p.description}</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground/30 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscolherPerfil;
