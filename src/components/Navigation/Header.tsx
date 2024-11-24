import { IconArrowNarrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const route = useRouter();
  return (
    <header className=" text-white p-4 flex items-center justify-between h-20 flex-row-reverse">
      <h1 className="text-lg font-semibold">
        <Image
          src={"/logo/logo.png"}
          alt="logo"
          width={70}
          height={30}
          className="h-fit w-fit"
        />
      </h1>
      <nav>
        <ul className="flex gap-4 text-text">
          <li>
            <button
              onClick={() => route.back()}
              className="flex items-center text-green-dark"
            >
              <IconArrowNarrowLeft className="w-8 h-8" stroke={2} />
              <p className="text-xl ">ย้อนกลับ</p>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
