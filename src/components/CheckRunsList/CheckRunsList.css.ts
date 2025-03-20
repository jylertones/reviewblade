import { style } from "@vanilla-extract/css";

export const ul = style({
  listStyle: "none",
  padding: 0,
  marginBlock: 0,
});

export const li = style({
  selectors: {
    "&:not(:last-child)": {
      marginBlockEnd: "0.25rem",
    },
  },
});
