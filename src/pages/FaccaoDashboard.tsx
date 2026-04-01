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
            <h2 className="text-section-title mb-2">Oportunidades</h2>
            {faccaoOrders.filter(o => o.status === 'ATIVO' || o.status === 'PROPOSTA').map((order, i) => (
              <div
                key={order.id}
                className="card-elevated animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[15px] font-sans text-foreground">{order.title}</h3>
                    <p className="text-[13px] text-muted-foreground font-sans">{order.brand}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[13px] text-muted-foreground font-sans">{order.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-4 text-[13px] text-muted-foreground font-sans">
                    <span>{order.quantity} peças</span>
                    <span>Prazo: {order.deadline}</span>
                  </div>
                  <button className="btn-primary !text-[13px] !py-1.5 !px-4 active:scale-95 transition-transform">
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
              <h2 className="text-section-title">Meus Serviços</h2>
              <button
                onClick={() => setAvailable(!available)}
                className="flex items-center gap-2 text-sm font-sans"
              >
                {available ? (
                  <ToggleRight size={28} className="text-primary" />
                ) : (
                  <ToggleLeft size={28} className="text-nav-inactive" />
                )}
                <span className={`font-sans ${available ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
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
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[15px] font-sans text-foreground">{order.title}</h3>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[13px] text-muted-foreground font-sans">{order.brand} — {order.description}</p>
                <p className="text-[13px] text-muted-foreground font-sans mt-1">Prazo: {order.deadline}</p>
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
              <h2 className="text-section-title">Resíduos</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRegistrar(true)}
                  className="btn-primary flex items-center gap-1.5 !text-sm !py-2 !px-4 active:scale-95 transition-transform"
                >
                  <Plus size={16} /> Registrar
                </button>
                <div className="flex bg-muted rounded-lg p-0.5">
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
                    className="card-elevated border-l-4 border-l-primary animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <p className="font-bold text-[15px] font-sans text-foreground">📦 {lot.name}</p>
                    <p className="text-[13px] text-muted-foreground mt-1 font-sans">{lot.weight} · {lot.price} · {lot.bairro}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-fade-in space-y-3">
                <div className="rounded-2xl overflow-hidden" style={{ height: 340, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
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

      <BottomNav items={navItems} active={tab} onNavigate={setTab} />
    </div>
  );
};

export default FaccaoDashboard;