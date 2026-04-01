import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Trash2, MessageCircle, User, Plus, Star, FileText, Check, X } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import RegistrarResiduoForm from '@/components/RegistrarResiduoForm';
import { marcaOrders, marcaResiduos, chats, type Order } from '@/data/mockData';
import type { Proposal } from '@/components/EnviarPropostaModal';
import { toast } from 'sonner';

const navItems = [
  { icon: Package, label: 'Produção', id: 'producao' },
  { icon: Trash2, label: 'Resíduos', id: 'residuos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
  { icon: User, label: 'Perfil', id: 'perfil' },
];

const producaoFilters = ['Todos', 'Camisetas', 'Vestidos', 'Calças', 'Jaquetas'];

const MarcaDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('producao');
  const [producaoFilter, setProducaoFilter] = useState('Todos');
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [customOrders, setCustomOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('elo_custom_orders') || '[]');
    setCustomOrders(saved);
  }, []);

  const allOrders = useMemo(() => [...marcaOrders, ...customOrders], [customOrders]);

  const filteredOrders = useMemo(() => {
    if (producaoFilter === 'Todos') return allOrders;
    return allOrders.filter(o =>
      o.title.toLowerCase().includes(producaoFilter.toLowerCase()) ||
      o.description.toLowerCase().includes(producaoFilter.toLowerCase())
    );
  }, [producaoFilter, allOrders]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Marca / Designer" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'producao' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-section-title">Pedidos</h2>
              <button
                onClick={() => navigate('/marca/novo-pedido')}
                className="btn-primary flex items-center gap-1.5 text-sm !py-2 !px-4 active:scale-95 transition-transform"
              >
                <Plus size={16} /> Novo Pedido
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              {producaoFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setProducaoFilter(f)}
                  className={producaoFilter === f ? 'chip-active' : 'chip'}
                >
                  {f}
                </button>
              ))}
            </div>
            {filteredOrders.map((order, i) => (
              <div
                key={order.id}
                className="card-elevated animate-fade-in"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[15px] font-sans text-foreground">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[13px] text-muted-foreground font-sans">{order.description}</p>
                <div className="flex gap-4 mt-3 text-[13px] text-muted-foreground font-sans">
                  <span>{order.quantity} peças</span>
                  <span>Prazo: {order.deadline}</span>
                </div>
              </div>
            ))}
            {filteredOrders.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8 font-sans">Nenhum pedido encontrado.</p>
            )}
          </div>
        )}

        {tab === 'residuos' && (
          <div className="space-y-3 animate-fade-in">
            {showRegistrar ? (
              <RegistrarResiduoForm onClose={() => setShowRegistrar(false)} />
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-section-title">Resíduos Têxteis</h2>
                  <button
                    onClick={() => setShowRegistrar(true)}
                    className="btn-primary flex items-center gap-1.5 text-sm !py-2 !px-4 active:scale-95 transition-transform"
                  >
                    <Plus size={16} /> Registrar
                  </button>
                </div>
                {marcaResiduos.map((r, i) => (
                  <div
                    key={r.id}
                    className="card-elevated animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <h3 className="font-bold text-[15px] font-sans text-foreground">{r.material}</h3>
                    <div className="flex gap-4 mt-2 text-[13px] text-muted-foreground font-sans">
                      <span>{r.weight}</span>
                      <span>{r.location}</span>
                      <span className="text-metric-sm text-[13px]">{r.price}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {tab === 'mensagens' && (
          <div className="animate-fade-in">
            <h2 className="text-section-title mb-3">Mensagens</h2>
            <ChatList chats={chats} />
          </div>
        )}

        {tab === 'perfil' && (
          <div className="animate-fade-in">
            <div className="card-elevated text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary text-2xl font-bold font-heading">
                AV
              </div>
              <h2 className="text-section-title">Atelier Verde</h2>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star size={14} className="text-warning fill-warning" />
                <span className="text-sm font-medium font-sans">4.8</span>
                <span className="text-[13px] text-muted-foreground font-sans">(127 avaliações)</span>
              </div>
              <p className="text-[13px] text-muted-foreground mt-3 leading-relaxed font-sans">
                Marca sustentável de moda feminina, focada em materiais orgânicos e produção ética.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-muted rounded-2xl p-3">
                  <p className="text-metric text-lg">23</p>
                  <p className="text-[10px] text-muted-foreground font-sans">Pedidos</p>
                </div>
                <div className="bg-muted rounded-2xl p-3">
                  <p className="text-metric text-lg">8</p>
                  <p className="text-[10px] text-muted-foreground font-sans">Facções</p>
                </div>
                <div className="bg-muted rounded-2xl p-3">
                  <p className="text-metric text-lg">57kg</p>
                  <p className="text-[10px] text-muted-foreground font-sans">Reciclado</p>
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