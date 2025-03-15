import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { baseTheme } from "~/styles/theme/baseTheme.css";
import { colorTheme } from "~/styles/theme/darkTheme.css";

export const button = style({
  display: "inline-flex",
  gap: "0.25rem",
  alignItems: "center",
  minWidth: "fit-content",

  blockSize: "2rem",
  paddingInline: "1rem",

  backgroundColor: colorTheme.button.default.backgroundColor,
  border: `1px solid ${colorTheme.button.default.borderColor}`,
  borderRadius: baseTheme.border.radius,

  color: colorTheme.button.default.color,

  ":hover": {
    textDecoration: "none",
    backgroundColor: colorTheme.button.default.hover.backgroundColor,
    cursor: "pointer",
  },
});

export const variantVariants = styleVariants({
  primary: {
    backgroundColor: colorTheme.button.primary.backgroundColor,
    border: `1px solid ${colorTheme.button.primary.borderColor}`,
    color: colorTheme.button.primary.color,
    fontWeight: "medium",

    ":hover": {
      backgroundColor: colorTheme.button.primary.hover.backgroundColor,
    },
  },
  icon: {
    inlineSize: "2rem",
    blockSize: "2rem",
    padding: "0.5rem",
    justifyContent: "center",
    border: 0,
    backgroundColor: "transparent",
    color: colorTheme.button.default.color,
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
