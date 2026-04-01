import { ArrowLeft, Package, FileText, Factory, CheckCircle, ShoppingBag, MessageCircle, Scale, Truck, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface Indicator {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
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
  activities: { title: string; detail: string; status: 'success' | 'warning' | 'neutral' }[];
}

const iconWrap = (Icon: React.ElementType) => (
  <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
    <Icon size={20} className="text-primary" />
  </div>
);

const dashboards: Record<string, DashboardData> = {
  '/marca/dashboard': {
    title: 'Dashboard da Marca',
    indicators: [
      { label: 'Pedidos Ativos', value: '8', icon: iconWrap(Package), trend: '+2' },
      { label: 'Propostas Recebidas', value: '24', icon: iconWrap(FileText), trend: '+5' },
      { label: 'Em Produção', value: '5', icon: iconWrap(Factory) },
      { label: 'Finalizados', value: '12', icon: iconWrap(CheckCircle), trend: '+3' },
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
      { title: 'Vestido midi floral', detail: '2 propostas recebidas', status: 'success' },
      { title: 'Blusa jeans', detail: 'Em produção', status: 'warning' },
      { title: 'Calça linho', detail: 'Aguardando propostas', status: 'neutral' },
    ],
  },
  '/faccao/dashboard': {
    title: 'Dashboard da Facção',
    indicators: [
      { label: 'Propostas Enviadas', value: '15', icon: iconWrap(FileText), trend: '+4' },
      { label: 'Propostas Aceitas', value: '6', icon: iconWrap(CheckCircle), trend: '+1' },
      { label: 'Produções Ativas', value: '4', icon: iconWrap(Factory) },
      { label: 'Finalizados', value: '10', icon: iconWrap(Truck), trend: '+2' },
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
      { title: 'Vestido midi', detail: 'Proposta enviada', status: 'neutral' },
      { title: 'Calça jeans', detail: 'Aceita', status: 'success' },
      { title: 'Saia plissada', detail: 'Em produção', status: 'warning' },
    ],
  },
  '/artesao/dashboard': {
    title: 'Dashboard do Artesão',
    indicators: [
      { label: 'Materiais Disponíveis', value: '20', icon: iconWrap(ShoppingBag), trend: '+6' },
      { label: 'Solicitações Recebidas', value: '12', icon: iconWrap(MessageCircle), trend: '+3' },
      { label: 'Vendas', value: '18', icon: iconWrap(CheckCircle), trend: '+4' },
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
      { title: 'Jeans reciclado', detail: 'Vendido', status: 'success' },
      { title: 'Retalho algodão', detail: 'Nova solicitação', status: 'warning' },
      { title: 'Malha mista', detail: 'Em estoque', status: 'neutral' },
    ],
  },
};

const statusDot: Record<string, string> = {
  success: 'bg-primary',
  warning: 'bg-warning',
  neutral: 'bg-muted-foreground/40',
};

const DashboardPlaceholder = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const data = dashboards[pathname] || dashboards['/marca/dashboard'];

  return (
    <div className="min-h-screen bg-background">
      <header
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-5"
        style={{ height: 60, display: 'flex', alignItems: 'center', borderBottom: '1px solid hsl(var(--border))' }}
      >
        <div className="flex items-center gap-3 max-w-md mx-auto w-full">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-muted active:scale-95 transition-all duration-150">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-screen-title">{data.title}</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          {data.indicators.map((ind, i) => (
            <div
              key={ind.label}
              className="card-elevated flex flex-col items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between w-full">
                {ind.icon}
                {ind.trend && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-bold font-sans text-primary bg-primary/10 rounded-full px-2 py-0.5">
                    <TrendingUp size={10} />
                    {ind.trend}
                  </span>
                )}
              </div>
              <div>
                <p className="text-metric">{ind.value}</p>
                <p className="text-[12px] text-muted-foreground font-sans mt-1">{ind.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="card-elevated animate-fade-in" style={{ animationDelay: '320ms', animationFillMode: 'both' }}>
          <h2 className="text-section-title mb-5">{data.chartTitle}</h2>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chartData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 12,
                    fontSize: 13,
                    fontFamily: 'DM Sans',
                    boxShadow: 'var(--shadow-md)',
                  }}
                  cursor={{ fill: 'hsl(var(--primary) / 0.06)' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <h2 className="text-section-title mb-4">{data.sectionTitle}</h2>
          <div className="space-y-3">
            {data.activities.map((a) => (
              <div key={a.title} className="card-elevated flex items-center gap-4">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDot[a.status]}`} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[14px] font-sans text-foreground">{a.title}</h3>
                  <span className="text-[12px] text-muted-foreground font-sans">{a.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPlaceholder;
