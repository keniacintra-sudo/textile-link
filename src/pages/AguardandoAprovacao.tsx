import { useNavigate } from 'react-router-dom';
import { Clock, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AguardandoAprovacao = () => {
  const navigate = useNavigate();
  const { isApproved, simulateApproval, userName } = useAuth();

  if (isApproved) {
    // Já aprovado — redireciona para login
    navigate('/login', { replace: true });
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 animate-fade-in">
        <Clock size={32} className="text-accent" />
      </div>

      <h1 className="font-sans text-[22px] font-extrabold text-foreground tracking-tight mb-2 animate-fade-in">
        Seu cadastro está em análise
      </h1>

      <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[300px] mb-2 animate-fade-in">
        {userName ? `Olá, ${userName}! ` : ''}Seus dados estão sendo verificados pela nossa equipe.
      </p>

      <p className="text-muted-foreground text-[13px] mb-8 animate-fade-in">
        Prazo estimado: <span className="font-semibold text-foreground">até 24 horas</span>
      </p>

      {/* Etapas visuais */}
      <div className="w-full max-w-[280px] flex flex-col gap-3 mb-10">
        {[
          { icon: CheckCircle2, label: 'Cadastro recebido', done: true },
          { icon: Clock, label: 'Análise em andamento', done: false },
          { icon: Mail, label: 'Notificação por e-mail', done: false },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${200 + i * 100}ms`, animationFillMode: 'both' }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-accent/15' : 'bg-secondary'}`}>
              <step.icon size={16} className={step.done ? 'text-accent' : 'text-muted-foreground'} />
            </div>
            <span className={`text-[13px] font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</span>
          </div>
        ))}
      </div>

      {/* Botão suporte */}
      <button className="btn-outline text-[13px] px-6 py-2.5 mb-4" onClick={() => toast.info('Nosso time entrará em contato em breve.')}>
        Falar com suporte
      </button>

      {/* Botão simular aprovação (só para protótipo) */}
      <button
        onClick={() => {
          simulateApproval();
          toast.success('Cadastro aprovado! Faça login para continuar.');
          navigate('/login');
        }}
        className="text-[12px] text-muted-foreground/50 hover:text-muted-foreground transition-colors underline"
      >
        (Simular aprovação — protótipo)
      </button>
    </div>
  );
};

export default AguardandoAprovacao;
