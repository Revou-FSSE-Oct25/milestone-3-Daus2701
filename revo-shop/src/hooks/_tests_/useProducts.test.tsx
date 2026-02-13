import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "../useProducts";

describe("useProducts", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches products successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: "A", price: 10, images: [] }],
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("");
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].title).toBe("A");
  });

  it("handles API failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(0);
    expect(result.current.error).toBeTruthy();
  });
});
