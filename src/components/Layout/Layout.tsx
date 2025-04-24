import { Title } from "@solidjs/meta";
import { JSX, onMount, Suspense } from "solid-js";
import * as styles from "./Layout.css";
import { Header } from "../Header/Header";
import classNames from "classnames";
import { useKeyUpGlobalHandler } from "~/utils/useKeyUpGlobalHandler";

export type LayoutProps = {
  children?: JSX.Element;
};

export function Layout(props: LayoutProps) {
  const onKeyUpGlobalHandler = useKeyUpGlobalHandler();
  onMount(() => {
    document.body.addEventListener("keyup", onKeyUpGlobalHandler);
  });

  return (
    <>
      <Title>ReviewBlade Solid</Title>
      <Suspense>
        <Header />

        <div class={classNames(styles.layoutWrapper)}>
          <main>{props.children}</main>
        </div>
      </Suspense>
    </>
  );
}
