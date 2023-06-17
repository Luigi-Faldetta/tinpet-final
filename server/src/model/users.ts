import mongoose from ".";

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

export const User = mongoose.model("User", userSchema);
