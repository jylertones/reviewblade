import { style } from "@vanilla-extract/css";

export const boxTitle = style({
  padding: "0.5rem 1rem",
  backgroundColor: "var(--background-color-tertiary)",

  borderStartStartRadius: "var(--border-radius)",
  borderStartEndRadius: "var(--border-radius)",

  ":only-child": {
    borderEndStartRadius: "var(--border-radius)",
    borderEndEndRadius: "var(--border-radius)",
  },
});
