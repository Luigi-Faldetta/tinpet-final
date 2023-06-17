import { Response, Request } from "express";
import { MessagesTin } from "../model/msg";

export const getMsg = async (req: Request, res: Response) => {
  console.log("hel");
  console.log(req.body);
  //   console.log(req.query);
  try {
    // const { userId, correspondingUserId } = req.body;
    const { fromUser, toUser } = req.body;

    const query = {
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser },
      ],
    };
    const foundMessages = await MessagesTin.find(query);

    res.status(201).json({ message: "ok", data: foundMessages });
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

//this getMsg function works with my get request using params in my MessageService

// export const getMsg = async (req: Request, res: Response) => {
//   try {
//     const { userId, correspondingUserId } = req.query;

//     const query = {
//       $or: [
//         { fromUser: userId, toUser: correspondingUserId },
//         { fromUser: correspondingUserId, toUser: userId },
//       ],
//     };
//     const foundMessages = await MessagesTin.find(query);

//     res.status(201).json({ message: "ok", data: foundMessages });
//   } catch (error: any) {
//     res.status(500).send(error.message);
//     console.log(error);
//   }
// };

// // Add a Message to our Database
export const postMsg = async (req: Request, res: Response) => {
  try {
    const message = req.body;
    const insertedMessage = await MessagesTin.create(message);
    console.log("All good!");
    return res.status(201).json({ message: "ok", data: insertedMessage });
    // return insertedMessage;
  } catch (error: any) {
    console.log("Post message failed with: ", error.message);
    res.status(500).send(error.message);
  }
};
