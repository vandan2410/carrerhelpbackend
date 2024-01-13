import prisma from "../utils/prismaClient.js";
import { Error, Success } from "../utils/responseModels.js";


import {
    
    fetchCompanyInfoById,
    fetchAllCompanies,
  } from "../utils/companyCRUD.js";

export const getCompanyName = async (req ,res) =>{
    try{
      let companyName = await fetchCompanyInfoById(req.params.companyId);
      
      res
      .status(200)
      .json(new Success("Successfully fetched",companyName));
  
    }catch(error){
      console.log(error);
      res.status(500).json(new Error("Failed to fetch all post"));
    }
  }

  export const getAllCompanies = async (req ,res) =>{
    try{
      let allCompanies = await fetchAllCompanies();
      
      res
      .status(200)
      .json(new Success("Successfully fetched",allCompanies));
  
    }catch(error){
      console.log(error);
      res.status(500).json(new Error("Failed to fetch all Companies"));
    }
  }