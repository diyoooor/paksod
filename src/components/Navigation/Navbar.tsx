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
          className="focus:outline-none inline-flex flex-col text-center  items-center"
        >
          <IconHome className="w-8 h-8 text-green-black" stroke={1} />
          <p className="text-xs">หน้าหลัก</p>
        </button>
        <button
          onClick={() => router.push("/search")}
          aria-label="Search"
          className="focus:outline-none inline-flex flex-col text-center  items-center"
        >
          <IconSearch className="w-8 h-8 text-green-dark" stroke={1} />
          <p className="text-xs">ค้นหา</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
