import { useSession } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "lib/supabase";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="px-2 md:px-w-full h-full flex justify-center items-center">
      <Head>
        <title>Login - Finance Manager</title>
      </Head>
      <div className="border w-full md:w-1/3 border-slate-700 p-10 rounded-md">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github"]}
        />
      </div>
    </div>
  );
};

export default LoginPage;
