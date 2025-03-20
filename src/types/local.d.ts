import { PullRequestApprovalState } from "./states";

export type AwaitingReview = {
  name: string;
  state: PullRequestApprovalState;
  submittedAt?: Date;
};

export type DiffChunk = {
  startLineNumber: number;
  leadingLine: string;
  patch: string;
};

export type ConsolidatedComment = {
  id: number;
  author: {
    name?: string;
    login: string;
    id: number;
    avatarUrl: string;
  };
  body: string;
  createdAt?: Date;
  state: PullRequestApprovalState;

  replies?: ConsolidatedComment[];
  diff?: {
    diff: string;
    startLine?: number | null;
    lastLine?: number | null;
    path: string;
    subjectType?: "line" | "file";
    reactions: {
      "+1": number;
      "-1": number;
      laugh: number;
      confused: number;
      heart: number;
      hooray: number;
      eyes: number;
      rocket: number;
    };
  };
};
