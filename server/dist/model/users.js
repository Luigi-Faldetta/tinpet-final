"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const _1 = __importDefault(require("."));
// define the event schema
const userSchema = new _1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        default: null,
        required: false,
    },
    dogName: {
        type: String,
        default: null,
        required: false,
    },
    dogAge: {
        type: Number,
        default: null,
        required: false,
    },
    ownerAge: {
        type: Number,
        default: null,
        required: false,
    },
    gender: {
        type: String,
        default: null,
        required: false,
    },
    avatar: {
        type: String,
        default: null,
        required: false,
    },
    matches: {
        type: Array,
        default: [],
        required: false,
    },
    about: {
        type: String,
        default: null,
        required: false,
    },
});
exports.User = _1.default.model("User", userSchema);
