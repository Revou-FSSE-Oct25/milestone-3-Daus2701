/** @jest-environment node */

import { demoAuthorize, applyRoleToToken, applyRoleToSession } from "@/lib/auth";

describe("auth flow (unit)", () => {
  test("demoAuthorize returns admin user with role", () => {
    const user = demoAuthorize("admin@revo.shop", "admin123");
    expect(user).not.toBeNull();
    expect(user?.role).toBe("admin");
    expect(user?.name).toBe("Admin");
  });

  test("demoAuthorize returns normal user with role", () => {
    const user = demoAuthorize("user@revo.shop", "user123");
    expect(user).not.toBeNull();
    expect(user?.role).toBe("user");
    expect(user?.name).toBe("User");
  });

  test("demoAuthorize rejects invalid credentials", () => {
    const user = demoAuthorize("hacker@revo.shop", "nope");
    expect(user).toBeNull();
  });

  test("jwt callback copies role into token", () => {
    const token: any = {};
    const user: any = { role: "admin" };
    const out = applyRoleToToken(token, user);
    expect(out.role).toBe("admin");
  });

  test("session callback copies role into session", () => {
    const session: any = {};
    const token: any = { role: "user" };
    const out = applyRoleToSession(session, token);
    expect(out.role).toBe("user");
  });
});