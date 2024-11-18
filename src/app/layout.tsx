"use client";
import "./globals.css";
import RootLayout, { ILayout } from "@/components/Layouts/RootLayout";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";
import BottomLessLayout from "@/components/Layouts/BottomLessLayout";
import { FC } from "react";

export default function Layout({ children }: ILayout) {
  const pathName = usePathname();

  const layoutConfig: {
    [key: string]: FC<ILayout>;
  } = {
    "/auth": BottomLessLayout,
  };

  const LayoutComponent =
    pathName && layoutConfig[pathName] ? layoutConfig[pathName] : MainLayout;

  return (
    <RootLayout>
      <LayoutComponent>{children}</LayoutComponent>
    </RootLayout>
  );
}
