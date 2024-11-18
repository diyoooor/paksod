import React from "react";
import { ILayout } from "./RootLayout";
import Image from "next/image";
import {
  IconBasket,
  IconHome,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";

const MainLayout = ({ children }: ILayout) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className=" text-white p-4 flex items-center justify-between h-20">
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
              <IconBasket className="w-10 h-10" stroke={1} />
            </li>
            <li>
              <IconUser className="w-10 h-10" stroke={1} />
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 bg-green-medium overflow-y-auto p-4">
        {children}
      </main>
      <section className="p-4">
        <div className="flex gap-4 text-center p-4">
          <IconHome className="mx-auto w-10 h-10 stroke-green-black " />
          <IconSearch className="mx-auto w-10 h-10 stroke-green-dark" />
        </div>
      </section>
    </div>
  );
};

export default MainLayout;
