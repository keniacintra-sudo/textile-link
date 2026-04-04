import { useState, useMemo, useCallback } from 'react';
import { ShoppingBag, ClipboardList, MessageCircle, Search, X } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import PullToRefresh from '@/components/PullToRefresh';
import { marketplaceResiduos, artesaoOrders, chats } from '@/data/mockData';
import { toast } from 'sonner';

const navItems = [
  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
  { icon: ClipboardList, label: 'Meus Pedidos', id: 'pedidos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
];

const marketplaceFilters = ['Todos', 'Algodão', 'Jeans', 'Malha', 'Seda', 'Retalhos'];

const ArtesaoDashboard = () => {
  const [tab, setTab] = useState('marketplace');
  const [marketplaceFilter, setMarketplaceFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setRefreshKey((k) => k + 1);
    toast.success('Marketplace atualizado!');
  }, []);

  const filteredResiduos = useMemo(() => {
    let items = marketplaceResiduos;
    if (marketplaceFilter !== 'Todos') {
      items = items.filter((r) =>
        r.material.toLowerCase().includes(marketplaceFilter.toLowerCase())
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (r) =>
          r.material.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.seller.toLowerCase().includes(q)
      );
    }
    return items;
  }, [marketplaceFilter, searchQuery, refreshKey]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Artesão / Reciclador" showBack={false} dashboardPath="/artesao/dashboard" />

      <main className="px-4 py-4 max-w-md mx-auto">
        <PullToRefresh onRefresh={handleRefresh}>
          <div>
            {tab === 'marketplace' && (
              <div className="space-y-3 animate-fade-in">
                <h2 className="text-section-title">Marketplace de Resíduos</h2>

                {/* ── Barra de busca ── */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por material, cidade, vendedor..."
                    className="w-full h-11 rounded-2xl border border-border bg-card pl-10 pr-10 font-sans text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* ── Filtros por categoria ── */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {marketplaceFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setMarketplaceFilter(f)}
                      className={marketplaceFilter === f ? 'chip-active' : 'chip'}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* ── Resultado da busca ── */}
                {searchQuery && (
                  <p className="font-sans text-[12px] text-muted-foreground px-1">
                    {filteredResiduos.length} resultado{filteredResiduos.length !== 1 ? 's' : ''} para "{searchQuery}"
                  </p>
                )}

                {/* ── Grid de itens ── */}
                <div className="grid grid-cols-2 gap-3">
                  {filteredResiduos.map((r, i) => (
                    <div
                      key={r.id}
                      className="card-elevated overflow-hidden animate-fade-in cursor-pointer active:scale-[0.97] transition-transform"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both', padding: 0 }}
                    >
                      <div className="aspect-square bg-muted overflow-hidden">
                        {r.image_url ? (
                          <img
                            src={r.image_url}
                            alt={r.material}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[12px] font-sans">
                            Sem imagem
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-sans font-bold text-[13px] text-foreground truncate">{r.material}</p>
                        <p className="font-sans text-[11px] text-muted-foreground mt-0.5">{r.weight} · {r.location}</p>
                        <p className="font-sans font-bold text-[14px] text-accent mt-1.5">{r.price}</p>
                        <p className="font-sans text-[10px] text-muted-foreground mt-0.5">{r.seller}</p>
                      </div>
                    </div>
                  ))}
                  {filteredResiduos.length === 0 && (
                    <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                      <Search size={32} className="text-muted-foreground mb-2" />
                      <p className="font-sans text-[13px] text-muted-foreground">
                        Nenhum resíduo encontrado.
                      </p>
                      <button
                        onClick={() => { setSearchQuery(''); setMarketplaceFilter('Todos'); }}
                        className="font-sans text-[13px] text-accent font-semibold mt-2"
                      >
                        Limpar filtros
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {tab === 'pedidos' && (
              <div className="space-y-3 animate-fade-in">
                <h2 className="text-section-title">Meus Pedidos</h2>
                {artesaoOrders.map((order, i) => (
                  <div
                    key={order.id}
                    className="card-elevated animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[15px] font-sans text-foreground">{order.title}</h3>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-[13px] text-muted-foreground font-sans">Vendedor: {order.brand}</p>
                    <p className="text-[12px] text-muted-foreground font-sans mt-1">{order.description}</p>
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
          </div>
        </PullToRefresh>
      </main>

      <BottomNav items={navItems} active={tab} onNavigate={setTab} />
    </div>
  );
};

export default ArtesaoDashboard;
