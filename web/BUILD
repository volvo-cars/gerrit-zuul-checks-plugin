load("//tools/js:eslint.bzl", "plugin_eslint")
load("//tools/bzl:js.bzl", "gerrit_js_bundle")
load("@npm//@bazel/typescript:index.bzl", "ts_config", "ts_project")

package(default_visibility = ["//visibility:public"])

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//plugins:tsconfig-plugins-base.json",
    ],
)

ts_project(
    name = "checks-zuul-ts",
    srcs = glob(
        ["**/*.ts"],
        exclude = ["**/__tests__/**"],
    ),
    incremental = True,
    out_dir = "_bazel_ts_out",
    tsc = "//tools/node_tools:tsc-bin",
    tsconfig = ":tsconfig",
    deps = [
        "@plugins_npm//@gerritcodereview/typescript-api",
        "@plugins_npm//lit",
    ],
)

gerrit_js_bundle(
    name = "checks-zuul",
    srcs = [":checks-zuul-ts"],
    entry_point = "_bazel_ts_out/plugin.js",
)

plugin_eslint()
