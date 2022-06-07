module.exports = {
    apps: [{
      name: "site",
      script: "yarn",
      watch: ["libs/design-system/dist/index.cjs.js"],
      watch_delay: 1000,
      ignore_watch : ["apps/**"],
      args: "dev:site"
    }, {
      name: "design-system",
      script: "yarn", 
      args: "dev:design-system"
    }]
  }