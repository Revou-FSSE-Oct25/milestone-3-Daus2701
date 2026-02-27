import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export type Role = "admin" | "user";

export type DemoUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

/**
 * ✅ Pure function: easy to unit test
 */
export function demoAuthorize(
  email?: string,
  password?: string
): DemoUser | null {
  if (!email || !password) return null;

  const isAdmin = email === "admin@revo.shop" && password === "admin123";
  const isUser = email === "user@revo.shop" && password === "user123";

  if (!isAdmin && !isUser) return null;

  return {
    id: email,
    email,
    name: isAdmin ? "Admin" : "User",
    role: isAdmin ? "admin" : "user",
  };
}

/**
 * ✅ Pure helpers: easy to unit test
 */
export function applyRoleToToken(token: any, user?: any) {
  if (user?.role) token.role = user.role;
  return token;
}

export function applyRoleToSession(session: any, token: any) {
  session.role = token?.role;
  return session;
}

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        return demoAuthorize(email, password);
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return applyRoleToToken(token, user);
    },
    async session({ session, token }) {
      return applyRoleToSession(session, token);
    },
  },
});