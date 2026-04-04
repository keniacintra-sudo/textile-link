import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, Hash, Building2, MessageCircle, CheckCircle2, Truck, FileText, ChevronRight } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import SugerirFaccoes from '@/components/SugerirFaccoes';
import { allOrders } from '@/data/mockData';

const statusSteps = [
  { key: 'ATIVO', label: 'Publicado', icon: FileText },
  { key: 'PROPOSTA', label: 'Com propostas', icon: MessageCircle },
  { key: 'EM PRODUÇÃO', label: 'Em produção', icon: Truck },
  { key: 'CONCLUÍDO', label: 'Concluído', icon: CheckCircle2 },
];

const stepIndex = (status: string) =>
  statusSteps.findIndex((s) => s.key === status);

const DetalhesPedido = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const order = allOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-6 text-center">
        <Package size={40} className="text-muted-foreground mb-3" />
        <p className="text-muted-foreground font-sans text-[15px]">Pedido não encontrado</p>
        <button onClick={() => navigate(-1)} className="btn-primary mt-6">Voltar</button>
      </div>
    );
  }

  const currentStep = stepIndex(order.status);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">

      {/* ── Header ── */}
      <header
        className="shrink-0 flex items-center gap-3 px-5 py-3"
        style={{
          background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 16%))',
          borderBottom: '1px solid hsla(210, 40%, 98%, 0.1)',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="font-sans font-bold text-[17px] text-white tracking-tight">
          Detalhes do Pedido
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-hide">

        {/* ── Card principal ── */}
        <div className="card-elevated animate-fade-in">
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-sans font-bold text-[18px] text-foreground leading-snug">
              {order.title}
            </h2>
            <StatusBadge status={order.status} />
          </div>
          <p className="font-sans text-[13px] text-muted-foreground leading-relaxed">
            {order.details || order.description}
          </p>
        </div>

        {/* ── Progresso do status ── */}
        <div className="card-elevated animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <h3 className="font-sans font-bold text-[14px] text-foreground mb-4">
            Andamento
          </h3>
          <div className="flex items-center justify-between px-2">
            {statusSteps.map((step, i) => {
              const done = i <= currentStep;
              const active = i === currentStep;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-col items-center gap-1.5 relative flex-1">
                  {/* Linha conectora */}
                  {i < statusSteps.length - 1 && (
                    <div
                      className="absolute top-4 left-[55%] h-0.5 w-[90%]"
                      style={{
                        background: done && i < currentStep ? 'hsl(var(--accent))' : 'hsl(var(--border))',
                      }}
                    />
                  )}
                  {/* Ícone */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${
                      active ? 'bg-accent text-accent-foreground ring-2 ring-accent/30' :
                      done ? 'bg-accent/20 text-accent' :
                      'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                  {/* Label */}
                  <span className={`font-sans text-[10px] text-center leading-tight ${
                    active ? 'font-bold text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Informações ── */}
        <div className="card-elevated animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h3 className="font-sans font-bold text-[14px] text-foreground mb-3">
            Informações
          </h3>
          <div className="space-y-3">
            {[
              { icon: Building2, label: 'Marca', value: order.brand },
              { icon: Hash, label: 'Quantidade', value: `${order.quantity} peças` },
              { icon: Calendar, label: 'Prazo de entrega', value: order.deadline },
              { icon: Package, label: 'Categoria', value: order.category || 'Geral' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-sans text-[11px] text-muted-foreground">{label}</p>
                  <p className="font-sans font-semibold text-[14px] text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Propostas recebidas ── */}
        {order.proposals && order.proposals.length > 0 && (
          <div className="card-elevated animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <h3 className="font-sans font-bold text-[14px] text-foreground mb-3">
              Propostas recebidas
            </h3>
            <div className="space-y-2.5">
              {order.proposals.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center font-sans font-bold text-[11px] text-accent shrink-0">
                    {p.faccao.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-semibold text-[13px] text-foreground truncate">{p.faccao}</p>
                    <p className="font-sans text-[11px] text-muted-foreground">
                      R${p.preco}/peça · {p.prazo} dias
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans ${
                    p.status === 'aceita' ? 'bg-primary/10 text-primary' :
                    p.status === 'recusada' ? 'bg-destructive/10 text-destructive' :
                    'bg-accent text-accent-foreground'
                  }`}>
                    {p.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Histórico ── */}
        {order.history && order.history.length > 0 && (
          <div className="card-elevated animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            <h3 className="font-sans font-bold text-[14px] text-foreground mb-3">
              Histórico
            </h3>
            <div className="relative pl-5">
              <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-border" />
              <div className="space-y-3">
                {order.history.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className="absolute left-[-13px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-2 ring-background" />
                    <div>
                      <p className="font-sans font-semibold text-[13px] text-foreground">{h.evento}</p>
                      <p className="font-sans text-[11px] text-muted-foreground">{h.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Sugestão de Facções por IA ── */}
        <div className="animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
          <SugerirFaccoes order={order} />
        </div>

        {/* ── Ações ── */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex-1"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate('/chat/1')}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} /> Contato
          </button>
        </div>

      </main>
    </div>
  );
};

export default DetalhesPedido;
