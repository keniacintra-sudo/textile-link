export interface Order {
  id: string;
  title: string;
  brand: string;
  status: 'ATIVO' | 'PROPOSTA' | 'EM PRODUÇÃO' | 'CONCLUÍDO';
  quantity: number;
  deadline: string;
  description: string;
}

export interface Residuo {
  id: string;
  material: string;
  weight: string;
  location: string;
  price: string;
  seller: string;
  image_url?: string;
}

export interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
}

export interface ServiceEntry {
  id: string;
  title: string;
  status: 'active' | 'paused';
  ordersCount: number;
  capacity: string;
}

export const marcaOrders: Order[] = [
  { id: '1', title: 'Coleção Verão 2025', brand: 'Atelier Verde', status: 'EM PRODUÇÃO', quantity: 500, deadline: '15/07/2025', description: 'Vestidos em linho orgânico' },
  { id: '2', title: 'Camisetas Básicas', brand: 'Atelier Verde', status: 'ATIVO', quantity: 1200, deadline: '01/08/2025', description: 'Algodão pima, 4 cores' },
  { id: '3', title: 'Jaquetas Jeans', brand: 'Atelier Verde', status: 'PROPOSTA', quantity: 300, deadline: '20/09/2025', description: 'Jeans reciclado' },
];

export const marcaResiduos: Residuo[] = [
  { id: '1', material: 'Algodão cru', weight: '45 kg', location: 'São Paulo, SP', price: 'R$ 180', seller: 'Atelier Verde', image_url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop' },
  { id: '2', material: 'Linho orgânico', weight: '12 kg', location: 'São Paulo, SP', price: 'R$ 95', seller: 'Atelier Verde', image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop' },
];

export const faccaoOrders: Order[] = [
  { id: '4', title: 'Coleção Verão 2025', brand: 'Atelier Verde', status: 'EM PRODUÇÃO', quantity: 500, deadline: '15/07/2025', description: 'Vestidos em linho orgânico' },
  { id: '5', title: 'Uniformes Corporativos', brand: 'ModaCorp', status: 'PROPOSTA', quantity: 800, deadline: '30/08/2025', description: 'Camisas sociais em algodão' },
  { id: '6', title: 'Moletons Premium', brand: 'UrbanWear', status: 'ATIVO', quantity: 350, deadline: '10/09/2025', description: 'Moletom com capuz, 3 cores' },
];

export const marketplaceResiduos: Residuo[] = [
  { id: '3', material: 'Jeans reciclado', weight: '30 kg', location: 'Belo Horizonte, MG', price: 'R$ 120', seller: 'Facção Sul', image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop' },
  { id: '4', material: 'Malha de algodão', weight: '22 kg', location: 'Blumenau, SC', price: 'R$ 88', seller: 'Confecções ABC', image_url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop' },
  { id: '5', material: 'Retalhos de seda', weight: '8 kg', location: 'São Paulo, SP', price: 'R$ 210', seller: 'Atelier Luxo', image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
  { id: '6', material: 'Viscose colorida', weight: '18 kg', location: 'Fortaleza, CE', price: 'R$ 65', seller: 'TextilNE', image_url: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=400&fit=crop' },
  { id: '7', material: 'Tricoline estampado', weight: '25 kg', location: 'Americana, SP', price: 'R$ 150', seller: 'Estamparia Central', image_url: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=400&h=400&fit=crop' },
  { id: '8', material: 'Moletom cinza', weight: '40 kg', location: 'Caxias do Sul, RS', price: 'R$ 160', seller: 'Malhas Gaúchas', image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop' },
];

export const chats: ChatPreview[] = [
  { id: '1', name: 'Facção Sul Têxtil', avatar: 'FS', lastMessage: 'Enviamos as amostras hoje!', time: '14:32', unread: 2 },
  { id: '2', name: 'Confecções ABC', avatar: 'CA', lastMessage: 'Podemos ajustar o prazo?', time: '11:05', unread: 0 },
  { id: '3', name: 'Maria Artesã', avatar: 'MA', lastMessage: 'Interessada nos retalhos de seda', time: 'Ontem', unread: 1 },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  '1': [
    { id: 'm1', text: 'Olá! Temos interesse no seu pedido de vestidos.', fromMe: false, time: '09:10' },
    { id: 'm2', text: 'Oi! Que ótimo. Qual seria o prazo de entrega?', fromMe: true, time: '09:15' },
    { id: 'm3', text: 'Conseguimos entregar em 30 dias para 500 peças.', fromMe: false, time: '09:18' },
    { id: 'm4', text: 'Perfeito! Pode enviar uma proposta formal?', fromMe: true, time: '09:20' },
    { id: 'm5', text: 'Claro! Enviamos ainda hoje.', fromMe: false, time: '09:22' },
    { id: 'm6', text: 'Enviamos as amostras hoje!', fromMe: false, time: '14:32' },
  ],
  '2': [
    { id: 'm1', text: 'Bom dia! Recebemos seu pedido de camisetas.', fromMe: false, time: '08:00' },
    { id: 'm2', text: 'Bom dia! Vocês trabalham com algodão pima?', fromMe: true, time: '08:05' },
    { id: 'm3', text: 'Sim! Temos estoque disponível para 1200 peças.', fromMe: false, time: '08:10' },
    { id: 'm4', text: 'Podemos ajustar o prazo?', fromMe: false, time: '11:05' },
  ],
  '3': [
    { id: 'm1', text: 'Olá! Vi que vocês têm retalhos de seda disponíveis.', fromMe: false, time: 'Ontem' },
    { id: 'm2', text: 'Oi Maria! Sim, temos 8kg disponíveis.', fromMe: true, time: 'Ontem' },
    { id: 'm3', text: 'Interessada nos retalhos de seda', fromMe: false, time: 'Ontem' },
  ],
};

export const artesaoOrders: Order[] = [
  { id: '10', title: 'Jeans reciclado - 30kg', brand: 'Facção Sul', status: 'EM PRODUÇÃO', quantity: 1, deadline: '20/07/2025', description: 'Aguardando envio' },
  { id: '11', title: 'Retalhos de seda - 8kg', brand: 'Atelier Luxo', status: 'PROPOSTA', quantity: 1, deadline: '25/07/2025', description: 'Proposta enviada' },
];
