"use client";
import React from "react";
import { ILayout } from "./RootLayout";
import Image from "next/image";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const BottomLessLayout = ({ children }: ILayout) => {
  const route = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
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
      <main className="flex-1 bg-green-medium overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default BottomLessLayout;
