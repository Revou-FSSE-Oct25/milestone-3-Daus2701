import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

        if (!email || !password) return null;

        // Demo users
        const isAdmin = email === "admin@revo.shop" && password === "admin123";
        const isUser = email === "user@revo.shop" && password === "user123";

        if (!isAdmin && !isUser) return null;

        return {
          id: email,
          email,
          name: isAdmin ? "Admin" : "User",
          role: isAdmin ? "admin" : "user",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role;
      return session;
    },
  },
});