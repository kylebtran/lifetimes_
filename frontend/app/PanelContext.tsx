"use client";
import React, { createContext, useContext, useState } from "react";

interface PanelContextType {
  isLeftPanel: boolean;
  setIsLeftPanel: React.Dispatch<React.SetStateAction<boolean>>;
  isRightPanel: boolean;
  setIsRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: number;
  setSelectedPost: React.Dispatch<React.SetStateAction<number>>;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanelContext must be used within a PanelProvider");
  }
  return context;
};

export function PanelProvider({ children }: { children: React.ReactNode }) {
  const [isLeftPanel, setIsLeftPanel] = useState<boolean>(false);
  const [isRightPanel, setIsRightPanel] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<number>(0);

  return (
    <PanelContext.Provider
      value={{
        isLeftPanel,
        setIsLeftPanel,
        isRightPanel,
        setIsRightPanel,
        selectedPost,
        setSelectedPost,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}
