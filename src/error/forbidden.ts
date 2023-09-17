import CustomError from "./custom_error";
import { StatusCodes } from "http-status-codes";

class Forbidden extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
export default Forbidden;
