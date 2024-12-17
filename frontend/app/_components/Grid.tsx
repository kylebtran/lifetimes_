import React, { useRef } from "react";
import Card from "./Card";
import { motion } from "framer-motion";

function Grid({
  numCards,
  isLeftPanel,
  setIsLeftPanel,
  setIsRightPanel,
  selectedPost,
  setSelectedPost,
}: {
  numCards: number;
  isLeftPanel: boolean;
  setIsLeftPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: number;
  setSelectedPost: React.Dispatch<React.SetStateAction<number>>;
}) {
  const constraintsRef = useRef(null);
  const cards = Array.from({ length: numCards }, (_, index) => {
    const rowIndex = Math.floor(index / 51);
    const translateX = rowIndex * 100;

    return (
      <motion.div
        className={`${translateX}`}
        style={{ transform: `translateX(${translateX - 2500}px)` }}
        key={index}
      >
        <Card
          key={index}
          imageKey={index}
          isLeftPanel={isLeftPanel}
          setIsLeftPanel={setIsLeftPanel}
          setIsRightPanel={setIsRightPanel}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      </motion.div>
    );
  });

  return (
    <div
      ref={constraintsRef}
      style={{
        width: "2000px", // Arbitrarily large width to accommodate cards
        height: "2000px", // Arbitrarily large height
        overflow: "hidden", // Hide overflow so the draggable area is constrained
        position: "relative", // Ensure container positioning is well-defined
      }}
      className="flex items-center max-h-screen justify-center"
    >
      <motion.div
        className="grid grid-cols-auto-51 gap-6"
        drag
        dragElastic={1}
        dragTransition={{
          power: 0.3,
          timeConstant: 200,
        }}
        dragConstraints={constraintsRef} // Constrain the draggable element
      >
        {cards}
      </motion.div>
    </div>
  );
}

export default Grid;
