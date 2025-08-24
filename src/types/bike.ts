import type { StaticImageData } from 'next/image';

export interface Bike {
  id: string;
  category: string;
  name: string;
  brand?: string;
  description: string;
  price: number;
  image: string | StaticImageData;
}
