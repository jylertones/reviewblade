import { JSX } from "solid-js";
import * as styles from "./Label.css";
import classNames from "classnames";

export type LabelProps = {
  for: string;
  children: JSX.Element;
  class?: string;
};

export function Label(props: LabelProps) {
  return (
    <label {...props} class={classNames(styles.label, props["class"])}>
      {props.children}
    </label>
  );
}
