import { globalStyle } from "@vanilla-extract/css";
import { baseTheme } from "./theme/baseTheme.css";
import { colorTheme } from "./theme/darkTheme.css";

globalStyle("body", {
  backgroundColor: colorTheme.background.primary,
  color: colorTheme.text.primary,
  fontFamily: baseTheme.text.family,
  fontFeatureSettings: "'liga' 1; 'calt' 1",
  fontSize: baseTheme.text.baseSize,
  margin: 0,
  marginBlockEnd: "2rem",
  padding: 0,

  "@supports": {
    ["(font-variation-settings: normal)"]: {
      fontFamily: "InterVariable, sans-serif",
    },
  },
});

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("main", {
  paddingBlockStart: "1rem",
});

globalStyle("section + section", {
  marginBlockStart: "1rem",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  marginBlock: 0,
});

globalStyle("h1", {
  fontSize: baseTheme.text.heading[1].size,
  lineHeight: baseTheme.text.heading[1].lineHeight,
});

globalStyle("h2", {
  fontSize: baseTheme.text.heading[2].size,
  lineHeight: baseTheme.text.heading[2].lineHeight,
});

globalStyle("h3", {
  fontSize: baseTheme.text.heading[3].size,
  fontWeight: "normal",
  lineHeight: baseTheme.text.heading[3].lineHeight,
});

globalStyle("h4", {
  fontSize: baseTheme.text.heading[4].size,
  lineHeight: baseTheme.text.heading[4].lineHeight,
});

globalStyle("h5", {
  fontSize: baseTheme.text.heading[5].size,
  lineHeight: baseTheme.text.heading[5].lineHeight,
});

globalStyle("h6", {
  fontSize: baseTheme.text.heading[6].size,
  lineHeight: baseTheme.text.heading[6].lineHeight,
});

globalStyle("a, a:visited", {
  color: colorTheme.text.primary,
  textDecoration: "none",
});

globalStyle("a:hover", {
  color: colorTheme.text.secondary,
  textDecoration: "underline",
});
