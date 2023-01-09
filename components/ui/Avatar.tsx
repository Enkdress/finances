import Image from "next/image";
import { useSession } from "@supabase/auth-helpers-react";
import UserIcon from "@/components/icons/UserIcon";

const Avatar = () => {
  const session = useSession();
  const userInfo = session?.user.user_metadata;
  const userAvatar = userInfo?.avatar_url;
  return (
    <div className="rounded-full border border-slate-700">
      {userAvatar ? (
        <Image
          className="rounded-full"
          src={userAvatar}
          alt={userInfo.name}
          width={38}
          height={38}
        />
      ) : (
        <UserIcon className="w-5 h-5" />
      )}
    </div>
  );
};

export default Avatar;
