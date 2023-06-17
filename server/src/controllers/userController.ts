import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/users";
import { Response, Request } from "express";
import { ObjectId } from "mongodb";

interface UserInterface {
  _id?: ObjectId;
  email?: string;
  password?: string;
  ownerName?: string;
  dogName?: string;
  ownerAge?: number;
  dogAge?: number;
  gender?: string;
  avatar?: string;
  about?: string;
  //
  matches?: any[];
}

export const postUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email }).maxTimeMS(15000);

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      email: sanitizedEmail,
      password: hashedPassword,
    };

    const newUser = await User.create(data);
    // console.log(newUser);

    const token = jwt.sign(data, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ message: "ok", data: newUser._id, token: token });
  } catch (err) {
    console.log(err);
  }
};

// login existing user

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password) {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) {
        const payload = {
          userId: user._id,
          email: user.email,
          ownerName: user.ownerName,
          dogName: user.dogName,
          ownerAge: user.ownerAge,
          dogAge: user.dogAge,
          gender: user.gender,
          avatar: user.avatar,
          matches: user.matches,
        };
        const token = jwt.sign(payload, email, {
          expiresIn: 60 * 24,
        });
        res.status(201).json({ token: token, userId: user._id });
      }
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const query = { _id: userId };
    const user = await User.findOne(query);
    if (user) {
      const safeUser: UserInterface = {
        _id: user._id,
        ownerName: user.ownerName,
        dogName: user.dogName,
        dogAge: user.dogAge,
        ownerAge: user.ownerAge,
        gender: user.gender,
        avatar: user.avatar,
        matches: user.matches,
        about: user.about,
      };
      res.status(200).send(safeUser);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

// //update user matched
export const updateMatch = async (req: Request, res: Response) => {
  const { userId, matchedUserId } = req.body;

  try {
    const query = { _id: userId };
    const updateDocument = {
      $push: { matches: { _id: matchedUserId } },
    };

    const user = await User.updateOne(query, updateDocument);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

// get all users

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const returnedUsers = await User.find({});
    res.status(200).send(returnedUsers);
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

// // Update account /onboarding
export const updateUser = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const query = { _id: user._id };
    const updateDocument = {
      $set: {
        ownerName: user.ownerName,
        ownerAge: user.ownerAge,
        gender: user.gender,
        avatar: user.avatar,
        dogName: user.dogName,
        dogAge: user.dogAge,
        about: user.about,
        matches: user.matches,
      },
    };

    const updatedUser = await User.findOneAndUpdate(query, updateDocument, {
      new: true,
    });
    // console.log("here");
    // console.log(updatedUser);

    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getMatchedUsers = async (req: Request, res: Response) => {
  const userIds = req.query.userIds;
  console.log(req);
  console.log(req.query);
  if (typeof userIds === "string") {
    try {
      const parsedUserIds = JSON.parse(userIds);
      const foundUsers = await User.find({ _id: { $in: parsedUserIds } });
      res.json(foundUsers);
    } catch (error: any) {
      res.status(500).send(error.message);
      console.log(error);
    }
  } else {
    res.status(400).send("Invalid userIds");
  }
};
