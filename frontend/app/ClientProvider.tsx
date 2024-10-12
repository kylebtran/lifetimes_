"use client";
import React from "react";
import SidePanels from "./_components/SidePanels";
import NavBar from "./_components/NavBar";
function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed w-full z-10">
        <SidePanels />
      </div>
      <div className="fixed w-full z-20">
        {/* ^ Change to absolute if using Locomotive Scroll */}
        <NavBar />
      </div>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
export default ClientProvider;
