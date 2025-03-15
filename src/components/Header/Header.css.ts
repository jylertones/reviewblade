import { style } from "@vanilla-extract/css";
import { baseTheme } from "~/styles/theme/baseTheme.css";
import { colorTheme } from "~/styles/theme/darkTheme.css";

export const navWrapper = style({
  backgroundColor: colorTheme.background.secondary,
});

export const layoutWrapper = style({
  margin: 0,
  inlineSize: baseTheme.layout.width,
  maxInlineSize: "90vw",
});

export const nav = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  paddingBlock: "0.5rem",
  justifyItems: "space-between",
  maxInlineSize: baseTheme.layout.width,
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
