import React from "react";
import Chart from "./Chart";
function BentoPanels() {
  return (
    <div className="w-full h-screen grid grid-rows-5 grid-cols-3 gap-4 p-3">
      <div className="col-span-1 row-span-5 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        01
      </div>
      <div className="mt-[64px] col-span-2 row-span-2 bg-panels/40 rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        <div className="mt-[0px]">
          <Chart />
        </div>
      </div>
      <div className="col-span-2 row-span-3 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        03
      </div>
    </div>
  );
}

export default BentoPanels;
