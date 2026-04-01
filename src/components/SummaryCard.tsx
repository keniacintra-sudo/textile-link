import { type LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
}

const SummaryCard = ({ icon: Icon, label, value, delay = 0 }: SummaryCardProps) => {
  return (
    <div
      className="card-elevated flex flex-col items-center justify-center py-4 animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
        <Icon size={18} className="text-primary" />
      </div>
      <p className="text-metric text-2xl leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground font-sans mt-1 text-center leading-tight">{label}</p>
    </div>
  );
};

export default SummaryCard;
