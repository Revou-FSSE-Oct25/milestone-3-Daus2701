"use client";

import { useEffect, useState } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type UseProductsState = {
  products: Product[];
  loading: boolean;
  error: string;
  refetch: () => void;
};

const API_URL = "https://api.escuelajs.co/api/v1/products";

export function useProducts(): UseProductsState {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL, { signal });

      if (!res.ok) {
        throw new Error(`Failed to fetch products (${res.status})`);
      }

      const data = (await res.json()) as Product[];
      setProducts(data);
    } catch (err: any) {
      // Abort isn't a real "error" we want to show
      if (err?.name === "AbortError") return;
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, []);

  const refetch = () => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
  };

  return { products, loading, error, refetch };
}
