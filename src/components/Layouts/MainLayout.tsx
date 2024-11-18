"use client";
import React from "react";
import { ILayout } from "./RootLayout";
import Image from "next/image";
import {
  IconBasket,
  IconBrandFacebook,
  IconBrandLine,
  IconHome,
  IconPhone,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ISocial {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const MainLayout = ({ children }: ILayout) => {
  const socials: ISocial[] = [
    {
      icon: <IconBrandFacebook stroke={1} />,
      name: "Facebook",
      link: "https://www.facebook.com/profile.php?id=61558650133542",
    },
    {
      icon: <IconBrandLine stroke={1} />,
      name: "Line",
      link: "https://www.line.me/",
    },
    {
      icon: <IconPhone stroke={1} />,
      name: "Phone",
      link: "tel:080-000-0000",
    },
  ];
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className=" text-white p-4 flex items-center justify-between h-20 sticky top-0 z-10 bg-white  drop-shadow-lg">
        <h1 className="text-lg font-semibold">
          <Image
            src={"/logo/logo.png"}
            alt="logo"
            width={70}
            height={30}
            className="h-fit w-fit"
            onClick={() => router.push("/")}
          />
        </h1>
        <nav>
          <ul className="flex gap-4 text-text">
            <li>
              <button onClick={() => router.push("/cart")}>
                <IconBasket className="w-10 h-10" stroke={1} />
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/profile")}>
                <IconUser className="w-10 h-10" stroke={1} />
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 bg-gray-200 overflow-y-auto p-4 relative">
        {children}
      </main>
      <footer className="p-4 flex justify-around mx-auto gap-4 bg-green-dark w-full">
        {socials.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto text-green-light  text-center flex flex-col justify-center"
            >
              <p className="border border-green-dark self-center flex justify-center items-center w-10 h-10 rounded-lg">
                {item.icon}
              </p>
              <p>{item.name}</p>
            </Link>
          );
        })}
      </footer>
      <section className="p-2 sticky bottom-0 bg-white drop-shadow-md">
        <div className="flex gap-4 text-center p-4">
          <button className="mx-auto" onClick={() => router.push("/")}>
            <IconHome className=" w-12 h-12 stroke-green-black " stroke={1} />
          </button>
          <button className="mx-auto" onClick={() => router.push("/search")}>
            <IconSearch
              className="mx-auto w-12 h-12 stroke-green-dark"
              stroke={1}
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainLayout;
