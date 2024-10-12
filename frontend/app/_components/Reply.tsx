import React from "react";
import Image from "next/image";
import { Ellipsis, UserPlus } from "lucide-react";
function Reply() {
  return (
    <div className="space-y-3">
      <div className="flex">
        <div className="flex flex-1 justify-end items-center space-x-3">
          <span className="text-[12px] font-semibold cursor-pointer">
            @kylebtran
          </span>
          <Image
            src={"/images/TEST_kbt.png"}
            height={32}
            width={32}
            alt="pfp"
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full px-2 py-2 bg-muted/15 rounded overflow-y-auto break-words text-[12px] font-medium text-white/80">
        Such a rollarcoaster of a story...
      </div>
    </div>
  );
}
export default Reply;
