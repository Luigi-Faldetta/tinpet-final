import axios from "axios";

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
  postMsg: async (message: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/message`, {
        message: message,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default MessageService;
