import  { Router } from "express";
import refreshToken from "../controller/token_controller";
import { refreshTokenValidation } from "../middleware/data_validation";
import { errorValidation } from "../middleware/error_validation";

const router = Router();

router.post("/create", refreshTokenValidation, errorValidation, refreshToken);

export default router;
