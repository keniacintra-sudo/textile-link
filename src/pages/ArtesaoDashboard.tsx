import { useState, useMemo } from 'react';
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

const marketplaceFilters = ['Todos', 'Algodão', 'Jeans', 'Malha', 'Seda', 'Retalhos'];

const ArtesaoDashboard = () => {
  const [tab, setTab] = useState('marketplace');
  const [marketplaceFilter, setMarketplaceFilter] = useState('Todos');

  const filteredResiduos = useMemo(() => {
    if (marketplaceFilter === 'Todos') return marketplaceResiduos;
    return marketplaceResiduos.filter(r =>
      r.material.toLowerCase().includes(marketplaceFilter.toLowerCase())
    );
  }, [marketplaceFilter]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Artesão / Reciclador" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'marketplace' && (
          <div className="animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-3">Marketplace de Resíduos</h2>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              {marketplaceFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setMarketplaceFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors font-sans ${
                    marketplaceFilter === f
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground'
                  }`}
                  style={marketplaceFilter !== f ? { boxShadow: '0 2px 12px rgba(0,0,0,0.07)' } : undefined}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3" key={marketplaceFilter}>
              {filteredResiduos.map((r, i) => (
                <div
                  key={r.id}
                  className="card-elevated animate-fade-in cursor-pointer active:scale-[0.97] transition-transform duration-150"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-full aspect-square rounded-lg bg-primary/5 flex items-center justify-center mb-2.5">
                    <span className="text-3xl">🧵</span>
                  </div>
                  <h3 className="font-semibold text-xs leading-snug font-sans">{r.material}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1 font-sans">{r.weight} · {r.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-metric text-sm">{r.price}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 font-sans">{r.seller}</p>
                </div>
              ))}
              {filteredResiduos.length === 0 && (
                <p className="col-span-2 text-center text-sm text-muted-foreground py-8 font-sans">Nenhum resíduo encontrado.</p>
              )}
            </div>
          </div>
        )}

        {tab === 'pedidos' && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-2">Meus Pedidos</h2>
            {artesaoOrders.map((order, i) => (
              <div
                key={order.id}
                className="card-elevated animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm font-sans">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground font-sans">Vendedor: {order.brand}</p>
                <p className="text-xs text-muted-foreground mt-1 font-sans">{order.description}</p>
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
