import { globalStyle, style } from "@vanilla-extract/css";

export const code = style({
  textWrap: "wrap",
  counterReset: "lineNumber",
});

export const header = style({
  display: "block",
  backgroundColor: "var(--background-color-tertiary)",
  padding: "0.5rem",
  marginBlockStart: "0.5rem",
});

globalStyle(`${code} .line::before`, {
  content: "counter(lineNumber)",
  counterIncrement: "lineNumber",
  width: "2rem",
  marginRight: "1.5rem",
  display: "inline-block",
  textAlign: "right",
  color: "rgba(115, 138, 148, 0.4)",
});

globalStyle(`${code} pre`, {
  margin: 0,
});

globalStyle(`${code} .line`, {
  textWrap: "wrap",
});

globalStyle(`${code} .line-added, ${code} .line-removed`, {
  display: "inline-block",
  inlineSize: "100%",
});

globalStyle(`${code} .line-added`, {
  backgroundColor: "var(--color-green-80)",
});

globalStyle(`${code} .line-removed`, {
  backgroundColor: "var(--color-peach-80)",
});
