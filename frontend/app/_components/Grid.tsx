import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

function Grid({ numCards }: { numCards: number }) {
  // const constraintsRef = React.useRef(null);
  const cards = Array.from({ length: numCards }, (_, index) => (
    <Card key={index} />
  ));

  return (
    <motion.div
      className="flex items-center justify-center w-full max-h-screen overflow-hidden"
      // ref={constraintsRef}
    >
      <motion.div
        drag
        dragElastic={0}
        // dragTransition={{
        //   power: 0.1, // Lower power for less momentum
        //   timeConstant: 200, // Higher timeConstant slows the return movement
        //   modifyTarget: (target) => Math.round(target / 50) * 50, // Optional, snapping
        // }}
        // dragConstraints={constraintsRef}
        className="grid grid-cols-auto-51 gap-3"
      >
        {cards}
      </motion.div>
    </motion.div>
  );
}

export default Grid;
