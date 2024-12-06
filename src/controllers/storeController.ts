import { Request, Response } from "express";
import {
  createNewStore,
  fetchStores,
  updateStore,
} from "../services/storeServices";

export const createStoreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, merchantId, description, active } = req.body;

    if (!name || !merchantId || typeof active !== "boolean") {
      res.status(400).json({
        error: "Invalid input. Name, merchantId, and active are required.",
      });
      return;
    }

    const newStore = await createNewStore({
      name,
      merchantId,
      description,
      active,
    });
    res.status(201).json({ store: newStore });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getStoresController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { merchantId } = req.query;

    const stores = await fetchStores(merchantId as string);
    res.status(200).json({ stores });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateStoreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const storeId = req.params.id;
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({ error: "Name and description are required." });
      return;
    }

    const updatedStore = await updateStore(storeId, name, description);

    if (!updatedStore) {
      res.status(404).json({ error: "Store not found." });
      return;
    }

    res.status(200).json({ store: updatedStore });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAdminStoresController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stores = await fetchStores();
    res.status(200).json({ stores });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAdminStoreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const storeId = req.params.id;
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      res.status(400).json({ error: "Name and description are required." });
      return;
    }

    // Update the store
    const updatedStore = await updateStore(storeId, name, description);

    if (!updatedStore) {
      res.status(404).json({ error: "Store not found." });
      return;
    }

    res.status(200).json({ store: updatedStore });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
