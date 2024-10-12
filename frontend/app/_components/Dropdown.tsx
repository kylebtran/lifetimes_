import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
const Dropdown = ({
  title,
  children,
  icons,
}: {
  title: string;
  children: React.ReactNode;
  icons?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      {/* Dropdown Header */}
      <div className="flex" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-1 items-center">
          <span className="text-[12px] font-semibold cursor-pointer">
            {title}
          </span>
        </div>
        {icons && (
          <div className="flex items-end items-center space-x-3 h-4">
            {icons}
            {isOpen ? (
              <Minus width={"16"} className={"text-muted cursor-pointer"} />
            ) : (
              <Plus width={"16"} className={"text-muted cursor-pointer"} />
            )}
          </div>
        )}
      </div>
      {/* Dropdown Content (visible when open) */}
      {isOpen && (
        <div className="w-full h-40 px-2 mt-3 py-2 outline outline-[0.2px] outline-muted/50 outline-offset-[-0.2px] rounded-sm overflow-y-auto break-words text-[12px] text-white">
          {children}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
