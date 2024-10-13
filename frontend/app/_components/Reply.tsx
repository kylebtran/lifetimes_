import React, { useState } from "react";
import Image from "next/image";
import { Ellipsis, UserPlus } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

function Reply({ isNewReply = false }: { isNewReply?: boolean }) {
  const [reply, setReply] = useState<string>("");
  const { user } = useUser();

  const changeReply = (text: string) => {
    setReply(text);
  };

  const handleSubmit = async () => {
    if (!reply) return;
    try {
      // const response = await fetch("http://localhost:8000/analyze_text", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ text: reply }),
      // });
      console.log("Reply Successful");

      setReply("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex">
        <div className="flex flex-1 justify-end items-center space-x-3">
          <span className="text-[12px] font-semibold cursor-pointer">
            {isNewReply && user ? "@" + user.nickname : "@kylebtran"}
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
      {isNewReply ? (
        <div className="flex flex-col space-y-3">
          <textarea
            className="w-full px-2 py-2 bg-muted/15 rounded overflow-y-auto break-words text-[12px] font-medium text-white/80 bg-panels max-h-[200px]"
            name="new-reply"
            placeholder="Add a reply..."
            value={reply}
            onChange={(e) => changeReply(e.target.value)}
          />
          <button
            className={`rounded py-1 text-[12px] text-background font-medium ${
              !reply ? "bg-muted" : "bg-accent"
            } transition-colors duration-200`}
            onClick={handleSubmit}
          >
            Reply
          </button>
        </div>
      ) : (
        <div className="w-full px-2 py-2 bg-muted/15 rounded overflow-y-auto break-words text-[12px] font-medium text-white/80">
          Such a rollarcoaster of a story
        </div>
      )}
    </div>
  );
}

export default Reply;