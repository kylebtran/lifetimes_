// Icons.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";

type UserInfo = {
  username: string;
  profilePicture: string;
};

// Change the prop type to accept user_id (string)
export default function Icons({ user_id }: { user_id: string }) {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Fetch user data based on user_id
  async function fetchData(user_id: string) {
    try {
      const response = await fetch(`../../api/db/userInfo/${user_id}`);
      const data: UserInfo = await response.json();

      setProfilePicture(data.profilePicture);
      localStorage.setItem("profilePicture", data.profilePicture);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    if (user_id) {
      fetchData(user_id);
    }
  }, [user_id]);

  return (
    <div>
      {profilePicture && (
        <Image
          src={profilePicture}
          alt="Profile Icon"
          height={32}
          width={32}
          className="rounded-full"
        />
      )}
      {!profilePicture && (
        <Image
          src={`/images/Portrait_Placeholder.png`}
          alt="Placeholder Icon"
          height={32}
          width={32}
          className="rounded-full"
        />
      )}
    </div>
  );
}
