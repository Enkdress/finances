import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const getServerSession = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      error: true,
      session: {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      },
    };
  }

  return { error: false, session };
};
