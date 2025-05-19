export enum RunStatus {
  COMPLETED = 'COMPLETED',
  RUNNING = 'RUNNING',
  SCHEDULED = 'SCHEDULED',
  RUNNABLE = 'RUNNABLE',
}

export type CheckRun = {
  status: RunStatus;
  startedTimestamp?: Date;
  finishedTimestamp?: Date;
};
