import '@gerritcodereview/typescript-api/gerrit';
import {ZuulChecksProvider} from './provider';
window.Gerrit.install(plugin => {
  const checksApi = plugin.checks();
  const provider = new ZuulChecksProvider(plugin);
  checksApi.register(provider);
});


