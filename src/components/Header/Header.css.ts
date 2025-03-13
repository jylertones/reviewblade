import { style } from "@vanilla-extract/css";
import { themeVars } from "~/styles/theme/darkTheme.css";

export const navWrapper = style({
  backgroundColor: themeVars.background.secondary,
});

export const layoutWrapper = style({
  margin: 0,
  inlineSize: themeVars.layout.width,
  maxInlineSize: "90vw",
});

export const nav = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  paddingBlock: "0.5rem",
  justifyItems: "space-between",
  maxInlineSize: themeVars.layout.width,
  margin: "0 auto",
});

export const anchor = style({
  display: "inline-flex",
  gap: "0.25rem",
  alignItems: "center",
});

export const right = style({
  flex: 2,
  justifyContent: "right",
});
