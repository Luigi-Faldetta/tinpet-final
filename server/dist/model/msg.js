"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesTin = void 0;
const _1 = __importDefault(require("."));
const mongodb_1 = require("mongodb");
const userMsg = new _1.default.Schema({
    time: {
        type: Date,
        default: Date.now(),
        required: false,
    },
    fromUser: {
        type: mongodb_1.ObjectId,
        required: false,
    },
    toUser: {
        type: mongodb_1.ObjectId,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
});
exports.MessagesTin = _1.default.model("MessagesTin", userMsg);
