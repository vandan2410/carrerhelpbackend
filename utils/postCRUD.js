import prisma from "./prismaClient.js";

const createPost = async (payload) => {
  try {
    const { title, content, authorId, companyId, batch, ctc } = payload;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        batch,
        ctc,
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

const fetchUserPosts = async (userId) => {
  try {
    const userPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    return userPosts;
  } catch (error) {
    console.log("Failed to fetch posts for the given user", error);
    throw { notMain: true, error };
  }
};

const updatePost = async (postId, payload) => {
  try {
    const dynamicPayload = {
      ...payload,
    };
    if (payload.companyName) {
      dynamicPayload.companyName = {
        connectOrCreate: {
          where: { name: payload.companyName },
          create: { name: payload.companyName },
        },
      };
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: dynamicPayload,
    });

    return updatedPost;
  } catch (error) {
    console.log("Failed to update given post", error);
    throw { notMain: true, error };
  }
};

const deletePost = async (postId) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return deletedPost;
  } catch (error) {
    console.log("Failed to delete given post", error);
    throw { notMain: true, error };
  }
};

const fetchPostInfoByCompanyId = async (companyId) => {
  try {
    const compId = Number(companyId);
    const postInfo = await prisma.post.findMany({
      where: {
        companyId: compId,
      },
    });

    return postInfo;
  } catch (error) {
    console.log("Error in fetching the company name", error);
    throw { notMain: true, error };
  }
};

const fetchPostDetailsWithCompanyName = async (postId) => {
  try {
    const postDetails = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        companyName: {
          select: {
            name: true,
          },
        },
        
      },
    });

    return postDetails;
  } catch (error) {
    console.error('Error fetching post details:', error);
    throw error;
  }
}
export { createPost, fetchUserPosts, updatePost, deletePost  ,fetchPostInfoByCompanyId ,fetchPostDetailsWithCompanyName } ;
