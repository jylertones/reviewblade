import ChevronDown from "lucide-solid/icons/chevron-down";
import ChevronRight from "lucide-solid/icons/chevron-right";
import { createSignal, For, Show } from "solid-js";
import { File } from "~/types/api";
import { Box } from "../Box/Box";
import { BoxBody } from "../BoxBody/BoxBody";
import { Flex } from "../Flex/Flex";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";
import { Dynamic } from "solid-js/web";
import { HighlightedCode } from "../HighlightedCode/HighlightedCode";
import { getFileExtension } from "~/utils/getFileExtension";

import * as styles from "./ReviewFile.css";

export type ReviewFileProps = {
  file: File;
};

export function ReviewFile(props: ReviewFileProps) {
  const [expanded, setExpanded] = createSignal(
    ["added", "modified"].includes(props.file.status) || props.file.changes > 0,
  );
  const ExpandedIcon = () => (expanded() ? ChevronDown : ChevronRight);
  const expandButtonId = `expand-file-${props.file.filename.replace(/[\\/\\.]/g, "-")}`;

  const lines = props.file.patch?.split("\n") ?? [];
  const chunks = lines.reduce((acc, line) => {
    const matches = line.match(/(@@ -(\d+),\d+ \+\d+,\d+ @@).*/);
    if (matches) {
      acc.push({
        leadingLine: line,
        startLineNumber: Number(matches[2]),
        patch: "",
      });
    } else if (acc[acc.length - 1].patch === "") {
      acc[acc.length - 1].patch = line;
    } else {
      acc[acc.length - 1].patch += "\n" + line;
    }

    return acc;
  }, [] as DiffChunk[]);

  return (
    <Box>
      <BoxBody>
        <Flex justify="space-between">
          <Flex direction="column">
            <div>{props.file.filename}</div>
            <Show when={props.file.status === "renamed"}>
              <div class={styles.renamedFile}>
                <Text variant="subtle" size="p2">
                  renamed from {props.file.previous_filename}
                </Text>
              </div>
            </Show>
          </Flex>
          <Flex gap={4}>
            <div>
              <Show when={props.file.status === "added"}>added</Show>
              <Show when={props.file.status === "removed"}>removed</Show>
            </div>
            <Button
              variant="icon"
              aria-controls={expandButtonId}
              onClick={() => {
                setExpanded(!expanded());
              }}
            >
              <Dynamic component={ExpandedIcon()} />
            </Button>
          </Flex>
        </Flex>

        <div id={expandButtonId}>
          <Show when={props.file.patch && expanded()}>
            <For each={chunks}>
              {(chunk) => (
                <HighlightedCode
                  code={chunk.patch}
                  extension={getFileExtension(props.file.filename)}
                  firstLineNumber={chunk.startLineNumber}
                  header={chunk.leadingLine}
                />
              )}
            </For>
          </Show>
        </div>
      </BoxBody>
    </Box>
  );
}
