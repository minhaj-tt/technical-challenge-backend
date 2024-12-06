import db from "../db";

export type Store = {
  id?: string;
  name: string;
  merchantId: string;
  description: string;
  active: boolean;
  createdAt?: Date;
};

export const createStore = async (store: Store): Promise<Store> => {
  const query = `
    INSERT INTO stores (name, merchant_id, description, active)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    store.name,
    store.merchantId,
    store.description,
    store.active,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

export const getAllStores = async (): Promise<Store[]> => {
  const query = `
    SELECT * 
    FROM stores
    ORDER BY created_at DESC;
  `;
  const { rows } = await db.query(query);
  return rows;
};

export const getStoresByMerchant = async (
  merchantId: string
): Promise<Store[]> => {
  const query = `
    SELECT * 
    FROM stores
    WHERE merchant_id = $1
    ORDER BY created_at DESC;
  `;
  const values = [merchantId];
  const { rows } = await db.query(query, values);
  return rows;
};

// Update store by ID (only name and description)
export const updateStoreById = async (
  id: string,
  name: string,
  description: string
): Promise<Store> => {
  const query = `
    UPDATE stores
    SET name = $1, description = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [name, description, id];
  const { rows } = await db.query(query, values);
  return rows[0];
};
