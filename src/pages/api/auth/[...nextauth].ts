import NextAuth from "next-auth";
import { FilemakerAdapter } from "next-auth-adapter-filemaker";
import EmailProvider from "next-auth/providers/email";

if (
  !process.env.FM_USERNAME ||
  !process.env.FM_PASSWORD ||
  !process.env.FM_DATABASE ||
  !process.env.FM_SERVER
)
  throw new Error("Missing FM_* environment variables");

const fmAdapter = FilemakerAdapter({
  auth: {
    username: process.env.FM_USERNAME,
    password: process.env.FM_PASSWORD,
  },
  db: process.env.FM_DATABASE,
  server: process.env.FM_SERVER,
});

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: process.env.EMAIL_SERVER,
    }),
  ],
  session: { strategy: "jwt" },
  adapter: fmAdapter.Adapter,
  callbacks: {
    jwt({ token, user, profile, account }) {
      // console.log("jwt", { token, user, profile, account });
      if (user)
        token.user = {
          id: user.id,
          email: user.email ?? "",
          emailVerified: user.emailVerified ?? "",
          image: user.image ?? "",
          name: user.name ?? "",
          role: user.role ?? "",
        };
      return token;
    },
    session({ session, user, token }) {
      // console.log("session", { session, user, token });
      session.user = token.user;
      return session;
    },
  },
});
