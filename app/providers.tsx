"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type CartItem = { id: string; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (id: string) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === id);
      if (found) return prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { id, qty: 1 }];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));

  const setQty = (id: string, qty: number) => {
    const safe = Math.max(1, Math.min(99, Number.isFinite(qty) ? qty : 1));
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: safe } : x)));
  };

  const clear = () => setItems([]);

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    return { items, add, remove, setQty, clear, count };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}
