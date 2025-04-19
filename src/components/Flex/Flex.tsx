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
  return (
    <div
      class={classNames(
        styles.flex,
        props.gap && styles.gapVariants[props.gap],
        styles.alignVariants[
          props.align ?? (props.direction === "row" ? "center" : "start")
        ],
        styles.directionVariants[props.direction ?? "row"],
        props.justify && styles.justifyVariants[props.justify],
        props["class"],
      )}
    >
      {props.children}
    </div>
  );
}
