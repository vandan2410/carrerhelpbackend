import {
  addCompanyInfo,
  fetchCompanyInfoByName,
} from "../utils/companyCRUD.js";
import {
  createPost,
  fetchUserPosts,
  deletePost,
  updatePost,
  
  fetchPostInfoByCompanyId,
} from "../utils/postCRUD.js";
import { Success, Error } from "../utils/responseModels.js";
import { fetchUserByUserName } from "../utils/userCRUD.js";

export const addPost = async (req, res) => {
  try {
    const { title, content, companyName, ctc, isAnonymous, batch } = req.body;

    let companyInfo = await fetchCompanyInfoByName(companyName);

    if (!companyInfo) {
      companyInfo = await addCompanyInfo(companyName);
    }

    const anonymousUser = await fetchUserByUserName("Anonymous");

    const authorId = isAnonymous ? anonymousUser.id : req.user.id;

    const payload = {
      title,
      content,
      batch,
      ctc,
      authorId,
      companyId: companyInfo.id,
    };

    const result = await createPost(payload);

    res.status(201).json(new Success("Post was added Successfully", result));
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error("Failed to add post"));
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    let userPostList = await fetchUserPosts(userId);

    res
      .status(200)
      .json(new Success("Successfully fetched user posts", userPostList));
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error("Failed to fetch posts for the given user"));
  }
};

export const editPost = async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    const updatedPost = await updatePost(postId, req.body);

    res
      .status(200)
      .json(new Success("Successfully updated given post", updatedPost));
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error("Failed to edit given post"));
  }
};

export const removePost = async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    let deletedPost = await deletePost(postId);

    res
      .status(200)
      .json(new Success("Successfully deleted given post", deletedPost));
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error("Failed to delete given post"));
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let allPosts = await fetchAllPosts();

    res.status(200).json(new Success("Successfully fetched", allPosts));
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error("Failed to fetch all post"));
  }
};

export const getPostByCompanyId = async (req, res) => {
  try {
    const companyId = Number(req.params.companyId);
    let allPosts = await fetchPostInfoByCompanyId(companyId);
    res.status(200).json(new Success("Successfully fetched", allPosts));
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error("Failed to fetch all post"));
  }
};
