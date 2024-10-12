"use client";
import React from "react";
import SidePanels from "./_components/SidePanels";
import NavBar from "./_components/NavBar";
import "locomotive-scroll/dist/locomotive-scroll.css";

function ClientProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const scrollInstanceRef = React.useRef<any>(null);

  const [isLeftPanel, setIsLeftPanel] = React.useState<Boolean>(false);
  const [isRightPanel, setIsRightPanel] = React.useState<Boolean>(false);

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
        <SidePanels isLeftPanel={isLeftPanel} isRightPanel={isRightPanel} />
      </div>
      <div className="fixed w-full z-20">
        {/* ^ Change to absolute if using Locomotive Scroll */}
        <NavBar />
      </div>
      {/* <main data-scroll-container ref={scrollRef}> */}
      <main>
        {/* [TEST] */}
        <button
          onClick={() => setIsLeftPanel(!isLeftPanel)}
          className="absolute top-20 right-[400px]"
        >
          Toggle
        </button>
        <button
          onClick={() => setIsRightPanel(!isRightPanel)}
          className="absolute top-20 right-[450px]"
        >
          Toggle
        </button>
        {children}
      </main>
      <footer></footer>
    </>
  );
}

export default ClientProvider;
