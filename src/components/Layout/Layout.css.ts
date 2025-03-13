import { style } from "@vanilla-extract/css";
import { themeVars } from "~/styles/theme/darkTheme.css";

export const layoutWrapper = style({
  margin: 0,
  inlineSize: themeVars.layout.width,
  maxInlineSize: "90vw",
});
