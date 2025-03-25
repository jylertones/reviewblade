import { JSX, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import classNames from "classnames";
import LoaderCircle from "lucide-solid/icons/loader-circle";
import * as styles from "./Button.css";

export type ButtonProps = {
  type?: "button" | "submit";
  variant?: "primary" | "default" | "icon";
  onClick?: (event: Event) => void;
  href?: string;
  children: JSX.Element;
  loading?: boolean;

  // Other props spread over the button
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  rel?: HTMLAnchorElement["rel"];
  target?: HTMLAnchorElement["target"];
};

export function Button(props: ButtonProps) {
  return (
    <Dynamic
      component={props.href !== "undefined" ? "a" : "button"}
      class={classNames(
        styles.button,
        styles.variantVariants[props.variant ?? "default"],
      )}
      {...props}
    >
      <Show when={props.loading}>
        <LoaderCircle class={styles.rotate} />
      </Show>
      {props.children}
    </Dynamic>
  );
}
