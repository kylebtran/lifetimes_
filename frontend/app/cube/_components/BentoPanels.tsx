import React from "react";
import { Bars } from "./Bars";

function BentoPanels() {
  return (
    <div className="w-full min-h-screen grid grid-rows-3 grid-flow-col gap-3 p-3">
      <div className="row-span-3 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        01
      </div>
      <div className="row-span-2 col-span-2 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        <div className="flex w-[200px] h-[100px]">
          <Bars />
        </div>
      </div>
      <div className="col-span-2 bg-panels rounded-[12px] outline outline-[0.1px] outline-white/10 outline-offset-[-1px] shadow-md">
        03
      </div>
    </div>
  );
}

export default BentoPanels;
