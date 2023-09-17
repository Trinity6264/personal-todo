import { NextFunction, Request, Response } from "express";
import NotFound from "../error/not_found";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new NotFound(`Route ${req.originalUrl} not found`);
};
