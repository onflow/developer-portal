module.exports = {
    apps: [{
      script: "yarn",
      watch: ["libs/design-system/dist/index.cjs.js"],
      watch_delay: 1000,
      ignore_watch : ["apps/**"],
      args: "dev"
    }]
  }