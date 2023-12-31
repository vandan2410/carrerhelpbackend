import express from "express";
import { loginUser, registerUser ,logoutUser} from "../controller/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);

export default router;
