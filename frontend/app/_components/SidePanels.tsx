import { Crosshair, Ellipsis, UserPlus } from "lucide-react";
import Image from "next/image";
import React from "react";
// Dropshadow
function SidePanels() {
  return (
    <div className="flex flex-col h-screen p-3">
      <div className="flex-grow w-[240px] px-4 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        <div className="flex w-full justify-end mt-[10px] mb-3">
          <Crosshair width={"16"} className={"text-muted"} />
        </div>
        <div className="flex flex-col space-y-3">
          <Break />
          <div className="flex">
            <div className="flex flex-1 items-center space-x-3">
              <Image
                src={"/images/TEST_kbt.png"}
                height={32}
                width={32}
                alt="pfp"
                className="rounded-full cursor-pointer"
              />
              <span className="text-[12px] font-semibold cursor-pointer">
                @kylebtran
              </span>
            </div>
            <div className="flex items-end items-center space-x-3">
              <UserPlus width={"18"} className={"text-muted cursor-pointer"} />
              <Ellipsis width={"16"} className={"text-muted cursor-pointer"} />
            </div>
          </div>
          <div className="w-full h-40 px-2 py-2 bg-background rounded overflow-y-auto break-words text-[12px] font-medium text-white/80">
            I find myself standing in a city made entirely of glass. Every
            building stretches toward the sky like delicate, shimmering towers,
            reflecting an endless expanse of stars above. The sky isn’t dark,
            though—it glows with a soft, otherworldly light, illuminated by not
            just one moon, but dozens. Each moon is a different color—some are
            pale silver, others are deep violet, soft pink, or golden—and they
            seem to hang impossibly close, like lanterns suspended just out of
            reach. As I walk, my footsteps create ripples on the smooth surface
            of the streets, which are as clear as water. The ripples spread
            outward in perfect circles, but instead of fading, they cause the
            glass around me to hum softly, like a distant melody. There are no
            people here, just the quiet song of the city and the moons watching.
            Suddenly, I notice something strange: a seed in my palm, glowing
            faintly. Before I can react, it takes root in my hand, growing
            rapidly into a tree that spirals upward in twisting, crystalline
            branches. The branches stretch, and as they reach their full length,
            they begin to turn into birds—translucent and shimmering, as if made
            of light. The birds lift off, circling me, and I feel my feet leave
            the ground. They carry me higher and higher, past the towering glass
            structures, past the glowing moons, until I am weightless. The city
            below fades into a blur of shimmering light, and I am no longer
            solid—just a part of the night sky, dissolving into the stars. I
            feel no fear, only a deep sense of peace, as if I’ve returned to
            where I belong.
          </div>
          <Break />
        </div>
      </div>
    </div>
  );
}
const Break = () => {
  return <div className="w-[240px] h-[0.2px] -ml-4 bg-muted/70" />;
};
export default SidePanels;
