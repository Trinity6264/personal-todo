import CustomError from "./custom_error";
import { StatusCodes } from "http-status-codes";

class UnAuthorized extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
export default UnAuthorized;
