/**
 * SQL identifier safety helpers.
 *
 * Column/table names cannot be passed as prepared-statement parameters, so when
 * they come from request data they must be validated to prevent SQL injection.
 * We allow only plain identifiers ([A-Za-z0-9_]) and always wrap in backticks.
 */
const IDENT_RE = /^[A-Za-z0-9_]+$/;

function isValidIdentifier(name) {
  return typeof name === "string" && IDENT_RE.test(name);
}

/**
 * Validates every key is a safe column name and returns them backtick-quoted.
 * Throws a 400 error if any key is unsafe.
 */
function quoteColumns(cols) {
  return cols.map((c) => {
    if (!isValidIdentifier(c)) {
      const err = new Error(`Invalid column name: ${c}`);
      err.statusCode = 400;
      throw err;
    }
    return `\`${c}\``;
  });
}

module.exports = { isValidIdentifier, quoteColumns };
