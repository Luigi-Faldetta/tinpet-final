import "./loadEnv.js";
const { URI, URI_DB } = process.env;
import app from "./app";

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`☕ Express server listening on port: ${PORT}`);
});
