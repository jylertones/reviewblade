import { JSX } from "solid-js";
import * as styles from "./Text.css";
import classNames from "classnames";

export type TextProps = {
  class?: string;
  children: JSX.Element;
  size?: "p1" | "p2";
  variant?: "default" | "subtle";
};

export function Text({
  size = "p2",
  variant = "default",
  children,
  ...delegated
}: TextProps) {
  return (
    <p
      class={classNames(
        delegated["class"],
        styles.p,
        styles.sizeVariants[size],
        styles.variantVariants[variant],
      )}
    >
      {children}
    </p>
  );
}
