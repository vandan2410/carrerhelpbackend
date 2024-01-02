import prisma from "../utils/prismaClient.js";
import { addCompanyInfo, fetchCompanyInfoByName } from "../utils/companyCRUD.js";
import { createPost } from "../utils/postCRUD.js";

export const addPost = async (req, res) => {
  try {
    const { title, content, companyName } = req.body;

    let companyInfo = await fetchCompanyInfoByName(companyName);

    if (!companyInfo) {
      companyInfo = await addCompanyInfo(companyName);
    }

    const payload = {
      title,
      content,
      authorId: req.user.id,
      companyId: companyInfo.id,
    };

    const result = await createPost(payload);

    res
      .status(201)
      .json({ message: "Post was added Successfully", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add the post" });
  }
};
