"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnv.js");
const app_1 = require("./app");
const PORT = 3000;
app_1.server.listen(PORT, () => {
    console.log(`☕ Express server listening on port: ${PORT}`);
});
