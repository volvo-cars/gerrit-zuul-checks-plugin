load("//tools/bzl:plugin.bzl", "gerrit_plugin")

gerrit_plugin(
    name = "checks-zuul",
    srcs = glob(["src/main/java/**/*.java"]),
    manifest_entries = [
        "Gerrit-PluginName: checks-zuul",
        "Gerrit-Module: com.avm99963.gerrit.plugins.checks.zuul.ApiModule",
        "Gerrit-HttpModule: com.avm99963.gerrit.plugins.checks.zuul.HttpModule",
        "Implementation-Title: Zuul Checks plugin",
    ],
    resource_jars = ["//plugins/checks-zuul/web:checks-zuul"],
    resources = glob(["src/main/resources/**/*"]),
)
