import { Response, Request } from "express";
import { MessagesTin } from "../model/msg";

export const getMsg = async (req: Request, res: Response) => {
  try {
    const { userId, correspondingUserId } = req.query;
    const query = { fromUser: userId, toUser: correspondingUserId };
    const foundMessages = await MessagesTin.find(query);
    res.status(201).json({ message: "ok", data: foundMessages });
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const postMsg = async (req: Request, res: Response) => {
  try {
    const { message, time, userId, correspondingUserId } = req.body;

    const insertedMessage = await MessagesTin.create({
      message: message,
      time: time,
      fromUser: userId,
      toUser: correspondingUserId,
    });

    console.log("All good!");
    return res.status(201).json({ message: "ok", data: insertedMessage });
  } catch (error: any) {
    console.log("Post message failed with: ", error.message);
    res.status(500).send(error.message);
  }
};
