
"use client";

import { useEffect, useState } from "react"; // Import useState and useEffect
import Map from "@/app/_components/Map";
import { useUser } from "@auth0/nextjs-auth0/client";
import Script from "next/script";
import { Post } from "@/app/(models)/db";

function Square() {
    const { user, error, isLoading } = useUser();
    const [posts, setPosts] = useState<Post[]>([]); // State to hold posts

    useEffect(() => {
        const getUserPost = async () => {
            if (user?.email) { // Ensure user email is available
                console.log("asasdasad")
                const response = await fetch(`../api/db/postsId/${user?.email}`);
                
                const data = await response.json();
                console.log(data);

                setPosts(data); // Set the fetched data
            }
        };

        getUserPost(); // Call the function
    }, [user]); // Dependency on user to fetch new posts when user changes

    const coords = posts.map((value: Post) => value.coordinate);
    console.log(coords)
    return( 
        <div className="flex flex-col w-full min-h-screen justify-center items-center bg-red-900 cursor-default">
            <Script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></Script>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></Script>
            <Map coords={coords}/>
        </div>
    );
};

export default Square;
