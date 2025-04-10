import { CheckRun } from "~/types/api";

export function getWorkflowRunIdFromCheckRun(checkRun: CheckRun) {
  // Get the number out of https://github.com/bigeyedata/semantic-data-platform/actions/runs/12470111883/job/34804597747
  const url = checkRun.details_url;
  if (!url) return null;

  const urlParts = url.split("/");
  return Number(urlParts[urlParts.length - 3]);
}
