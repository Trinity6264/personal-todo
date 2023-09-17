import CustomError from "./custom_error";
import { StatusCodes } from "http-status-codes";
class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
export default BadRequest;
