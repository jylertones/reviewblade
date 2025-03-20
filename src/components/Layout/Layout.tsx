import { Title } from "@solidjs/meta";
import { JSX, Suspense } from "solid-js";
import * as styles from "./Layout.css";
import { Header } from "../Header/Header";
import classNames from "classnames";

export type LayoutProps = {
  children?: JSX.Element;
};

export function Layout(props: LayoutProps) {
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
