import Navbar from "@/components/ui/Navbar";
import { Poppins } from "@next/font/google";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Navbar />
      <main
        className={`${poppins.variable} font-sans h-screen dark:bg-gray-900 dark:text-gray-200`}
      >
        <Toaster />
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}
