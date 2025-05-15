.PHONY: lint_test lint_fix build
SAFEBAZEL := $(shell if which bazelisk >/dev/null; then echo bazelisk; else echo "bazel"; fi)
lint_test:
	$(SAFEBAZEL) test :lint_test
lint_fix:
	$(SAFEBAZEL) run :lint_bin -- --fix "./"
build:
	$(SAFEBAZEL) build //plugins/gerrit-zuul-checks-plugin/web:gerrit-zuul-checks-plugin
