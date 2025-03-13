import classNames from "classnames";
import { JSX } from "solid-js";
import * as styles from "./Flex.css";

export type FlexProps = {
  children: JSX.Element;
  class?: string;
  align?: "center" | "start" | "end";
  direction?: "row" | "column";
  gap?: 2 | 4 | 8 | 16 | 24 | 32;
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "normal";
};

export function Flex(props: FlexProps) {
  const {
    children,
    gap,
    direction = "row",
    align = direction === "row" ? "center" : "start",
    justify = "normal",
    ...delegated
  } = props;

  return (
    <div
      class={classNames(
        styles.flex,
        gap && styles.gapVariants[gap],
        styles.alignVariants[align],
        styles.directionVariants[direction],
        delegated["class"],
      )}
    >
      {children}
    </div>
  );
}
