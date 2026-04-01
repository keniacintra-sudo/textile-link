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
  { id: '3', material: 'Jeans reciclado', weight: '30 kg', location: 'Belo Horizonte, MG', price: 'R$ 120', seller: 'Facção Sul' },
  { id: '4', material: 'Malha de algodão', weight: '22 kg', location: 'Blumenau, SC', price: 'R$ 88', seller: 'Confecções ABC' },
  { id: '5', material: 'Retalhos de seda', weight: '8 kg', location: 'São Paulo, SP', price: 'R$ 210', seller: 'Atelier Luxo' },
  { id: '6', material: 'Viscose colorida', weight: '18 kg', location: 'Fortaleza, CE', price: 'R$ 65', seller: 'TextilNE' },
  { id: '7', material: 'Tricoline estampado', weight: '25 kg', location: 'Americana, SP', price: 'R$ 150', seller: 'Estamparia Central' },
  { id: '8', material: 'Moletom cinza', weight: '40 kg', location: 'Caxias do Sul, RS', price: 'R$ 160', seller: 'Malhas Gaúchas' },
];

export const chats: ChatPreview[] = [
  { id: '1', name: 'Facção Sul Têxtil', avatar: 'FS', lastMessage: 'Enviamos as amostras hoje!', time: '14:32', unread: 2 },
  { id: '2', name: 'Confecções ABC', avatar: 'CA', lastMessage: 'Podemos ajustar o prazo?', time: '11:05', unread: 0 },
  { id: '3', name: 'Maria Artesã', avatar: 'MA', lastMessage: 'Interessada nos retalhos de seda', time: 'Ontem', unread: 1 },
];

export const artesaoOrders: Order[] = [
  { id: '10', title: 'Jeans reciclado - 30kg', brand: 'Facção Sul', status: 'EM PRODUÇÃO', quantity: 1, deadline: '20/07/2025', description: 'Aguardando envio' },
  { id: '11', title: 'Retalhos de seda - 8kg', brand: 'Atelier Luxo', status: 'PROPOSTA', quantity: 1, deadline: '25/07/2025', description: 'Proposta enviada' },
];
