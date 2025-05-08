  // The following types/interfaces are used to interact with the Zuul API and
  // some do not have all the available properties, only the subset we are using.
  export type BaseZuulResult =
    | 'SUCCESS'
    | 'FAILURE'
    | 'RETRY_LIMIT'
    | 'MERGE_CONFLICT'
    | 'MERGE_FAILURE'
    | 'NODE_FAILURE'
    | 'TIMED_OUT'
    | 'POST_FAILURE'
    | 'CONFIG_ERROR'
    | 'DEQUEUED'
    | 'SKIPPED'
    | 'ABORTED'
    | null;
  export type BuildsetResult = BaseZuulResult;
  export type BuildResult =
    | BaseZuulResult
    | 'CANCELED'
    | 'ERROR'
    | 'RETRY'
    | 'DISK_FULL'
    | 'NO_JOBS'
    | 'DISCONNECT'
    | 'LOST'
    | 'EXCEPTION'
    | 'NO_HANDLE';
 