import { Router } from "express";
import { getUsers, updateUserByAdmin } from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.patch("/users/:id", updateUserByAdmin);

export default router;
