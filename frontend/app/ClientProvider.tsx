"use client";
import React from "react";
import SidePanels from "./_components/SidePanels";
import NavBar from "./_components/NavBar";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePanelContext } from "./PanelContext";

function ClientProvider({ children }: { children: React.ReactNode }) {
  const {
    isLeftPanel,
    isRightPanel,
    setIsLeftPanel,
    setIsRightPanel,
    selectedPost,
    setSelectedPost,
    allPosts,
    setAllPosts,
  } = usePanelContext();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const scrollInstanceRef = React.useRef<any>(null);

  const { user, error, isLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login"); // Redirect to login if not authenticated
    }
  }, [user, isLoading]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.classList.add("is-ready");

    if (scrollRef.current) {
      // Dynamically import LocomotiveScroll to improve performance (optional)
      import("locomotive-scroll").then((LocomotiveScrollModule) => {
        scrollInstanceRef.current = new LocomotiveScrollModule.default({
          el: scrollRef.current!,
          smooth: true,
        });
      });

      // Clean up the LocomotiveScroll instance on unmount
      return () => {
        if (scrollInstanceRef.current) {
          scrollInstanceRef.current.destroy();
        }
      };
    }
  }, []);
  return (
    <>
      <div className="fixed w-full z-10">
        <SidePanels isLeftPanel={isLeftPanel} isRightPanel={isRightPanel} selectedPost={selectedPost} allPosts={allPosts} setAllPosts={setAllPosts} />
      </div>
      <div className="fixed w-full z-20">
        {/* ^ Change to absolute if using Locomotive Scroll */}
        <NavBar
          isLeftPanel={isLeftPanel}
          isRightPanel={isRightPanel}
          setIsLeftPanel={setIsLeftPanel}
          setIsRightPanel={setIsRightPanel}
          setSelectedPost={setSelectedPost}
        />
      </div>
      <main data-scroll-container ref={scrollRef}>
        {children}
      </main>
      <footer></footer>
    </>
  );
}

export default ClientProvider;
