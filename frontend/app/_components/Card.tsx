import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Outline; Haze

function Card() {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [randomPosition, setRandomPosition] = useState<string>("");
  const [flipX, setFlipX] = useState<string>("");
  const [flipY, setFlipY] = useState<string>("");

  useEffect(() => {
    const index = Math.floor(Math.random() * 8) + 1;
    const position = `${Math.random() * 100}% ${Math.random() * 100}%`;
    const flipXValue = Math.random() > 0.5 ? "scale-x-[-1]" : "";
    const flipYValue = Math.random() > 0.5 ? "scale-y-[-1]" : "";

    setImageIndex(index);
    setRandomPosition(position);
    setFlipX(flipXValue);
    setFlipY(flipYValue);
  }, []);

  return (
    <motion.div
      className="relative w-[240px] h-[128px] hover:z-20 z-10 hover:outline outline-2 outline-muted outline-offset-2 rounded-lg"
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Image
        src={`/images/TEST_dreamscapes/TEST_dreamscape_${imageIndex}.png`}
        fill={true}
        objectFit={"cover"}
        objectPosition={randomPosition}
        alt={"[PLACEHOLDER]"}
        className={`rounded-lg outline outline-[0.1px] outline-white/10 outline-offset-[-1px] transform ${flipX} ${flipY}`}
        priority={true}
        loading={"eager"}
        draggable={false}
      />
    </motion.div>
  );
}

export default Card;
