import { JSX } from "solid-js";
import * as styles from "./BoxTitle.css";

export type BoxTitleProps = {
  children: JSX.Element;
};

export function BoxTitle(props: BoxTitleProps) {
  return <div class={styles.boxTitle}>{props.children}</div>;
}
