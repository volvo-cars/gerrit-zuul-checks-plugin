# Gerrit-Zuul Checks Integration Plugin

This Gerrit plugin integrates Zuul build status directly into Gerrit’s **Checks tab**, providing developers with detailed feedback from Zuul CI without need of context switching.

## Features

- **Automatic fetch of Zuul metadata from comments**  
  The plugin parses Gerrit change messages to extract the `baseUrl` and `tenant` from Zuul status comments.

- **Live fetching from the Zuul REST API**  
  It queries Zuul’s `/api/tenant/<tenant>/builds` endpoint to retrieve builds associated with a specific change and patchset.

- **Failure details from `job-output.json`**  
  For failed builds, the plugin fetches detailed error information including the command, message and output from Zuul logs.

- **Dynamic construction of `CheckRun` objects**  
  For each Zuul build, a corresponding `CheckRun` object is created and populated with status, result, timestamps, and log links—visible in Gerrit’s Checks tab.

