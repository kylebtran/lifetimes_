import React from "react";
function Slider() {
  return (
    // <div className="relative w-full flex items-center">
    //   {/* Slider Track */}
    //   <div className="w-full h-[2px] bg-muted/40 rounded-lg" />
    //   {/* Slider Thumb (Vertical Bar) */}
    //   <div className="absolute bg-muted h-2 w-1" style={{ left: "50%" }} />
    // </div>
    <div className="relative w-full flex items-center">
      <div className="w-full h-[6px] bg-background rounded" />
      <div className="absolute w-1/2 h-[6px] bg-muted rounded-l" />
    </div>
  );
}
export default Slider;
