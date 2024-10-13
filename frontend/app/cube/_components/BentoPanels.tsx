import React from "react";
import Chart from "./Chart";
function BentoPanels() {
  return (
    <div className="w-full h-screen grid grid-rows-4 grid-cols-3 gap-4 p-6 scale-90">
      <div className="col-span-1 row-span-4 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md p-4">
        01
      </div>
      <div className="col-span-2 row-span-2 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md p-8">
        02
        <Chart />
      </div>
      <div className="col-span-2 row-span-2 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md p-4">
        03
      </div>
    </div>
  );
}

export default BentoPanels;
