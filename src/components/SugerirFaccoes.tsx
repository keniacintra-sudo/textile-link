import { useState } from 'react';
import { Sparkles, X, Loader2, Star, Clock, DollarSign, Award, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Order } from '@/data/mockData';

interface Sugestao {
  nome: string;
  especialidade: string;
  pontuacao: number;
  prazoEstimado: string;
  precoEstimado: string;
  justificativa: string;
  diferenciais: string[];
}

interface SugerirFaccoesProps {
  order: Order;
}

const SugerirFaccoes = ({ order }: SugerirFaccoesProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [erro, setErro] = useState('');
  const [analise, setAnalise] = useState('');

  const gerarSugestoes = async () => {
    setLoading(true);
    setErro('');
    setSugestoes([]);
    setAnalise('');

    try {
      const { data, error } = await supabase.functions.invoke('sugerir-faccoes', {
        body: {
          title: order.title,
          category: order.category || order.description,
          quantity: order.quantity,
          deadline: order.deadline,
          description: order.details || order.description,
        },
      });

      if (error) throw new Error(error.message || 'Erro ao chamar função');

      if (data?.error) {
        setErro(data.error);
        if (data.error.includes('Muitas requisições')) toast.warning(data.error);
        if (data.error.includes('Créditos')) toast.error(data.error);
        return;
      }

      setAnalise(data.analise || '');
      setSugestoes(data.sugestoes || []);
    } catch (e) {
      setErro('Não foi possível gerar sugestões. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (sugestoes.length === 0 && !loading) {
      gerarSugestoes();
    }
  };

  return (
    <>
      {/* Botão trigger */}
      <button
        onClick={(e) => { e.stopPropagation(); handleOpen(); }}
        className="w-full mt-3 flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 hover:border-accent/40 active:scale-[0.98] transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-sans font-semibold text-[13px] text-foreground">
            Sugerir facções com IA
          </p>
          <p className="font-sans text-[11px] text-muted-foreground">
            IA analisa e recomenda os melhores parceiros
          </p>
        </div>
        <ChevronRight size={16} className="text-muted-foreground" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-[460px] bg-background rounded-t-3xl shadow-2xl animate-slide-up flex flex-col" style={{ maxHeight: '85dvh' }}>
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="font-sans font-bold text-[16px] text-foreground">Sugestões de Facções</h2>
                  <p className="font-sans text-[11px] text-muted-foreground">Análise por IA · {order.title}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-hide">
              {/* Loading */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <Loader2 size={36} className="text-accent animate-spin" />
                  </div>
                  <p className="font-sans font-semibold text-[14px] text-foreground mt-4">Analisando o pedido...</p>
                  <p className="font-sans text-[12px] text-muted-foreground mt-1">IA está buscando as melhores facções</p>
                </div>
              )}

              {/* Erro */}
              {erro && !loading && (
                <div className="card-elevated text-center py-8">
                  <p className="text-[13px] text-destructive font-sans mb-3">{erro}</p>
                  <button onClick={gerarSugestoes} className="btn-primary !text-[13px] !py-2 !px-6">
                    Tentar novamente
                  </button>
                </div>
              )}

              {/* Análise */}
              {analise && !loading && (
                <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-xl">
                  <Sparkles size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="font-sans text-[12px] text-foreground leading-relaxed">{analise}</p>
                </div>
              )}

              {/* Cards */}
              {sugestoes.map((s, i) => (
                <div
                  key={i}
                  className="card-elevated animate-slide-up space-y-3"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="font-sans font-bold text-[12px] text-primary">
                          {s.nome.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-sans font-bold text-[14px] text-foreground">{s.nome}</p>
                        <p className="font-sans text-[11px] text-muted-foreground">{s.especialidade}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-lg">
                      <Star size={12} className="text-accent fill-accent" />
                      <span className="font-sans font-bold text-[12px] text-accent">{s.pontuacao}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 bg-muted rounded-xl p-2">
                      <Clock size={14} className="text-muted-foreground" />
                      <div>
                        <p className="font-sans text-[10px] text-muted-foreground">Prazo estimado</p>
                        <p className="font-sans font-semibold text-[12px] text-foreground">{s.prazoEstimado}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-muted rounded-xl p-2">
                      <DollarSign size={14} className="text-muted-foreground" />
                      <div>
                        <p className="font-sans text-[10px] text-muted-foreground">Valor estimado</p>
                        <p className="font-sans font-semibold text-[12px] text-foreground">{s.precoEstimado}</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-[12px] text-muted-foreground leading-relaxed">{s.justificativa}</p>

                  {s.diferenciais?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {s.diferenciais.map((d, j) => (
                        <span key={j} className="inline-flex items-center gap-1 bg-primary/5 text-primary px-2 py-0.5 rounded-full text-[10px] font-sans font-medium">
                          <Award size={10} />
                          {d}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => { setOpen(false); toast.success(`Contato com ${s.nome} iniciado!`); }}
                    className="btn-primary w-full flex items-center justify-center gap-1.5 !text-[13px] !py-2 active:scale-95 transition-transform"
                  >
                    <MessageCircleIcon />
                    Entrar em contato
                  </button>
                </div>
              ))}

              {sugestoes.length > 0 && !loading && (
                <p className="font-sans text-[10px] text-muted-foreground text-center pb-2 leading-relaxed">
                  Sugestões geradas por IA com base nas características do pedido.
                  Verifique as facções antes de fechar negócio.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MessageCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

export default SugerirFaccoes;
