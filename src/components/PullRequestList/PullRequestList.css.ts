import { style } from "@vanilla-extract/css";

export const wrapper = style({
  inlineSize: "100%",
  border: "var(--border-width) solid var(--border-color)",
  borderRadius: "var(--border-radius)",
});

export const header = style({
  backgroundColor: "var(--background-color-secondary)",
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  backgroundColor: "var(--background-color-tertiary)",
});

export const noRequestsMessage = style({
  padding: "0 1rem",
  fontWeight: "medium",
});
