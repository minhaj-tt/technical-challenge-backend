import db from "../db";

export type User = {
  id?: string;
  email: string;
  role: "admin" | "merchant" | "customer";
  first_name: string;
  last_name: string;
  password: string;
  createdAt?: Date;
};

export const createUser = async (user: User): Promise<User> => {
  const query = `
    INSERT INTO users (email, role, first_name, last_name, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    user.email,
    user.role,
    user.first_name,
    user.last_name,
    user.password,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

export const findByEmail = async (email: string): Promise<User | null> => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const { rows } = await db.query(query, [email]);
  return rows[0] || null;
};

export const findById = async (id: string): Promise<User | null> => {
  const query = `SELECT * FROM users WHERE id = $1 AND role = 'customer';`; // Ensuring only 'customer' role
  const { rows } = await db.query(query, [id]);
  return rows[0] || null;
};

export const updateUser = async (
  id: string,
  updates: Partial<User>
): Promise<User> => {
  const { first_name, last_name } = updates;
  const query = `
    UPDATE users
    SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name)
    WHERE id = $3
    RETURNING *;
  `;
  const { rows } = await db.query(query, [first_name, last_name, id]);
  return rows[0];
};

export const updateUser_ = async (
  id: string,
  firstName?: string,
  lastName?: string,
  role?: string
): Promise<User | null> => {
  if (role && !["admin", "merchant", "customer"].includes(role)) {
    throw new Error("Invalid role");
  }

  const fieldsToUpdate: string[] = [];
  const values: any[] = [];
  let queryIndex = 1;

  if (firstName) {
    fieldsToUpdate.push(`first_name = $${queryIndex++}`);
    values.push(firstName);
  }

  if (lastName) {
    fieldsToUpdate.push(`last_name = $${queryIndex++}`);
    values.push(lastName);
  }

  if (role) {
    fieldsToUpdate.push(`role = $${queryIndex++}`);
    values.push(role);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);

  const query = `
    UPDATE users
    SET ${fieldsToUpdate.join(", ")}, updated_at = NOW()
    WHERE id = $${queryIndex}
    RETURNING id, first_name, last_name, role, created_at, updated_at;
  `;

  const { rows } = await db.query(query, values);

  return rows.length > 0 ? rows[0] : null;
};
