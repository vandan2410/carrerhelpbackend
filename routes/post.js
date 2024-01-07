import express from "express";
import {
  authenticateUser,
  validateUserPermissions,
} from "../middleware/auth.js";

import {
  addPost,
  editPost,
  getUserPosts,
  removePost,
  getAllPosts,
  getPostByCompanyId
  
} from "../controller/post.js";
import {
  validatePayloadForEditPost,
  validatePayloadForNewPost,
} from "../middleware/post.js";

const router = express.Router();

router.post("/newPost", authenticateUser, validatePayloadForNewPost, addPost);
router.get("/userPosts/:userId", authenticateUser, getUserPosts);
router.get("/getPosts",getAllPosts);
router.get('/getPostsbyCompanyId/:companyId',getPostByCompanyId)
router.put(
  "/editPost/:postId",
  authenticateUser,
  validateUserPermissions,
  validatePayloadForEditPost,
  editPost
);
router.delete(
  "/removePost/:postId",
  authenticateUser,
  validateUserPermissions,
  removePost
);

export default router;
