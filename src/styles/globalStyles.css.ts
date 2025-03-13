import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "./theme/darkTheme.css";

globalStyle("body", {
  backgroundColor: themeVars.background.primary,
  color: themeVars.text.primary,
  fontFamily: themeVars.text.family,
  fontFeatureSettings: "'liga' 1; 'calt' 1",
  fontSize: themeVars.text.baseSize,
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
  fontSize: themeVars.text.heading[1].size,
  lineHeight: themeVars.text.heading[1].lineHeight,
});

globalStyle("h2", {
  fontSize: themeVars.text.heading[2].size,
  lineHeight: themeVars.text.heading[2].lineHeight,
});

globalStyle("h3", {
  fontSize: themeVars.text.heading[3].size,
  fontWeight: "normal",
  lineHeight: themeVars.text.heading[3].lineHeight,
});

globalStyle("h4", {
  fontSize: themeVars.text.heading[4].size,
  lineHeight: themeVars.text.heading[4].lineHeight,
});

globalStyle("h5", {
  fontSize: themeVars.text.heading[5].size,
  lineHeight: themeVars.text.heading[5].lineHeight,
});

globalStyle("h6", {
  fontSize: themeVars.text.heading[6].size,
  lineHeight: themeVars.text.heading[6].lineHeight,
});

globalStyle("a, a:visited", {
  color: themeVars.text.primary,
  textDecoration: "none",
});

globalStyle("a:hover", {
  color: themeVars.text.secondary,
  textDecoration: "underline",
});
