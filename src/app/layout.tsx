"use client";
import "../styles/globals.css";
import RootLayout, { ILayout } from "@/components/Layouts/RootLayout";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";
import BottomLessLayout from "@/components/Layouts/BottomLessLayout";
import { FC } from "react";
import CallbackLayout from "@/components/Layouts/CallbackLayout";

export default function Layout({ children }: Readonly<ILayout>) {
  const pathName = usePathname();

  const layoutConfig: {
    [key: string]: FC<ILayout>;
  } = {
    "/auth": CallbackLayout,
    "/search": BottomLessLayout,
    "/cart": BottomLessLayout,
    "/cart/checkout": BottomLessLayout,
  };

  const LayoutComponent =
    pathName && layoutConfig[pathName] ? layoutConfig[pathName] : MainLayout;

  return (
    <RootLayout>
      <LayoutComponent>{children}</LayoutComponent>
    </RootLayout>
  );
}
