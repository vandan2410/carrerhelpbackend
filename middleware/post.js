import { Success, Error } from "../utils/responseModels.js";

export const validatePayloadForNewPost = async (req, res, next) => {
  let errs = [];
  const { title, content, companyName, CTC, isAnonymous, batch } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    errs.push("Title is invalid - expected a non empty string");
  }
  if (!content || typeof content !== "string" || content.trim() === "") {
    errs.push("Content is invalid - expected a non empty string");
  }
  if (
    !companyName ||
    typeof companyName !== "string" ||
    companyName.trim() === ""
  ) {
    errs.push("CompanyName is invalid -  expected a non empty string");
  }
  if (!CTC || typeof CTC !== "number") {
    errs.push("CTC is invalid - expected a number");
  }
  if (!isAnonymous || typeof isAnonymous !== "boolean") {
    errs.push("isAnonymous flag is invalid -  expected a boolean");
  }
  if (!batch || typeof batch !== "number") {
    errs.push("Batch is invalid - expected a number");
  }
  if (errs.length === 0) {
    next();
  } else {
    res.status(400).json(new Error(errs));
  }
};

export const validatePayloadForEditPost = async (req, res, next) => {
  let errs = [];
  const { title, content, companyName, CTC, batch } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    errs.push("Title is invalid - expected a non-empty string");
  }
  if (
    content !== undefined &&
    (typeof content !== "string" || content.trim() === "")
  ) {
    errs.push("Content is invalid - expected a non-empty string");
  }
  if (
    companyName !== undefined &&
    (typeof companyName !== "string" || companyName.trim() === "")
  ) {
    errs.push("Company Name is invalid - expected a non-empty string");
  }
  if (CTC !== undefined && typeof CTC !== "number") {
    errs.push("CTC is invalid - expected a number");
  }
  if (batch !== undefined && typeof batch !== "number") {
    errs.push("Batch is invalid - expected a number");
  }

  if (errs.length === 0) {
    next();
  } else {
    res.status(400).json(new Error(errs));
  }
};
