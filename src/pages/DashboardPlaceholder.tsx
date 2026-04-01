import { ArrowLeft, Package, FileText, Factory, CheckCircle, ShoppingBag, MessageCircle, Scale, Truck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface Indicator {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface ChartData {
  month: string;
  value: number;
}

interface DashboardData {
  title: string;
  indicators: Indicator[];
  chartTitle: string;
  chartData: ChartData[];
  sectionTitle: string;
  activities: { title: string; detail: string }[];
}

const iconWrap = (Icon: React.ElementType) => (
  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
    <Icon size={20} className="text-primary" />
  </div>
);

const dashboards: Record<string, DashboardData> = {
  '/marca/dashboard': {
    title: 'Dashboard da Marca',
    indicators: [
      { label: 'Pedidos Ativos', value: '8', icon: iconWrap(Package) },
      { label: 'Propostas Recebidas', value: '24', icon: iconWrap(FileText) },
      { label: 'Em Produção', value: '5', icon: iconWrap(Factory) },
      { label: 'Finalizados', value: '12', icon: iconWrap(CheckCircle) },
    ],
    chartTitle: 'Pedidos por mês',
    chartData: [
      { month: 'Jan', value: 4 },
      { month: 'Fev', value: 6 },
      { month: 'Mar', value: 5 },
      { month: 'Abr', value: 9 },
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
      { label: 'Propostas Enviadas', value: '15', icon: iconWrap(FileText) },
      { label: 'Propostas Aceitas', value: '6', icon: iconWrap(CheckCircle) },
      { label: 'Produções Ativas', value: '4', icon: iconWrap(Factory) },
      { label: 'Finalizados', value: '10', icon: iconWrap(Truck) },
    ],
    chartTitle: 'Produções por mês',
    chartData: [
      { month: 'Jan', value: 3 },
      { month: 'Fev', value: 5 },
      { month: 'Mar', value: 4 },
      { month: 'Abr', value: 7 },
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
      { label: 'Materiais Disponíveis', value: '20', icon: iconWrap(ShoppingBag) },
      { label: 'Solicitações Recebidas', value: '12', icon: iconWrap(MessageCircle) },
      { label: 'Vendas', value: '18', icon: iconWrap(CheckCircle) },
      { label: 'Estoque (kg)', value: '815', icon: iconWrap(Scale) },
    ],
    chartTitle: 'Materiais coletados (kg)',
    chartData: [
      { month: 'Jan', value: 120 },
      { month: 'Fev', value: 200 },
      { month: 'Mar', value: 170 },
      { month: 'Abr', value: 300 },
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

      <main className="px-4 py-4 max-w-md mx-auto space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          {data.indicators.map((ind) => (
            <div key={ind.label} className="card-elevated flex flex-col items-center text-center gap-2 py-5">
              {ind.icon}
              <p className="text-metric text-2xl">{ind.value}</p>
              <p className="text-[12px] text-muted-foreground font-sans">{ind.label}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="card-elevated py-5 px-4">
          <h2 className="text-section-title mb-4">{data.chartTitle}</h2>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} width={35} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
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
