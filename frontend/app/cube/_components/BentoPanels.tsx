"use client";

import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Analytics, Post as PostInterface } from "@/app/(models)/db";
import Image from "next/image";
import FriendsPanel from "./FriendsPanel";

function BentoPanels() {
  const [concern, setConcern] = useState<{
    avg: number;
    summary: string;
    bulletPoints: string[];
  } | null>(null); // Initially set concern to null
  const { user, isLoading } = useUser();

  useEffect(() => {
    const fetchAndAggregateEmotions = async () => {
      if (!user || isLoading) return;
      try {
        const response = await fetch(`/api/db/postsId/${user.name}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user posts");
        }

        interface AggregatedAnalytics extends Analytics {
          duration: number; // New interface that includes duration
        }

        let userPosts = await response.json();
        userPosts = userPosts.slice(0, 7);
        const totalConcern = userPosts.reduce(
          (totalConcern: number, { analytics }: PostInterface) => {
            analytics = JSON.parse(analytics as unknown as string);
            totalConcern += analytics["concern"];

            return totalConcern;
          },
          0
        );

        let dreams = "";
        userPosts.forEach((post: PostInterface, i: number) => {
          let analytics = JSON.parse(post.analytics as unknown as string);
          dreams += `Day: ${i + 1}, Concern: ${analytics["concern"]}, Dream: ${
            post.content
          }\n`;
        });

        // console.log(dreams)

        const analyzedConcerningDreams = await fetch(
          "http://localhost:8000/analyze_concern",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: dreams }),
          }
        );

        const data = await analyzedConcerningDreams.json();
        // console.log(data);
        // concern.summary = data.res.summary;
        // concern.bulletPoints = data.res.bulletPoints;
        let concernRes = {
          avg: Math.round((totalConcern / 7) * 100) / 100,
          summary: data.res.summary,
          bulletPoints: data.res.bulletPoints,
        };

        setConcern(concernRes);

        return Promise.resolve(); // Indicate success
      } catch (error) {
        console.error("Error:", error);
        return Promise.reject(); // Indicate failure
      }
    };
    fetchAndAggregateEmotions();
  }, [isLoading]);

  const renderConcerns = () => {
    if (!concern) {
      return (
        <div className="text-[16px] space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/perplexity.png"
              alt="Perplexity"
              width={32}
              height={32}
              className={"flex"}
            />
            <span className="font-medium">Perplexity is thinking...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="text-[16px] space-y-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/perplexity.png"
            alt="Perplexity"
            width={32}
            height={32}
            className={"flex"}
          />
          <span className="font-medium">Perplexity is done:</span>
        </div>
        <div>
          Average Concern{" "}
          <span className="text-confirm font-semibold">{concern.avg}</span>
        </div>
        <div>{concern.summary}</div>
        <ul>
          {concern.bulletPoints.map((bulletPoint, i) => (
            <li key={i}>
              {"  -  "}
              {bulletPoint}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full h-screen grid grid-rows-5 grid-cols-3 gap-4 p-5">
      {/* Left Section */}
      <div className="h-screen flex items-center justify-center col-span-1">
        <div className="flex mt-5 min-h-[820px] min-w-[450px] mt-10px bg-panels/40 rounded-[12px] outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md outline p-6">
          <FriendsPanel />
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-[64px] col-span-2 row-span-2 bg-panels/40 rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        <div className="mt-[0px]">
          <Chart />
        </div>
      </div>

      {/* RenderConcerns Section */}
      <div className="col-span-2 col-start-2 row-span-3 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md p-6">
        {renderConcerns()}
      </div>
    </div>
  );
}

export default BentoPanels;
