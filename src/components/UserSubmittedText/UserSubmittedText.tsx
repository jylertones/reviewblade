import * as styles from "./UserSubmittedText.css";

export type UserSubmittedTextProps = {
  text: string;
};

export function UserSubmittedText(props: UserSubmittedTextProps) {
  return <div class={styles.wrapper} innerHTML={props.text} />;
}
