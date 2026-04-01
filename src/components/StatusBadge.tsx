interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  'ATIVO': 'bg-primary/15 text-primary',
  'PROPOSTA': 'bg-accent/30 text-accent-foreground',
  'EM PRODUÇÃO': 'bg-info/15 text-info',
  'CONCLUÍDO': 'bg-muted text-muted-foreground',
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status] || 'bg-muted text-muted-foreground';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
