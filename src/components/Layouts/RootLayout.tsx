import { ReactNode } from "react";

export interface ILayout {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: ILayout) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
