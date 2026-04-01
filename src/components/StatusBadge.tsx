interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  'ATIVO': 'bg-[#E6F4ED] text-[#1A7A4A]',
  'PROPOSTA': 'bg-[#FEF9E7] text-[#B8860B]',
  'EM PRODUÇÃO': 'bg-[#EBF3FF] text-[#2563EB]',
  'CONCLUÍDO': 'bg-muted text-muted-foreground',
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status] || 'bg-muted text-muted-foreground';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-[0.5px] ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
