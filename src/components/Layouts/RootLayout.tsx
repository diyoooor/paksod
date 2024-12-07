"use client";
import { useUserStore } from "@/store/useUserStore";
import { ReactNode, useEffect } from "react";

export interface ILayout {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: ILayout) {
  const { initUser } = useUserStore();

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
