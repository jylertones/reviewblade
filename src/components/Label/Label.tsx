import { JSX } from "solid-js";
import * as styles from "./Label.css";
import classNames from "classnames";

export type LabelProps = {
  for: string;
  children: JSX.Element;
  class?: string;
};

export function Label({ children, ...delegatedProps }: LabelProps) {
  return (
    <label
      {...delegatedProps}
      class={classNames("label", delegatedProps["class"])}
    >
      {children}
    </label>
  );
}
