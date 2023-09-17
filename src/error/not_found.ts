import { StatusCodes } from "http-status-codes";
import CustomError from "./custom_error";
class NotFound extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
export default NotFound;
