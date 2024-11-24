import { IconBasket, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Menu = () => {
  const router = useRouter();
  return (
    <header className="bg-white drop-shadow-lg sticky top-0 z-10 h-20 flex items-center justify-between px-4">
      <Image
        src="/images/logo/logo.png"
        alt="นุ้ย ผักสด Logo"
        width={70}
        priority
        height={30}
        className="cursor-pointer w-auto h-auto"
        onClick={() => router.push("/")}
      />
      <nav>
        <ul className="flex gap-4">
          <li>
            <button
              onClick={() => router.push("/cart")}
              aria-label="Cart"
              className="focus:outline-none"
            >
              <IconBasket className="w-10 h-10" stroke={1} />
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/profile")}
              aria-label="Profile"
              className="focus:outline-none"
            >
              <IconUser className="w-10 h-10" stroke={1} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
