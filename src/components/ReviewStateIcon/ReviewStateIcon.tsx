import Badge from "lucide-solid/icons/badge";
import BadgeHelp from "lucide-solid/icons/badge-help";
import BadgeAlert from "lucide-solid/icons/badge-alert";
import BadgeInfo from "lucide-solid/icons/badge-info";
import BadgeCheck from "lucide-solid/icons/badge-check";
import { PullRequestApprovalState } from "~/types/states";
import { Dynamic } from "solid-js/web";

import * as styles from "./ReviewStateIcon.css";
import classNames from "classnames";

export type ReviewStateIconProps = {
  state: PullRequestApprovalState;
};

const mapApprovalStateToDisplay: Record<
  PullRequestApprovalState,
  { label: string; icon: typeof Badge }
> = {
  ["waiting"]: { label: "Awaiting review", icon: BadgeHelp },
  ["changes_requested"]: { label: "Changes requested", icon: BadgeAlert },
  ["commented"]: { label: "Commented", icon: BadgeInfo },
  ["approved"]: { label: "Approved", icon: BadgeCheck },
};

export function ReviewStateIcon(props: ReviewStateIconProps) {
  const Icon = mapApprovalStateToDisplay[props.state].icon;

  return (
    <span
      title={mapApprovalStateToDisplay[props.state].label}
      class={styles.iconWrapper}
    >
      <Dynamic
        component={Icon}
        class={classNames(
          styles.statusIcon,
          styles.statusIconVariants[props.state],
        )}
        aria-label={mapApprovalStateToDisplay[props.state].label}
      />
    </span>
  );
}
