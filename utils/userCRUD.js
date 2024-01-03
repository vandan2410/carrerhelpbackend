import prisma from "./prismaClient.js";

const fetchUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch userData", error);
    throw { notMain: true, error };
  }
};

const fetchUserByUserName = async (userName) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch userData", error);
    throw { notMain: true, error };
  }
};

export {
  fetchUserById,
  fetchUserByUserName
};
