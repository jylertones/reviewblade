import { MetaProvider, Title } from "@solidjs/meta";
import { JSX, Suspense } from "solid-js";
import "../../styles/globalStyles.css";
// import * as styles from "./Layout.css";
import { Header } from "../Header/Header";
import classNames from "classnames";
// import { darkThemeClass } from "~/styles/theme/darkTheme.css";

export type LayoutProps = {
  children?: JSX.Element;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Title>ReviewBlade Solid</Title>
      <Suspense>
        <Header />

        <div class={classNames("", styles.layoutWrapper)}>
          <main>{children}</main>
        </div>
      </Suspense>
    </>
  );
}
