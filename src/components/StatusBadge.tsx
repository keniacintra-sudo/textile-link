interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  'ATIVO': { bg: '152 56% 93%', text: '152 65% 29%' },
  'PROPOSTA': { bg: '45 93% 95%', text: '43 100% 37%' },
  'EM PRODUÇÃO': { bg: '217 100% 95%', text: '217 91% 60%' },
  'DISPONÍVEL': { bg: '30 30% 95%', text: '28 30% 41%' },
  'CONCLUÍDO': { bg: '30 20% 93%', text: '28 15% 56%' },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status];
  return (
    <span
      className="inline-flex items-center rounded-full font-sans font-bold text-[11px] uppercase"
      style={{
        padding: '3px 10px',
        letterSpacing: '0.5px',
        backgroundColor: style ? `hsl(${style.bg})` : 'hsl(var(--muted))',
        color: style ? `hsl(${style.text})` : 'hsl(var(--muted-foreground))',
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;