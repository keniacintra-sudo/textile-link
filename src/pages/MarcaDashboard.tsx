import { useState, useMemo } from 'react';
import { Package, Trash2, MessageCircle, User, Plus, Star } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import RegistrarResiduoForm from '@/components/RegistrarResiduoForm';
import { marcaOrders, marcaResiduos, chats } from '@/data/mockData';

const navItems = [
  { icon: Package, label: 'Produção', id: 'producao' },
  { icon: Trash2, label: 'Resíduos', id: 'residuos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
  { icon: User, label: 'Perfil', id: 'perfil' },
];

const producaoFilters = ['Todos', 'Camisetas', 'Vestidos', 'Calças', 'Jaquetas'];

const MarcaDashboard = () => {
  const [tab, setTab] = useState('producao');
  const [producaoFilter, setProducaoFilter] = useState('Todos');

  const filteredOrders = useMemo(() => {
    if (producaoFilter === 'Todos') return marcaOrders;
    return marcaOrders.filter(o =>
      o.title.toLowerCase().includes(producaoFilter.toLowerCase()) ||
      o.description.toLowerCase().includes(producaoFilter.toLowerCase())
    );
  }, [producaoFilter]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Marca / Designer" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'producao' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-heading font-semibold text-lg">Pedidos</h2>
              <button className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground bg-primary px-3 py-2 rounded-xl active:scale-95 transition-transform">
                <Plus size={16} /> Novo Pedido
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              {producaoFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setProducaoFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    producaoFilter === f
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground border border-border'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {filteredOrders.map((order, i) => (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-border animate-fade-in"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground">{order.description}</p>
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{order.quantity} peças</span>
                  <span>Prazo: {order.deadline}</span>
                </div>
              </div>
            ))}
            {filteredOrders.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">Nenhum pedido encontrado.</p>
            )}
          </div>
        )}

        {tab === 'residuos' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-heading font-semibold text-lg">Resíduos Têxteis</h2>
              <button className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground bg-primary px-3 py-2 rounded-xl active:scale-95 transition-transform">
                <Plus size={16} /> Registrar
              </button>
            </div>
            {marcaResiduos.map((r, i) => (
              <div
                key={r.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-border animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <h3 className="font-semibold text-sm">{r.material}</h3>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{r.weight}</span>
                  <span>{r.location}</span>
                  <span className="font-semibold text-foreground">{r.price}</span>
                </div>
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

        {tab === 'perfil' && (
          <div className="animate-fade-in">
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary text-2xl font-bold">
                AV
              </div>
              <h2 className="font-heading font-semibold text-lg">Atelier Verde</h2>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star size={14} className="text-accent fill-accent" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-xs text-muted-foreground">(127 avaliações)</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Marca sustentável de moda feminina, focada em materiais orgânicos e produção ética.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-lg font-bold text-primary">23</p>
                  <p className="text-[10px] text-muted-foreground">Pedidos</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-lg font-bold text-primary">8</p>
                  <p className="text-[10px] text-muted-foreground">Facções</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-lg font-bold text-primary">57kg</p>
                  <p className="text-[10px] text-muted-foreground">Reciclado</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav items={navItems} active={tab} onNavigate={setTab} />
    </div>
  );
};

export default MarcaDashboard;
