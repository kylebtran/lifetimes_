"use client";
import LocomotiveScroll from "locomotive-scroll";
import React, { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Card from "../_components/Card";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const texts = [
    "“We live in a time of string theories and god particles.",
    "Feasible? Doable? Sure, why not.” ― Old Joe, Breaking Bad",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (scrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });

      document.documentElement.classList.add("is-ready");

      return () => {
        scroll.destroy();
      };
    }
  }, []);

  return (
    <div
      data-scroll-container
      ref={scrollRef}
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
        <div className="flex space-x-6 overflow-x-auto whitespace-nowrap">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
