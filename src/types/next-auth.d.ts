import NextAuth, { DefaultSession, Def } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { TUser } from "../fmschemas/User";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends TUser {}
  interface Session extends DefaultSession {
    user: TUser;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    user: TUser;
  }
}
