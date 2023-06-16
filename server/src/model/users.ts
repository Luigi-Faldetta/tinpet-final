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
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  matches: {
    type: Array,
    required: false,
  },
  about: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
