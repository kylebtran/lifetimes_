import React, { useState } from "react";
import Image from "next/image";
import { Ellipsis, UserPlus } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

function Reply({
  user_id,
  content,
  date,
  post_id,
  post_date,
  isNewReply = false,
}: {
  user_id: string;
  content?: string;
  date?: string;
  post_id?: string;
  post_date?: string;
  isNewReply?: boolean;
}) {
  const [reply, setReply] = useState<string>("");
  const { user } = useUser();

  const changeReply = (text: string) => {
    setReply(text);
  };

  const handleSubmit = async () => {
    if (!reply || !user) return;
    try {
      const response = await fetch("/api/db/addReply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: post_id,
          user_id: user.name,
          content: reply,
          post_date: post_date,
        }),
      });

      // console.log("Reply Successful");
      setReply("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-3 mb-2">
      <div className="flex">
        <div className="flex flex-1 justify-between items-center space-x-3">
          <span className="text-[12px] font-semibold">
            {date}
          </span>
          <div className="flex items-center space-x-3">
            <span className="text-[12px] font-semibold cursor-pointer">
              {isNewReply && user ? `@${user.nickname}` : `@${user_id.split("@")[0]}`}
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
          {content}
        </div>
      )}
    </div>
  );
}

export default Reply;
