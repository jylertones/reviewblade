import { describe, expect, it } from "vitest";
import { CheckRun } from "~/types/api";
import { sortCheckRuns } from "./sortCheckRuns";

describe("sortCheckRuns", () => {
  it("sorts a completed failure above a completed skipped", () => {
    expect(
      sortCheckRuns([stubCheckRunCompleteSkipped, stubCheckRunCompleteFailure]),
    ).toEqual([stubCheckRunCompleteFailure, stubCheckRunCompleteSkipped]);
  });
});

const stubCheckRun: CheckRun = {
  id: 1,
  app: {
    id: 1,
    created_at: "2017-07-08T16:18:44-04:00",
    description: null,
    events: [],
    external_url: "",
    html_url: "",
    name: "",
    node_id: "",
    owner: null,
    permissions: {},
    updated_at: "2017-07-08T16:18:44-04:00",
  },
  check_suite: { id: 1 },
  completed_at: "2018-05-04T01:14:52Z",
  conclusion: "neutral",
  status: "completed",
  details_url: null,
  external_id: null,
  head_sha: "",
  name: "",
  html_url: null,
  url: "",
  pull_requests: [],
  node_id: "",
  started_at: null,
  output: {
    title: null,
    text: null,
    summary: null,
    annotations_url: "",
    annotations_count: 0,
  },
};

const stubCheckRunCompleteFailure: CheckRun = {
  ...stubCheckRun,
  conclusion: "failure",
  status: "completed",
};

const stubCheckRunCompleteSkipped: CheckRun = {
  ...stubCheckRun,
  conclusion: "skipped",
  status: "completed",
};
