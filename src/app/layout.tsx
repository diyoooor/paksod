"use client";
import "../styles/globals.css";
import RootLayout, { ILayout } from "@/components/Layouts/RootLayout";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";
import BottomLessLayout from "@/components/Layouts/BottomLessLayout";
import { FC } from "react";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: ILayout) {
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
      <LayoutComponent>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </LayoutComponent>
    </RootLayout>
  );
}
