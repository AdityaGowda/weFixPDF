/**
 * ─────────────────────────────────────────────────────────────
 * Conversion Model — Data-access layer for the `conversions` table
 * ─────────────────────────────────────────────────────────────
 */

const db = require("../config/db.config");

const Conversion = {
  /**
   * Log a new conversion
   */
  async create({
    userId = null,
    toolName,
    sourceFormat = null,
    targetFormat = null,
    fileSizeBytes = null,
    outputSizeBytes = null,
    status = "pending",
    ipAddress = null,
    userAgent = null,
  }) {
    const [result] = await db.execute(
      `INSERT INTO conversions
        (user_id, tool_name, source_format, target_format,
         file_size_bytes, output_size_bytes, status, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, toolName, sourceFormat, targetFormat,
       fileSizeBytes, outputSizeBytes, status, ipAddress, userAgent]
    );
    return result.insertId;
  },

  /**
   * Update status & output size after processing
   */
  async complete(id, { outputSizeBytes, processingMs, status = "completed" }) {
    await db.execute(
      `UPDATE conversions
       SET status = ?, output_size_bytes = ?, processing_ms = ?
       WHERE id = ?`,
      [status, outputSizeBytes, processingMs, id]
    );
  },

  /**
   * Mark a conversion as failed
   */
  async fail(id, errorMessage) {
    await db.execute(
      `UPDATE conversions SET status = 'failed', error_message = ? WHERE id = ?`,
      [errorMessage, id]
    );
  },

  /**
   * Get conversions by user ID (paginated)
   */
  async findByUser(userId, { page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
      `SELECT * FROM conversions WHERE user_id = ?
       ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );
    return rows;
  },

  /**
   * Get recent conversions (for admin dashboard)
   */
  async findRecent(limit = 50) {
    const [rows] = await db.execute(
      `SELECT c.*, u.email AS user_email
       FROM conversions c
       LEFT JOIN users u ON c.user_id = u.id
       ORDER BY c.created_at DESC LIMIT ?`,
      [limit]
    );
    return rows;
  },

  /**
   * Count conversions by tool (for analytics)
   */
  async countByTool(startDate = null, endDate = null) {
    let sql = `SELECT tool_name, COUNT(*) AS count,
                      SUM(file_size_bytes) AS total_bytes_in,
                      SUM(output_size_bytes) AS total_bytes_out
               FROM conversions`;
    const params = [];

    if (startDate && endDate) {
      sql += " WHERE created_at BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }

    sql += " GROUP BY tool_name ORDER BY count DESC";

    const [rows] = await db.execute(sql, params);
    return rows;
  },

  /**
   * Get today's total conversion count for an IP (rate limiting)
   */
  async countTodayByIp(ipAddress) {
    const [rows] = await db.execute(
      `SELECT COUNT(*) AS count FROM conversions
       WHERE ip_address = ? AND DATE(created_at) = CURDATE()`,
      [ipAddress]
    );
    return rows[0].count;
  },
};

module.exports = Conversion;
