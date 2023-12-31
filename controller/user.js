import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../utils/prismaClient.js";
dotenv.config();

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const result = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });
    delete result?.password;
    const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET);
    res.cookie("bigCookie", { token }, { httpOnly: true });
    res.status(201).json({ message: "Success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email: String(email) },
    });

    if (!user) {
      res.status(404).json({ message: "User doesn't exist" });
      return;
    }

    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    delete user?.password;

    const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET);
    res.cookie("bigCookie", { token }, { httpOnly: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to authenticate user" });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("bigCookie");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};
