import "./loadEnv.js";
import { app, server, io } from "./app";

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`☕ Express server listening on port: ${PORT}`);
});
