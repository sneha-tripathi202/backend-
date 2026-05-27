import express from "express";
import { registerUser, loginUser} from "../controllers/user.controller.js";
import verifyApiKey from "../middlewares/verifyApiKey.js";
const router= express.Router();

router.post('/register',verifyApiKey,registerUser)
router.post('/login',verifyApiKey,loginUser)
export default router;