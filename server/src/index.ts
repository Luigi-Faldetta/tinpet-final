import "./loadEnv.js";
import express, { Application } from "express";
import cors from "cors";
import { router } from "./router.js";
import mongoose from "mongoose";
const { URI, URI_DB } = process.env;

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

async function main() {
  mongoose
    .connect("mongodb://localhost:27017/admin")
    .then(() => console.log("connected to db 🟦"));
}
main();

app.listen(PORT, () => {
  console.log(`☕ Express server listening on port: ${PORT}`);
});
