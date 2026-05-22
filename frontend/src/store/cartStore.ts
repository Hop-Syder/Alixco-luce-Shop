/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Zustand store for global cart state
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  subscribeWithSelector((set) => ({
    items: [],
    addItem: (newItem) => set((state) => {
      const existingItem = state.items.find(i => i.productId === newItem.productId);
      if (existingItem) {
        return {
          items: state.items.map(i => 
            i.productId === newItem.productId 
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          )
        };
      }
      return { items: [...state.items, newItem] };
    }),
    removeItem: (productId) => set((state) => ({
      items: state.items.filter(i => i.productId !== productId)
    })),
    updateQuantity: (productId, quantity) => set((state) => ({
      items: state.items.map(i => 
        i.productId === productId ? { ...i, quantity } : i
      )
    })),
    clearCart: () => set({ items: [] })
  }))
);
