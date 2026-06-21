'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { loadCartDraft, saveCartDraft } from '@/app/actions/cart';

export interface CartItem {
  productId: string;
  name: string;
  category: string;
  imageUrl: string | null;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = 'infab_rfq_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const initRef = useRef(false);

  useEffect(() => {
    async function initCart() {
      // First try to load from server
      const { success, items: serverItems } = await loadCartDraft();
      if (success && Array.isArray(serverItems) && serverItems.length > 0) {
        setItems(serverItems as unknown as CartItem[]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serverItems));
      } else {
        // Fallback to local storage
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) setItems(JSON.parse(stored));
        } catch {}
      }
      setHydrated(true);
      initRef.current = true;
    }
    initCart();
  }, []);

  useEffect(() => {
    if (hydrated && initRef.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      // Sync to server in background
      const timeout = setTimeout(() => {
        saveCartDraft(items);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [items, hydrated]);

  const add = useCallback((product: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, count: items.length }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
