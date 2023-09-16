import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const errorValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
  next();
};
