"use client";
import React from "react";
import Card from "../_components/Card";
import Grid from "../_components/Grid";

export default function Home() {
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
        <span className="flex flex-col rolling-text-container w-full mt-[560px]">
          <span className="rolling-text font-serif font-semibold text-[40px]">
            THE ABYSS
          </span>
        </span>
      </div>
      <div className="flex w-full min-h-screen bg-muted/20">
        <Grid numCards={2601} />
      </div>
    </div>
  );
}
