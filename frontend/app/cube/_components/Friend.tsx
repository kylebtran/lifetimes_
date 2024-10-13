import Icons from "@/app/_components/Icons";
import Username from "@/app/_components/Username";
import React, { useEffect, useState } from "react";

type userData = {
  user_id: string;
};

const FriendList = ({ user_id }: { user_id: string }) => {
  const [friends, setFriends] = useState<userData[]>([]);

  async function fetchData(user_id: string) {
    try {
      const response = await fetch(`../../api/db/friends/${user_id}`);
      const data: userData[] = await response.json();
      setFriends(data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }

  useEffect(() => {
    if (user_id) {
      fetchData(user_id);
    }
  }, [user_id]);

  return (
    <div>
      <p>No friends found</p>
    </div>
  );
};

export default FriendList;
