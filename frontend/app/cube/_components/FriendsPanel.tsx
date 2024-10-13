import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import Friend from "./Friend";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export function FriendsPanel() {
  const { user, isLoading } = useUser();

  return (
    <div className="flex flex-col items-center justify-center w-[475px] mt-10 h-full">
      <div className="font-semibold text-white text-[25px] mb-5">
        Add Friends
      </div>
      <div className="flex items-center">
        <Input type="email" placeholder="Email" />
        <UserPlus className="m-1 ml-2 cursor-pointer" />
      </div>

      <div className="mt-3 h-1 w-full bg-muted/10"></div>

      <div>
        <Friend user_id={user?.sub || ""} />
      </div>
    </div>
  );
}

export default FriendsPanel;
