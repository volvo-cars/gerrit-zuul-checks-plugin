import {sortCheckRuns} from './sortCheckRuns';
import {RunStatus, CheckRun} from './mocks/testCheckRun';

describe('sortCheckRuns', () => {
  it('should sort non-completed statuses by order', () => {
    const input: CheckRun[] = [
      {status: RunStatus.RUNNABLE},
      {status: RunStatus.SCHEDULED},
      {status: RunStatus.RUNNING},
    ];
    const result = sortCheckRuns(input);
    expect(result.map(r => r.status)).toEqual([
      RunStatus.SCHEDULED,
      RunStatus.RUNNING,
      RunStatus.RUNNABLE,
    ]);
  });

  it('should sort COMPLETED by finishedTimestamp then startedTimestamp', () => {
    const runA: CheckRun = {
      status: RunStatus.COMPLETED,
      finishedTimestamp: new Date('2023-01-01T12:00:00Z'),
      startedTimestamp: new Date('2023-01-01T10:00:00Z'),
    };
    const runB: CheckRun = {
      status: RunStatus.COMPLETED,
      finishedTimestamp: new Date('2023-01-01T13:00:00Z'),
      startedTimestamp: new Date('2023-01-01T09:00:00Z'),
    };
    const runC: CheckRun = {
      status: RunStatus.COMPLETED,
      finishedTimestamp: new Date('2023-01-01T13:00:00Z'),
      startedTimestamp: new Date('2023-01-01T08:00:00Z'),
    };
    const input = [runB, runA, runC];
    const result = sortCheckRuns(input);
    expect(result).toEqual([runA, runC, runB]);
  });
});
