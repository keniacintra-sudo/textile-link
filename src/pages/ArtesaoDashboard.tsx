import { useState, useMemo } from 'react';
import { ShoppingBag, ClipboardList, MessageCircle, LayoutDashboard, Package, ShoppingCart, TrendingUp, CheckCircle2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import SummaryCard from '@/components/SummaryCard';
import MiniChart from '@/components/MiniChart';
import { marketplaceResiduos, artesaoOrders, chats } from '@/data/mockData';

const navItems = [
  { icon: LayoutDashboard, label: 'Painel', id: 'painel' },
  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
  { icon: ClipboardList, label: 'Pedidos', id: 'pedidos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
];

const marketplaceFilters = ['Todos', 'Algodão', 'Jeans', 'Malha', 'Seda', 'Retalhos'];

const salesChartData = [
  { name: 'Jan', value: 2 },
  { name: 'Fev', value: 3 },
  { name: 'Mar', value: 5 },
  { name: 'Abr', value: 4 },
  { name: 'Mai', value: 7 },
  { name: 'Jun', value: 6 },
];

const requestsChartData = [
  { name: 'Jan', value: 4, value2: 1 },
  { name: 'Fev', value: 6, value2: 2 },
  { name: 'Mar', value: 5, value2: 3 },
  { name: 'Abr', value: 8, value2: 2 },
  { name: 'Mai', value: 7, value2: 4 },
  { name: 'Jun', value: 10, value2: 3 },
];

// Mock purchase requests
const purchaseRequests = [
  { id: '1', buyer: 'Atelier Verde', material: 'Jeans reciclado', quantity: '15 kg', status: 'Nova' as const },
  { id: '2', buyer: 'ModaCorp', material: 'Malha de algodão', quantity: '10 kg', status: 'Em negociação' as const },
  { id: '3', buyer: 'UrbanWear', material: 'Retalhos de seda', quantity: '5 kg', status: 'Concluída' as const },
];

const requestStatusStyle = (status: string) => {
  if (status === 'Concluída') return 'bg-primary/10 text-primary';
  if (status === 'Em negociação') return 'bg-warning/20 text-warning-foreground';
  return 'bg-muted text-muted-foreground';
};

const ArtesaoDashboard = () => {
  const [tab, setTab] = useState('painel');
  const [marketplaceFilter, setMarketplaceFilter] = useState('Todos');

  const filteredResiduos = useMemo(() => {
    if (marketplaceFilter === 'Todos') return marketplaceResiduos;
    return marketplaceResiduos.filter(r =>
      r.material.toLowerCase().includes(marketplaceFilter.toLowerCase())
    );
  }, [marketplaceFilter]);

  const materialsCount = marketplaceResiduos.length;
  const requestsCount = purchaseRequests.length;
  const salesCount = purchaseRequests.filter(r => r.status === 'Concluída').length;
  const activeItems = artesaoOrders.length;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Painel do Artesão" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'painel' && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-section-title">Visão Geral</h2>

            <div className="grid grid-cols-2 gap-3">
              <SummaryCard icon={Package} label="Materiais Disponíveis" value={materialsCount} delay={0} />
              <SummaryCard icon={ShoppingCart} label="Solicitações Recebidas" value={requestsCount} delay={60} />
              <SummaryCard icon={CheckCircle2} label="Vendas Realizadas" value={salesCount} delay={120} />
              <SummaryCard icon={TrendingUp} label="Itens Ativos" value={activeItems} delay={180} />
            </div>

            <MiniChart
              title="Vendas ao longo do tempo"
              data={salesChartData}
              type="area"
              delay={240}
            />
            <MiniChart
              title="Solicitações: novas vs concluídas"
              data={requestsChartData}
              type="bar"
              color="hsl(152, 65%, 29%)"
              color2="hsl(28, 30%, 41%)"
              delay={300}
            />

            {/* Purchase Requests */}
            <div className="card-elevated animate-slide-up" style={{ animationDelay: '360ms', animationFillMode: 'both' }}>
              <p className="text-[13px] font-bold font-sans text-foreground mb-3">Solicitações de Compra</p>
              {purchaseRequests.length === 0 ? (
                <p className="text-[13px] text-muted-foreground font-sans text-center py-4">Nenhuma solicitação recebida.</p>
              ) : (
                <div className="space-y-3">
                  {purchaseRequests.map((req, i) => (
                    <div key={req.id} className="py-2" style={i < purchaseRequests.length - 1 ? { borderBottom: '1px solid hsl(var(--border))' } : {}}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[13px] font-bold font-sans text-foreground">{req.material}</p>
                          <p className="text-[11px] text-muted-foreground font-sans">{req.buyer} · {req.quantity}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider font-sans ${requestStatusStyle(req.status)}`}>
                          {req.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setTab('pedidos')}
                className="w-full mt-3 text-[13px] text-primary font-bold font-sans py-2 rounded-xl hover:bg-primary/5 transition-colors"
              >
                Ver todos →
              </button>
            </div>

            {/* My Materials Preview */}
            <div className="card-elevated animate-slide-up" style={{ animationDelay: '420ms', animationFillMode: 'both' }}>
              <p className="text-[13px] font-bold font-sans text-foreground mb-3">Meus Materiais</p>
              <div className="space-y-2">
                {marketplaceResiduos.slice(0, 3).map((r, i) => (
                  <div key={r.id} className="flex items-center gap-3 py-1.5" style={i < 2 ? { borderBottom: '1px solid hsl(var(--border))' } : {}}>
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {r.image_url ? (
                        <img src={r.image_url} alt={r.material} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={14} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold font-sans text-foreground truncate">{r.material}</p>
                      <p className="text-[11px] text-muted-foreground font-sans">{r.weight} · {r.location}</p>
                    </div>
                    <p className="text-metric-sm text-[13px] flex-shrink-0">{r.price}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setTab('marketplace')}
                className="w-full mt-3 text-[13px] text-primary font-bold font-sans py-2 rounded-xl hover:bg-primary/5 transition-colors"
              >
                Ver marketplace →
              </button>
            </div>
          </div>
        )}

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
                <div className="col-span-2 card-elevated text-center py-10">
                  <ShoppingBag size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-[13px] text-muted-foreground font-sans">Nenhum resíduo encontrado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'pedidos' && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-section-title mb-2">Meus Pedidos</h2>
            {artesaoOrders.length === 0 ? (
              <div className="card-elevated text-center py-10">
                <ClipboardList size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-[13px] text-muted-foreground font-sans">Você ainda não tem pedidos.</p>
                <p className="text-[12px] text-muted-foreground font-sans mt-1">Explore o marketplace para encontrar materiais!</p>
              </div>
            ) : (
              <div className="space-y-3">
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

            {/* Purchase Requests Section */}
            <h2 className="text-section-title mt-6">Solicitações de Compra</h2>
            <div className="space-y-3">
              {purchaseRequests.map((req, i) => (
                <div
                  key={req.id}
                  className="card-elevated animate-slide-up"
                  style={{ animationDelay: `${(i + artesaoOrders.length) * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-[15px] font-sans text-foreground">{req.material}</h3>
                      <p className="text-[13px] text-muted-foreground font-sans">Solicitado por: {req.buyer}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider font-sans ${requestStatusStyle(req.status)}`}>
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[13px] text-muted-foreground font-sans mt-1">Quantidade: {req.quantity}</p>
                </div>
              ))}
            </div>
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
