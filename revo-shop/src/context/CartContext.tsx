"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD"; payload: Omit<CartItem, "qty">; qty?: number }
  | { type: "INC"; id: number }
  | { type: "DEC"; id: number }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" }
  | { type: "SET"; payload: CartItem[] };

const CART_KEY = "revo_shop_cart_v1";

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "SET":
      return { items: action.payload };

    case "ADD": {
      const qty = action.qty ?? 1;
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return {
        items: [{ ...action.payload, qty }, ...state.items],
      };
    }

    case "INC":
      return { items: state.items.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i)) };

    case "DEC":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
          .filter((i) => i.qty > 0),
      };

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) dispatch({ type: "SET", payload: parsed });
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const value: CartContextValue = useMemo(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.qty * i.price, 0);

    return {
      items: state.items,
      addToCart: (item, qty) => dispatch({ type: "ADD", payload: item, qty }),
      inc: (id) => dispatch({ type: "INC", id }),
      dec: (id) => dispatch({ type: "DEC", id }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
      totalItems,
      totalPrice,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
