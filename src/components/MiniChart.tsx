import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MiniChartProps {
  title: string;
  data: { name: string; value: number; value2?: number }[];
  type?: 'area' | 'bar';
  color?: string;
  color2?: string;
  delay?: number;
}

const MiniChart = ({ title, data, type = 'area', color = 'hsl(152, 65%, 29%)', color2, delay = 0 }: MiniChartProps) => {
  return (
    <div
      className="card-elevated animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <p className="text-[13px] font-bold font-sans text-foreground mb-3">{title}</p>
      <div style={{ width: '100%', height: 120 }}>
        <ResponsiveContainer>
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(28, 15%, 56%)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: 'none',
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: 12,
                  fontFamily: 'DM Sans',
                }}
              />
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#gradient-${title})`} />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(28, 15%, 56%)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: 'none',
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: 12,
                  fontFamily: 'DM Sans',
                }}
              />
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
              {color2 && <Bar dataKey="value2" fill={color2} radius={[4, 4, 0, 0]} />}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MiniChart;
