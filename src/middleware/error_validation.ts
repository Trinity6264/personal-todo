import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import BadRequest from "../error/bad_request";

export const errorValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new BadRequest(result.array()[0].msg);
  }
  next();
};
