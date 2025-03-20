import { globalStyle, style } from "@vanilla-extract/css";

export const wrapper = style({});

globalStyle(`${wrapper} a`, {
  color: "var(--text-link-color)",
  textDecoration: "none",
});

globalStyle(`${this} p`, {
  lineHeight: "1.4",
});

globalStyle(`${this} code`, {
  backgroundColor: "var(--background-color-tertiary)",
  fontSize: "var(--font-body-size-2)",
  paddingInline: "0.25rem",
  paddingBlock: "0.25rem",
  borderRadius: "var(--border-radius)",
});

globalStyle(`${this} pre`, {
  backgroundColor: "var(--background-color-tertiary)",
  padding: "0.5rem",
  borderRadius: "var(--border-radius)",
});

globalStyle(`${this} pre > code`, {
  backgroundColor: "transparent",
  padding: 0,
  borderRadius: 0,
});

globalStyle(`${this} .contains-task-list`, {
  listStyle: "none",
  paddingInlineStart: "1rem",
});

globalStyle(`${this} .width-fit`, {
  maxInlineSize: "100%",
});

globalStyle(`${this} .details-reset`, {
  backgroundColor: "var(--background-color-secondary)",
  border: "1px solid var(--border-color)",
  borderRadius: "var(--border-radius)",
  padding: "1rem",
});

globalStyle(`${this} summary`, {
  paddingBlockEnd: "0.5rem",
});
