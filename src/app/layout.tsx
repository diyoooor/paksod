"use client";
import "../styles/globals.css";
import RootLayout, { ILayout } from "@/components/Layouts/RootLayout";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";
import BottomLessLayout from "@/components/Layouts/BottomLessLayout";
import { FC } from "react";
import { useLiff } from "@/hooks/useLiff";
const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || "";

export default function Layout({ children }: ILayout) {
  useLiff(LIFF_ID);

  const pathName = usePathname();

  const layoutConfig: {
    [key: string]: FC<ILayout>;
  } = {
    "/auth": BottomLessLayout,
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
