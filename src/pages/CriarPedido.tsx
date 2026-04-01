import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categorias = ['Blusa', 'Vestido', 'Calça', 'Saia', 'Jaqueta', 'Outro'];

const CriarPedido = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [prazo, setPrazo] = useState<Date>();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!nome || !categoria || !quantidade || !prazo) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    const newOrder = {
      id: crypto.randomUUID(),
      title: nome,
      brand: 'Atelier Verde',
      status: 'ATIVO' as const,
      quantity: Number(quantidade),
      deadline: format(prazo, 'dd/MM/yyyy'),
      description: descricao || `${categoria} - ${quantidade} peças`,
    };

    const existing = JSON.parse(localStorage.getItem('elo_custom_orders') || '[]');
    existing.push(newOrder);
    localStorage.setItem('elo_custom_orders', JSON.stringify(existing));

    toast.success('Pedido publicado com sucesso!');
    navigate('/marca');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 h-14 bg-background">
        <button onClick={() => navigate('/marca')} className="text-foreground active:scale-95 transition-transform">
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-heading italic text-[22px] text-foreground">Criar Novo Pedido</h1>
      </header>

      <main className="px-5 pb-10 max-w-md mx-auto space-y-5 animate-fade-in">
        {/* Nome do Produto */}
        <div className="space-y-1.5">
          <label className="font-sans text-[13px] font-semibold text-foreground">Nome do Produto *</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Ex: Vestido midi floral"
            className="w-full h-11 rounded-xl border border-border bg-card px-4 text-[14px] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Categoria */}
        <div className="space-y-1.5">
          <label className="font-sans text-[13px] font-semibold text-foreground">Categoria *</label>
          <Select value={categoria} onValueChange={setCategoria}>
            <SelectTrigger className="w-full h-11 rounded-xl border-border bg-card font-sans text-[14px]">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map(c => (
                <SelectItem key={c} value={c} className="font-sans text-[14px]">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantidade */}
        <div className="space-y-1.5">
          <label className="font-sans text-[13px] font-semibold text-foreground">Quantidade *</label>
          <input
            type="number"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
            placeholder="0"
            min={1}
            className="w-full h-11 rounded-xl border border-border bg-card px-4 text-[14px] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Prazo de Entrega */}
        <div className="space-y-1.5">
          <label className="font-sans text-[13px] font-semibold text-foreground">Prazo de Entrega *</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "w-full h-11 rounded-xl border border-border bg-card px-4 text-left font-sans text-[14px] flex items-center gap-2",
                !prazo && "text-muted-foreground"
              )}>
                <CalendarIcon size={16} className="text-accent" />
                {prazo ? format(prazo, "dd 'de' MMMM, yyyy", { locale: ptBR }) : 'Selecione a data'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={prazo}
                onSelect={setPrazo}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Descrição */}
        <div className="space-y-1.5">
          <label className="font-sans text-[13px] font-semibold text-foreground">Descrição</label>
          <textarea
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            placeholder="Detalhes do modelo, tecido, acabamento..."
            rows={3}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        {/* Referência / Imagem */}
        <div className="space-y-1.5">
          <label className="font-sans text-[13px] font-semibold text-foreground">Referência / Imagem</label>
          <label className="flex items-center gap-3 w-full h-11 rounded-xl border border-dashed border-accent/40 bg-card px-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <Upload size={18} className="text-accent" />
            <span className="font-sans text-[13px] text-muted-foreground">
              {imagem ? imagem.name : 'Enviar imagem de referência'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => setImagem(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* Valor por peça */}
        <div className="space-y-1.5">
          <label className="font-sans text-[13px] font-semibold text-foreground">Valor desejado por peça (opcional)</label>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[14px] font-semibold text-accent">R$</span>
            <input
              type="number"
              value={valor}
              onChange={e => setValor(e.target.value)}
              placeholder="0,00"
              min={0}
              step={0.01}
              className="w-full h-11 rounded-xl border border-border bg-card px-4 text-[14px] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => navigate('/marca')}
            className="flex-1 h-12 rounded-full bg-secondary text-secondary-foreground font-sans font-bold text-[14px] active:scale-[0.97] transition-transform"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 h-12 rounded-full bg-primary text-primary-foreground font-sans font-bold text-[14px] active:scale-[0.97] transition-transform"
          >
            Publicar Pedido
          </button>
        </div>
      </main>
    </div>
  );
};

export default CriarPedido;
