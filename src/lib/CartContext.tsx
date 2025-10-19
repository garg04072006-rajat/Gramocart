import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  getQuantity: (id: string) => number;
  totalCount: number;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart_items');
      return raw ? JSON.parse(raw) as CartItem[] : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart_items', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const add = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const increment = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));

  const decrement = (id: string) => setItems(prev => {
    const found = prev.find(i => i.id === id);
    if (!found) return prev;
    if (found.quantity <= 1) return prev.filter(i => i.id !== id);
    return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
  });

  const getQuantity = (id: string) => items.find(i => i.id === id)?.quantity || 0;

  const totalCount = items.reduce((s, it) => s + it.quantity, 0);

  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, add, remove, increment, decrement, getQuantity, totalCount, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
