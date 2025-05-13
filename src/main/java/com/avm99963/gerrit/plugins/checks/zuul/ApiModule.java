package com.avm99963.gerrit.plugins.checks.zuul;

import static com.google.gerrit.server.project.ProjectResource.PROJECT_KIND;
import com.google.gerrit.extensions.restapi.RestApiModule;

public class ApiModule extends RestApiModule {
  @Override
  protected void configure() {
    get(PROJECT_KIND, "config").to(GetConfig.class);
  }
}
