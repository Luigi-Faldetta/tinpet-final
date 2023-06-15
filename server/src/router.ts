import express from "express";
export const router = express.Router();
import { postUser } from "./controllers/userController";

router.post("/signup", postUser);

export default router
