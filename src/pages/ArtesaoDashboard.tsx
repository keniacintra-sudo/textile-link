import { useState } from 'react';
import { ShoppingBag, ClipboardList, MessageCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import { marketplaceResiduos, artesaoOrders, chats } from '@/data/mockData';

const navItems = [
  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
  { icon: ClipboardList, label: 'Meus Pedidos', id: 'pedidos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
];

const ArtesaoDashboard = () => {
  const [tab, setTab] = useState('marketplace');

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Artesão / Reciclador" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'marketplace' && (
          <div className="animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-3">Marketplace de Resíduos</h2>
            <div className="grid grid-cols-2 gap-3">
              {marketplaceResiduos.map((r, i) => (
                <div
                  key={r.id}
                  className="bg-card rounded-xl p-3.5 shadow-sm border border-border animate-slide-up cursor-pointer active:scale-[0.97] transition-transform"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-full aspect-square rounded-lg bg-primary/5 flex items-center justify-center mb-2.5">
                    <span className="text-3xl">🧵</span>
                  </div>
                  <h3 className="font-semibold text-xs leading-snug">{r.material}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1">{r.weight} · {r.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-bold text-primary">{r.price}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{r.seller}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'pedidos' && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-2">Meus Pedidos</h2>
            {artesaoOrders.map((order, i) => (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-border animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground">Vendedor: {order.brand}</p>
                <p className="text-xs text-muted-foreground mt-1">{order.description}</p>
              </div>
            ))}
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

export default ArtesaoDashboard;
