import React from "react";
import { usePathname } from "next/navigation";
import Icons from "./Icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileDropdown from "./ProfileDropdown";

const placeholderImage = "/images/Portrait_Placeholder.png";

const links = [
  { href: "/", label: "ROOT" },
  { href: "/square", label: "SQUARE" },
  { href: "/cube", label: "CUBE" },
];

function NavBar({
  isLeftPanel,
  isRightPanel,
  setIsLeftPanel,
  setIsRightPanel,
  setSelectedPost,
}: {
  isLeftPanel: boolean;
  isRightPanel: boolean;
  setIsLeftPanel: Function;
  setIsRightPanel: Function;
  setSelectedPost: Function;
}) {
  const pathname = usePathname();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && pathname === "/") {
        setIsLeftPanel(false);
        setIsRightPanel(false);
        setSelectedPost(0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname, setIsLeftPanel, setIsRightPanel, setSelectedPost]);

  return (
    <header className="flex px-8 items-center font-bold mt-[18px]">
      <div className="flex flex-1">
        <a
          href="/"
          className="text-start text-4 font-serif rounded-full text-accent"
        >
          LIFETIMES_
        </a>
      </div>
      <nav className="flex flex-1 text-center justify-center space-x-4">
        {(isLeftPanel || isRightPanel) && pathname === "/" ? (
          <button
            className="flex text-[14px] px-4 py-1 bg-middleground rounded-full text-muted cursor-pointer items-center"
            onClick={() => {
              setIsLeftPanel(false);
              setIsRightPanel(false);
              setSelectedPost(0);
            }}
          >
            EXIT THE WORMHOLE
            <div className="ml-[10px] text-[10px] text-background font-semibold pt-[0.5px] pb-[1.5px] px-[6px] bg-muted rounded">
              esc
            </div>
          </button>
        ) : (
          links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[14px] px-4 py-1 rounded-full ${
                pathname === link.href
                  ? "bg-middleground"
                  : "bg-background text-muted"
              }`}
            >
              {link.label}
            </a>
          ))
        )}
      </nav>
      <div className="flex flex-1 text-end inline-block justify-end">
        <a>
          <ProfileDropdown placeholderImage={placeholderImage} />
          {/* <div className="relative w-8 h-8"></div> */}
        </a>
      </div>
    </header>
  );
}

export default NavBar;
