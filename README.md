
# How to Set Up Gerrit with the Checks-Zuul Plugin

This guide walks you through the process of setting up Gerrit with the **Checks-Zuul plugin** to enable Zuul job results in Gerrit's **Checks** tab.

## Prerequisites
1. **Zuul server** up and running.
2. **Gerrit server** up and running.

You can follow the official Zuul documentation to get started with a local setup:  
[Zuul Quick Start Tutorial](https://zuul-ci.org/docs/zuul/latest/tutorials/quick-start.html)

## Add email in Gerrit as both admin and the user you create in the Tutorial
As administrator:
1. Go to settings
2. Email Addresses
3. Add an email

As created user:
1. Go to settings
2. Email Addresses
3. Add an email

## Build the Plugin
You need **Bazel** to build Gerrit and the Checks-Zuul plugin:

The plugin cannot be built independently. It needs to be part of the Gerrit source tree. First, clone Gerrit along with its submodules:

```bash
git clone --recurse-submodules https://gerrit.googlesource.com/gerrit
```

Next, clone the **Checks-Zuul plugin** in another directory:

```bash
git clone https://gerrit.avm99963.com/gerrit-checks-zuul
```

Then, fetch the latest changes for the plugin:

```bash
git fetch https://gerrit.avm99963.com/gerrit-checks-zuul refs/changes/66/3866/4 && git checkout FETCH_HEAD
```

## Move the Plugin Directory to Gerrit’s Plugin Directory
Move the **plugin directory** into the **Gerrit plugins** directory:

```bash
mv /gerrit-checks-zuul gerrit/plugins/checks-zuul
```

## Build with Bazel
Now, build the plugin using **Bazel**:

```bash
cd gerrit
bazel clean --expunge
bazel build plugins/checks-zuul
```

The plugin output will be found here:

```bash
bazel-bin/plugins/checks-zuul/checks-zuul.jar
```

## Place the checks-zuul.jar Plugin into Your Gerrit Server or Docker Container
If you are using **Docker**, you can copy the plugin into the Gerrit container:

```bash
docker cp bazel-bin/plugins/checks-zuul/checks-zuul.jar <container:id>:/var/gerrit/plugins
docker restart <container:id>
```

Check if the **Checks** tab appears on a change in the Gerrit UI.

## Clone Your Gerrit Repository and Add the `.config` File
Clone your Gerrit repository:

```bash
git clone "ssh://admin@localhost:29418/All-Projects"
```

```bash
cd All-Projects
```

Fetch the **meta/config** reference:

```bash
git fetch origin refs/meta/config:refs/remotes/origin/meta/config
```

Check out the **meta/config** reference:

```bash
git checkout origin/meta/config
```

Edit the **checks-zuul.config** file:

```bash
nano checks-zuul.config
```

Add the following configuration to the file:

```ini
[zuul "zuul"]
  url = "http://localhost:9000"
  tenant = "example-tenant"
```

Commit and push the changes to Gerrit:

```bash
git add checks-zuul.config
git commit -m "Added checks-zuul config"
git push origin HEAD:refs/meta/config
```

---
