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
  if (!a && !b) {
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
