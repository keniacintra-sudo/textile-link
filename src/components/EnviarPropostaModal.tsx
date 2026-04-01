import { useState } from 'react';
import { X, Camera } from 'lucide-react';
import { toast } from 'sonner';
import type { Order } from '@/data/mockData';

export interface Proposal {
  id: string;
  order_id: string;
  order_title: string;
  faccao_nome: string;
  preco_por_peca: number;
  prazo_dias: number;
  quantidade: number;
  mensagem: string;
  portfolio_images: string[];
  status: 'enviada' | 'aceita' | 'recusada';
}

interface Props {
  order: Order;
  onClose: () => void;
  onSubmit: (proposal: Proposal) => void;
}

const EnviarPropostaModal = ({ order, onClose, onSubmit }: Props) => {
  const [nome, setNome] = useState('Minha Facção');
  const [preco, setPreco] = useState('');
  const [prazo, setPrazo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => setImages(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (!preco || !prazo || !quantidade) {
      toast.error('Preencha valor, prazo e quantidade.');
      return;
    }
    const proposal: Proposal = {
      id: crypto.randomUUID(),
      order_id: order.id,
      order_title: order.title,
      faccao_nome: nome,
      preco_por_peca: parseFloat(preco),
      prazo_dias: parseInt(prazo),
      quantidade: parseInt(quantidade),
      mensagem,
      portfolio_images: images,
      status: 'enviada',
    };
    onSubmit(proposal);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto animate-slide-up z-10">
        {/* Header */}
        <div className="sticky top-0 bg-card rounded-t-3xl sm:rounded-t-2xl px-5 pt-5 pb-3 border-b border-border flex justify-between items-center z-10">
          <h2 className="text-section-title">Enviar Proposta</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* Order summary */}
          <div className="bg-muted rounded-2xl p-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-sans font-bold mb-1.5">Pedido</p>
            <p className="font-bold text-[15px] font-sans text-foreground">{order.title}</p>
            <div className="flex gap-4 mt-1.5 text-[13px] text-muted-foreground font-sans">
              <span>{order.quantity} peças</span>
              <span>Prazo: {order.deadline}</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-bold font-sans text-foreground mb-1.5 block">Nome da Facção</label>
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="text-[13px] font-bold font-sans text-foreground mb-1.5 block">Valor por peça (R$) *</label>
              <input
                type="number"
                value={preco}
                onChange={e => setPreco(e.target.value)}
                placeholder="0,00"
                className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[13px] font-bold font-sans text-foreground mb-1.5 block">Prazo (dias) *</label>
                <input
                  type="number"
                  value={prazo}
                  onChange={e => setPrazo(e.target.value)}
                  placeholder="30"
                  className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-[13px] font-bold font-sans text-foreground mb-1.5 block">Quantidade *</label>
                <input
                  type="number"
                  value={quantidade}
                  onChange={e => setQuantidade(e.target.value)}
                  placeholder={String(order.quantity)}
                  className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="text-[13px] font-bold font-sans text-foreground mb-1.5 block">Mensagem / Apresentação</label>
              <textarea
                value={mensagem}
                onChange={e => setMensagem(e.target.value)}
                placeholder="Descreva sua experiência, diferenciais, qualidade..."
                rows={3}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>

            <div>
              <label className="text-[13px] font-bold font-sans text-foreground mb-1.5 block">Portfólio / Fotos (opcional)</label>
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <label className="w-16 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                  <Camera size={20} className="text-muted-foreground" />
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 pb-4">
            <button onClick={onClose} className="btn-secondary flex-1 active:scale-95 transition-transform">
              Cancelar
            </button>
            <button onClick={handleSubmit} className="btn-primary flex-1 active:scale-95 transition-transform">
              Enviar Proposta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnviarPropostaModal;
