import express from "express";
export const router = express.Router();
import {
  postUser,
  loginUser,
  getUser,
  updateMatch,
  getAllUsers,
  updateUser,
  getMatchedUsers,
} from "./controllers/userController";
import { getMsg, postMsg } from "./controllers/msgController";

router.post("/signup", postUser);
router.post("/login", loginUser);
router.get("/user/:id", getUser);
router.put("/addmatch", updateMatch);
router.put("/updateUser", updateUser);
router.get("/users", getAllUsers);
router.get("/matchedusers", getMatchedUsers);
// router.get("/matchedusers", getMatchedUsers);
router.get("/messages", getMsg);
router.post("/message", postMsg);

export default router;
