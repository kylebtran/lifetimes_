import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

type UserInfo = {
  username: string;
  profilePicture: string;
};

async function fetchData(
  user: any,
  setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (user?.email) {
    try {
      const response = await fetch(`../../api/db/userInfo/${user.email}`);
      const data: UserInfo = await response.json();

      setProfilePicture(data.profilePicture);

      localStorage.setItem("profilePicture", data.profilePicture);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }
}

export default function Component() {
  const { user } = useUser();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("profilePicture");

    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
      setLoading(false);
    } else if (user) {
      fetchData(user, setProfilePicture, setLoading);
    }
  }, [user?.email]);

  return (
    <div>
      {profilePicture && (
        <img
          src={profilePicture}
          height={32}
          width={32}
          className="rounded-full"
        />
      )}
    </div>
  );
}
