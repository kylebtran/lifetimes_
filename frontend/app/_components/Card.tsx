import React, { useEffect } from "react";
import Image from "next/image";

// Outline; Haze

function Card() {
  const imageIndex = Math.floor(Math.random() * 8) + 1;
  const randomPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
  const flipX = Math.random() > 0.5 ? "scale-x-[-1]" : "";
  const flipY = Math.random() > 0.5 ? "scale-y-[-1]" : "";

  return (
    <div className="relative w-[240px] h-[128px]">
      <Image
        src={`/images/TEST_dreamscapes/TEST_dreamscape_${imageIndex}.png`}
        fill={true}
        objectFit={"cover"}
        objectPosition={randomPosition}
        alt={"[PLACEHOLDER]"}
        className={`rounded-lg outline outline-[0.1px] outline-white/10 outline-offset-[-1px] transform ${flipX} ${flipY}`}
        priority={true}
        loading={"eager"}
      />
    </div>
  );
}

export default Card;
