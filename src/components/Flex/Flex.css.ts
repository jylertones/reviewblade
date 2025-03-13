import { style, styleVariants } from "@vanilla-extract/css";

export const flex = style({
  display: "flex",
});

export const gapVariants = styleVariants({
  [2]: { gap: "0.125rem" },
  [4]: { gap: "0.25rem" },
  [8]: { gap: "0.5rem" },
  [16]: { gap: "1rem" },
  [24]: { gap: "1.5rem" },
  [32]: { gap: "2rem" },
});

export const alignVariants = styleVariants({
  center: {
    alignItems: "center",
  },
  start: {
    alignItems: "start",
  },
  end: {
    alignItems: "end",
  },
});

export const directionVariants = styleVariants({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    justifyContent: "stretch",
  },
});

export const justifyVariants = styleVariants({
  start: {
    justifyContent: "start",
  },
  end: {
    justifyContent: "end",
  },
  center: {
    justifyContent: "center",
  },
  spaceBetween: {
    inlineSize: "100%",
    justifyContent: "space-between",
  },
  spaceAround: {
    inlineSize: "100%",
    justifyContent: "space-around",
  },
  spaceEvenly: {
    inlineSize: "100%",
    justifyContent: "space-evenly",
  },
});
