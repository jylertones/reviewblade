import { JSX } from "solid-js";
import * as styles from "./BoxBody.css";

export type BoxBodyProps = {
  children: JSX.Element;
};

export function BoxBody(props: BoxBodyProps) {
  return <div class={styles.boxBody}>{props.children}</div>;
}
