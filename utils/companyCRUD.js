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

const fetchCompanyInfoById = async (companyId) => {
  try {
    const compId = Number(companyId);
    const companyInfo = await prisma.company.findUnique({
      where: {
        id: compId,
      },
    });

    return companyInfo;
  } catch (error) {
    console.log("Error in fetching the company name", error);
    throw { notMain: true, error };
  }
};

const fetchAllCompanies = async () =>{
  try{
    const companies=await prisma.company.findMany({
      orderBy: [
        {
          name: 'asc',
        }
      ]
    });
    return companies;

  } catch(error){
    console.log("Error in fetching the all companies", error);
    throw { notMain: true, error };
  }
}

export { addCompanyInfo, fetchCompanyInfoByName, fetchCompanyInfoById , fetchAllCompanies};
