import { Crosshair, Ellipsis, Mic, Minus, Plus, UserPlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Slider from "./Slider";
import Post from "./Post";
import Reply from "./Reply";
import { Post as PostInterface } from "@/app/(models)/db";
import { useUser } from "@auth0/nextjs-auth0/client";

// Dial animation

const SAMPLE_TEXT = `I find myself standing in a city made entirely of glass. Every building stretches toward the sky like delicate, shimmering towers, reflecting an endless expanse of stars above. The sky isn’t dark, though—it glows with a soft, otherworldly light, illuminated by not just one moon, but dozens. Each moon is a different color—some are pale silver, others are deep violet, soft pink, or golden—and they seem to hang impossibly close, like lanterns suspended just out of reach. As I walk, my footsteps create ripples on the smooth surface of the streets, which are as clear as water. The ripples spread outward in perfect circles, but instead of fading, they cause the glass around me to hum softly, like a distant melody. There are no people here, just the quiet song of the city and the moons watching. Suddenly, I notice something strange: a seed in my palm, glowing faintly. Before I can react, it takes root in my hand, growing rapidly into a tree that spirals upward in twisting, crystalline branches. The branches stretch, and as they reach their full length, they begin to turn into birds—translucent and shimmering, as if made of light. The birds lift off, circling me, and I feel my feet leave the ground. They carry me higher and higher, past the towering glass structures, past the glowing moons, until I am weightless. The city below fades into a blur of shimmering light, and I am no longer solid—just a part of the night sky, dissolving into the stars. I feel no fear, only a deep sense of peace, as if I’ve returned to where I belong.`;

function SidePanels({
  isLeftPanel,
  isRightPanel,
}: {
  isLeftPanel: Boolean;
  isRightPanel: Boolean;
}) {
  const [textContent, setTextContent] = useState<string>(SAMPLE_TEXT);

  const [happiness, setHappiness] = useState<number>(0);
  const [sadness, setSadness] = useState<number>(0);
  const [fear, setFear] = useState<number>(0);
  const [anger, setAnger] = useState<number>(0);
  const [surprise, setSurprise] = useState<number>(0);
  const [disgust, setDisgust] = useState<number>(0);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const { user, error, isLoading } = useUser();

  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const handleSubmit = async () => {
    if (!textContent) return;
    try {
      const response = await fetch("http://localhost:8000/analyze_text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textContent }),
      });

      const data = await response.json();
      console.log(data);

      const { happiness, sadness, fear, anger, surprise, disgust } = data.analytics;
      const coordinates = data.coordinates;

      // Update the state with the fetched analytics and coordinates
      setHappiness(happiness);
      setSadness(sadness);
      setFear(fear);
      setAnger(anger);
      setSurprise(surprise);
      setDisgust(disgust);
      setCoordinates(coordinates);

      console.log(((coordinates.x + 1) / 2) * 100);

      // Set flag to indicate state update is complete
      setIsReadyToUpload(true);

      return Promise.resolve(); // Indicate success
    } catch (error) {
      console.error("Error:", error);
      return Promise.reject(); // Indicate failure
    }
  };

  const handleUpload = async () => {
    try {
      const post: PostInterface = {
        user_id: user?.email ? user.email : "",
        date: new Date().toISOString().split("T")[0],
        content: textContent,
        coordinate: [coordinates.x, coordinates.y],
        analytics: JSON.stringify({
          happiness: happiness,
          sadness: sadness,
          fear: fear,
          anger: anger,
          surprise: surprise,
          disgust: disgust,
          concern: 0,
        }),
        title: "",
        isPrivate: false,
        tags: [],
        duration: 0,
        replies: [],
      };

      const response = await fetch(`/api/db/addDream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload the dream");
      }

      console.log("Dream uploaded successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Watch for changes to `isReadyToUpload`
  useEffect(() => {
    if (isReadyToUpload) {
      handleUpload();
      setIsReadyToUpload(false); // Reset the flag
    }
  }, [isReadyToUpload]);

  const handleSubmitAndUpload = async () => {
    try {
      await handleSubmit();
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  

  return (
    <>
      {/* Left Panel */}
      <div
        className={`flex flex-col h-screen transform transition-transform duration-300 ease-in-out 
        ${
          isLeftPanel ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 z-50`}
      >
        <div className="flex flex-col h-screen p-3">
          <div className="flex-grow w-[240px] px-4 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
            <div className="flex w-full justify-end mt-[10px] mb-3">
              <Crosshair width={"16"} className={"text-muted"} />
            </div>
            <div className="flex flex-col space-y-3">
              <Break />
              <Post text={SAMPLE_TEXT} />
              {/* <Break /> */}
              <Reply isNewReply={true}/>
              <Reply />
            </div>
          </div>
        </div>
      </div>
      {/* Right Panel */}
      <div
        className={`flex flex-col h-screen transform transition-transform duration-300 ease-in-out 
        ${
          isRightPanel ? "translate-x-0" : "translate-x-full"
        } fixed right-0 top-0 z-50`}
      >
        <div className="flex flex-col h-screen p-3">
          <div className="flex-grow w-[240px] px-4 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
            <div className="flex w-full justify-between items-center mt-[10px] mb-3">
              <Crosshair width={"16"} className={"text-muted"} />
              <span className="text-[12px] mr-12 font-semibold cursor-pointer">
                @kylebtran
              </span>
            </div>
            <div className="flex flex-col space-y-3">
              <Break />
              <Dropdown
                title={"Wishing Well"}
                icons={<Mic width={"16"} className={"cursor-pointer"} />}
                start={true}
              >
                <textarea
                  className="w-full min-h-40 px-2 py-2 outline outline-[0.2px] outline-muted/50 outline-offset-[-0.2px] rounded-sm overflow-y-auto break-words text-[12px] text-white bg-panels max-h-[400px]"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Recite last night's dream"
                />
                <button
                  className={`rounded py-1 text-[12px] text-background font-medium ${
                    !textContent ? "bg-muted" : "bg-accent"
                  } transition-colors duration-200`}
                  onClick={handleSubmitAndUpload}
                >
                  Submit
                </button>
              </Dropdown>

              <Break />
              <Dropdown title={"Results"}>
                <div className="relative w-[208px] h-[104px]">
                  <Image
                    src={"/images/resultsmap.svg"}
                    width={208}
                    height={104}
                    alt={"Results Map"}
                    className="select-none"
                    draggable={false}
                  />
                  <div
                    className={`absolute w-2 h-2 bg-accent rounded-full outline outline-2 outline-panels ${
                      coordinates.x === 0 && coordinates.y === 0 ? "hidden" : ""
                    }`}
                    style={{
                      left: `${((coordinates.x + 1) / 2) * 100}%`,
                      top: `${((coordinates.y + 1) / 2) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[12px]">Happiness</span>
                  <Slider value={happiness} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[12px]">Sadness</span>
                  <Slider value={sadness} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[12px]">Fear</span>
                  <Slider value={fear} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[12px]">Anger</span>
                  <Slider value={anger} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[12px]">Surprise</span>
                  <Slider value={surprise} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[12px]">Disguist</span>
                  <Slider value={disgust} />
                </div>
              </Dropdown>
              <Break />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Break = () => {
  return <div className="w-[240px] h-[0.2px] -ml-4 bg-muted/50" />;
};

export default SidePanels;
