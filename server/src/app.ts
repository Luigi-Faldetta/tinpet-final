import express, { Application } from "express";
import cors from "cors";
import { createServer } from "http";
import { router } from "./router";
import { Socket } from "socket.io";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/", router);

const server = createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
  socket.on(
    "newMessage",
    ({
      userId,
      message,
    }: {
      userId: string;
      message: {
        time: string;
        fromUser: string;
        toUser: string;
        message: string;
      };
    }) => {
      console.log("new Message from ", `${userId} said ${message}`);
      io.emit("newMessage", `${userId} said ${message.message}`);
    }
  );
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { app, server, io };
