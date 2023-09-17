import { loginUser, createUserAccount } from "../controller/user_controller";
import {
  loginValidation,
  signUpValidation,
} from "../middleware/data_validation";
import { errorValidation } from "../middleware/error_validation";
import { Router } from "express";

const router = Router();

router.route("/login").post(loginValidation, errorValidation, loginUser);
router
  .route("/create")
  .post(signUpValidation, errorValidation, createUserAccount);

export default router;
