"use client";
import { IconHome, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-white drop-shadow-md sticky bottom-0 ">
      <div className="flex justify-around py-4">
        <button
          onClick={() => router.push("/")}
          aria-label="Home"
          className="focus:outline-none"
        >
          <IconHome className="w-12 h-12 text-green-black" stroke={1} />
        </button>
        <button
          onClick={() => router.push("/search")}
          aria-label="Search"
          className="focus:outline-none"
        >
          <IconSearch className="w-12 h-12 text-green-dark" stroke={1} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
