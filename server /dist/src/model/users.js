"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// define the event schema
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    ownerName: {
        type: Number,
        required: true,
    },
    dogName: {
        type: String,
        required: true,
    },
    dogAge: {
        type: Number,
        required: true,
    },
    ownerAge: {
        type: Number,
        required: true,
    },
});
exports.User = mongoose_1.default.model("User", userSchema);
