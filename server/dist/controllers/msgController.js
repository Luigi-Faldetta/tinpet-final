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
const getMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const foundMessages = yield msg_1.MessagesTin.find(query);
        res.status(201).json({ message: "ok", data: foundMessages });
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.getMsg = getMsg;
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
const postMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = req.body;
        const insertedMessage = yield msg_1.MessagesTin.create(message);
        console.log("All good!");
        return res.status(201).json({ message: "ok", data: insertedMessage });
        // return insertedMessage;
    }
    catch (error) {
        console.log("Post message failed with: ", error.message);
        res.status(500).send(error.message);
    }
});
exports.postMsg = postMsg;
