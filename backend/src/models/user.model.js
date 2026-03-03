/**
 * ─────────────────────────────────────────────────────────────
 * User Model — Data-access layer for the `users` table
 * ─────────────────────────────────────────────────────────────
 */

const db = require("../config/db.config");

const User = {
  /**
   * Create a new user
   */
  async create({ email, passwordHash, fullName = null, role = "free" }) {
    const [result] = await db.execute(
      `INSERT INTO users (email, password_hash, full_name, role)
       VALUES (?, ?, ?, ?)`,
      [email, passwordHash, fullName, role]
    );
    return result.insertId;
  },

  /**
   * Find user by ID
   */
  async findById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Find user by email
   */
  async findByEmail(email) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  },

  /**
   * Update user profile
   */
  async update(id, fields) {
    const allowed = ["full_name", "avatar_url", "role", "is_verified"];
    const sets = [];
    const values = [];

    for (const [key, val] of Object.entries(fields)) {
      if (allowed.includes(key)) {
        sets.push(`${key} = ?`);
        values.push(val);
      }
    }

    if (sets.length === 0) return false;

    values.push(id);
    await db.execute(
      `UPDATE users SET ${sets.join(", ")} WHERE id = ?`,
      values
    );
    return true;
  },

  /**
   * Delete user
   */
  async delete(id) {
    const [result] = await db.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = User;
