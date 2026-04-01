import { useState } from 'react';
import { Search, Briefcase, Trash2, MessageCircle, Plus, ToggleLeft, ToggleRight, List, Map } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import ChatList from '@/components/ChatList';
import RegistrarResiduoForm from '@/components/RegistrarResiduoForm';
import { faccaoOrders, chats } from '@/data/mockData';
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
  { icon: Trash2, label: 'Resíduos', id: 'residuos' },
  { icon: MessageCircle, label: 'Mensagens', id: 'mensagens' },
];

const FaccaoDashboard = () => {
  const [tab, setTab] = useState('oportunidades');
  const [available, setAvailable] = useState(true);
  const [residuosView, setResiduosView] = useState<'lista' | 'mapa'>('lista');
  const [showRegistrar, setShowRegistrar] = useState(false);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <PageHeader title="Facção / Confecção" />

      <main className="px-4 py-4 max-w-md mx-auto">
        {tab === 'oportunidades' && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="font-heading font-semibold text-lg mb-2">Oportunidades</h2>
            {faccaoOrders.filter(o => o.status === 'ATIVO' || o.status === 'PROPOSTA').map((order, i) => (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-border animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{order.title}</h3>
                    <p className="text-xs text-muted-foreground">{order.brand}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground">{order.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{order.quantity} peças</span>
                    <span>Prazo: {order.deadline}</span>
                  </div>
                  <button className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
                    Enviar Proposta
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'servicos' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-semibold text-lg">Meus Serviços</h2>
              <button
                onClick={() => setAvailable(!available)}
                className="flex items-center gap-2 text-sm"
              >
                {available ? (
                  <ToggleRight size={28} className="text-primary" />
                ) : (
                  <ToggleLeft size={28} className="text-muted-foreground" />
                )}
                <span className={available ? 'text-primary font-medium' : 'text-muted-foreground'}>
                  {available ? 'Disponível' : 'Indisponível'}
                </span>
              </button>
            </div>
            {faccaoOrders.filter(o => o.status === 'EM PRODUÇÃO').map((order, i) => (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-sm border border-border animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground">{order.brand} — {order.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Prazo: {order.deadline}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'residuos' && (
          <div className="animate-fade-in">
            {showRegistrar ? (
              <RegistrarResiduoForm onClose={() => setShowRegistrar(false)} />
            ) : (
            <>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-heading font-semibold text-lg">Resíduos</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRegistrar(true)}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground bg-primary px-3 py-2 rounded-xl active:scale-95 transition-transform"
                >
                  <Plus size={16} /> Registrar
                </button>
                <div className="flex bg-muted rounded-lg p-0.5">
                  <button
                    onClick={() => setResiduosView('lista')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      residuosView === 'lista' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <List size={14} /> Lista
                  </button>
                  <button
                    onClick={() => setResiduosView('mapa')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
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
                    className="bg-card rounded-xl p-3.5 shadow-sm border border-border border-l-4 border-l-primary animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <p className="font-semibold text-sm">📦 {lot.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{lot.weight} · {lot.price} · {lot.bairro}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-fade-in space-y-3">
                <div className="rounded-xl overflow-hidden shadow-sm" style={{ height: 340 }}>
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-44.92,-20.16,-44.84,-20.11&layer=mapnik"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Mapa de resíduos em Divinópolis"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {wasteLots.map(lot => (
                    <div
                      key={lot.id}
                      className="min-w-[200px] bg-card rounded-xl p-3.5 shadow-sm border-l-4 border-l-primary border border-border flex-shrink-0"
                    >
                      <p className="font-semibold text-sm">📦 {lot.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{lot.weight} · {lot.price}</p>
                      <p className="text-xs text-muted-foreground">{lot.bairro}</p>
                      <button
                        onClick={() => toast.success('Solicitação enviada! A facção será notificada.')}
                        className="mt-2.5 w-full text-xs font-medium text-primary-foreground bg-primary px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                      >
                        Solicitar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

export default FaccaoDashboard;
