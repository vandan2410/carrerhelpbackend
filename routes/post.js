import express from "express";
import {
  authenticateUser,
  validateUserPermissions,
} from "../middleware/auth.js";

import { addPost } from "../controller/post.js";

const router = express.Router();

router.post("/newPost", authenticateUser, addPost);
// router.put(
//   "/editPost/:postId",
//   authenticateUser,
//   validateUserPermissions,
//   editPost
// );
// router.delete(
//   "/removePost/:postId",
//   authenticateUser,
//   validateUserPermissions,
//   removePost
// );

export default router;
