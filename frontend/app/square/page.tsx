"use client";
import { useEffect, useState } from "react"; // Import useState and useEffect
import Map from "@/app/_components/Map";
import { useUser } from "@auth0/nextjs-auth0/client";
import Script from "next/script";
import { Post } from "@/app/(models)/db";
import { usePanelContext } from "../PanelContext";
import Image from "next/image";

function Square() {
  const {
    isLeftPanel,
    setIsLeftPanel,
    setIsRightPanel,
    selectedPost,
    setSelectedPost,
  } = usePanelContext();
  const { user, error, isLoading } = useUser();
  const [posts, setPosts] = useState<Post[]>([]); // State to hold posts

  useEffect(() => {
    setIsLeftPanel(true);
    setIsRightPanel(true);
  }, []);

  useEffect(() => {
    const getUserPost = async () => {
      if (user?.email) {
        // Ensure user email is available
        console.log("asasdasad");
        const response = await fetch(`../api/db/postsId/${user?.email}`);

        const data = await response.json();
        console.log(data);

        setPosts(data); // Set the fetched data
      }
    };

    getUserPost(); // Call the function
  }, [user]); // Dependency on user to fetch new posts when user changes

  return (
    <div className="flex w-full min-h-screen relative justify-center overflow-hidden">
      <div className="relative w-[984px] h-[875px] top-[58px]">
        <Image
          src="/assets/emotionmap2.svg"
          alt="emotionmap"
          className="select-none"
          draggable={false}
          width={984}
          height={875}
        />
        <div className="absolute inset-0 cursor-default z-10 w-full h-full scale-x-[1.41] scale-y-[1.48] -mt-[93px] ml-[86px] overflow-hidden">
          <Script src="https://cdn.plot.ly/plotly-2.35.2.min.js" />
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js" />
          <Map 
            posts={posts}
            setSelectedPost={setSelectedPost} 
          />
        </div>
      </div>
    </div>
  );
}

export default Square;
