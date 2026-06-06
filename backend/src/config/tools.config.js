/**
 * Shared tool configuration.
 *
 * MULTI_FILE_TOOLS — tools that accept multiple uploaded files (req.files).
 * This list is the single source of truth used by BOTH the upload middleware
 * selector (routes) and the controller's validation, so they can never drift
 * out of sync (which previously broke jpg-to-pdf).
 *
 * MAX_FILES — upper bound on files accepted for multi-file tools. Must stay in
 * sync with the frontend's per-tool maxFiles (see frontend/lib/config.ts).
 */
const MULTI_FILE_TOOLS = ["merge-pdf", "image-to-pdf", "jpg-to-pdf", "compare-pdf"];

const MAX_FILES = 20;

module.exports = { MULTI_FILE_TOOLS, MAX_FILES };
