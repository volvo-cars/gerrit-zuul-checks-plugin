import {CheckRun, RunStatus} from '@gerritcodereview/typescript-api/checks';
export function sortCheckRuns(checkRuns: CheckRun[]) {
  return checkRuns.sort((a: CheckRun, b: CheckRun) => {
    if (a.status !== RunStatus.COMPLETED || b.status !== RunStatus.COMPLETED) {
      return getStatusOrder(a.status) - getStatusOrder(b.status);
    } else {
      const comparison = compareDates(
        a.finishedTimestamp,
        b.finishedTimestamp,
        /* nullIsInf = */ true
      );
      if (comparison !== 0) {
        return comparison;
      } else {
        return compareDates(
          a.startedTimestamp,
          b.startedTimestamp,
          /* nullIsInf = */ false
        );
      }
    }
  });
}
function compareDates(
  a: Date | undefined,
  b: Date | undefined,
  nullIsInf: boolean
) {
  if (!a || !b) {
    return 0;
  } else if (!a) {
    return nullIsInf ? 1 : -1;
  } else if (!b) {
    return nullIsInf ? -1 : 1;
  } else if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
function getStatusOrder(status: RunStatus): number {
  switch (status) {
    case RunStatus.RUNNABLE:
      return 3;
    case RunStatus.RUNNING:
      return 2;
    case RunStatus.SCHEDULED:
      return 1;
    case RunStatus.COMPLETED:
      return 0;
  }
}