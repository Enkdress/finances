import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";

const Layout: FunctionComponent<{ children: any }> = ({ children }) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return children;
};

export default Layout;
