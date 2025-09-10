// backend/routes/user.routes.js
import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  currentUser,
  logoutUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyEmail); 
router.get("/current-user", currentUser);
router.post("/logout", logoutUser);

export default router;
