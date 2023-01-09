import Head from "next/head";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  if (!session) {
    console.log("no loged");
  }

  return (
    <>
      <Head>
        <title>Finance Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello</h1>
      {session?.user.role}
      <Image
        src={session?.user.user_metadata.avatar_url}
        alt={`${session?.user.user_metadata.name}-profile-pic`}
        width={200}
        height={200}
      />
      <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
    </>
  );
}
