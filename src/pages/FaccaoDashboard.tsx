import { useState } from 'react';
import { Search, Briefcase, Trash2, MessageCircle, Plus, ToggleLeft, ToggleRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import { faccaoOrders, chats } from '@/data/mockData';

const navItems = [
  { icon: Search, label: 'Oportunidades', id: 'oportunidades' },
  { icon: Briefcase, label: 'Meus Serviços', id: 'servicos' },
  { icon: Trash2, label: 'Resíduos', id: 'residuos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
];

const FaccaoDashboard = () => {
  const [tab, setTab] = useState('oportunidades');
  const [available, setAvailable] = useState(true);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Facção / Confecção" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'oportunidades' && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-2">Oportunidades</h2>
            {faccaoOrders.filter(o => o.status === 'ATIVO' || o.status === 'PROPOSTA').map((order, i) => (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-border animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{order.title}</h3>
                    <p className="text-xs text-muted-foreground">{order.brand}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground">{order.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{order.quantity} peças</span>
                    <span>Prazo: {order.deadline}</span>
                  </div>
                  <button className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
                    Enviar Proposta
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'servicos' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-semibold text-lg">Meus Serviços</h2>
              <button
                onClick={() => setAvailable(!available)}
                className="flex items-center gap-2 text-sm"
              >
                {available ? (
                  <ToggleRight size={28} className="text-primary" />
                ) : (
                  <ToggleLeft size={28} className="text-muted-foreground" />
                )}
                <span className={available ? 'text-primary font-medium' : 'text-muted-foreground'}>
                  {available ? 'Disponível' : 'Indisponível'}
                </span>
              </button>
            </div>
            {faccaoOrders.filter(o => o.status === 'EM PRODUÇÃO').map((order, i) => (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-border animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground">{order.brand} — {order.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Prazo: {order.deadline}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'residuos' && (
          <div className="animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-3">Catalogar Resíduo</h2>
            <div className="bg-card rounded-xl p-5 shadow-sm border border-border space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Tipo de material</label>
                <input className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ex: Algodão, Jeans, Seda..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Peso (kg)</label>
                  <input className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="0" type="number" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Localização</label>
                  <input className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="Cidade, UF" />
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-4 py-3 rounded-xl active:scale-[0.97] transition-transform">
                <Plus size={18} /> Catalogar Resíduo
              </button>
            </div>
          </div>
        )}

        {tab === 'mensagens' && (
          <div className="animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-3">Mensagens</h2>
            <ChatList chats={chats} />
          </div>
        )}
      </main>

      <BottomNav items={navItems} active={tab} onNavigate={setTab} />
    </div>
  );
};

export default FaccaoDashboard;
