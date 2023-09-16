import { getAllUsers,createUser } from "../controller/user_controller";
import { signUpValidation} from "../middleware/data_validation";
import { errorValidation} from "../middleware/error_validation";
import { Router } from "express";

const router = Router();

router.get("/", getAllUsers);
router.route("/create").post(signUpValidation, errorValidation, createUser);

export default router;
