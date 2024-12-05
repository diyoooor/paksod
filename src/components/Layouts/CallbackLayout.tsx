import React from "react";
import { ILayout } from "./RootLayout";

const CallbackLayout = ({ children }: ILayout) => {
  return <div>{children}</div>;
};

export default CallbackLayout;
