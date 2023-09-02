import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";

import { LoginForm } from "@/components";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // const brand = api.brand.return_all.useQuery({ query: "select * from brand" });
  // console.log(brand.data?.result);
  return (
    <>
      <Head>
        <title>Crimson Paints</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm />
      </main>
    </>
  );
}
