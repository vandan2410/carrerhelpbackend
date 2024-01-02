import prisma from "./prismaClient.js";

const addCompanyInfo = async (companyName) => {
  try {
    const result = await prisma.company.create({
      data: {
        name: companyName,
      },
    });

    return result;
  } catch (error) {
    console.log("Error in adding the company", error);
    throw { notMain: true, error };
  }
};

const fetchCompanyInfoByName = async (companyName) => {
  try {
    const companyInfo = await prisma.company.findFirst({
      where: {
        name: {
          equals: companyName,
          mode: "insensitive",
        },
      },
    });

    return companyInfo;
  } catch (error) {
    console.log("Error in fetching the company info", error);
    throw { notMain: true, error };
  }
};

export { addCompanyInfo, fetchCompanyInfoByName };
