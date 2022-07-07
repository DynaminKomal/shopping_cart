import express from "express";
import { loginUser, getAllUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/user_controller.js'


const UserRouter = express.Router();

UserRouter.get("/", getAllUser);
UserRouter.post("/registration",registerUser);
UserRouter.post("/login",loginUser);
UserRouter.get("/profile/:id",getUserProfile).put(updateUserProfile);






export default UserRouter