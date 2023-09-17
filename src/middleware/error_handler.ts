import { NextFunction, Request, Response } from "express";
import CustomError from "../error/custom_error";

interface ErrorResponseI {
  status: boolean;
  msg: string;
  data: {};
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(typeof err);
  if (err instanceof CustomError) {
    const errorResponse: ErrorResponseI = {
      data: {},
      msg: err.message,
      status: false,
    };

    return res.status(err.statusCode).json(errorResponse);
  }
};

export default errorHandler;
