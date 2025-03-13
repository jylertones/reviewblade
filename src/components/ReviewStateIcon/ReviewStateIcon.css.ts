import { style, styleVariants } from "@vanilla-extract/css";
import { PullRequestApprovalState } from "~/types/states";

export const iconWrapper = style({
  display: "contents",
});

export const statusIcon = style({
  color: "var(--text-secondary-color)",
  blockSize: "var(--icon-size-large)",
  inlineSize: "var(--icon-size-large)",
});

export const statusIconVariants = styleVariants<PullRequestApprovalState>({
  changes_requested: {
    color: "var(--color-warning)",
  },
  approved: {
    color: "var(--color-success)",
  },
  waiting: {},
  commented: {},
});
