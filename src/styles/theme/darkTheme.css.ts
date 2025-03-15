import { createGlobalTheme } from "@vanilla-extract/css";
import { color } from "../tokens/colors";

export const colorTheme = createGlobalTheme(":root", {
  background: {
    primary: color.primary[80],
    secondary: color.primary[90],
    tertiary: color.primary[70],
  },

  text: {
    primary: color.primary[10],
    secondary: color.primary[30],
    link: color.primary[30],
  },

  badge: {
    default: {
      backgroundColor: color.maroon[50],
      color: color.maroon[10],
      borderColor: color.maroon[40],
    },
    success: {
      backgroundColor: color.green[80],
      color: color.green[10],
      borderColor: color.green[40],
    },
    warning: {
      backgroundColor: color.yellow[80],
      color: color.yellow[10],
      borderColor: color.yellow[40],
    },
  },

  borderColor: {
    default: color.primary[50],
  },

  button: {
    default: {
      backgroundColor: color.primary[50],
      borderColor: color.primary[40],
      color: color.primary[20],
      hover: {
        backgroundColor: color.primary[60],
      },
    },
    primary: {
      backgroundColor: color.maroon[50],
      borderColor: color.maroon[60],
      color: color.maroon[10],
      hover: {
        backgroundColor: color.maroon[60],
      },
    },
  },
});
