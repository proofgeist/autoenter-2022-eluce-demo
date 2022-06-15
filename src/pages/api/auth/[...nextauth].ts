import NextAuth from "next-auth";
import { FilemakerAdapter } from "next-auth-adapter-filemaker";

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
  providers: [],
  session: { strategy: "jwt" },
  adapter: fmAdapter.Adapter,
});
