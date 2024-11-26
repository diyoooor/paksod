"use client";
import React from "react";
import { ILayout } from "./RootLayout";
import Header from "../Navigation/Header";

const BottomLessLayout = ({ children }: ILayout) => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-lg mx-auto">
      <Header />
      <main className="flex-1 bg-green-medium overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default BottomLessLayout;
