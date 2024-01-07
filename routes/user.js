import express from "express";
import { loginUser, registerUser ,logoutUser ,getUserdetails } from "../controller/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);
router.get("/userDetails/:userId",getUserdetails)
export default router;
