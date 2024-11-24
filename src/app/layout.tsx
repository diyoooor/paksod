"use client";
import "../styles/globals.css";
import RootLayout, { ILayout } from "@/components/Layouts/RootLayout";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";
import BottomLessLayout from "@/components/Layouts/BottomLessLayout";
import { FC } from "react";
import useLiffAuth from "@/hooks/useLiff";

export default function Layout({ children }: ILayout) {
  useLiffAuth();

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
