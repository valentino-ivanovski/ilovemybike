"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ShopSection } from '@/lib/types';
import { useToast } from './ToastContext';

export interface CartItem {
  id: string;
  name: string;
  brand?: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity: number;
  section?: ShopSection;
  variantId?: number;
  variantName?: string;
}

export interface FavoriteItem {
  id: string;
  name: string;
  brand?: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartState {
  items: CartItem[];
  favorites: FavoriteItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_FAVORITES'; payload: FavoriteItem }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'LOAD_STATE'; payload: CartState };

const initialState: CartState = {
  items: [],
  favorites: [],
};

function withDefaultSection(item: Omit<CartItem, 'quantity'> & { quantity?: number }): CartItem {
  const section = item.section ?? 'in-stock';
  return {
    ...item,
    section,
    quantity: item.quantity ?? 1,
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const payload = withDefaultSection(action.payload);
      const existingItem = state.items.find(item => item.id === payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, payload],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'ADD_TO_FAVORITES': {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };
    case 'LOAD_STATE':
      return {
        items: Array.isArray(action.payload.items)
          ? action.payload.items.map(item => withDefaultSection(item))
          : [],
        favorites: Array.isArray(action.payload.favorites)
          ? action.payload.favorites
          : [],
      };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isInFavorites: (id: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [/*storedState*/, setStoredState] = useLocalStorage<CartState>('cart-state', initialState);
  const { showToast } = useToast();

  const formatItemName = (item: Pick<CartItem, 'name' | 'variantName'>) =>
    item.variantName ? `${item.name} (${item.variantName})` : item.name;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('cart-state');
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && typeof parsed === 'object') {
          dispatch({ type: 'LOAD_STATE', payload: parsed });
        }
      }
    } catch (_) {}
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = state.items.find(existing => existing.id === item.id);
    dispatch({ type: 'ADD_TO_CART', payload: item });
    const itemLabel = formatItemName(item);
    showToast({
      title: existingItem ? 'Updated cart' : 'Added to cart',
      description: existingItem
        ? `Increased quantity for ${itemLabel}.`
        : `${itemLabel} added to your cart.`,
      variant: 'success',
    });
  };

  const removeFromCart = (id: string) => {
    const removedItem = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    if (removedItem) {
      showToast({
        title: 'Removed from cart',
        description: `${formatItemName(removedItem)} removed.`,
        variant: 'default',
      });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    if (state.items.length > 0) {
      showToast({
        title: 'Cart cleared',
        description: 'All items removed from your cart.',
        variant: 'default',
      });
    }
  };

  const addToFavorites = (item: FavoriteItem) => {
    const exists = state.favorites.some(fav => fav.id === item.id);
    if (exists) {
      showToast({
        title: 'Already in favorites',
        description: `${item.name} is already saved.`,
        variant: 'default',
      });
      return;
    }
    dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
    showToast({
      title: 'Added to favorites',
      description: `${item.name} saved for later.`,
      variant: 'success',
    });
  };

  const removeFromFavorites = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });
    const removed = state.favorites.find(item => item.id === id);
    if (removed) {
      showToast({
        title: 'Removed from favorites',
        description: `${removed.name} removed from your favorites.`,
        variant: 'default',
      });
    }
  };

  const isInFavorites = (id: string) => {
    return state.favorites.some(item => item.id === id);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
