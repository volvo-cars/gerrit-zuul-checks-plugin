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

package com.avm99963.gerrit.plugins.checks.zuul;

import com.google.gerrit.extensions.annotations.PluginName;
import com.google.gerrit.extensions.restapi.Response;
import com.google.gerrit.extensions.restapi.RestReadView;
import com.google.gerrit.server.config.PluginConfigFactory;
import com.google.gerrit.server.project.NoSuchProjectException;
import com.google.gerrit.server.project.ProjectResource;
import com.google.gson.annotations.SerializedName;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.util.HashSet;
import java.util.Set;
import org.eclipse.jgit.lib.Config;

@Singleton
class GetConfig implements RestReadView<ProjectResource> {
  private static final String ZUUL_SECTION = "zuul";
  private static final String ZUUL_URL_KEY = "url";
  private static final String ZUUL_TENANT_KEY = "tenant";

  private final PluginConfigFactory config;
  private final String pluginName;

  @Inject
  GetConfig(PluginConfigFactory config, @PluginName String pluginName) {
    this.config = config;
    this.pluginName = pluginName;
  }

  @Override
  public Response<Set<ZuulChecksConfig>> apply(ProjectResource project)
      throws NoSuchProjectException {
    Set<ZuulChecksConfig> result = new HashSet<>();
    Config cfg = config.getProjectPluginConfigWithInheritance(
        project.getNameKey(), pluginName);
    for (String instance : cfg.getSubsections(ZUUL_SECTION)) {
      ZuulChecksConfig zuulCfg = new ZuulChecksConfig();
      zuulCfg.name = instance;
      zuulCfg.url = cfg.getString(ZUUL_SECTION, instance, ZUUL_URL_KEY);
      zuulCfg.tenant = cfg.getString(ZUUL_SECTION, instance, ZUUL_TENANT_KEY);
      result.add(zuulCfg);
    }
    return Response.ok(result);
  }

  static class ZuulChecksConfig {
    @SerializedName("name")
    String name;

    @SerializedName("url")
    String url;

    @SerializedName("tenant")
    String tenant;
  }
}
