import axios from "axios";

const UserService = {
  getUsers: () => {
    try {
      const response = axios.get(`http://localhost:3000/users`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  postUser: async (email: string, password: string, isSignUp: boolean) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/${isSignUp ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (data: object, avatar: string, userId: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/updateUser`, {
        ...data,
        avatar,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUser: async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
