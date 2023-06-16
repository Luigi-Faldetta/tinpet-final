"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const userController_1 = require("./controllers/userController");
const msgController_1 = require("./controllers/msgController");
exports.router.post("/signup", userController_1.postUser);
exports.router.post("/login", userController_1.loginUser);
exports.router.get("/user", userController_1.getUser);
exports.router.put("/addmatch", userController_1.updateMatch);
exports.router.put("/updateUser", userController_1.updateUser);
exports.router.get("/users", userController_1.getAllUsers);
exports.router.get("/matchedusers", userController_1.getMatchedUsers);
exports.router.get("/matchedusers", userController_1.getMatchedUsers);
exports.router.get("/messages", msgController_1.getMsg);
exports.router.post("/message", msgController_1.postMsg);
exports.default = exports.router;
