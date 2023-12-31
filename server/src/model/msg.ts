import mongoose from ".";
import { ObjectId } from "mongodb";
const userMsg = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  fromUser: {
    type: ObjectId,
    required: false,
  },
  toUser: {
    type: ObjectId,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
});
export const MessagesTin = mongoose.model("MessagesTin", userMsg);
