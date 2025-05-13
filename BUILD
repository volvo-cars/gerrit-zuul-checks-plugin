load("//tools/bzl:plugin.bzl", "gerrit_plugin")

gerrit_plugin(
    name = "gerrit-zuul-checks-plugin",
    srcs = glob(["src/main/java/**/*.java"]),
    manifest_entries = [
        "Gerrit-PluginName: gerrit-zuul-checks-plugin",
        "Gerrit-Module: com.avm99963.gerrit.plugins.checks.zuul.ApiModule",
        "Gerrit-HttpModule: com.avm99963.gerrit.plugins.checks.zuul.HttpModule",
        "Implementation-Title: Zuul Checks plugin",
    ],
    resource_jars = ["//plugins/gerrit-zuul-checks-plugin/web:gerrit-zuul-checks-plugin"],
    resources = glob(["src/main/resources/**/*"]),
)
