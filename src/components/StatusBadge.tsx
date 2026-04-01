interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  'ATIVO': { bg: '152 56% 93%', text: '152 65% 29%', dot: '152 65% 40%' },
  'PROPOSTA': { bg: '45 93% 95%', text: '43 100% 37%', dot: '43 90% 50%' },
  'EM PRODUÇÃO': { bg: '217 100% 95%', text: '217 91% 50%', dot: '217 91% 60%' },
  'DISPONÍVEL': { bg: '30 30% 95%', text: '28 30% 41%', dot: '28 30% 50%' },
  'CONCLUÍDO': { bg: '152 56% 93%', text: '152 65% 29%', dot: '152 65% 40%' },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-sans font-bold text-[11px] uppercase"
      style={{
        padding: '4px 12px',
        letterSpacing: '0.5px',
        backgroundColor: style ? `hsl(${style.bg})` : 'hsl(var(--muted))',
        color: style ? `hsl(${style.text})` : 'hsl(var(--muted-foreground))',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: style ? `hsl(${style.dot})` : 'hsl(var(--muted-foreground))' }}
      />
      {status}
    </span>
  );
};

export default StatusBadge;
