import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Icons from "./Icons";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ProfileDropdownProps {
  placeholderImage: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  placeholderImage,
}) => {
  const { user } = useUser();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative w-8 h-8 cursor-pointer">
            {!user && (
              <img
                src={placeholderImage}
                alt="Placeholder Profile"
                className="w-full h-full rounded-full object-cover"
              />
            )}
            {user && (
              <Icons
                user_id={user.email || user.sub}
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-panels text-white outline-muted border-muted">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-muted" />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/api/auth/logout">Logout</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
