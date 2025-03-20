import { JSX } from "solid-js";
import * as styles from "./Text.css";
import classNames from "classnames";

export type TextProps = {
  class?: string;
  children: JSX.Element;
  size?: "p1" | "p2";
  variant?: "default" | "subtle";
};

export function Text(props: TextProps) {
  return (
    <p
      class={classNames(
        props["class"],
        styles.p,
        styles.sizeVariants[props.size ?? "p2"],
        styles.variantVariants[props.variant ?? "default"],
      )}
    >
      {props.children}
    </p>
  );
}
