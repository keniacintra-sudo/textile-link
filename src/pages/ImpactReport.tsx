import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { week: 'Sem 1', kg: 8 },
  { week: 'Sem 2', kg: 15 },
  { week: 'Sem 3', kg: 12 },
  { week: 'Sem 4', kg: 22 },
];

const metrics = [
  { emoji: '♻️', value: '63 kg', label: 'Desviado do aterro' },
  { emoji: '💧', value: '170.100 L', label: 'Água economizada' },
  { emoji: '🌫️', value: '227 kg', label: 'CO₂ evitado' },
];

const ImpactReport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-screen-title">Relatório de Impacto</h1>
        </div>
      </header>

      <main className="px-4 py-5 max-w-md mx-auto space-y-5">
        <p className="text-sm text-muted-foreground font-medium font-sans">Este mês</p>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="card-elevated text-center animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <span className="text-2xl">{m.emoji}</span>
              <p className="text-metric text-base mt-1.5">{m.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-1 font-sans">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="card-elevated animate-fade-in" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
          <h3 className="font-heading font-semibold text-sm mb-4">Tecido desviado por semana (kg)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={30} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', fontSize: 13 }}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Bar dataKey="kg" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary card */}
        <div
          className="card-elevated border-l-4 border-l-primary animate-fade-in"
          style={{ animationDelay: '320ms', animationFillMode: 'both' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-2">Resumo do mês</h3>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Sua operação desviou <span className="text-metric text-xs">63 kg</span> de resíduos têxteis do aterro sanitário,
            economizando <span className="text-metric text-xs">170.100 litros</span> de água e evitando a emissão de{' '}
            <span className="text-metric text-xs">227 kg de CO₂</span>. Continue assim para ampliar seu impacto positivo!
          </p>
        </div>

        {/* Selo Verde badge */}
        <div className="flex flex-col items-center py-4 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <div className="bg-primary/10 text-primary font-semibold text-sm px-5 py-2.5 rounded-full font-sans">
            Selo Verde ✅
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-sans">Empresa em conformidade ambiental</p>
        </div>
      </main>
    </div>
  );
};

export default ImpactReport;
