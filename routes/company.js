import express from "express";
import{
    getCompanyName,
    getAllCompanies
} from "../controller/company.js"

const router = express.Router();

router.get('/companyNameById/:companyId',getCompanyName);
router.get('/getAllCompanies',getAllCompanies)

export default router;