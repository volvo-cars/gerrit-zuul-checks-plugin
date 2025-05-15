# README

You need Bazel to build Gerrit and this plugin:

This plugin cannot be built by itself. It needs to be part of the Gerrit source tree.  
First clone Gerrit along with its submodules:

```bash
git clone --recurse-submodules https://gerrit.googlesource.com/gerrit
```

Clone the gerrit-zuul-checks-plugin. It is important that you do not change the directory:

```bash
cd gerrit
git clone git@github.com:volvo-cars/gerrit-zuul-checks-plugin.git ./plugins/gerrit-zuul-checks-plugin
```

# Build

```bash
cd gerrit
bazel clean --expunge
bazel build //plugins/gerrit-zuul-checks-plugin
```

You find the plugin output here:  
`bazel-bin/plugins/gerrit-zuul-checks-plugin/gerrit-zuul-checks-plugin.jar`

# Lint Test

```bash
cd gerrit
bazel test //plugins/gerrit-zuul-checks-plugin/web:lint_test
```

# Lint Fix

```bash
bazel run //plugins/gerrit-zuul-checks-plugin/web:lint_bin -- --fix "./"
```