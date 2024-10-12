import React from "react";
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
  const cards = Array.from({ length: numCards }, (_, index) => {
    const rowIndex = Math.floor(index / 51);
    const translateX = rowIndex * 100;

    return (
      <motion.div
        className={`${translateX}`}
        style={{ transform: `translateX(${translateX - 2500}px)` }}
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
    <motion.div className="flex items-center justify-center w-full max-h-screen overflow-hidden">
      <motion.div
        drag
        dragElastic={0}
        dragTransition={{
          power: 0.3,
          timeConstant: 200,
        }}
        // dragConstraints={constraintsRef}
        className="grid grid-cols-auto-51 gap-6"
      >
        {cards}
      </motion.div>
    </motion.div>
  );
}

export default Grid;
