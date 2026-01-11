
import { Video, Category, Ad } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Reflexões', slug: 'reflexoes' },
  { id: '2', name: 'Orações', slug: 'oracoes' },
  { id: '3', name: 'Mensagem Bíblica', slug: 'biblia' },
  { id: '4', name: 'Louvor & Adoração', slug: 'louvor' },
  { id: '5', name: 'Autoajuda Cristã', slug: 'autoajuda' }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'O Poder da Esperança em Dias Difíceis',
    description: 'Uma reflexão profunda sobre como manter a fé quando tudo parece perdido.',
    category: 'reflexoes',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: '16x9',
    thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=1280&h=720',
    views: 1250,
    createdAt: Date.now() - 100000
  },
  {
    id: 'v2',
    title: 'Oração da Manhã: Gratidão',
    description: 'Comece seu dia com esta oração poderosa de agradecimento.',
    category: 'oracoes',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: '9x16',
    thumbnail: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=720&h=1280',
    views: 8500,
    createdAt: Date.now() - 200000
  },
  {
    id: 'v3',
    title: 'Salmo 91: A Proteção Divina',
    description: 'A leitura completa do Salmo 91 para proteção de sua família.',
    category: 'biblia',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: '16x9',
    thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1280&h=720',
    views: 320,
    createdAt: Date.now() - 300000
  },
  {
    id: 'v4',
    title: '3 Versículos para sua Ansiedade',
    description: 'Pílulas de paz para o seu coração hoje.',
    category: 'autoajuda',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: '9x16',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=720&h=1280',
    views: 42100,
    createdAt: Date.now() - 400000
  }
];

export const INITIAL_ADS: Ad[] = [
  {
    id: 'ad1',
    title: 'Apoie nosso Ministério',
    imageUrl: 'https://picsum.photos/seed/ministry/728/90',
    link: '#',
    position: 'top',
    active: true
  },
  {
    id: 'ad2',
    title: 'Bíblia de Estudo Digital',
    imageUrl: 'https://picsum.photos/seed/bible/300/250',
    link: '#',
    position: 'sidebar',
    active: true
  }
];
