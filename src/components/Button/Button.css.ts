import { keyframes, style, styleVariants } from "@vanilla-extract/css";

export const button = style({
  display: "inline-flex",
  gap: "0.25rem",
  alignItems: "center",
  minWidth: "fit-content",

  blockSize: "2rem",
  paddingInline: "1rem",

  backgroundColor: "var(--button-default-background-color)",
  border: `1px solid var(--button-default-border-color)`,
  borderRadius: "var(--border-radius)",

  fontSize: "var(--font-body-size-2)",
  color: "var(--button-default-color)",

  ":hover": {
    textDecoration: "none",
    backgroundColor: "var(--button-default-hover-background-color)",
    cursor: "pointer",
  },
});

export const variantVariants = styleVariants({
  primary: {
    backgroundColor: "var(--button-primary-background-color)",
    border: `1px solid var(--button-primary-border-color)`,
    color: "var(--button-primary-color)",
    fontWeight: "medium",

    ":hover": {
      backgroundColor: "var(--button-primary-hover-background-color)",
    },
  },
  icon: {
    inlineSize: "1.25rem",
    blockSize: "1.25rem",
    padding: "0.25rem",
    justifyContent: "center",
    border: 0,
    backgroundColor: "transparent",
    color: "var(--button-default-color)",
  },
  default: {},
});

const rotateKeyframes = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const rotate = style({
  animation: `${rotateKeyframes} 2s linear infinite`,
  marginInlineEnd: "0.25rem",
});
