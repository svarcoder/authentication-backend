import { Router } from "express";
import {
  signup,
  login,
  forgotPassword,
  updatePassword,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/update-password", updatePassword);

export default router;
