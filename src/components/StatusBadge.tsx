interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  'ATIVO': { bg: '160 84% 93%', text: '160 84% 30%', dot: '160 84% 39%' },
  'PROPOSTA': { bg: '43 96% 93%', text: '43 96% 35%', dot: '43 96% 56%' },
  'EM PRODUÇÃO': { bg: '217 91% 93%', text: '217 91% 45%', dot: '217 91% 60%' },
  'DISPONÍVEL': { bg: '160 84% 93%', text: '160 84% 30%', dot: '160 84% 39%' },
  'CONCLUÍDO': { bg: '160 84% 93%', text: '160 84% 30%', dot: '160 84% 39%' },
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
