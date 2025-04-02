# How to setup Gerrit with Checks-zuul plugin

## Prerequisites
1. Zuul server
2. Gerrit server

Follow zuul documentation here to try it on localhost: https://zuul-ci.org/docs/zuul/latest/tutorials/quick-start.html 

## Build the plugin
You need bazel to build Gerrit and this plugin:

This plugin cannot be built by itself. It needs to be part of the Gerrit source tree. First clone Gerrit along with it's submodules:

git clone --recurse-submodules https://gerrit.googlesource.com/gerrit

Clone the checks-zuul plugin in another directory.
git clone https://gerrit.avm99963.com/gerrit-checks-zuul

git fetch https://gerrit.avm99963.com/gerrit-checks-zuul refs/changes/66/3866/4 && git checkout FETCH_HEAD

## Move the plugin directory to gerrit plugins directory
mv /plugin/path to gerrit/plugins

## Build with bazel
cd gerrit
bazel clean --expunge
bazel build plugins/checks-zuul

You find the plugin output here: bazel-bin/plugins/checks-zuul/checks-zuul.jar

## Place the checks-zuul.jar plugin into your gerrit server / docker container (we used docker container)
docker cp checks-zuul.jar <container:id>:/var/gerrit/plugins
docker restart <container:id>
check if the checks tab shows up on a change in the gerrit UI

## Clone your gerrit repository and add .config file
git clone "ssh://admin@localhost:29418/test1"

git fetch origin refs/meta/config:refs/remotes/origin/meta/config

git checkout origin/meta/config

nano checks-zuul.config

[zuul "zuul"]
  url = "http://localhost:9000"
  tenant = "example-tenant"


 git add checks-zuul.config 
 git commit -m "Added checks-zuul config"
 git push origin HEAD:refs/meta/config
