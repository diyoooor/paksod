"use client";

import React from "react";
import { ILayout } from "./RootLayout";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import Menu from "../Navigation/Menu";

const MainLayout = ({ children }: ILayout) => {
  return (
    <div className="flex flex-col min-h-screen w-full fit mx-auto">
      <Menu />
      <main className="flex-1 bg-gray-200 overflow-y-auto p-4">{children}</main>
      <Footer />
      <Navbar />
    </div>
  );
};

export default MainLayout;
