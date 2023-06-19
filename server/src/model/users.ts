import mongoose from ".";
import { ObjectId } from "mongodb";

export interface UserInterface {
  _id?: ObjectId;
  email: string;
  password?: string;
  ownerName?: string;
  dogName?: string;
  ownerAge?: number;
  dogAge?: number;
  gender?: string;
  avatar: string;
  about: string;
  //
  matches?: any[];
}

// define the event schema
const userSchema = new mongoose.Schema<UserInterface>({
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
