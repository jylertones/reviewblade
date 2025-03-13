import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "~/styles/theme/darkTheme.css";

export const button = style({
  display: "inline-flex",
  gap: "0.25rem",
  alignItems: "center",
  minWidth: "fit-content",

  blockSize: "2rem",
  paddingInline: "1rem",

  backgroundColor: themeVars.button.default.backgroundColor,
  border: `1px solid ${themeVars.button.default.borderColor}`,
  borderRadius: themeVars.border.radius,

  color: themeVars.button.default.color,

  ":hover": {
    textDecoration: "none",
    backgroundColor: themeVars.button.default.hover.backgroundColor,
    cursor: "pointer",
  },
});

export const variantVariants = styleVariants({
  primary: {
    backgroundColor: themeVars.button.primary.backgroundColor,
    border: `1px solid ${themeVars.button.primary.borderColor}`,
    color: themeVars.button.primary.color,
    fontWeight: "medium",

    ":hover": {
      backgroundColor: themeVars.button.primary.hover.backgroundColor,
    },
  },
  icon: {
    inlineSize: "2rem",
    blockSize: "2rem",
    padding: "0.5rem",
    justifyContent: "center",
    border: 0,
    backgroundColor: "transparent",
    color: themeVars.button.default.color,
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
