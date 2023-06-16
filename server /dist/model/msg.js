"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesTin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const userMsg = new mongoose_1.default.Schema({
    time: {
        type: Date,
        default: Date.now(),
        required: false,
    },
    fromUser: {
        type: mongodb_1.ObjectId,
        required: true,
    },
    toUser: {
        type: mongodb_1.ObjectId,
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
});
exports.MessagesTin = mongoose_1.default.model("MessagesTin", userMsg);
