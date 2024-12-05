"use client";
import { useUserStore } from "@/store/useUserStore";
import { ReactNode, useEffect } from "react";

export interface ILayout {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: ILayout) {
  const { initUser, logout } = useUserStore();

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <html lang="en">
      <body>
        <main>
          {/* <button
            onClick={logout}
            className="border border-green-medium p-2 active:border-red-500"
          >
            Sign Out
          </button> */}
          {children}
        </main>
      </body>
    </html>
  );
}
