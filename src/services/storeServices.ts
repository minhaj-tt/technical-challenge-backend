import {
  createStore,
  getAllStores,
  getStoresByMerchant,
  Store,
  updateStoreById,
} from "../models/store";

export const createNewStore = async (storeData: Store): Promise<Store> => {
  return createStore(storeData);
};

export const fetchStores = async (merchantId?: string): Promise<Store[]> => {
  if (merchantId) {
    return getStoresByMerchant(merchantId);
  }
  return getAllStores();
};

export const updateStore = async (
  id: string,
  name: string,
  description: string
): Promise<Store> => {
  return updateStoreById(id, name, description);
};
