import { Show } from "solid-js";
import { hasApiKey } from "~/utils/apiKeyUtils";
import * as styles from "./Header.css";
import classNames from "classnames";

export function Header() {
  const needsSetup = !hasApiKey();

  return (
    <div class={styles.navWrapper}>
      <div class={styles.layoutWrapper}>
        <nav class={styles.nav}>
          <a href="/" class={styles.anchor}>
            <img src="/logo_dark.svg" alt="ReviewBlade" height="28" />
          </a>
          <Show when={needsSetup}>
            <a href="/about" class={classNames(styles.anchor, styles.right)}>
              Setup
            </a>
          </Show>
          <Show when={!needsSetup}>
            <a href="/pulls" class={styles.anchor}>
              Pull Requests
            </a>
            <a href="/settings" class={classNames(styles.anchor, styles.right)}>
              Settings
            </a>
          </Show>
        </nav>
      </div>
    </div>
  );
}
