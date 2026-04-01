import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Trash2, MessageCircle, User, Plus, Star, FileText, Check, X, LayoutDashboard, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import SummaryCard from '@/components/SummaryCard';
import MiniChart from '@/components/MiniChart';
import RegistrarResiduoForm from '@/components/RegistrarResiduoForm';
import { marcaOrders, marcaResiduos, chats, type Order } from '@/data/mockData';
import type { Proposal } from '@/components/EnviarPropostaModal';
import { toast } from 'sonner';

const navItems = [
  { icon: LayoutDashboard, label: 'Painel', id: 'painel' },
  { icon: Package, label: 'Pedidos', id: 'producao' },
  { icon: FileText, label: 'Propostas', id: 'propostas' },
  { icon: Trash2, label: 'Resíduos', id: 'residuos' },
  { icon: User, label: 'Perfil', id: 'perfil' },
];

const producaoFilters = ['Todos', 'Camisetas', 'Vestidos', 'Calças', 'Jaquetas'];

const ordersChartData = [
  { name: 'Jan', value: 3 },
  { name: 'Fev', value: 5 },
  { name: 'Mar', value: 4 },
  { name: 'Abr', value: 7 },
  { name: 'Mai', value: 6 },
  { name: 'Jun', value: 9 },
];

const proposalsChartData = [
  { name: 'Jan', value: 2, value2: 1 },
  { name: 'Fev', value: 4, value2: 1 },
  { name: 'Mar', value: 3, value2: 2 },
  { name: 'Abr', value: 5, value2: 1 },
  { name: 'Mai', value: 6, value2: 2 },
  { name: 'Jun', value: 8, value2: 3 },
];

const MarcaDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('painel');
  const [producaoFilter, setProducaoFilter] = useState('Todos');
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [customOrders, setCustomOrders] = useState<Order[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('elo_custom_orders') || '[]');
    setCustomOrders(saved);
    const savedProposals = JSON.parse(localStorage.getItem('elo_proposals') || '[]');
    setProposals(savedProposals);
  }, []);

  const allOrders = useMemo(() => [...marcaOrders, ...customOrders], [customOrders]);

  const filteredOrders = useMemo(() => {
    if (producaoFilter === 'Todos') return allOrders;
    return allOrders.filter(o =>
      o.title.toLowerCase().includes(producaoFilter.toLowerCase()) ||
      o.description.toLowerCase().includes(producaoFilter.toLowerCase())
    );
  }, [producaoFilter, allOrders]);

  const updateProposalStatus = (id: string, status: 'aceita' | 'recusada') => {
    const updated = proposals.map(p => p.id === id ? { ...p, status } : p);
    setProposals(updated);
    localStorage.setItem('elo_proposals', JSON.stringify(updated));
    toast.success(status === 'aceita' ? 'Proposta aceita!' : 'Proposta recusada.');
  };

  const activeCount = allOrders.filter(o => o.status === 'ATIVO').length;
  const proposalCount = proposals.length;
  const inProductionCount = allOrders.filter(o => o.status === 'EM PRODUÇÃO').length;
  const finishedCount = allOrders.filter(o => o.status === 'CONCLUÍDO').length;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Meu Painel" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'painel' && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-section-title">Visão Geral</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard icon={Package} label="Pedidos Ativos" value={activeCount} delay={0} />
              <SummaryCard icon={FileText} label="Propostas Recebidas" value={proposalCount} delay={60} />
              <SummaryCard icon={TrendingUp} label="Em Produção" value={inProductionCount} delay={120} />
              <SummaryCard icon={CheckCircle2} label="Finalizados" value={finishedCount} delay={180} />
            </div>

            {/* Charts */}
            <MiniChart
              title="Pedidos ao longo do tempo"
              data={ordersChartData}
              type="area"
              delay={240}
            />
            <MiniChart
              title="Propostas: aceitas vs recusadas"
              data={proposalsChartData}
              type="bar"
              color="hsl(152, 65%, 29%)"
              color2="hsl(0, 84%, 60%)"
              delay={300}
            />

            {/* Recent Activity */}
            <div className="card-elevated animate-slide-up" style={{ animationDelay: '360ms', animationFillMode: 'both' }}>
              <p className="text-[13px] font-bold font-sans text-foreground mb-3">Atividade Recente</p>
              <div className="space-y-3">
                {allOrders.slice(0, 3).map((order, i) => (
                  <div key={order.id} className="flex items-center justify-between py-1.5" style={i < 2 ? { borderBottom: '1px solid hsl(var(--border))' } : {}}>
                    <div>
                      <p className="text-[13px] font-bold font-sans text-foreground">{order.title}</p>
                      <p className="text-[11px] text-muted-foreground font-sans">{order.quantity} peças · {order.deadline}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setTab('producao')}
                className="w-full mt-3 text-[13px] text-primary font-bold font-sans py-2 rounded-xl hover:bg-primary/5 transition-colors"
              >
                Ver todos os pedidos →
              </button>
            </div>
          </div>
        )}

        {tab === 'producao' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-section-title">Meus Pedidos</h2>
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
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-4 text-[13px] text-muted-foreground font-sans">
                    <span>{order.quantity} peças</span>
                    <span>Prazo: {order.deadline}</span>
                  </div>
                  {(order.status === 'ATIVO' || order.status === 'PROPOSTA') && (
                    <button
                      onClick={() => setTab('propostas')}
                      className="text-[12px] font-bold font-sans text-primary active:scale-95 transition-transform"
                    >
                      Ver Propostas
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredOrders.length === 0 && (
              <div className="card-elevated text-center py-10">
                <Package size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-[13px] text-muted-foreground font-sans">Você ainda não tem pedidos.</p>
                <button
                  onClick={() => navigate('/marca/novo-pedido')}
                  className="btn-primary mt-4 !text-[13px] !py-2 !px-5 active:scale-95 transition-transform"
                >
                  Criar primeiro pedido
                </button>
              </div>
            )}
          </div>
        )}

        {tab === 'propostas' && (
          <div className="animate-fade-in">
            <h2 className="text-section-title mb-3">Propostas Recebidas</h2>
            {proposals.length === 0 ? (
              <div className="card-elevated text-center py-10">
                <FileText size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-[13px] text-muted-foreground font-sans">Nenhuma proposta recebida.</p>
                <p className="text-[12px] text-muted-foreground font-sans mt-1">As facções enviarão propostas para seus pedidos.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {proposals.map((p, i) => (
                  <div
                    key={p.id}
                    className="card-elevated animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-[15px] font-sans text-foreground">{p.order_title}</h3>
                        <p className="text-[13px] text-muted-foreground font-sans">por {p.faccao_nome}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider font-sans ${
                        p.status === 'aceita' ? 'bg-primary/10 text-primary' :
                        p.status === 'recusada' ? 'bg-destructive/10 text-destructive' :
                        'bg-accent/10 text-accent'
                      }`}>
                        {p.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="bg-muted rounded-xl p-2 text-center">
                        <p className="text-metric text-base">R${p.preco_por_peca}</p>
                        <p className="text-[10px] text-muted-foreground font-sans">por peça</p>
                      </div>
                      <div className="bg-muted rounded-xl p-2 text-center">
                        <p className="text-metric text-base">{p.prazo_dias}d</p>
                        <p className="text-[10px] text-muted-foreground font-sans">prazo</p>
                      </div>
                      <div className="bg-muted rounded-xl p-2 text-center">
                        <p className="text-metric text-base">{p.quantidade}</p>
                        <p className="text-[10px] text-muted-foreground font-sans">peças</p>
                      </div>
                    </div>
                    {p.mensagem && (
                      <p className="text-[12px] text-muted-foreground font-sans mt-2 line-clamp-2">"{p.mensagem}"</p>
                    )}
                    {p.status === 'enviada' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateProposalStatus(p.id, 'aceita')}
                          className="btn-primary flex-1 flex items-center justify-center gap-1.5 !text-[13px] !py-2 active:scale-95 transition-transform"
                        >
                          <Check size={15} /> Aceitar
                        </button>
                        <button
                          onClick={() => updateProposalStatus(p.id, 'recusada')}
                          className="btn-outline flex-1 flex items-center justify-center gap-1.5 !text-[13px] !py-2 active:scale-95 transition-transform"
                        >
                          <X size={15} /> Recusar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
