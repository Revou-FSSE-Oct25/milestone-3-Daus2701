"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; payload: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE"; id: number }
  | { type: "INC"; id: number }
  | { type: "DEC"; id: number }
  | { type: "SET_QTY"; id: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  setQty: (id: number, quantity: number) => void;
  clear: () => void;

  // derived values
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "revo_shop_cart_v1";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD": {
      const qtyToAdd = Math.max(1, action.quantity ?? 1);
      const existing = state.items.find((x) => x.id === action.payload.id);

      if (existing) {
        return {
          items: state.items.map((x) =>
            x.id === action.payload.id ? { ...x, quantity: x.quantity + qtyToAdd } : x
          ),
        };
      }

      return { items: [...state.items, { ...action.payload, quantity: qtyToAdd }] };
    }

    case "REMOVE":
      return { items: state.items.filter((x) => x.id !== action.id) };

    case "INC":
      return {
        items: state.items.map((x) => (x.id === action.id ? { ...x, quantity: x.quantity + 1 } : x)),
      };

    case "DEC":
      return {
        items: state.items
          .map((x) => (x.id === action.id ? { ...x, quantity: x.quantity - 1 } : x))
          .filter((x) => x.quantity > 0),
      };

    case "SET_QTY": {
      const qty = Math.max(1, Math.floor(action.quantity));
      return { items: state.items.map((x) => (x.id === action.id ? { ...x, quantity: qty } : x)) };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

function safeParseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.id === "number")
      .map((x) => ({
        id: Number(x.id),
        title: String(x.title ?? ""),
        price: Number(x.price ?? 0),
        image: x.image ? String(x.image) : undefined,
        quantity: Math.max(1, Number(x.quantity ?? 1)),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage (client-only)
  useEffect(() => {
    const items = safeParseCart(localStorage.getItem(STORAGE_KEY));
    dispatch({ type: "HYDRATE", items });
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    addToCart: (item, quantity) => dispatch({ type: "ADD", payload: item, quantity }),
    removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
    inc: (id) => dispatch({ type: "INC", id }),
    dec: (id) => dispatch({ type: "DEC", id }),
    setQty: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),

    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider />");
  return ctx;
}
