import {
  addCompanyInfo,
  fetchCompanyInfoByName,
} from "../utils/companyCRUD.js";
import { createPost } from "../utils/postCRUD.js";
import { fetchUserByUserName } from "../utils/userCRUD.js";

export const addPost = async (req, res) => {
  try {
    const { title, content, companyName, CTC, isAnonymous, batch } = req.body;

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
      package: CTC,
      authorId,
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
