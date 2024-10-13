import React from "react";
import Image from "next/image";

function Playlist() {
  return (
    <div className="flex flex-col items-center hover:bg-panels p-4 rounded-lg">
      <Image
        src={"/assets/surprise.svg"}
        alt="Profile Icon"
        height={128}
        width={128}
      />
      <span className="mt-2 text-[14px] font-semibold">Surprise</span>
      <span className="text-[12px] font-medium text-muted">4 Dreams</span>
    </div>
  );
}

export default Playlist;
