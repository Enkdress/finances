import { Play } from "@next/font/google";
import { Menu, Transition } from "@headlessui/react";
import Avatar from "./Avatar";
import Button from "./Button";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const play = Play({
  subsets: ["latin"],
  variable: "--font-play",
  weight: ["400", "700"],
});

const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log({ error });
    router.push("/login");
  };

  if (!session?.user) {
    return null;
  }

  return (
    <header
      className={`${play.variable} font-header flex justify-between items-center px-10 py-3 bg-slate-800 border-b border-slate-700`}
    >
      <h1 className="text-2xl font-semibold text-emerald-600">
        Finance Manager
      </h1>
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="inline-flex justify-center ">
          <Avatar />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-0 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Button
                    className={`${
                      active ? "bg-emerald-500 text-white" : ""
                    } group hover:bg-emerald-200/30 flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
};

export default Navbar;
