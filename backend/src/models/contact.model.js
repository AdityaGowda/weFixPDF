/**
 * ─────────────────────────────────────────────────────────────
 * Contact Model — Data-access layer for the `contacts` table
 * ─────────────────────────────────────────────────────────────
 */

const db = require("../config/db.config");

const Contact = {
  /**
   * Save a new contact/feedback message
   */
  async create({ name, email, subject = null, message }) {
    const [result] = await db.execute(
      `INSERT INTO contacts (name, email, subject, message)
       VALUES (?, ?, ?, ?)`,
      [name, email, subject, message]
    );
    return result.insertId;
  },

  /**
   * Get all messages (paginated, newest first)
   */
  async findAll({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
      `SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  },

  /**
   * Get unread messages
   */
  async findUnread() {
    const [rows] = await db.execute(
      "SELECT * FROM contacts WHERE is_read = 0 ORDER BY created_at DESC"
    );
    return rows;
  },

  /**
   * Mark a message as read
   */
  async markRead(id) {
    await db.execute(
      "UPDATE contacts SET is_read = 1 WHERE id = ?",
      [id]
    );
  },

  /**
   * Delete a message
   */
  async delete(id) {
    const [result] = await db.execute(
      "DELETE FROM contacts WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = Contact;
