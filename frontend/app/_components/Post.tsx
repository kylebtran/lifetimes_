import React from "react";
import Image from "next/image";
import { Ellipsis, UserPlus } from "lucide-react";
function Post({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      <div className="flex">
        <div className="flex flex-1 items-center space-x-3">
          <Image
            src={"/images/TEST_kbt.png"}
            height={32}
            width={32}
            alt="pfp"
            className="rounded-full cursor-pointer"
          />
          <span className="text-[12px] font-semibold cursor-pointer">
            @kylebtran
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
