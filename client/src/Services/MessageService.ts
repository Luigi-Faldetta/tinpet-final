import axios from "axios";
import { io } from "socket.io-client";
const URL = "http://localhost:3333";

export const socket = io(URL);
// const socket = io(URL);

const MessageService = {
  getMsg: async (userOneId: string, userTwoId: string) => {
    try {
      const response = await axios.get("http://localhost:3000/messages", {
        params: { userId: userOneId, correspondingUserId: userTwoId },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  postMsg: async (
    message: string,
    time: string,
    userOneId: string,
    userTwoId: string
  ) => {
    try {
      const response = await axios.post(`http://localhost:3000/message`, {
        message: message,
        time: time,
        userId: userOneId,
        correspondingUserId: userTwoId,
      });

      // socket.emit("newMessage");

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default MessageService;
