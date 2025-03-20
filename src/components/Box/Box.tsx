import { JSX } from "solid-js";
import * as styles from "./Box.css";

export type BoxProps = {
  children: JSX.Element;
};

export function Box(props: BoxProps) {
  return <div class={styles.box}>{props.children}</div>;
}
