import { Show } from "solid-js";
import { hasApiKey } from "~/utils/apiKeyUtils";
import * as styles from "./Header.css";

export function Header() {
  const needsSetup = !hasApiKey();

  return (
    <div class={styles.navWrapper}>
      <div class={styles.layoutWrapper}>
        <nav>
          <a href="/">
            <img src="/logo_dark.svg" alt="ReviewBlade" height="28" />
          </a>
          <Show when={needsSetup}>
            <a href="/about" class={styles.right}>
              Setup
            </a>
          </Show>
          <Show when={!needsSetup}>
            <a href="/pulls">Pull Requests</a>
            <a href="/settings" class={styles.right}>
              Settings
            </a>
          </Show>
        </nav>
      </div>
    </div>
  );
}
