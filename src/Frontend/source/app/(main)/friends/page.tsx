/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */

"use client";
import UserFriendsNav from "@/components/friends/UserFriendsNav";

import { SideBarContext } from "@/context/SideBarContext";
import { useContext } from "react";
import { useEffect } from "react";
export default function Page() {
  const { setIsActivated } = useContext(SideBarContext);
  useEffect(() => {
    setIsActivated(6);
  }, [setIsActivated]);
  return (
    <div className="size-full overflow-auto md:py-4 md:pl-6">
      <div className="costum-little-shadow size-full overflow-hidden md:rounded-[50px]">
        <UserFriendsNav />
      </div>
    </div>
  );
}
