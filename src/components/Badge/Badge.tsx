import { JSX } from "solid-js";
import * as styles from "./Badge.css";
import classNames from "classnames";

export type BadgeProps = {
  variant?: "default" | "success" | "warning";
  children: JSX.Element;
};

export function Badge(props: BadgeProps) {
  return (
    <div
      class={classNames(
        styles.badge,
        styles.variantVariants[props.variant ?? "default"],
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
