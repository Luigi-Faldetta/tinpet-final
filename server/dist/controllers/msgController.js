"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMsg = exports.getMsg = void 0;
const msg_1 = require("../model/msg");
// export const getMsg = async (req: Request, res: Response) => {
//   console.log("hel");
//   console.log(req.body);
//   //   console.log(req.query);
//   try {
//     // const { userId, correspondingUserId } = req.body;
//     const { fromUser, toUser } = req.body;
//     const query = {
//       $or: [
//         { fromUser, toUser },
//         { fromUser: toUser, toUser: fromUser },
//       ],
//     };
//     const foundMessages = await MessagesTin.find(query);
//     res.status(201).json({ message: "ok", data: foundMessages });
//   } catch (error: any) {
//     res.status(500).send(error.message);
//     console.log(error);
//   }
// };
//this getMsg function works with my get request using params in my MessageService
const getMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, correspondingUserId } = req.query;
        console.log(req.query);
        const query = { fromUser: userId, toUser: correspondingUserId };
        const foundMessages = yield msg_1.MessagesTin.find(query);
        console.log(foundMessages);
        res.status(201).json({ message: "ok", data: foundMessages });
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.getMsg = getMsg;
// // Add a Message to our Database
// export const postMsg = async (req: Request, res: Response) => {
//   try {
//     const message = req.body;
//     const insertedMessage = await MessagesTin.create(message);
//     console.log("All good!");
//     return res.status(201).json({ message: "ok", data: insertedMessage });
//     // return insertedMessage;
//   } catch (error: any) {
//     console.log("Post message failed with: ", error.message);
//     res.status(500).send(error.message);
//   }
// };
const postMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, time, userId, correspondingUserId } = req.body;
        const insertedMessage = yield msg_1.MessagesTin.create({
            message: message,
            time: time,
            fromUser: userId,
            toUser: correspondingUserId,
        });
        // console.log(insertedMessage);
        console.log("All good!");
        return res.status(201).json({ message: "ok", data: insertedMessage });
    }
    catch (error) {
        console.log("Post message failed with: ", error.message);
        res.status(500).send(error.message);
    }
});
exports.postMsg = postMsg;
