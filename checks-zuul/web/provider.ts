import { 
  ChangeData, 
  CheckRun, 
  ChecksProvider, 
  ResponseCode 
} from '@gerritcodereview/typescript-api/checks';
import { ChecksFetcher } from './fetcher';
import { PluginApi } from '@gerritcodereview/typescript-api/plugin';

export class ZuulChecksProvider implements ChecksProvider {
  private plugin: PluginApi;  // Declare the plugin property

  // Constructor receives the plugin and initializes the 'plugin' property
  constructor(plugin: PluginApi) {
    this.plugin = plugin;
  }
  
  async fetch(changeData: ChangeData) {
    try {
      const checkRuns = await this.fetchCheckRuns(changeData);
      return {
        responseCode: ResponseCode.OK,
        runs: checkRuns,
      };
    } catch (e: unknown) {
      console.error(e);
      return {
        responseCode: ResponseCode.ERROR,
        errorMessage: e?.toString?.(),
      };
    }
  }

  private async fetchCheckRuns(changeData: ChangeData): Promise<CheckRun[]> {
    const fetcher = new ChecksFetcher(this.plugin);
    return fetcher.fetchCheckRuns(changeData);
  }
}
