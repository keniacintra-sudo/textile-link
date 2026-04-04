import { useState, useEffect, useCallback } from 'react';
import { Search, Briefcase, Trash2, MessageCircle, Plus, ToggleLeft, ToggleRight, List, Map, FileText, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import RegistrarResiduoForm from '@/components/RegistrarResiduoForm';
import EnviarPropostaModal, { type Proposal } from '@/components/EnviarPropostaModal';
import PullToRefresh from '@/components/PullToRefresh';
import { faccaoOrders, chats, type Order } from '@/data/mockData';
import { toast } from 'sonner';

const wasteLots = [
  { id: 1, name: 'Retalhos de Algodão', weight: '8kg', price: 'R$ 45,00', bairro: 'Bairro Bom Pastor' },
  { id: 2, name: 'Sobras de Viscose', weight: '3kg', price: 'R$ 28,00', bairro: 'Centro' },
  { id: 3, name: 'Malha Mista', weight: '12kg', price: 'R$ 60,00', bairro: 'Niterói' },
  { id: 4, name: 'Jeans Retalho', weight: '5kg', price: 'R$ 35,00', bairro: 'São José' },
];

const navItems = [
  { icon: Search, label: 'Oportunidades', id: 'oportunidades' },
  { icon: Briefcase, label: 'Meus Serviços', id: 'servicos' },
  { icon: FileText, label: 'Propostas', id: 'propostas' },
  { icon: Trash2, label: 'Resíduos', id: 'residuos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
];

const FaccaoDashboard = () => {
  const [tab, setTab] = useState('oportunidades');
  const [available, setAvailable] = useState(true);
  const [residuosView, setResiduosView] = useState<'lista' | 'mapa'>('lista');
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [justSentId, setJustSentId] = useState<string | null>(null);

  const handleRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Oportunidades atualizadas!');
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('elo_proposals') || '[]');
    setProposals(saved);
  }, []);

  const handleProposalSubmit = (proposal: Proposal) => {
    const updated = [...proposals, proposal];
    setProposals(updated);
    localStorage.setItem('elo_proposals', JSON.stringify(updated));
    setSelectedOrder(null);
    setTab('propostas');
    setJustSentId(proposal.id);
    toast.success('Proposta enviada!', {
      description: `Para "${proposal.order_title}" — R$${proposal.preco_por_peca}/peça · ${proposal.prazo_dias} dias`,
      duration: 4000,
    });
    setTimeout(() => setJustSentId(null), 3000);
  };

  const proposalStatusLabel = (status: Proposal['status']) => {
    if (status === 'aceita') return { label: 'ACEITA', cls: 'bg-primary/10 text-primary' };
    if (status === 'recusada') return { label: 'RECUSADA', cls: 'bg-destructive/10 text-destructive' };
    return { label: 'ENVIADA', cls: 'bg-accent text-accent-foreground' };
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Facção / Confecção" showBack={false} dashboardPath="/faccao/dashboard" />

      {selectedOrder && (
        <EnviarPropostaModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSubmit={handleProposalSubmit}
        />
      )}

      <div className="px-4 py-4 max-w-md mx-auto">
        <PullToRefresh onRefresh={handleRefresh}>
          <main>
            {tab === 'oportunidades' && (
              <div className="space-y-3 animate-fade-in">
                <h2 className="text-section-title">Oportunidades</h2>
                {faccaoOrders.filter(o => o.status === 'ATIVO' || o.status === 'PROPOSTA').map((order, i) => (
                  <div
                    key={order.id}
                    className="card-elevated animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-[15px] font-sans text-foreground">{order.title}</h3>
                        <p className="text-[13px] text-muted-foreground font-sans">{order.brand}</p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-[13px] text-muted-foreground font-sans mt-1">{order.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-4 text-[13px] text-muted-foreground font-sans">
                        <span>{order.quantity} peças</span>
                        <span>Prazo: {order.deadline}</span>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="btn-primary !text-[13px] !py-1.5 !px-4 active:scale-95 transition-transform"
                      >
                        Enviar Proposta
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'servicos' && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-section-title">Meus Serviços</h2>
                  <button
                    onClick={() => setAvailable(!available)}
                    className="flex items-center gap-2 text-sm font-sans"
                  >
                    {available ? (
                      <ToggleRight size={28} className="text-accent" />
                    ) : (
                      <ToggleLeft size={28} className="text-muted-foreground" />
                    )}
                    <span className={`font-semibold ${available ? 'text-accent' : 'text-muted-foreground'}`}>
                      {available ? 'Disponível' : 'Indisponível'}
                    </span>
                  </button>
                </div>
                {faccaoOrders.filter(o => o.status === 'EM PRODUÇÃO').map((order, i) => (
                  <div
                    key={order.id}
                    className="card-elevated animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[15px] font-sans text-foreground">{order.title}</h3>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-[13px] text-muted-foreground font-sans">{order.brand} — {order.description}</p>
                    <p className="text-[12px] text-muted-foreground font-sans mt-1">Prazo: {order.deadline}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'propostas' && (
              <div className="animate-fade-in">
                <h2 className="text-section-title mb-3">Minhas Propostas</h2>
                {proposals.length === 0 ? (
                  <div className="card-elevated text-center py-10">
                    <FileText size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-[13px] text-muted-foreground font-sans">Nenhuma proposta enviada ainda.</p>
                    <p className="text-[12px] text-muted-foreground font-sans mt-1">Vá em Oportunidades e envie sua primeira proposta!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {proposals.map((p, i) => {
                      const st = proposalStatusLabel(p.status);
                      return (
                        <div
                          key={p.id}
                          className={`card-elevated animate-slide-up transition-all ${justSentId === p.id ? 'ring-2 ring-accent/40' : ''}`}
                          style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-[15px] font-sans text-foreground">{p.order_title}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider font-sans ${st.cls}`}>
                              {st.label}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
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
                        </div>
                      );
                    })}
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
                      <h2 className="text-section-title">Resíduos</h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowRegistrar(true)}
                          className="btn-primary flex items-center gap-1.5 !text-sm !py-2 !px-4 active:scale-95 transition-transform"
                        >
                          <Plus size={16} /> Registrar
                        </button>
                        <div className="flex bg-muted rounded-lg overflow-hidden">
                          <button
                            onClick={() => setResiduosView('lista')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors font-sans ${
                              residuosView === 'lista' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            <List size={14} /> Lista
                          </button>
                          <button
                            onClick={() => setResiduosView('mapa')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors font-sans ${
                              residuosView === 'mapa' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            <Map size={14} /> Mapa
                          </button>
                        </div>
                      </div>
                    </div>

                    {residuosView === 'lista' ? (
                      <div className="space-y-3">
                        {wasteLots.map((lot, i) => (
                          <div
                            key={lot.id}
                            className="card-elevated animate-slide-up"
                            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                          >
                            <p className="font-bold text-[15px] font-sans text-foreground">📦 {lot.name}</p>
                            <p className="text-[13px] text-muted-foreground mt-1 font-sans">{lot.weight} · {lot.price} · {lot.bairro}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-full h-48 bg-muted rounded-2xl flex items-center justify-center">
                          <Map size={32} className="text-muted-foreground" />
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                          {wasteLots.map(lot => (
                            <div
                              key={lot.id}
                              className="min-w-[200px] card-elevated border-l-4 border-l-primary flex-shrink-0"
                            >
                              <p className="font-bold text-[15px] font-sans text-foreground">📦 {lot.name}</p>
                              <p className="text-[13px] text-muted-foreground mt-1 font-sans">{lot.weight} · {lot.price}</p>
                              <p className="text-[13px] text-muted-foreground font-sans">{lot.bairro}</p>
                              <button
                                onClick={() => toast.success('Solicitação enviada! A facção será notificada.')}
                                className="btn-primary mt-2.5 w-full !text-[13px] !py-1.5 active:scale-95 transition-transform"
                              >
                                Solicitar
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
          </main>
        </PullToRefresh>
      </div>

      <BottomNav items={navItems} active={tab} onNavigate={setTab} />
    </div>
  );
};

export default FaccaoDashboard;
