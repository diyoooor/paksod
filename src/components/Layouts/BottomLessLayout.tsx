import React from "react";
import { ILayout } from "./RootLayout";

const BottomLessLayout = ({ children }: ILayout) => {
  return <div>{children}</div>;
};

export default BottomLessLayout;
