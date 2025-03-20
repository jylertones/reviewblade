import { style, styleVariants } from "@vanilla-extract/css";

export const badge = style({
  display: "inline-flex",
  gap: "0.25rem",
  alignItems: "center",

  blockSize: "2rem",
  paddingInline: "1rem",

  border: "1px solid var(--badge-default-border-color)",
  borderRadius: "100px",
});

export const variantVariants = styleVariants({
  default: {
    backgroundColor: "var(--badge-info-background-color)",
    borderColor: "var(--badge-info-border-color)",
    color: "var(--badge-info-color)",
  },
  success: {
    backgroundColor: "var(--badge-success-background-color)",
    borderColor: "var(--badge-success-border-color)",
    color: "var(--badge-success-color)",
  },
  warning: {
    backgroundColor: "var(--badge-warning-background-color)",
    borderColor: "var(--badge-warning-border-color)",
    color: "var(--badge-warning-color)",
  },
});
