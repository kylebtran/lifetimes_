import Image from "next/image";
import React from "react";

const links = [
  { href: "/", label: "ROOT" },
  { href: "/square", label: "SQUARE" },
  { href: "/cube", label: "CUBE" },
];

function NavBar() {
  return (
    <header className="flex px-8 items-center font-bold mt-[18px]">
      <a
        href="/"
        className="flex flex-1 text-start text-4 font-serif rounded-full text-accent"
      >
        LIFETIMES_
      </a>
      <nav className="flex flex-1 text-center justify-center space-x-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[14px] px-4 py-1 bg-middleground rounded-full"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href="/api/auth/logout"
        className="flex flex-1 text-end inline-block justify-end"
      >
        <Image
          src={"/images/TEST_kbt.png"}
          height={32}
          width={32}
          alt="pfp"
          className="rounded-full"
        />
      </a>
    </header>
  );
}

export default NavBar;
