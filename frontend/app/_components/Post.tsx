import React from "react";
import { Ellipsis, UserPlus } from "lucide-react";
import Icons from "./Icons";
import Username from "./Username";

function Post({
  text,
  user_id,
  date,
}: {
  text: string;
  user_id: string;
  date: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex">
        <div className="flex flex-1 items-center space-x-3">
          <Icons user_id={user_id} />
          <span className="text-[12px] font-semibold cursor-pointer">
            <Username user_id={user_id} />
          </span>
        </div>
        <div className="flex items-end items-center space-x-3">
          <UserPlus width={"16"} className={"text-muted cursor-pointer"} />
          <Ellipsis width={"16"} className={"text-muted cursor-pointer"} />
        </div>
      </div>
      <div className="w-full h-40 px-2 py-2 bg-background rounded overflow-y-auto break-words text-[12px] font-medium text-white/80">
        {text}
      </div>
    </div>
  );
}

export default Post;
