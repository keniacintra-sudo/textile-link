import { useState } from 'react';
import { ArrowLeft, Leaf, Bell, BarChart3, RefreshCw, X, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  dashboardPath?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'proposta' | 'mensagem' | 'pedido' | 'sistema';
}

const initialNotifications: Notification[] = [
  { id: '1', title: 'Nova proposta recebida', message: 'Facção Sul Têxtil enviou uma proposta para "Coleção Verão 2025".', time: 'Agora', read: false, type: 'proposta' },
  { id: '2', title: 'Nova mensagem', message: 'Confecções ABC: "Podemos ajustar o prazo?"', time: '11:05', read: false, type: 'mensagem' },
  { id: '3', title: 'Pedido em produção', message: 'Seu pedido "Camisetas Básicas" entrou em produção.', time: 'Ontem', read: true, type: 'pedido' },
  { id: '4', title: 'Bem-vindo ao ELO Moda!', message: 'Sua conta está ativa. Comece criando seu primeiro pedido.', time: '2 dias atrás', read: true, type: 'sistema' },
];

const typeIcon: Record<string, string> = {
  proposta: '📋',
  mensagem: '💬',
  pedido: '📦',
  sistema: '🔔',
};

const PageHeader = ({ title, showBack = true, dashboardPath }: PageHeaderProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const handleNotificationClick = (n: Notification) => {
    markRead(n.id);
    setShowNotifications(false);
    switch (n.type) {
      case 'mensagem':
        navigate('/chat');
        break;
      case 'proposta':
        // Navigate to the current dashboard — proposals tab will need to be selected manually
        toast.info(`📋 ${n.title}`, { description: n.message });
        break;
      case 'pedido':
        toast.info(`📦 ${n.title}`, { description: n.message });
        break;
      case 'sistema':
        toast.info(`🔔 ${n.title}`, { description: n.message });
        break;
    }
  };

  const handleSwitchProfile = async () => {
    if (showConfirm) {
      await logout();
      navigate('/escolher-perfil');
      toast.success('Perfil alterado.');
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 4000);
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 backdrop-blur-lg px-5"
        style={{ height: 56, display: 'flex', alignItems: 'center', borderBottom: '1px solid hsla(210, 40%, 98%, 0.1)', background: 'hsla(222, 84%, 11%, 0.97)' }}
      >
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate('/')}
                className="p-2 -ml-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-150"
              >
                <ArrowLeft size={20} style={{ color: 'hsl(210 40% 98%)' }} />
              </button>
            )}
            <h1 className="font-sans font-bold text-[18px] tracking-tight" style={{ color: 'hsl(210 40% 98%)' }}>{title}</h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Trocar perfil — com confirmação */}
            <button
              onClick={handleSwitchProfile}
              title="Trocar de perfil"
              className={`p-2.5 rounded-xl active:scale-95 transition-all duration-150 flex items-center gap-1.5 ${
                showConfirm ? 'bg-accent/20 hover:bg-accent/30' : 'hover:bg-white/10'
              }`}
            >
              {showConfirm ? (
                <>
                  <Check size={16} className="text-accent" />
                  <span className="font-sans text-[12px] font-semibold text-accent">Confirmar?</span>
                </>
              ) : (
                <RefreshCw size={18} style={{ color: 'hsl(215 20% 65%)' }} />
              )}
            </button>

            {showConfirm && (
              <button
                onClick={() => setShowConfirm(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
              >
                <X size={14} style={{ color: 'hsl(215 20% 65%)' }} />
              </button>
            )}

            {!showConfirm && (
              <>
                {dashboardPath && (
                  <button
                    onClick={() => navigate(dashboardPath)}
                    title="Dashboard"
                    className="p-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-150"
                  >
                    <BarChart3 size={20} style={{ color: 'hsl(215 20% 65%)' }} />
                  </button>
                )}
                <button
                  onClick={() => navigate('/impacto')}
                  title="Relatório de impacto"
                  className="p-2.5 rounded-xl hover:bg-accent/20 active:scale-95 transition-all duration-150"
                >
                  <Leaf size={20} className="text-accent" />
                </button>

                {/* Sino de notificações */}
                <button
                  onClick={() => setShowNotifications(true)}
                  title="Notificações"
                  className="relative p-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-150"
                >
                  <Bell size={20} style={{ color: 'hsl(215 20% 65%)' }} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-destructive flex items-center justify-center ring-2 ring-[hsl(222_84%_11%)]">
                      <span className="text-[9px] font-bold text-white leading-none">{unreadCount}</span>
                    </span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Painel de notificações ── */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowNotifications(false)}
          />

          {/* Drawer */}
          <div
            className="relative w-full max-w-[380px] bg-background shadow-2xl animate-slide-in-right flex flex-col"
            style={{ maxHeight: '100dvh' }}
          >
            {/* Header do painel */}
            <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h2 className="font-sans font-bold text-[17px] text-foreground">Notificações</h2>
                {unreadCount > 0 && (
                  <p className="font-sans text-[12px] text-muted-foreground mt-0.5">
                    {unreadCount} não {unreadCount === 1 ? 'lida' : 'lidas'}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="font-sans text-[12px] text-accent font-semibold hover:underline"
                  >
                    Marcar todas
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1.5 rounded-xl hover:bg-muted transition-colors"
                >
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertCircle size={32} className="text-muted-foreground mb-2" />
                  <p className="font-sans text-[13px] text-muted-foreground">Nenhuma notificação</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`w-full text-left flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/50 active:bg-muted ${
                      !n.read ? 'bg-accent/5' : ''
                    }`}
                    style={{ borderBottom: '1px solid hsl(var(--border))' }}
                  >
                    {/* Ícone do tipo */}
                    <span className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[14px] mt-0.5">
                      {typeIcon[n.type]}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-sans text-[13px] truncate ${!n.read ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                        )}
                      </div>
                      <p className="font-sans text-[12px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                      <p className="font-sans text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeader;
