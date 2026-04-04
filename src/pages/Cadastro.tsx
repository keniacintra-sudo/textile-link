import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, UserType } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const typeLabels: Record<string, string> = {
  marca: 'Marca',
  faccao: 'Facção',
  artesao: 'Artesão / Reciclador',
};

const Cadastro = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userType = (params.get('tipo') as UserType) || 'marca';
  const { register, loginAsGuest } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register({ name: name.trim(), email: email.trim(), password, userType });
      toast.success('Cadastro realizado com sucesso!');
      navigate('/aguardando-aprovacao');
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="font-sans font-bold text-[17px] text-foreground">
          Cadastro — {typeLabels[userType] ?? 'Perfil'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 pt-4 pb-8 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-foreground">Nome completo</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome ou da empresa" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-foreground">E-mail</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-foreground">Senha</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
        </div>

        <div className="flex-1" />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <UserPlus size={18} />
          {loading ? 'Cadastrando...' : 'Criar conta'}
        </button>

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[12px] text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          type="button"
          onClick={() => {
            loginAsGuest(userType);
            const path = userType === 'faccao' ? '/faccao' : userType === 'artesao' ? '/artesao' : '/marca';
            navigate(path);
            toast.success('Bem-vindo! Você entrou como visitante.');
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-[15px] hover:bg-secondary active:scale-[0.97] transition-all"
        >
          <LogIn size={18} />
          Entrar sem cadastro
        </button>

        <p className="text-center text-[13px] text-muted-foreground">
          Já tem conta? Acesse direto pelo botão acima.
        </p>
      </form>
    </div>
  );
};

export default Cadastro;
