import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient.js";
import { fetchUserById } from "../utils/userCRUD.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing Token" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await fetchUserById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const validateUserPermissions = async (req, res, next) => {
  try {
    const token = req.cookies.bigCookie.toString();
    const postId = req.params.postId;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing Token" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Invalid postId" });
    }

    if (post.authorId != decodedToken.userId) {
      return res.status(401).json({
        message: "Unauthorized - users are only allowed to edit their own post",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
