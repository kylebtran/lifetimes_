import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import Friend from "./Friend";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export function FriendsPanel() {
  const { user, isLoading } = useUser();

  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="flex justify-between font-semibold text-white text-[16px] items-center">
        Add Friends
        <Input
          type="email"
          placeholder="Email"
          className="flex w-[200px] border-muted -mt-2"
        />
      </div>
      <div className="mt-3 h-[1px] w-full bg-muted/20" />
      <div className="flex w-full mt-3">
        <Friend user_id={user?.sub || ""} />
      </div>
    </div>
  );
}

export default FriendsPanel;
