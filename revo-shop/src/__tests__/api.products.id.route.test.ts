/** @jest-environment node */

import { GET, POST } from "@/app/api/products/route";

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));

import { auth } from "@/lib/auth";

describe("GET /api/products", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  test("returns products list", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [{ id: 1, title: "A", price: 10 }],
      ok: true,
    });

    process.env.PLATZI_API = "https://api.escuelajs.co/api/v1";

    const res = await GET();
    const data = await res.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data[0].title).toBe("A");
  });
});

describe("POST /api/products", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  test("returns 401 if not admin", async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);

    const req = new Request("http://localhost/api/products", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  test("returns 400 if validation fails", async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ role: "admin" });

    const req = new Request("http://localhost/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Hi", // too short
        price: 10,
        description: "short", // too short
        categoryId: 0, // invalid
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.message).toBeTruthy();
  });

  test("creates product (201) when valid and admin", async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ role: "admin" });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ id: 999, title: "New" }),
      ok: true,
    });

    process.env.PLATZI_API = "https://api.escuelajs.co/api/v1";

    const req = new Request("http://localhost/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Product",
        price: 12,
        description: "This is a valid description.",
        categoryId: 1,
        images: ["https://placehold.co/600x400/png"],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);

    const data = await res.json();
    expect(data.id).toBe(999);
  });
});