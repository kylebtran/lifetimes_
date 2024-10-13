"use client";
import React from "react";
import Grid from "../_components/Grid";
import { usePanelContext } from "../PanelContext";
import Image from "next/image";

export default function Home() {
  const {
    isLeftPanel,
    setIsLeftPanel,
    setIsRightPanel,
    selectedPost,
    setSelectedPost,
  } = usePanelContext();
  const texts = [
    "“We live in a time of string theories and god particles.",
    "Feasible? Doable? Sure, why not.” ― Old Joe, Breaking Bad",
  ];

  return (
    <div
      // data-scroll-container
      // ref={scrollRef}
      className="flex flex-col min-h-screen"
    >
      <div className="flex flex-col p-8 mt-[560px]">
        {texts.map((text, index) => (
          <span key={index} className="rolling-text-container text-muted">
            <span className="rolling-text font-sans font-medium italic text-[24px]">
              {text}
            </span>
          </span>
        ))}
        <span className="rolling-text-container -mt-20 -ml-2">
          <span className="rolling-text font-serif text-[256px]">
            LIFETIMES
            <span className="cursor-blink font-thin text-muted">_</span>
          </span>
        </span>
      </div>
      <div className="flex w-full min-h-screen relative">
        <Grid
          numCards={2601}
          isLeftPanel={isLeftPanel}
          setIsLeftPanel={setIsLeftPanel}
          setIsRightPanel={setIsRightPanel}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
        {/* 2601 / 255 */}
        <Image
          src="/assets/overlay.svg"
          fill={true}
          alt="overlay"
          draggable={false}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
}
