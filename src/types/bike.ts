import type { StaticImageData } from 'next/image';

export interface Bike {
  id: string;
  category: string;
  name: string;
    brand?: string;
  description: string;
  price: number;
  image: string | StaticImageData;
  onAddToCart?: () => void;
  onToggleFavorite?: (fav: boolean) => void;
}

export interface CartItem extends Bike {
  quantity: number;
}