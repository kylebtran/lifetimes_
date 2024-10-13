import { useUser } from "@auth0/nextjs-auth0/client";
import BiggerIcons from "./BiggerIcons";
import BiggerUsername from "./BiggerUsername";
import React, { useEffect, useState } from "react";

type userData = {
  user_id: string;
};

const FriendList = ({ user_id }: { user_id: string }) => {
  const { user, isLoading } = useUser();
  const [friends, setFriends] = useState<userData[]>([]);
  const [incoming, setIncoming] = useState<userData[]>([]);
  async function fetchData(user_id: string) {
    try {
      const response = await fetch(`../../api/db/friends/${user?.email}`);
      const response2 = await fetch(`../../api/db/incFriendReq/${user?.email}`);
      const data: userData[] = await response.json();
      const data2: userData[] = await response2.json();
      setFriends(data);
      setIncoming(data2);
    } catch (error) {
      console.error("Error fetching friends or incoming friends:", error);
    }
  }

  useEffect(() => {
    if (user_id) {
      fetchData(user_id);
    }
  }, [user_id]);

  return (
    <div>
      {friends.length > 0 ? (
        <div>
          <div className="-ml-[225px] font-semibold">
            Friends: {friends.length}
          </div>
          {friends.map((friend) => (
            <div
              key={friend.user_id}
              className="flex items-center m-3 -ml-[200px] justify-start"
            >
              <div className="mr-1">
                <BiggerIcons user_id={friend.user_id} />
              </div>
              <div>
                <BiggerUsername user_id={friend.user_id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="semibold font-[24px]">
          Loading Friends / No Friends Found
        </p>
      )}
    </div>
  );
};

export default FriendList;
