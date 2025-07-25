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

import {
  Category,
  ChangeData,
  CheckRun,
  RunStatus,
} from '@gerritcodereview/typescript-api/checks';
import {sortCheckRuns} from './utils';
import {PluginApi} from '@gerritcodereview/typescript-api/plugin';
import {ChangeInfo} from '@gerritcodereview/typescript-api/rest-api';

function extractZuulInfoFromComment(
  comment: string
): {baseUrl: string; tenant: string} | null {
  const regex = /(https?:\/\/[^/]+)\/t\/([^/]+)\/status\/change\/\d+,\d+/;
  const match = comment.match(regex);

  if (!match) return null;

  const baseUrl = match[1];
  const tenant = match[2];

  return {baseUrl, tenant};
}
export class ChecksFetcher {
  private plugin: PluginApi;

  constructor(plugin: PluginApi) {
    this.plugin = plugin;
  }

  async fetchCheckRuns(changeData: ChangeData): Promise<CheckRun[]> {
    const checkRuns = await this.fetchLiveZuulCheckRuns(changeData);
    this.addAttemptNumbers(checkRuns);
    return checkRuns;
  }

  private addAttemptNumbers(checkRuns: CheckRun[]): CheckRun[] {
    sortCheckRuns(checkRuns);
    const lastAttemptPerCheck = new Map<string, number>();

    for (const run of checkRuns) {
      const lastAttempt = lastAttemptPerCheck.get(run.checkName) ?? 0;
      run.attempt = lastAttempt + 1;
      lastAttemptPerCheck.set(run.checkName, run.attempt);
    }

    return checkRuns;
  }

  private async fetchFailureDetails(
    logUrl: string
  ): Promise<{msg: string; cmd: string[]; stdout: string} | null> {
    const fullLogUrl = `${logUrl}job-output.json`;

    try {
      const response = await fetch(fullLogUrl);
      const json = await response.json();

      for (const entry of json || []) {
        for (const play of entry.plays || []) {
          for (const task of play.tasks || []) {
            const hosts = task.hosts;
            if (!hosts) continue;

            for (const hostName of Object.keys(hosts)) {
              const host = hosts[hostName];
              if (host.failed) {
                const cmdArray = Array.isArray(host.cmd)
                  ? host.cmd
                  : [host.cmd || ''];
                return {
                  msg: host.msg || 'No message',
                  cmd: cmdArray,
                  stdout: host.stdout_lines?.join('\n') || 'No output',
                };
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn(`[ZuulChecks] Failed to fetch failure details: ${err}`);
    }

    return null;
  }

  private async fetchLiveZuulCheckRuns(
    changeData: ChangeData
  ): Promise<CheckRun[]> {
    const patchset = changeData.patchsetNumber;
    const changeNumber = changeData.changeNumber;
    const changeId = changeData.changeNumber;
    const changeDetail = (await this.plugin
      .restApi()
      .get(`/changes/${changeId}/detail`)) as ChangeInfo;
    const messages = changeDetail.messages || [];

    let baseUrl = '';
    let tenant = '';

    for (const message of messages) {
      const info = extractZuulInfoFromComment(message.message);
      if (info) {
        baseUrl = info.baseUrl;
        tenant = info.tenant;
        break;
      }
    }

    if (!baseUrl || !tenant) {
      console.warn(
        '[ZuulChecks] Could not extract Zuul baseUrl or tenant from comments'
      );
      return [];
    }

    const zuulApi = `${baseUrl}/api/tenant/${tenant}/builds?change=${changeNumber}&patchset=${patchset}`;
    const buildLinkBase = `${baseUrl}/t/${tenant}`;

    try {
      const response = await fetch(zuulApi);
      const builds = await response.json();

      const checkRuns: CheckRun[] = [];

      for (const build of builds) {
        const status = build.end_time
          ? 'COMPLETED'
          : build.start_time
          ? 'RUNNING'
          : 'SCHEDULED';

        const result = build.result || 'RUNNING';
        const category =
          result === 'SUCCESS'
            ? 'SUCCESS'
            : result === 'FAILURE' || result === 'ERROR'
            ? 'ERROR'
            : status === 'SCHEDULED'
            ? 'INFO'
            : 'INFO';

        const statusLink = build.uuid
          ? result === 'SUCCESS' || result === 'FAILURE'
            ? `${buildLinkBase}/build/${build.uuid}`
            : `${buildLinkBase}/stream/${build.uuid}/?logfile=console.log`
          : '';

        let errorMessage = '';
        if (result === 'FAILURE') {
          const failureDetails = await this.fetchFailureDetails(build.log_url);
          if (failureDetails) {
            const cmd = failureDetails.cmd;
            const cmdStr = Array.isArray(cmd) ? cmd.join(' ') : String(cmd);
            errorMessage += `Msg: ${failureDetails.msg}\n\nCmd: ${cmdStr}\n\nStdout: ${failureDetails.stdout}`;
          }
        }

        const checkRun: CheckRun = {
          checkName: `${build.pipeline}/${build.job_name}`,
          status: status as RunStatus,
          statusLink,
          statusDescription: result,
          results: [
            {
              summary: `${result}`,
              message: errorMessage,
              category: category as Category,
            },
          ],
          startedTimestamp: build.start_time
            ? new Date(`${build.start_time}` + 'Z')
            : undefined,
          finishedTimestamp: build.end_time
            ? new Date(`${build.end_time}` + 'Z')
            : undefined,
        };

        checkRuns.push(checkRun);
      }

      return checkRuns;
    } catch (err) {
      console.error('[ZuulChecks] Error fetching live builds:', err);
      return [];
    }
  }
}
