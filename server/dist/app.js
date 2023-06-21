"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const router_1 = require("./router");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use(express_1.default.json());
app.use("/", router_1.router);
const server = (0, http_1.createServer)(app);
exports.server = server;
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("newMessage", ({ userId, message, }) => {
        console.log("new Message from ", `${userId} said ${message}`);
        io.emit("newMessage", `${userId} said ${message.message}`);
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
