import mongoose from "mongoose";

// define the event schema
const userSchema = new mongoose.Schema({
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
    required: false,
  },
  dogName: {
    type: String,
    required: false,
  },
  dogAge: {
    type: Number,
    required: false,
  },
  ownerAge: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  matches: {
    type: Array,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
});

export const User = mongoose.model("User", userSchema);
