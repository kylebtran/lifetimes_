"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Post } from "./(models)/db";

interface PanelContextType {
  isLeftPanel: boolean;
  setIsLeftPanel: React.Dispatch<React.SetStateAction<boolean>>;
  isRightPanel: boolean;
  setIsRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: number;
  setSelectedPost: React.Dispatch<React.SetStateAction<number>>;
  allPosts: Post[];
  setAllPosts: React.Dispatch<React.SetStateAction<Post[]>>;
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
  const [allPosts, setAllPosts] = useState<Post[]>([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/db/post"); // Adjust the API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setAllPosts(data); // Set fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <PanelContext.Provider
      value={{
        isLeftPanel,
        setIsLeftPanel,
        isRightPanel,
        setIsRightPanel,
        selectedPost,
        setSelectedPost,
        allPosts,
        setAllPosts,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}
