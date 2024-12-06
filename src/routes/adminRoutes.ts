import { Router } from "express";
import { getUsers, updateUserByAdmin } from "../controllers/userController";
import {
  getAdminStoresController,
  updateAdminStoreController,
} from "../controllers/storeController";

const router = Router();

router.get("/users", getUsers);
router.patch("/users/:id", updateUserByAdmin);
router.get("/stores", getAdminStoresController);
router.patch("/stores/:id", updateAdminStoreController);

export default router;
