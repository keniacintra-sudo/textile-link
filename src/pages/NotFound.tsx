import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
        style={{ background: 'linear-gradient(135deg, hsl(160 84% 39%), hsl(160 60% 45%))' }}
      >
        <Zap size={28} className="text-white" />
      </div>

      <h1 className="font-sans font-extrabold text-[64px] leading-none text-foreground tracking-tight">
        404
      </h1>

      <p className="font-sans text-[18px] font-bold text-foreground mt-2">
        Página não encontrada
      </p>

      <p className="font-sans text-[14px] text-muted-foreground mt-2 max-w-[260px] leading-relaxed">
        O endereço que você acessou não existe ou foi removido.
      </p>

      <button
        onClick={() => navigate('/')}
        className="btn-primary mt-8"
        style={{ padding: '13px 32px' }}
      >
        Voltar para o início
      </button>
    </div>
  );
};

export default NotFound;
