import mongoose from "mongoose";

async function main() {
  mongoose
    .connect("mongodb://localhost:27017/admin")
    .then(() => console.log("connected to db 🟦"));
}
main();

export default mongoose;
