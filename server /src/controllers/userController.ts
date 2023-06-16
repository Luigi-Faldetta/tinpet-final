import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/users";
import { Response, Request } from "express";
import { ObjectId } from "mongodb";

interface UserInterface {
  _id?: ObjectId;
  email?: string;
  password?: string;
  ownerName: string;
  dogName: string;
  ownerAge: number;
  dogAge: number;
  gender: string;
  avatar: string;
  about: string;
  //
  matches: any[];
}

export const postUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    ownerName,
    dogName,
    ownerAge,
    dogAge,
    gender,
    avatar,
    matches,
    about,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      email: sanitizedEmail,
      password: hashedPassword,
      ownerName: ownerName,
      dogName: dogName,
      ownerAge: ownerAge,
      dogAge: dogAge,
      gender: gender,
      avatar: avatar,
      matches: matches,
      about: about,
    };

    const newUser = await User.create(data);

    const token = jwt.sign(data, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ message: "ok", data: data.email, token: token });
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
          // ownerName: user.ownerName,
          // dogName: user.dogName,
          // ownerAge: user.ownerAge,
          // dogAge: user.dogAge,
          // gender: user.gender,
          // avatar: user.avatar,
          // matches: user.matches,
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
  const userId = req.query.userId;

  try {
    const query = { user_id: userId };
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
    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
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
  // console.log(req.body);

  try {
    const query = { _id: user._id };
    const updateDocument = {
      $set: {
        ownerName: user.ownerName,
        ownerAge: user.ownerAge,
        gender: user.gender,
        avatar: user.avatar,
        dogName: user.dogName,
        about: user.about,
        matches: user.matches,
      },
    };
    const insertedUser = await User.findOneAndUpdate(query, updateDocument);
    console.log(insertedUser);
    res.status(200).send(insertedUser);
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getMatchedUsers = async (req: Request, res: Response) => {
  try {
    const userIds = req.query.userIds;

    if (typeof userIds === "string") {
      const parsedUserIds = JSON.parse(userIds);

      const pipeline = [
        {
          $match: {
            user_id: {
              $in: parsedUserIds,
            },
          },
        },
      ];

      const foundUsers = await User.aggregate(pipeline);
      res.status(200).json(foundUsers);
    } else {
      throw new Error("userIds must be a string.");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
