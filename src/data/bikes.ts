import { Bike } from '@/types/bike';
import mountainBike1 from '@/assets/mountain-bike-1.jpg';
import roadBike1 from '@/assets/road-bike-1.jpg';
import electricBike1 from '@/assets/electric-bike-1.jpg';

export const bikes: Bike[] = [
  {
    id: '1',
    name: 'Trail Master Pro',
    brand: 'VelocityBikes',
    price: 2499,
    image: mountainBike1,
    description: 'Professional mountain bike with full suspension and carbon fiber frame',
    category: 'mountain',
  },
  {
    id: '2',
    name: 'Aero Speed Elite',
    brand: 'VelocityBikes',
    price: 3299,
    image: roadBike1,
    description: 'Ultra-lightweight road bike designed for speed and performance',
    category: 'road',
  },
  {
    id: '3',
    name: 'Urban E-Power',
    brand: 'VelocityBikes',
    price: 1899,
    image: electricBike1,
    description: 'Modern electric bike perfect for city commuting and leisure rides',
    category: 'electric',

  },
];