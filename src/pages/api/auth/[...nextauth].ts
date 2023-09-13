import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials, {
  CredentialsProvider,
} from "next-auth/providers/credentials";
import { api } from "~/utils/api";
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "me@email.com" },
        password: { label: "password", type: "password" },
      },
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email !== "admin" || password !== "admin") {
          throw new Error("Invalid Credentials");
        } else {
          return { id: "admin", password: "admin" };
        }
      },
    }),
  ],
  pages: {
    signIn: "/welcome-page",
  },
};

export default NextAuth(authOptions);
