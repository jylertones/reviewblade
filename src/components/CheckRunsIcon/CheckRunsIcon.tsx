import CircleAlert from "lucide-solid/icons/circle-alert";
import CircleCheck from "lucide-solid/icons/circle-check";
import CircleCheckBig from "lucide-solid/icons/circle-check-big";
import CircleChevronRight from "lucide-solid/icons/circle-chevron-right";
import CircleDashed from "lucide-solid/icons/circle-dashed";
import CircleSlash from "lucide-solid/icons/circle-slash";
import CircleStop from "lucide-solid/icons/circle-stop";
import CircleX from "lucide-solid/icons/circle-x";
import LoaderCircle from "lucide-solid/icons/loader-circle";

import { CheckRunConclusion, CheckRunState } from "~/types/states";
import { Badge } from "../Badge/Badge";

import * as styles from "./CheckRunsIcon.css";
import classNames from "classnames";
import { Dynamic } from "solid-js/web";

export type ReviewStateIconProps = {
  status: CheckRunState;
  conclusion: CheckRunConclusion | null;
};

const mapCheckRunConclusionToDisplay: Record<
  CheckRunConclusion,
  { label: string; icon: typeof Badge }
> = {
  ["success"]: { label: "Success", icon: CircleCheckBig },
  ["failure"]: { label: "Changes requested", icon: CircleX },
  ["neutral"]: { label: "Commented", icon: CircleSlash },
  ["cancelled"]: { label: "Approved", icon: CircleStop },
  skipped: { label: "Skipped", icon: CircleChevronRight },
  timed_out: { label: "Timed out", icon: CircleAlert },
  action_required: { label: "Action required", icon: CircleAlert },
};

const mapCheckRunStateToDisplay: Record<
  CheckRunState,
  { label: string; icon: typeof Badge }
> = {
  ["queued"]: { label: "Queued", icon: CircleDashed },
  ["in_progress"]: { label: "In progress", icon: LoaderCircle },
  ["completed"]: { label: "Completed", icon: CircleCheck },
  waiting: {
    label: "",
    icon: CircleDashed,
  },
  requested: {
    label: "Requested",
    icon: CircleDashed,
  },
  pending: {
    label: "",
    icon: CircleDashed,
  },
};

export function CheckRunsIcon(props: ReviewStateIconProps) {
  const displayProps =
    props.status === "completed" && props.conclusion !== null
      ? mapCheckRunConclusionToDisplay[props.conclusion]
      : mapCheckRunStateToDisplay[props.status];

  const label = displayProps.label;
  const Icon = displayProps.icon;

  return (
    <span title={label} class={styles.wrapper}>
      <Dynamic
        component={Icon}
        aria-label={label}
        class={classNames(
          styles.icon,
          props.status && styles.statusVariants[props.status],
          props.conclusion && styles.conclusionVariants[props.conclusion],
        )}
      />
    </span>
  );
}
