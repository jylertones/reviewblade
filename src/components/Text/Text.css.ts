import { style, styleVariants } from "@vanilla-extract/css";

export const p = style({
  margin: 0,
  maxInlineSize: "45em",
});

export const sizeVariants = styleVariants({
  p1: {
    fontSize: "var(--font-body-size-1)",
    color: "var(--text-p1-color)",
  },
  p2: {
    fontSize: "var(--font-body-size-2)",
    color: "var(--text-p2-color)",
  },
});

export const variantVariants = styleVariants({
  subtle: {
    color: "var(--text-secondary-color)",
  },
  default: {},
});
