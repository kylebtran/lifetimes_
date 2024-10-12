import React, { useEffect, useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
function Grid() {
  const [gridTranslate, setGridTranslate] = useState({ x: 0, y: 0 });
  const [cards, setCards] = useState<Array<number>>([]);
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardWidth = 240; // Fixed width of each card
  const cardHeight = 128; // Fixed height of each card
  const initialTotalCards = 5; // Initial number of cards to display
  // Initialize the grid with the initial number of cards
  useEffect(() => {
    setCards(Array.from({ length: initialTotalCards }, (_, i) => i));
  }, [initialTotalCards]);
  // Handle window resize and calculate how many columns can fit
  useEffect(() => {
    const calculateGrid = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const cols = Math.floor(windowWidth / cardWidth);
      const rows = Math.ceil(cards.length / cols);
      setColumns(cols);
      setRows(rows);
    };
    // Set the initial grid dimensions
    calculateGrid();
    // Recalculate grid layout on window resize
    window.addEventListener("resize", calculateGrid);
    return () => {
      window.removeEventListener("resize", calculateGrid);
    };
  }, [cards]);
  // Handle infinite scrolling by appending more cards
  const addMoreCards = () => {
    const newCards = Array.from({ length: 100 }).map(
      (_, index) => cards.length + index
    );
    setCards((prev) => [...prev, ...newCards]);
  };
  // Handle mouse movement for dynamic translation and infinite scroll
  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  // Use requestAnimationFrame for smooth continuous movement
  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let animationFrameId: number;
    const updateGridPosition = () => {
      const offsetX = (mousePosition.x - windowWidth / 2) / (windowWidth / 2);
      const offsetY = (mousePosition.y - windowHeight / 2) / (windowHeight / 2);
      setGridTranslate((prev) => ({
        x: prev.x - offsetX * 10, // Adjust the speed here as needed
        y: prev.y - offsetY * 10,
      }));
      // Continuously request the next animation frame
      animationFrameId = requestAnimationFrame(updateGridPosition);
    };
    // Start the continuous animation
    animationFrameId = requestAnimationFrame(updateGridPosition);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);
  // Check if more cards are needed when grid goes out of bounds
  useEffect(() => {
    if (
      gridTranslate.x < -columns * cardWidth ||
      gridTranslate.y < -rows * cardHeight
    ) {
      addMoreCards(); // Add more cards when reaching the edge
    }
  }, [gridTranslate, columns, rows]);
  // Render the grid dynamically based on columns and rows
  const gridItems = cards.map((_, index) => (
    <motion.div
      key={index}
      className="fixed-size-card"
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
      }}
    >
      <Card />
    </motion.div>
  ));
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <motion.div
        className="grid gap-4 will-change-transform"
        style={{
          gridTemplateColumns: `repeat(${columns}, ${cardWidth}px)`, // Dynamically set columns based on card width
          gridTemplateRows: `repeat(${rows}, ${cardHeight}px)`, // Dynamically set rows based on card height
          transform: `translate(${gridTranslate.x}px, ${gridTranslate.y}px)`, // Translate based on mouse movement
          width: `${columns * cardWidth}px`, // Grid container width
          height: `${rows * cardHeight}px`, // Grid container height
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 50,
        }}
      >
        {gridItems}
      </motion.div>
    </div>
  );
}
export default Grid;
