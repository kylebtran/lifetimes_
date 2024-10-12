import React from "react";

function Slider({ value }: { value: number }) {
  const percentage = (value / 10) * 100;

  return (
    <div className="relative w-full flex items-center">
      <div className="w-full h-[6px] bg-background rounded" />
      <div
        className="absolute h-[6px] bg-muted rounded-l transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default Slider;
