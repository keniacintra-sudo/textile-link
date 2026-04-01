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
            <h2 className="text-section-title mb-3">Marketplace de Resíduos</h2>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              {marketplaceFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setMarketplaceFilter(f)}
                  className={marketplaceFilter === f ? 'chip-active' : 'chip'}
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
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-2.5 bg-muted">
                    {r.image_url ? (
                      <img
                        src={r.image_url}
                        alt={r.material}
                        className="w-full h-full object-cover animate-fade-in"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-muted-foreground font-sans">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-[14px] leading-snug font-sans text-foreground">{r.material}</h3>
                  <p className="text-[13px] text-muted-foreground mt-1 font-sans">{r.weight} · {r.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-metric-sm text-sm">{r.price}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 font-sans">{r.seller}</p>
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
            <h2 className="text-section-title mb-2">Meus Pedidos</h2>
            {artesaoOrders.map((order, i) => (
              <div
                key={order.id}
                className="card-elevated animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[15px] font-sans text-foreground">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[13px] text-muted-foreground font-sans">Vendedor: {order.brand}</p>
                <p className="text-[13px] text-muted-foreground mt-1 font-sans">{order.description}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'mensagens' && (
          <div className="animate-fade-in">
            <h2 className="text-section-title mb-3">Mensagens</h2>
            <ChatList chats={chats} />
          </div>
        )}
      </main>

      <BottomNav items={navItems} active={tab} onNavigate={setTab} />
    </div>
  );
};

export default ArtesaoDashboard;