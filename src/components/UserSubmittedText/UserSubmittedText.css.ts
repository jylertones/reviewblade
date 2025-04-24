import { globalStyle, style } from "@vanilla-extract/css";

export const wrapper = style({});

globalStyle(`${wrapper} a`, {
  color: "var(--text-link-color)",
  textDecoration: "none",
});

globalStyle(`${wrapper} p`, {
  lineHeight: "1.4",
});

globalStyle(`${wrapper} code`, {
  backgroundColor: "var(--background-color-tertiary)",
  fontSize: "var(--font-body-size-2)",
  paddingInline: "0.25rem",
  paddingBlock: "0.25rem",
  borderRadius: "var(--border-radius)",
});

globalStyle(`${wrapper} pre`, {
  backgroundColor: "var(--background-color-tertiary)",
  padding: "0.5rem",
  borderRadius: "var(--border-radius)",
});

globalStyle(`${wrapper} pre > code`, {
  backgroundColor: "transparent",
  padding: 0,
  borderRadius: 0,
});

globalStyle(`${wrapper} .contains-task-list`, {
  listStyle: "none",
  paddingInlineStart: "1rem",
});

globalStyle(`${wrapper} .width-fit`, {
  maxInlineSize: "100%",
});

globalStyle(`${wrapper} .details-reset`, {
  backgroundColor: "var(--background-color-secondary)",
  border: "1px solid var(--border-color)",
  borderRadius: "var(--border-radius)",
  padding: "1rem",
});

globalStyle(`${wrapper} summary`, {
  paddingBlockEnd: "0.5rem",
});

globalStyle(`${wrapper} video`, {
  maxWidth: "100%",
});
