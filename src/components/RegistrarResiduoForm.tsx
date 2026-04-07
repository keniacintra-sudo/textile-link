import { useState } from 'react';
import { Camera, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const materials = [
  { label: 'Malha', emoji: '🧶' },
  { label: 'Algodão', emoji: '🌿' },
  { label: 'Jeans', emoji: '👖' },
  { label: 'Viscose', emoji: '' },
  { label: 'Seda', emoji: '' },
  { label: 'Retalhos', emoji: '' },
];

interface Props {
  onClose: () => void;
  onSubmit?: (residuo: { id: string; material: string; weight: string; location: string; price: string; condition: string }) => void;
}

const RegistrarResiduoForm = ({ onClose, onSubmit }: Props) => {
  const [material, setMaterial] = useState('Malha');
  const [peso, setPeso] = useState('');
  const [condicao, setCondicao] = useState('Limpo');

  const handleSubmit = () => {
    const newResiduo = {
      id: crypto.randomUUID(),
      material,
      weight: peso ? `${peso} kg` : '0 kg',
      location: 'Divinópolis, MG',
      price: 'Sob consulta',
      condition: condicao,
      seller: 'Você',
    };
    onSubmit?.(newResiduo);
    toast.success('Resíduo publicado! Compradores próximos foram notificados 🎉');
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="animate-fade-in space-y-5">
      <button onClick={onClose} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
        <ArrowLeft size={16} /> Voltar
      </button>

      <h2 className="font-heading font-semibold text-lg">Registrar Resíduo</h2>

      {/* Tipo de material */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-2">Tipo de material</label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {materials.map(m => (
            <button
              key={m.label}
              onClick={() => setMaterial(m.label)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                material === m.label
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              {m.emoji && <span>{m.emoji}</span>}
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Peso aproximado */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Peso aproximado</label>
        <div className="relative">
          <input
            type="number"
            value={peso}
            onChange={e => setPeso(e.target.value)}
            placeholder="0"
            className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">kg</span>
        </div>
      </div>

      {/* Condição */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-2">Condição</label>
        <div className="flex gap-3">
          {['Limpo', 'Misto'].map(c => (
            <button
              key={c}
              onClick={() => setCondicao(c)}
              className="flex items-center gap-2"
            >
              <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors ${
                condicao === c ? 'border-primary' : 'border-muted-foreground/40'
              }`}>
                {condicao === c && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <span className={`text-sm ${condicao === c ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{c}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Localização */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Localização</label>
        <input
          readOnly
          value="Divinópolis, MG"
          className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm text-muted-foreground outline-none cursor-default"
        />
      </div>

      {/* Foto */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Foto</label>
        <div className="border-2 border-dashed border-border rounded-xl h-28 flex flex-col items-center justify-center gap-1.5 text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
          <Camera size={24} />
          <span className="text-xs">Toque para adicionar foto</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        className="w-full text-sm font-semibold text-primary-foreground bg-primary px-4 py-3 rounded-xl active:scale-[0.97] transition-transform"
      >
        Publicar Resíduo
      </button>
    </div>
  );
};

export default RegistrarResiduoForm;
