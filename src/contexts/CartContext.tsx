"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface CartItem {
  id: string;
  name: string;
  brand?: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity: number;
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

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
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
      return action.payload;
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
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToFavorites = (item: FavoriteItem) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  };

  const removeFromFavorites = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });
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