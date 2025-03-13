import { JSX } from "solid-js";
import * as styles from "./Input.css";
import classNames from "classnames";

export type InputProps = {
  id: string;
  type?: "text" | "password";
  name?: string;
  value: string;
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  class?: string;
};

export function Input(props: InputProps) {
  return <input {...props} class={classNames(styles.input, props["class"])} />;
}
