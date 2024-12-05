import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/userController";

const router = Router();

router.get("/me", getProfile);
router.patch("/me", updateProfile);

export default router;
