import "./loadEnv.js";
const { URI, URI_DB } = process.env;
// import mongoose from "mongoose";
import app from "./app";

// async function main() {
//   mongoose
//     .connect("mongodb://localhost:27017/admin")
//     .then(() => console.log("connected to db 🟦"));
// }
// main();
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`☕ Express server listening on port: ${PORT}`);
});
