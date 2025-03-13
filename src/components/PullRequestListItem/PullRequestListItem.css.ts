import { style } from "@vanilla-extract/css";

export const listItem = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 1rem",

  ":hover": {
    backgroundColor: "var(--background-color-secondary)",
  },

  ":last-child": {
    borderBlockEnd: "1px solid var(--color-space-cadet)",
  },
});

export const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  flex: 2,
});

export const title = style({
  fontSize: "var(--font-body-size-1)",
  lineHeight: 1,
  margin: 0,
});

export const secondLine = style({
  color: "var(--text-secondary-color)",
  fontSize: "var(--font-body-size-2)",
});

export const right = style({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
});

export const gitHubLink = style({
  blockSize: "var(--icon-size-large)",
  inlineSize: "var(--icon-size-large)",
});

export const messageSquare = style({
  blockSize: "var(--icon-size-default)",
  inlineSize: "var(--icon-size-default)",
});
