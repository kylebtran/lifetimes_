import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function Card({
  imageKey,
  setIsLeftPanel,
  setIsRightPanel,
  selectedPost,
  setSelectedPost,
}: {
  imageKey: number;
  isLeftPanel: boolean;
  setIsLeftPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: number;
  setSelectedPost: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const [imageIndex, setImageIndex] = useState<number>(1);
  const [randomPosition, setRandomPosition] = useState<string>("");
  const [flipX, setFlipX] = useState<string>("");
  const [flipY, setFlipY] = useState<string>("");

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const dragThreshold = 5;

  useEffect(() => {
    // const index = Math.floor(Math.random() * 8) + 1;
    const position = `${Math.random() * 100}% ${Math.random() * 100}%`;
    const flipXValue = Math.random() > 0.5 ? "scale-x-[-1]" : "";
    const flipYValue = Math.random() > 0.5 ? "scale-y-[-1]" : "";

    // setImageIndex(index);
    setRandomPosition(position);
    setFlipX(flipXValue);
    setFlipY(flipYValue);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startPosition) {
      const distanceMoved = Math.sqrt(
        Math.pow(e.clientX - startPosition.x, 2) +
          Math.pow(e.clientY - startPosition.y, 2)
      );
      if (distanceMoved > dragThreshold) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      if (imageKey != 1300) {
        setIsLeftPanel(true);
        setIsRightPanel(false);
      } else {
        setIsRightPanel(true);
        setIsLeftPanel(false);
      }
      setSelectedPost(imageKey);
    }
    setStartPosition(null); // Reset the start position after drag or click
  };

  return (
    <motion.div
      className={`relative w-[240px] h-[128px] hover:z-20 z-10 rounded-lg ${
        selectedPost == imageKey
          ? "outline outline-[3px] outline-confirm outline-offset-[3px]"
          : ""
      } transform translate-x-[${(imageKey % 51) * 100}px}]`}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200 }}
      // onClick={() => {
      //   setIsLeftPanel(!isLeftPanel);
      // }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Image
        src={`${
          imageKey == 1300
            ? "/assets/cards/card-post.svg"
            : `/images/TEST_dreamscapes/TEST_dreamscape_${
                ((imageKey + 3) % 20) + 1
              }.png`
        }`}
        fill={true}
        objectFit={"cover"}
        objectPosition={randomPosition}
        alt={"[PLACEHOLDER]"}
        className={`rounded-lg ${
          imageKey != 1300
            ? "outline outline-[0.1px] outline-white/10 outline-offset-[-1px]"
            : ""
        } transform ${flipX} ${flipY}`}
        priority={true}
        loading={"eager"}
        draggable={false}
      />
    </motion.div>
  );
}

export default Card;
