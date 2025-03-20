import {
  createVar,
  keyframes,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const wrapper = style({
  display: "contents",
});

const iconColor = createVar();

export const icon = style({
  color: iconColor,
  blockSize: "var(--icon-size-large)",
  inlineSize: "var(--icon-size-large)",

  vars: {
    [iconColor]: "var(--text-secondary-color)",
  },
});

const rotate = keyframes({
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const conclusionVariants = styleVariants({
  failure: {
    vars: {
      [iconColor]: "var(--color-error)",
    },
  },
  action_required: {
    vars: {
      [iconColor]: "var(--color-error)",
    },
  },
  cancelled: {
    vars: {
      [iconColor]: "var(--color-error)",
    },
  },
  timed_out: {
    vars: {
      [iconColor]: "var(--color-error)",
    },
  },
  success: {
    vars: {
      [iconColor]: "var(--color-success)",
    },
  },
  neutral: {},
  skipped: {},
});

export const statusVariants = styleVariants({
  in_progress: {
    animation: `${rotate} 2s linear infinite`,
    vars: {
      [iconColor]: "var(--color-warning)",
    },
  },
  queued: {},
  completed: {},
  waiting: {},
  requested: {},
  pending: {},
});
