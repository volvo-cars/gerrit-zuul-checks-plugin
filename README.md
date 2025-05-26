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
git clone git@github.com:volvo-cars/gerrit-zuul-checks-plugin.git ./plugins/checks-zuul
```

# Build

```bash
cd gerrit
bazel clean --expunge
bazel build //plugins/checks-zuul
```

You find the plugin output here:
`bazel-bin/plugins/checks-zuul/checks-zuul.jar`

# Lint Test

```bash
cd gerrit
bazel test //plugins/checks-zuul/web:lint_test
```

# Lint Fix

```bash
cd gerrit
bazel run //plugins/checks-zuul/web:lint_bin -- --fix "./"
```


# Build with Maven for Java dependencies

From project root, run:
```bash
mvn clean package 
```

# Known Issue

This plugin currently supports Gerrit **3.11.1 and older** only.  
Gerrit changed the `.eslintrc.js` structure in later versions, which breaks compatibility.

For more information:
https://gerrit.googlesource.com/gerrit/+/0e0f36d14af960cc847d9c3fe1acbb9f9dfd8856%5E1..0e0f36d14af960cc847d9c3fe1acbb9f9dfd8856/