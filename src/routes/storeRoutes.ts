import { Router } from "express";
import {
  createStoreController,
  getStoresController,
  updateStoreController,
} from "../controllers/storeController";

const router = Router();

router.post("/merchants/stores", createStoreController);
router.get("/merchants/stores", getStoresController);
router.patch("/merchants/stores/:id", updateStoreController);

export default router;
