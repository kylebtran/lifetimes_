import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

const Dropdown = ({
  title,
  children,
  icons,
  start,
}: {
  title: string;
  children: React.ReactNode;
  icons?: React.ReactNode;
  start?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false || start);

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
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Dropdown;
