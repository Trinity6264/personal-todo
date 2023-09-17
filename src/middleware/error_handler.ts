import { NextFunction, Request, Response } from "express";
import CustomError from "../error/custom_error";
import CustomMongooseError from "../error/custom_mongoose_error";

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
  // console.log(typeof err + "Playman");
  if (err instanceof CustomError) {
    const errorResponse: ErrorResponseI = {
      data: {},
      msg: err.message,
      status: false,
    };

    return res.status(err.statusCode).json(errorResponse);
  }
  if (err instanceof CustomMongooseError) {
    const errorResponse: ErrorResponseI = {
      data: {},
      msg: err.message,
      status: false,
    };

    return res.status(err.statusCode).json(errorResponse);
  }

  console.log(err);
  

  return res.status(500).json({
    status: false,
    msg: "Something went wrong",
    data: {},
  });
};

export default errorHandler;
