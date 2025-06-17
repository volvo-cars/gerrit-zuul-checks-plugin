/*

 * Copyright (c) 2025 Volvo Car Corporation

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
