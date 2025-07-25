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

import static com.google.gerrit.server.project.ProjectResource.PROJECT_KIND;
import com.google.gerrit.extensions.restapi.RestApiModule;

public class ApiModule extends RestApiModule {
  @Override
  protected void configure() {
    get(PROJECT_KIND, "config").to(GetConfig.class);
  }
}
