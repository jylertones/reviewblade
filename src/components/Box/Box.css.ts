import { style } from "@vanilla-extract/css";

export const box = style({
  inlineSize: "100%",
  backgroundColor: "var(--background-color-secondary)",
  border: "var(--border-width) solid var(--border-color)",
  borderRadius: "var(--border-radius)",
});
