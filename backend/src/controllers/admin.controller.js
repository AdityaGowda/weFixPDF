const db = require("../config/db.config");
const { quoteColumns } = require("../utils/sqlIdentifier");

/**
 * Admin Controller for generic DB operations
 */

const ALLOWED_TABLES = ["seo_content", "tool_listings", "site_schemas"];

async function getTables(req, res, next) {
  try {
    res.json({ success: true, tables: ALLOWED_TABLES });
  } catch (err) {
    next(err);
  }
}

async function getTableData(req, res, next) {
  try {
    const { table } = req.params;
    const { slug, page_type } = req.query;

    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({ success: false, message: "Invalid table" });
    }

    let query = `SELECT * FROM \`${table}\``;
    const params = [];

    const conditions = [];
    if (slug) {
      const slugCol = table === "site_schemas" ? "schema_key" : "slug";
      conditions.push(`${slugCol} = ?`);
      params.push(slug);
    }
    if (page_type && table === "seo_content") {
      conditions.push(`page_type = ?`);
      params.push(page_type);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += " ORDER BY id ASC LIMIT 100";

    const [rows] = await db.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function createRecord(req, res, next) {
  try {
    const { table } = req.params;
    const data = req.body;

    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({ success: false, message: "Invalid table" });
    }

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    // Stringify JSON fields or validate JSON strings
    for (const key in data) {
      if (typeof data[key] === "object" && data[key] !== null) {
        data[key] = JSON.stringify(data[key]);
      } else if (typeof data[key] === "string" && (data[key].trim().startsWith("{") || data[key].trim().startsWith("["))) {
        // It looks like JSON, let's validate it
        try {
          JSON.parse(data[key]);
        } catch (e) {
          return res.status(400).json({ 
            success: false, 
            message: `Invalid JSON format in field "${key}": ${e.message}` 
          });
        }
      }
    }

    const cols = Object.keys(data);
    const quoted = quoteColumns(cols); // validates + backtick-quotes (anti-injection)
    const placeholders = cols.map(() => "?").join(", ");
    const values = cols.map(c => data[c]);

    const [result] = await db.execute(
      `INSERT INTO \`${table}\` (${quoted.join(", ")}) VALUES (${placeholders})`,
      values
    );

    res.status(201).json({ success: true, message: "Record created", id: result.insertId });
  } catch (err) {
    next(err);
  }
}

async function updateRecord(req, res, next) {
  try {
    const { table, id } = req.params;
    const data = req.body;

    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({ success: false, message: "Invalid table" });
    }

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    const cols = Object.keys(data);
    if (cols.length === 0) {
      return res.status(400).json({ success: false, message: "No data to update" });
    }

    // Stringify JSON fields or validate JSON strings
    for (const key in data) {
      if (typeof data[key] === "object" && data[key] !== null) {
        data[key] = JSON.stringify(data[key]);
      } else if (typeof data[key] === "string" && (data[key].trim().startsWith("{") || data[key].trim().startsWith("["))) {
        // It looks like JSON, let's validate it
        try {
          JSON.parse(data[key]);
        } catch (e) {
          return res.status(400).json({ 
            success: false, 
            message: `Invalid JSON format in field "${key}": ${e.message}` 
          });
        }
      }
    }

    const sets = quoteColumns(cols).map(c => `${c} = ?`).join(", "); // validated cols
    const values = cols.map(c => data[c]);
    values.push(id);

    await db.execute(`UPDATE \`${table}\` SET ${sets} WHERE id = ?`, values);
    res.json({ success: true, message: "Record updated" });
  } catch (err) {
    next(err);
  }
}

async function copyRecord(req, res, next) {
  try {
    const { table, id } = req.params;

    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({ success: false, message: "Invalid table" });
    }

    const [rows] = await db.execute(`SELECT * FROM \`${table}\` WHERE id = ?`, [parseInt(id, 10)]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    const record = rows[0];
    delete record.id;
    delete record.created_at;
    delete record.updated_at;

    // Modify slug to avoid unique constraint if applicable
    if (record.slug) {
      record.slug = `${record.slug}-copy-${Date.now()}`;
    } else if (record.schema_key) {
      record.schema_key = `${record.schema_key}-copy-${Date.now()}`;
    }

    const cols = Object.keys(record);
    const placeholders = cols.map(() => "?").join(", ");
    const values = cols.map(c => record[c]);

    const [result] = await db.execute(
      `INSERT INTO \`${table}\` (${cols.join(", ")}) VALUES (${placeholders})`,
      values
    );

    res.json({ success: true, message: "Record copied", newId: result.insertId });
  } catch (err) {
    next(err);
  }
}

async function deleteRecord(req, res, next) {
  try {
    const { table, id } = req.params;
    console.log(`[Admin] Attempting to delete from ${table}, ID: ${id}`);

    if (!ALLOWED_TABLES.includes(table)) {
      console.error(`[Admin] Invalid table attempted: ${table}`);
      return res.status(400).json({ success: false, message: "Invalid table" });
    }

    const [result] = await db.execute(`DELETE FROM \`${table}\` WHERE id = ?`, [parseInt(id, 10)]);
    console.log(`[Admin] Delete result:`, result);
    
    res.json({ success: true, message: "Record deleted" });
  } catch (err) {
    console.error(`[Admin] Delete error:`, err);
    next(err);
  }
}

module.exports = {
  getTables,
  getTableData,
  updateRecord,
  copyRecord,
  deleteRecord,
  createRecord
};
