import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { type: "text", placeholder: "me@email.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = loginUserSchema.parse(credentials);
        // const { id, password } = credentials as {
        //   id: string;
        //   password: string;
        // };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isPasswordCorrect = password === user.password;
        // var isPasswordCorrect: boolean = await bcrypt.compare(
        //   password,
        //   user.password
        // );

        if (!isPasswordCorrect) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.email;
        token.username = user.id;
        console.log({ user });
      }
      return token;
    },
  },

  pages: {
    signIn: "/welcome-page",
    signOut: "/basic-unit",
  },
};

export default NextAuth(authOptions);
