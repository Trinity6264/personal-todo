import { StatusCodes } from "http-status-codes";
import { MongooseError } from "mongoose";

class CustomMongooseError extends MongooseError {

  statusCode: number = StatusCodes.BAD_REQUEST;
  constructor(msg: string) {
    super(msg);
  }
}

export default CustomMongooseError;



 