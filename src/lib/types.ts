import type { CheckRunsResponse } from './api/getCheckRuns';

export type CheckRun = CheckRunsResponse['check_runs'][0];
