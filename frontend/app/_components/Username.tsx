import React, { useEffect, useState } from "react";

type UserInfo = {
  username: string;
};

const UsernameDisplay = ({ user_id }: { user_id: string }) => {
  const [username, setUsername] = useState<string | null>(null);

  async function fetchData(user_id: string) {
    try {
      const response = await fetch(`../../api/db/userInfo/${user_id}`);
      const data: UserInfo = await response.json();
      setUsername(data.username);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  useEffect(() => {
    if (user_id) {
      fetchData(user_id);
    }
  }, [user_id]);

  return (
    <span className="text-[12px] font-semibold cursor-pointer">
      {username ? `@${username}` : "anonymous"}
    </span>
  );
};

export default UsernameDisplay;
