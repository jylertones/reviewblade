import { codeToHtml, type StringLiteralUnion } from "shiki";
import type { BundledLanguage } from "shiki/bundle/web";
import { onMount } from "solid-js";

import * as styles from "./HighlightedCode.css";

export type HighlightedCodeProps = {
  code: string;
  extension: StringLiteralUnion<BundledLanguage, string>;
  firstLineNumber?: number;
  header?: string;
};

export function HighlightedCode(props: HighlightedCodeProps) {
  let patchElement: HTMLElement;

  onMount(() =>
    codeToHtml(props.code, {
      theme: "tokyo-night",
      colorReplacements: {
        "#1a1b26": "transparent",
      },
      lang: props.extension,
      transformers: [
        {
          line(node) {
            let firstChild = node.children[0];
            while (firstChild.type === "element") {
              firstChild = firstChild.children[0];
            }

            const firstChar = firstChild.value.substring(0, 1);
            if (firstChar === "+") {
              firstChild.value = firstChild.value.replace(/^\+/, " ");
              this.addClassToHast(node, "line-added");
            } else if (firstChar === "-") {
              firstChild.value = firstChild.value.replace(/^-/, " ");
              this.addClassToHast(node, "line-removed");
            }
          },
        },
      ],
    }).then((html) => {
      if (patchElement) {
        patchElement.innerHTML = html;
      }
    }),
  );

  return (
    <>
      <code class={styles.header}>{props.header}</code>
      <code
        ref={patchElement}
        class={styles.code}
        style={`counter-set: lineNumber ${props.firstLineNumber ? props.firstLineNumber - 1 : 1}`}
      >
        {props.code}
      </code>
    </>
  );
}
