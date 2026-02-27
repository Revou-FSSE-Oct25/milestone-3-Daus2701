/** @jest-environment node */

import { GET } from "@/app/api/categories/route";

describe("GET /api/categories", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("returns categories list", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [{ id: 1, name: "Test" }],
      ok: true,
    });

    process.env.PLATZI_API = "https://api.escuelajs.co/api/v1";

    const res = await GET();
    const data = await res.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data[0].name).toBe("Test");
    expect(global.fetch).toHaveBeenCalled();
  });
});