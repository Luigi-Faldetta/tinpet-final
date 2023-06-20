import express, { Application } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { router } from "./router";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/", router);

const server = createServer(app);
const io = new Server(3333, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("newMessage", ({ userId, message }) => {
    io.emit("newMessage", `${userId} said ${message}`);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { app, server, io };
