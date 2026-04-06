import { useState, useMemo, useCallback } from 'react';
import { ShoppingBag, ClipboardList, MessageCircle, Search, X, Heart, ShoppingCart } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import PullToRefresh from '@/components/PullToRefresh';
import { marketplaceResiduos, artesaoOrders, chats, type Residuo } from '@/data/mockData';
import { toast } from 'sonner';

const navItems = [
  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
  { icon: ClipboardList, label: 'Meus Pedidos', id: 'pedidos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
];

const marketplaceFilters = ['Todos', 'Algodão', 'Jeans', 'Malha', 'Seda', 'Retalhos'];

/* ── Modal de detalhes do resíduo ── */
const ResiduoModal = ({ residuo, onClose }: { residuo: Residuo; onClose: () => void }) => {
  const [favoritado, setFavoritado] = useState(false);

  const handleSolicitar = () => {
    toast.success(`Solicitação enviada para ${residuo.seller}!`, {
      description: 'O vendedor será notificado e entrará em contato.',
      duration: 4000,
    });
    onClose();
  };

  const handleChat = () => {
    toast.info(`Abrindo conversa com ${residuo.seller}...`);
    onClose();
  };

  const handleFavoritar = () => {
    setFavoritado((v) => !v);
    toast.success(favoritado ? 'Removido dos favoritos' : 'Adicionado aos favoritos!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={(e) => e.stopPropagation()}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-[460px] bg-background rounded-t-3xl shadow-2xl animate-slide-up flex flex-col" style={{ maxHeight: '85dvh' }}>
        {/* Imagem no topo */}
        {residuo.image_url && (
          <div className="w-full aspect-[16/10] bg-muted overflow-hidden rounded-t-3xl shrink-0">
            <img src={residuo.image_url} alt={residuo.material} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60 transition-colors z-10"
        >
          <X size={16} className="text-white" />
        </button>

        {/* Conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-hide">
          {/* Título e preço */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-sans font-bold text-[18px] text-foreground">{residuo.material}</h3>
              <p className="font-sans text-[13px] text-muted-foreground mt-0.5">{residuo.seller}</p>
            </div>
            <div className="text-right">
              <p className="font-sans font-extrabold text-[18px] text-accent">{residuo.price}</p>
              <p className="font-sans text-[11px] text-muted-foreground">por lote</p>
            </div>
          </div>

          {/* Detalhes */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Peso', value: residuo.weight },
              { label: 'Localização', value: residuo.location },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted rounded-xl p-3">
                <p className="font-sans text-[11px] text-muted-foreground">{label}</p>
                <p className="font-sans font-semibold text-[14px] text-foreground">{value}</p>
              </div>
            ))}
          </div>

          {/* Ações */}
          <div className="flex gap-3">
            {/* Favoritar */}
            <button
              onClick={handleFavoritar}
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                favoritado
                  ? 'bg-destructive/10 border-destructive/30 text-destructive'
                  : 'bg-muted border-border text-muted-foreground hover:text-destructive'
              }`}
            >
              <Heart size={18} className={favoritado ? 'fill-current' : ''} />
            </button>

            {/* Mensagem */}
            <button
              onClick={handleChat}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Mensagem
            </button>

            {/* Solicitar */}
            <button
              onClick={handleSolicitar}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Solicitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Dashboard principal ── */
const ArtesaoDashboard = () => {
  const [tab, setTab] = useState('marketplace');
  const [marketplaceFilter, setMarketplaceFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedResiduo, setSelectedResiduo] = useState<Residuo | null>(null);

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

      {/* Modal de detalhes */}
      {selectedResiduo && (
        <ResiduoModal residuo={selectedResiduo} onClose={() => setSelectedResiduo(null)} />
      )}

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

                {/* ── Filtros ── */}
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

                {searchQuery && (
                  <p className="font-sans text-[12px] text-muted-foreground px-1">
                    {filteredResiduos.length} resultado{filteredResiduos.length !== 1 ? 's' : ''} para "{searchQuery}"
                  </p>
                )}

                {/* ── Grid ── */}
                <div className="grid grid-cols-2 gap-3">
                  {filteredResiduos.map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedResiduo(r)}
                      className="card-elevated overflow-hidden animate-fade-in active:scale-[0.97] transition-transform text-left"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both', padding: 0 }}
                    >
                      <div className="aspect-square bg-muted overflow-hidden">
                        {r.image_url ? (
                          <img src={r.image_url} alt={r.material} className="w-full h-full object-cover" loading="lazy" />
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
                    </button>
                  ))}
                  {filteredResiduos.length === 0 && (
                    <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                      <Search size={32} className="text-muted-foreground mb-2" />
                      <p className="font-sans text-[13px] text-muted-foreground">Nenhum resíduo encontrado.</p>
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
