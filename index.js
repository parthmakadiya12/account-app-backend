// Set up babel to transpile ES6/ES7
require("babel-register")({
    ignore: /\/(build|node_modules)\//,
    presets: ["env"],
  });
  
  require("babel-polyfill");
  
  // Serve the endpoints
  require("./app");
  