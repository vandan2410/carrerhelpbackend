import prisma from "./prismaClient.js";

const createPost = async (payload) => {
  try {
    const { title, content, authorId, companyId } = payload;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId }, 
        },
        companyName: {
          connect: { id: companyId },
        },
      },
    });

    return newPost;
  } catch (error) {
    console.log("Failed to create post", error);
    throw { notMain: true, error };
  }
};

export { createPost };
