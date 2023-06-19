import axios from "axios";

const MessageService = {
  getMsg: async (userOneId: string, userTwoId: string) => {
    try {
      const response = await axios.get("http://localhost:3000/messages", {
        params: { userId: userOneId, correspondingUserId: userTwoId },
      });
      console.log(response.data.data);
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
      //   console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default MessageService;
