import { ArrowLeft, Package, FileText, Factory, CheckCircle, ShoppingBag, MessageCircle, Scale, Truck, TrendingUp, Star, Leaf, DollarSign, Clock, BarChart3, Percent, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// ─── MARCA ────────────────────────────────────────────────────────────────────

const MarcaDashboard = ({ navigate }: { navigate: (p: string) => void }) => {
  const pedidosMes = [
    { mes: 'Jan', pedidos: 4, finalizados: 2 },
    { mes: 'Fev', pedidos: 6, finalizados: 4 },
    { mes: 'Mar', pedidos: 5, finalizados: 3 },
    { mes: 'Abr', pedidos: 9, finalizados: 5 },
    { mes: 'Mai', pedidos: 7, finalizados: 6 },
  ];

  const statusPedidos = [
    { name: 'Ativos',      value: 8,  color: '#1D9E75' },
    { name: 'Propostas',   value: 3,  color: '#378ADD' },
    { name: 'Produção',    value: 5,  color: '#EF9F27' },
    { name: 'Concluídos',  value: 12, color: '#888780' },
  ];

  const feedbacks = [
    { faccao: 'Facção Sul Têxtil', nota: 4.9, pedido: 'Vestido midi floral', prazo: 'No prazo' },
    { faccao: 'Confecções ABC',    nota: 4.7, pedido: 'Camisetas Básicas',    prazo: '2 dias adiantado' },
    { faccao: 'Denim Factory',     nota: 4.5, pedido: 'Jaquetas Jeans',       prazo: 'No prazo' },
  ];

  return (
    <main className="px-4 py-5 max-w-md mx-auto space-y-5 pb-8">
      {/* ── Saudação ── */}
      <div className="animate-fade-in">
        <p className="font-sans text-[13px] text-muted-foreground">Visão geral · Abril 2025</p>
        <h2 className="font-sans font-extrabold text-[20px] text-foreground tracking-tight mt-0.5">
          Como está sua produção?
        </h2>
      </div>

      {/* ── 4 KPIs principais ── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Package,     label: 'Pedidos Ativos',     value: '8',  trend: '+2',  cor: '#1D9E75', onClick: () => navigate('/marca') },
          { icon: FileText,    label: 'Propostas Recebidas', value: '24', trend: '+5',  cor: '#378ADD', onClick: () => navigate('/marca') },
          { icon: Factory,     label: 'Em Produção',        value: '5',  trend: null,  cor: '#EF9F27', onClick: () => navigate('/marca') },
          { icon: CheckCircle, label: 'Concluídos',         value: '12', trend: '+3',  cor: '#1D9E75', onClick: () => navigate('/marca') },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className="card-elevated flex flex-col items-start gap-3 animate-fade-in text-left active:scale-[0.97] transition-transform"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.cor}18` }}>
                  <Icon size={18} style={{ color: item.cor }} />
                </div>
                {item.trend && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-bold font-sans rounded-full px-2 py-0.5" style={{ background: '#1D9E7518', color: '#1D9E75' }}>
                    <TrendingUp size={9} />{item.trend}
                  </span>
                )}
              </div>
              <div>
                <p className="font-sans font-extrabold text-[26px] leading-none" style={{ color: item.cor }}>{item.value}</p>
                <p className="font-sans text-[11.5px] text-muted-foreground mt-1">{item.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Gráfico de pedidos por mês ── */}
      <div className="card-elevated animate-fade-in" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-section-title">Pedidos por mês</h2>
          <div className="flex items-center gap-3 text-[11px] font-sans text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#1D9E75' }} />Abertos</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#9FE1CB' }} />Finalizados</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={pedidosMes} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }} width={28} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, fontFamily: 'DM Sans' }} cursor={{ fill: 'hsl(var(--muted))' }} />
            <Bar dataKey="pedidos"    fill="#1D9E75" radius={[6, 6, 0, 0]} name="Abertos" />
            <Bar dataKey="finalizados" fill="#9FE1CB" radius={[6, 6, 0, 0]} name="Finalizados" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Distribuição de status (pizza) ── */}
      <div className="card-elevated animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
        <h2 className="text-section-title mb-4">Distribuição de pedidos</h2>
        <div className="flex items-center gap-4">
          <PieChart width={110} height={110}>
            <Pie data={statusPedidos} cx={50} cy={50} innerRadius={28} outerRadius={50} dataKey="value" strokeWidth={0}>
              {statusPedidos.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
          <div className="flex flex-col gap-2 flex-1">
            {statusPedidos.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="font-sans text-[12px] text-foreground">{s.name}</span>
                </div>
                <span className="font-sans font-bold text-[13px] text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Avaliações das facções ── */}
      <div className="animate-fade-in" style={{ animationDelay: '360ms', animationFillMode: 'both' }}>
        <h2 className="text-section-title mb-3">Avaliação das facções</h2>
        <div className="space-y-2.5">
          {feedbacks.map((f, i) => (
            <div key={i} className="card-elevated flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-sans font-bold text-[12px] text-accent shrink-0">
                {f.faccao.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-[13px] text-foreground truncate">{f.faccao}</p>
                <p className="font-sans text-[11px] text-muted-foreground truncate">{f.pedido} · {f.prazo}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={12} className="text-warning fill-warning" />
                <span className="font-sans font-bold text-[13px] text-foreground">{f.nota}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Impacto ambiental resumido ── */}
      <div
        className="rounded-2xl px-5 py-4 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 16%))', animationDelay: '420ms', animationFillMode: 'both' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Leaf size={16} className="text-accent" />
          <p className="font-sans font-bold text-[13px] text-white">Impacto ambiental do mês</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { value: '45kg', label: 'Resíduo desviado' },
            { value: '121k L', label: 'Água economizada' },
            { value: '162kg', label: 'CO₂ evitado' },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-sans font-extrabold text-[16px]" style={{ color: '#1D9E75' }}>{m.value}</p>
              <p className="font-sans text-[10px] mt-0.5" style={{ color: 'hsl(215 20% 65%)' }}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

// ─── FACÇÃO ───────────────────────────────────────────────────────────────────

const FaccaoDashboard = ({ navigate }: { navigate: (p: string) => void }) => {
  const faturamentoMes = [
    { mes: 'Jan', valor: 8200 },
    { mes: 'Fev', valor: 11400 },
    { mes: 'Mar', valor: 9800 },
    { mes: 'Abr', valor: 15600 },
    { mes: 'Mai', valor: 13200 },
  ];

  const pipeline = [
    { titulo: 'Vestido midi floral',    marca: 'Atelier Verde', status: 'Em produção',  prazo: '15/07', valor: 'R$ 24.000' },
    { titulo: 'Camisetas Básicas',      marca: 'ModaCorp',      status: 'Proposta aceita', prazo: '01/08', valor: 'R$ 18.000' },
    { titulo: 'Uniformes Corporativos', marca: 'UrbanWear',     status: 'Aguardando',   prazo: '30/08', valor: 'R$ 32.000' },
  ];

  const statusColor: Record<string, string> = {
    'Em produção':     '#EF9F27',
    'Proposta aceita': '#1D9E75',
    'Aguardando':      '#888780',
  };

  return (
    <main className="px-4 py-5 max-w-md mx-auto space-y-5 pb-8">
      <div className="animate-fade-in">
        <p className="font-sans text-[13px] text-muted-foreground">Visão geral · Abril 2025</p>
        <h2 className="font-sans font-extrabold text-[20px] text-foreground tracking-tight mt-0.5">
          Sua operação hoje
        </h2>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: DollarSign,  label: 'Faturamento mês',   value: 'R$ 15.6k', trend: '+28%', cor: '#1D9E75' },
          { icon: Percent,     label: 'Taxa de aceite',    value: '72%',      trend: '+8%',  cor: '#378ADD' },
          { icon: Factory,     label: 'Produções ativas',  value: '4',        trend: null,   cor: '#EF9F27' },
          { icon: Clock,       label: 'Prazo médio (dias)', value: '31',       trend: null,   cor: '#888780' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="card-elevated flex flex-col items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.cor}18` }}>
                  <Icon size={18} style={{ color: item.cor }} />
                </div>
                {item.trend && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-bold font-sans rounded-full px-2 py-0.5" style={{ background: '#1D9E7518', color: '#1D9E75' }}>
                    <TrendingUp size={9} />{item.trend}
                  </span>
                )}
              </div>
              <div>
                <p className="font-sans font-extrabold text-[22px] leading-none" style={{ color: item.cor }}>{item.value}</p>
                <p className="font-sans text-[11.5px] text-muted-foreground mt-1">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Faturamento mensal ── */}
      <div className="card-elevated animate-fade-in" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
        <h2 className="text-section-title mb-4">Faturamento mensal (R$)</h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={faturamentoMes}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }} width={40}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, fontFamily: 'DM Sans' }}
              formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, 'Faturamento']}
            />
            <Line type="monotone" dataKey="valor" stroke="#1D9E75" strokeWidth={2.5} dot={{ fill: '#1D9E75', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Pipeline de produções ── */}
      <div className="animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
        <h2 className="text-section-title mb-3">Pipeline de produções</h2>
        <div className="space-y-2.5">
          {pipeline.map((p, i) => (
            <div key={i} className="card-elevated">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-bold text-[14px] text-foreground truncate">{p.titulo}</p>
                  <p className="font-sans text-[11px] text-muted-foreground">{p.marca} · Prazo: {p.prazo}</p>
                </div>
                <span
                  className="font-sans text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: `${statusColor[p.status]}18`, color: statusColor[p.status] }}
                >
                  {p.status}
                </span>
              </div>
              <p className="font-sans font-bold text-[13px]" style={{ color: '#1D9E75' }}>{p.valor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Disponibilidade ── */}
      <div className="card-elevated animate-fade-in" style={{ animationDelay: '360ms', animationFillMode: 'both' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-section-title">Capacidade disponível</h2>
          <span className="font-sans text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: '#1D9E7518', color: '#1D9E75' }}>
            Disponível
          </span>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Capacidade total (peças/mês)', value: '2.000' },
            { label: 'Em uso atualmente',            value: '1.250 (62%)' },
            { label: 'Disponível para novos pedidos', value: '750 peças' },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <p className="font-sans text-[12px] text-muted-foreground">{r.label}</p>
              <p className="font-sans font-bold text-[13px] text-foreground">{r.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Alertas ── */}
      <div className="animate-fade-in" style={{ animationDelay: '420ms', animationFillMode: 'both' }}>
        <h2 className="text-section-title mb-3">Alertas</h2>
        <div className="space-y-2">
          {[
            { icon: AlertCircle, msg: 'Prazo de "Vestido midi" vence em 8 dias', cor: '#EF9F27' },
            { icon: MessageCircle, msg: '3 propostas aguardam sua resposta', cor: '#378ADD' },
          ].map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-center gap-3 card-elevated">
                <Icon size={16} style={{ color: a.cor }} className="shrink-0" />
                <p className="font-sans text-[12.5px] text-foreground">{a.msg}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

// ─── ARTESÃO ──────────────────────────────────────────────────────────────────

const ArtesaoDashboard = ({ navigate }: { navigate: (p: string) => void }) => {
  const vendasMes = [
    { mes: 'Jan', kg: 85,  receita: 340 },
    { mes: 'Fev', kg: 130, receita: 520 },
    { mes: 'Mar', kg: 110, receita: 440 },
    { mes: 'Abr', kg: 210, receita: 840 },
    { mes: 'Mai', kg: 175, receita: 700 },
  ];

  const materiais = [
    { material: 'Jeans reciclado',   kg: '30kg', status: 'Vendido',    valor: 'R$ 120', cor: '#1D9E75' },
    { material: 'Malha de algodão',  kg: '22kg', status: 'Disponível', valor: 'R$ 88',  cor: '#378ADD' },
    { material: 'Retalhos de seda',  kg: '8kg',  status: 'Reservado',  valor: 'R$ 210', cor: '#EF9F27' },
    { material: 'Viscose colorida',  kg: '18kg', status: 'Disponível', valor: 'R$ 65',  cor: '#378ADD' },
  ];

  return (
    <main className="px-4 py-5 max-w-md mx-auto space-y-5 pb-8">
      <div className="animate-fade-in">
        <p className="font-sans text-[13px] text-muted-foreground">Visão geral · Abril 2025</p>
        <h2 className="font-sans font-extrabold text-[20px] text-foreground tracking-tight mt-0.5">
          Seu estoque e vendas
        </h2>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Scale,       label: 'Estoque total (kg)',   value: '815kg', trend: null,   cor: '#1D9E75' },
          { icon: DollarSign,  label: 'Receita do mês',      value: 'R$ 840', trend: '+42%', cor: '#378ADD' },
          { icon: ShoppingBag, label: 'Materiais disponíveis', value: '20',   trend: '+6',   cor: '#EF9F27' },
          { icon: CheckCircle, label: 'Vendas realizadas',    value: '18',    trend: '+4',   cor: '#1D9E75' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="card-elevated flex flex-col items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.cor}18` }}>
                  <Icon size={18} style={{ color: item.cor }} />
                </div>
                {item.trend && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-bold font-sans rounded-full px-2 py-0.5" style={{ background: '#1D9E7518', color: '#1D9E75' }}>
                    <TrendingUp size={9} />{item.trend}
                  </span>
                )}
              </div>
              <div>
                <p className="font-sans font-extrabold text-[22px] leading-none" style={{ color: item.cor }}>{item.value}</p>
                <p className="font-sans text-[11.5px] text-muted-foreground mt-1">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Vendas e receita ── */}
      <div className="card-elevated animate-fade-in" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-section-title">Vendas por mês</h2>
          <div className="flex items-center gap-3 text-[11px] font-sans text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#1D9E75' }} />Kg</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#9FE1CB' }} />Receita (R$)</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={vendasMes} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontFamily: 'DM Sans' }} width={28} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, fontFamily: 'DM Sans' }} cursor={{ fill: 'hsl(var(--muted))' }} />
            <Bar dataKey="kg"      fill="#1D9E75" radius={[6, 6, 0, 0]} name="Kg vendidos" />
            <Bar dataKey="receita" fill="#9FE1CB" radius={[6, 6, 0, 0]} name="Receita (R$)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Status do estoque ── */}
      <div className="animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
        <h2 className="text-section-title mb-3">Status do estoque</h2>
        <div className="space-y-2.5">
          {materiais.map((m, i) => (
            <div key={i} className="card-elevated flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${m.cor}18` }}>
                <Scale size={16} style={{ color: m.cor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-[13px] text-foreground truncate">{m.material}</p>
                <p className="font-sans text-[11px] text-muted-foreground">{m.kg} · {m.valor}</p>
              </div>
              <span
                className="font-sans text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
                style={{ background: `${m.cor}18`, color: m.cor }}
              >
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Impacto ambiental ── */}
      <div
        className="rounded-2xl px-5 py-4 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 16%))', animationDelay: '360ms', animationFillMode: 'both' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Leaf size={16} className="text-accent" />
          <p className="font-sans font-bold text-[13px] text-white">Seu impacto ambiental</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { value: '210kg', label: 'Desviado do aterro' },
            { value: '567k L', label: 'Água economizada' },
            { value: '756kg', label: 'CO₂ evitado' },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-sans font-extrabold text-[16px]" style={{ color: '#1D9E75' }}>{m.value}</p>
              <p className="font-sans text-[10px] mt-0.5" style={{ color: 'hsl(215 20% 65%)' }}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

// ─── CONTAINER PRINCIPAL ──────────────────────────────────────────────────────

const DashboardPlaceholder = () => {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  const titles: Record<string, string> = {
    '/marca/dashboard':   'Dashboard da Marca',
    '/faccao/dashboard':  'Dashboard da Facção',
    '/artesao/dashboard': 'Dashboard do Artesão',
  };

  const title = titles[pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg px-5"
        style={{ height: 56, display: 'flex', alignItems: 'center', borderBottom: '1px solid hsl(var(--border))' }}
      >
        <div className="flex items-center gap-3 max-w-md mx-auto w-full">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl hover:bg-muted active:scale-95 transition-all"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-screen-title">{title}</h1>
        </div>
      </header>

      {/* Renderiza o dashboard correto */}
      {pathname === '/marca/dashboard'   && <MarcaDashboard   navigate={navigate} />}
      {pathname === '/faccao/dashboard'  && <FaccaoDashboard  navigate={navigate} />}
      {pathname === '/artesao/dashboard' && <ArtesaoDashboard navigate={navigate} />}
    </div>
  );
};

export default DashboardPlaceholder;