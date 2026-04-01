import { ArrowLeft, Package, FileText, Factory, CheckCircle, ShoppingBag, MessageCircle, Scale, Truck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Indicator {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface Activity {
  title: string;
  detail: string;
}

const dashboards: Record<string, { title: string; indicators: Indicator[]; sectionTitle: string; activities: Activity[] }> = {
  '/marca/dashboard': {
    title: 'Dashboard da Marca',
    indicators: [
      { label: 'Pedidos Ativos', value: '3', icon: <Package size={20} className="text-primary" /> },
      { label: 'Propostas Recebidas', value: '8', icon: <FileText size={20} className="text-primary" /> },
      { label: 'Em Produção', value: '2', icon: <Factory size={20} className="text-primary" /> },
      { label: 'Finalizados', value: '5', icon: <CheckCircle size={20} className="text-primary" /> },
    ],
    sectionTitle: 'Atividade Recente',
    activities: [
      { title: 'Vestido midi floral', detail: '2 propostas recebidas' },
      { title: 'Blusa jeans', detail: 'Em produção' },
      { title: 'Calça linho', detail: 'Aguardando propostas' },
    ],
  },
  '/faccao/dashboard': {
    title: 'Dashboard da Facção',
    indicators: [
      { label: 'Propostas Enviadas', value: '6', icon: <FileText size={20} className="text-primary" /> },
      { label: 'Propostas Aceitas', value: '2', icon: <CheckCircle size={20} className="text-primary" /> },
      { label: 'Em Produção', value: '3', icon: <Factory size={20} className="text-primary" /> },
      { label: 'Finalizados', value: '4', icon: <Truck size={20} className="text-primary" /> },
    ],
    sectionTitle: 'Pipeline',
    activities: [
      { title: 'Vestido midi', detail: 'Proposta enviada' },
      { title: 'Calça jeans', detail: 'Aceita' },
      { title: 'Saia plissada', detail: 'Em produção' },
    ],
  },
  '/artesao/dashboard': {
    title: 'Dashboard do Artesão',
    indicators: [
      { label: 'Materiais Ativos', value: '5', icon: <ShoppingBag size={20} className="text-primary" /> },
      { label: 'Solicitações', value: '3', icon: <MessageCircle size={20} className="text-primary" /> },
      { label: 'Vendas', value: '7', icon: <CheckCircle size={20} className="text-primary" /> },
      { label: 'Estoque Total', value: '120 kg', icon: <Scale size={20} className="text-primary" /> },
    ],
    sectionTitle: 'Atividade',
    activities: [
      { title: 'Jeans reciclado', detail: 'Vendido' },
      { title: 'Retalho algodão', detail: 'Nova solicitação' },
      { title: 'Malha mista', detail: 'Em estoque' },
    ],
  },
};

const DashboardPlaceholder = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const data = dashboards[pathname] || dashboards['/marca/dashboard'];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background px-5" style={{ height: 56, display: 'flex', alignItems: 'center' }}>
        <div className="flex items-center gap-3 max-w-md mx-auto w-full">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-screen-title">{data.title}</h1>
        </div>
      </header>

      <main className="px-4 py-4 max-w-md mx-auto space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {data.indicators.map((ind) => (
            <div key={ind.label} className="card-elevated flex flex-col items-center text-center gap-2 py-5">
              {ind.icon}
              <p className="text-metric text-xl">{ind.value}</p>
              <p className="text-[12px] text-muted-foreground font-sans">{ind.label}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-section-title mb-3">{data.sectionTitle}</h2>
          <div className="space-y-2.5">
            {data.activities.map((a) => (
              <div key={a.title} className="card-elevated flex justify-between items-center">
                <h3 className="font-bold text-[14px] font-sans text-foreground">{a.title}</h3>
                <span className="text-[12px] text-muted-foreground font-sans">{a.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPlaceholder;
