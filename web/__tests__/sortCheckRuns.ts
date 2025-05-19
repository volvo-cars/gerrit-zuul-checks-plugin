import {CheckRun, RunStatus} from './mocks/testCheckRun';
import {compareDates} from './compareDates';

export function sortCheckRuns(checkRuns: CheckRun[]) {
  return checkRuns.sort((a, b) => {
    if (a.status !== RunStatus.COMPLETED || b.status !== RunStatus.COMPLETED) {
      return getStatusOrder(a.status) - getStatusOrder(b.status);
    } else {
      const comparison = compareDates(
        a.finishedTimestamp,
        b.finishedTimestamp,
        true
      );
      if (comparison !== 0) {
        return comparison;
      } else {
        return compareDates(a.startedTimestamp, b.startedTimestamp, false);
      }
    }
  });
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
