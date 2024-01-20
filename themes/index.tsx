import React from "react";
import { ThemeProvider } from "styled-components";

import dark from "./colors/dark";
import light from "./colors/light";
import common from "./common";

const Theme = ({ children }: any) => {
  const selectedTheme = false;

  const colors = {
    dark,
    light,
  };

  const theme: any = {
    color: (colors as any)[selectedTheme || "light"],
    ...common,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
