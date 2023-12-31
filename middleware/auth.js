import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.bigCookie;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing Token" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });

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

module.exports = authenticateUser;
