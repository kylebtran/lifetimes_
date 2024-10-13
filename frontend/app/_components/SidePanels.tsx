import React, { useEffect, useState } from "react";
import { Crosshair, Mic } from "lucide-react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Slider from "./Slider";
import Post from "./Post";
import Reply from "./Reply";
import { Post as PostInterface } from "@/app/(models)/db";
import { Reply as ReplyInterface } from "@/app/(models)/db";
import { useUser } from "@auth0/nextjs-auth0/client";

const SAMPLE_TEXT = `I find myself standing in a city made entirely of glass...`;

function SidePanels({
  isLeftPanel,
  isRightPanel,
  selectedPost,
  allPosts,
}: {
  isLeftPanel: boolean;
  isRightPanel: boolean;
  selectedPost: number;
  allPosts: PostInterface[];
}) {
  const [textContent, setTextContent] = useState<string>(SAMPLE_TEXT);
  const [duraContent, setDuraContent] = useState<number>(0);
  const [happiness, setHappiness] = useState<number>(0);
  const [sadness, setSadness] = useState<number>(0);
  const [fear, setFear] = useState<number>(0);
  const [anger, setAnger] = useState<number>(0);
  const [surprise, setSurprise] = useState<number>(0);
  const [disgust, setDisgust] = useState<number>(0);
  const [concern, setConcern] = useState<number>(0);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [username, setUsername] = useState<string>("");
  const { user, isLoading } = useUser(); // Get user from Auth0
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const post = selectedPost
    ? allPosts[(selectedPost - 1) % allPosts.length]
    : null;

  async function fetchData(user_id: string) {
    try {
      const response = await fetch(`../../api/db/userInfo/${user_id}`);
      const data = await response.json();
      setUsername(data.username);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  useEffect(() => {
    if (user?.email) {
      fetchData(user.email);
    }
  }, [user?.email]);

  // Handle text analysis and dream upload
  const handleSubmit = async () => {
    if (!textContent) return;
    try {
      const response = await fetch("http://localhost:8000/analyze_text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textContent }),
      });

      const data = await response.json();
      console.log(data);

      const { happiness, sadness, fear, anger, surprise, disgust } =
        data.analytics;
      const coordinates = data.coordinates;

      setHappiness(happiness);
      setSadness(sadness);
      setFear(fear);
      setAnger(anger);
      setSurprise(surprise);
      setDisgust(disgust);
      setConcern(data.concern);
      setCoordinates(coordinates);

      setIsReadyToUpload(true); // Set ready to upload flag
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpload = async () => {
    try {
      const concernToAdd = Number(duraContent) < 8 ? 8 - Number(duraContent) : 0;
      const post: PostInterface = {
        user_id: user?.email || "",
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
          concern: Math.min(
            concern + concernToAdd,
            10
          ),
        }),
        title: "",
        isPrivate: false,
        tags: [],
        duration: Number(duraContent * 60),
        replies: JSON.stringify([]),
      };

      const response = await fetch(`/api/db/addDream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // Watch for the `isReadyToUpload` flag
  useEffect(() => {
    if (isReadyToUpload) {
      handleUpload();
      setIsReadyToUpload(false); // Reset the flag
    }
  }, [isReadyToUpload]);

  const handleSubmitAndUpload = async () => {
    await handleSubmit();
  };

  const renderReplies = () => {
    if (!post || !post.replies || post.replies.length === 0) return <></>;

    const postReplies: ReplyInterface[] = JSON.parse(
      post.replies as unknown as string
    );
    return (
      <ul>
        {postReplies.map(({ user_id, content, createdAt }, i) => (
          <li key={i} className="-my-3">
            <Reply user_id={user_id} content={content} date={createdAt} />
          </li>
        ))}
      </ul>
    );
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
              {post ? (
                <>
                  <Break />
                  <Post
                    text={post.content}
                    user_id={post.user_id}
                    date={post.date}
                  />
                  <div />
                  {renderReplies()}
                  {user?.name && (
                    <div className="absolute w-[208px] bottom-6">
                      <Reply
                        user_id={user.name}
                        post_id={post.user_id}
                        post_date={post.date}
                        isNewReply={true}
                      />
                    </div>
                  )}
                </>
              ) : null}
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
                {username || "No Username"}
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
                <input
                  className="w-full min-h-8 px-2 py-2 outline outline-[0.2px] outline-muted/50 outline-offset-[-0.2px] rounded-sm overflow-y-auto break-words text-[12px] text-white bg-panels max-h-[10px]"
                  value={duraContent}
                  onChange={(e) => setDuraContent(e.target.value)}
                  placeholder="How many hours did you sleep?"
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
                      bottom: `${((coordinates.y + 1) / 2) * 100}%`,
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
                  <span className="text-[12px]">Disgust</span>
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
