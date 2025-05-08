/*import {
  Category,
  ChangeData,
  CheckRun,
  RunStatus,
} from '@gerritcodereview/typescript-api/checks';
import { BuildsetResult, BuildResult } from './types';
*/
/*export class CommentParser {
  constructor() {}
*/
/*export function extractZuulInfoFromComment(comment: string): { baseUrl: string, tenant: string } | null {
  const regex = /(http:\/\/[^/]+)\/t\/([^/]+)\/status\/change\/\d+,\d+/;
  const match = comment.match(regex);

  if (!match) return null;

  const baseUrl = match[1];   // e.g. "http://localhost:9000"
  const tenant = match[2];    // e.g. "example-tenant"

  return { baseUrl, tenant };
}
*/
  
  /*parseResultMessageToCheckRun(messages: any[], changeData: ChangeData): CheckRun[] {
    const checkRuns: CheckRun[] = [];
    const resultRe = /^- (?<job>[^ ]+) (?:(?<link>https?:\/\/[^ ]+)|[^ ]+) : ((ERROR (?<errormsg>.*?) in (?<errtime>.*))|(?<result>[^ ]+)( in (?<time>.*))?)/;

    for (const msg of messages) {
      if (msg._revision_number !== changeData.patchsetNumber) continue;

      const lines = msg.message.split('\n');
      for (const line of lines) {
        const match = resultRe.exec(line);
        if (!match) continue;

        const jobName = match.groups?.job;
        const link = match.groups?.link ?? undefined;
        const result = match.groups?.result ?? "ERROR";
        const time = match.groups?.time ?? match.groups?.errtime;

        const checkRun: CheckRun = {
          checkName: `Result/${jobName}`,
          status: RunStatus.COMPLETED,
          statusLink: link,
          statusDescription: result,
          results: [{
            summary: `${result} in ${time}`,
            category: this.getCategoryFromResult(result as any),
          }],
          startedTimestamp: new Date(msg.date),
          finishedTimestamp: new Date(new Date(msg.date).getTime() + 1000),
        };

        checkRuns.push(checkRun);
      }
    }

    return checkRuns;
  }
*/
/*  parseStatusMessageToCheckRun(messages: any[], changeData: ChangeData): CheckRun[] {
    const checkRuns: CheckRun[] = [];
    const statusRe = /Change status url: (?<link>https?:\/\/[^\s]+)/;
    const resultRe = /Build (?<result>succeeded|failed)/i;

    let latestResult: BuildsetResult | null = null;

    for (const msg of messages) {
      if (msg._revision_number !== changeData.patchsetNumber) continue;
      const match = resultRe.exec(msg.message);
      if (match) {
        latestResult = match.groups?.result?.toUpperCase() === "SUCCEEDED" ? "SUCCESS" : "FAILURE";
      }
    }

    for (const msg of messages) {
      if (msg._revision_number !== changeData.patchsetNumber) continue;
      const lines = msg.message.split('\n');
      for (const line of lines) {
        const match = statusRe.exec(line);
        if (!match) continue;

        const link = match.groups?.link ?? undefined;

        const checkRun: CheckRun = {
          checkName: 'Change status',
          status: latestResult ? RunStatus.COMPLETED : RunStatus.RUNNING,
          statusLink: link,
          statusDescription: 'Change status page',
          startedTimestamp: new Date(msg.date),
          finishedTimestamp: new Date(new Date(msg.date).getTime() + 1000),
        };

        if (latestResult) {
          checkRun.results = [{
            summary: latestResult,
            category: this.getCategoryFromResult(latestResult),
          }];
        }

        checkRuns.push(checkRun);
      }
    }

    return checkRuns;
  }
*/
 /* parseResultConsoleToCheckRun(messages: any[], changeData: ChangeData): CheckRun[] {
    const checkRuns: CheckRun[] = [];
    const resultRe = /^- (?<job>[^ ]+) (?:(?<link>https?:\/\/[^ ]+)|[^ ]+) : ((ERROR (?<errormsg>.*?) in (?<errtime>.*))|(?<result>[^ ]+)( in (?<time>.*))?)/;

    for (const msg of messages) {
      if (msg._revision_number !== changeData.patchsetNumber) continue;

      const lines = msg.message.split('\n');
      for (const line of lines) {
        const match = resultRe.exec(line);
        if (!match) continue;

        const jobName = match.groups?.job;
        const link = match.groups?.link ? `${match.groups.link}/console` : undefined;
        const result = match.groups?.result ?? "ERROR";
        const time = match.groups?.time ?? match.groups?.errtime;

        const checkRun: CheckRun = {
          checkName: `Zuul Console/${jobName}`,
          status: RunStatus.COMPLETED,
          statusLink: link,
          statusDescription: result,
          results: [{
            summary: `${result} in ${time}`,
            category: this.getCategoryFromResult(result as any),
          }],
          startedTimestamp: new Date(msg.date),
          finishedTimestamp: new Date(new Date(msg.date).getTime() + 1000),
        };

        checkRuns.push(checkRun);
      }
    }

    return checkRuns;
  }
*//*
  private getCategoryFromResult(result: BuildsetResult | BuildResult): Category {
    switch (result) {
      case 'SUCCESS':
        return Category.SUCCESS;
      case 'FAILURE':
      case 'RETRY_LIMIT':
        return Category.ERROR;
      case 'MERGE_CONFLICT':
      case 'MERGE_FAILURE':
      case 'NODE_FAILURE':
      case 'TIMED_OUT':
      case 'POST_FAILURE':
      case 'CONFIG_ERROR':
      default:
        return Category.WARNING;
      case 'DEQUEUED':
      case 'SKIPPED':
      case 'ABORTED':
      case null:
        return Category.INFO;
    }
  }
  
}

*/