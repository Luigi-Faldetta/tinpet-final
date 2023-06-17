"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnv.js");
const { URI, URI_DB } = process.env;
// import mongoose from "mongoose";
const app_1 = __importDefault(require("./app"));
// async function main() {
//   mongoose
//     .connect("mongodb://localhost:27017/admin")
//     .then(() => console.log("connected to db 🟦"));
// }
// main();
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app_1.default.listen(PORT, () => {
    console.log(`☕ Express server listening on port: ${PORT}`);
});
