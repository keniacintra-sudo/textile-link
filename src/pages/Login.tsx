import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { LogIn, Zap } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);
    const ok = await login(email.trim(), password);
    setLoading(false);

    if (ok) {
      toast.success('Bem-vindo de volta!');
    } else {
      toast.error('E-mail ou senha incorretos. Verifique também se confirmou seu e-mail.');
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mb-3"
            style={{ background: 'linear-gradient(135deg, hsl(160 84% 39%), hsl(160 60% 45%))' }}
          >
            <Zap size={22} className="text-accent-foreground" />
          </div>
          <span className="font-sans font-extrabold text-[20px] text-foreground tracking-tight">ELO Moda</span>
        </div>

        <h1 className="font-sans text-[22px] font-extrabold text-foreground tracking-tight text-center mb-1">
          Entrar na plataforma
        </h1>
        <p className="text-muted-foreground text-[14px] text-center mb-8">
          Acesse sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-foreground">E-mail</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-foreground">Senha</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
            <LogIn size={18} />
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-[13px] text-muted-foreground mt-6">
          Não tem conta?{' '}
          <button onClick={() => navigate('/escolher-perfil')} className="text-accent font-semibold hover:underline">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
