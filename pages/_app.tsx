import Layout from "@/components/ui/Layout";
import Navbar from "@/components/ui/Navbar";
import { Poppins } from "@next/font/google";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log({ session });
      if (!session) {
        router.push("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Navbar />
        <main
          className={`${poppins.variable} font-sans h-screen dark:bg-gray-900 dark:text-gray-200`}
        >
          <Toaster />
          <Component {...pageProps} />
        </main>
      </Layout>
    </SessionContextProvider>
  );
}
