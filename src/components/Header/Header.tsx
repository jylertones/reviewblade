import { Show } from "solid-js";
import { hasApiKey } from "~/utils/apiKeyUtils";
import * as styles from "./Header.css";
import classNames from "classnames";
import { A } from "@solidjs/router";

export function Header() {
  const needsSetup = !hasApiKey();

  return (
    <div class={styles.navWrapper}>
      <div class={styles.layoutWrapper}>
        <nav class={styles.nav}>
          <A href="/" class={styles.anchor}>
            <img src="/logo_dark.svg" alt="ReviewBlade" height="28" />
          </A>
          <Show when={needsSetup}>
            <A href="/about" class={classNames(styles.anchor, styles.right)}>
              Setup
            </A>
          </Show>
          <Show when={!needsSetup}>
            <A href="/pulls" class={styles.anchor}>
              Pull Requests
            </A>
            <A href="/settings" class={classNames(styles.anchor, styles.right)}>
              Settings
            </A>
          </Show>
        </nav>
      </div>
    </div>
  );
}
