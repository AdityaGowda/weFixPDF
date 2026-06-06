"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Database,
  Table as TableIcon,
  Edit3,
  Copy,
  Clipboard,
  Save,
  X,
  Plus,
  ArrowRight,
  Loader2,
  Filter,
  Trash2
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { envConfig } from "@/lib/config";
import MarkdownContent from "@/app/components/markdowncontent";

interface DbRecord {
  id: number;
  slug?: string;
  schema_key?: string;
  [key: string]: any;
}

const TABLES = ["seo_content", "tool_listings", "site_schemas"];

function getAdminKey(): string {
  if (typeof window === "undefined") return "";
  let key = localStorage.getItem("adminKey") || "";
  if (!key) {
    key = window.prompt("Enter admin API key") || "";
    if (key) localStorage.setItem("adminKey", key);
  }
  return key;
}

function adminHeaders(json = true): Record<string, string> {
  const h: Record<string, string> = { "x-admin-key": getAdminKey() };
  if (json) h["Content-Type"] = "application/json";
  return h;
}

export default function DBViewerPage() {
  const [selectedTable, setSelectedTable] = useState(TABLES[0]);
  const [slugFilter, setSlugFilter] = useState("");
  const [records, setRecords] = useState<DbRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DbRecord | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [importJson, setImportJson] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${envConfig.apiUrl}/api/admin/data/${selectedTable}`;
      if (slugFilter) {
        url += `?slug=${encodeURIComponent(slugFilter)}`;
      }
      const res = await fetch(url, { headers: adminHeaders(false) });
      const result = await res.json();
      if (result.success) {
        setRecords(result.data);
      } else {
        toast.error(result.message || "Failed to fetch records");
      }
    } catch (err) {
      toast.error("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  }, [selectedTable, slugFilter]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleUpdate = async (record: DbRecord) => {
    try {
      const res = await fetch(`${envConfig.apiUrl}/api/admin/data/${selectedTable}/${record.id}`, {
        method: "PUT",
        headers: adminHeaders(),
        body: JSON.stringify(record),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Record updated successfully");
        setEditingRecord(null);
        setActiveField(null);
        setFocusMode(false);
        fetchRecords();
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error updating record");
    }
  };

  const handleCopy = async (id: number) => {
    setIsCopying(true);
    try {
      const res = await fetch(`${envConfig.apiUrl}/api/admin/copy/${selectedTable}/${id}`, {
        method: "POST",
        headers: adminHeaders(false),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Record duplicated");
        fetchRecords();
      } else {
        toast.error(result.message || "Copy failed");
      }
    } catch (err) {
      toast.error("Error copying record");
    } finally {
      setIsCopying(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`${envConfig.apiUrl}/api/admin/data/${selectedTable}/${id}`, {
        method: "DELETE",
        headers: adminHeaders(false),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Record deleted");
        fetchRecords();
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Error deleting record");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getContentField = () => {
    if (activeField) return activeField;
    if (selectedTable === "seo_content") return "body_content";
    if (selectedTable === "tool_listings") return "description";
    if (selectedTable === "site_schemas") return "schema_data";
    return "";
  };

  const startJsonEdit = (record: DbRecord, field: string) => {
    setEditingRecord(record);
    setActiveField(field);
    setFocusMode(true);
  };

  const handleCreateNew = () => {
    const template: DbRecord = { id: 0 };
    if (selectedTable === "seo_content") {
      template.slug = "";
      template.page_type = "tool";
      template.title = "";
      template.description = "";
      template.h1 = "";
      template.is_published = 0;
    } else if (selectedTable === "tool_listings") {
      template.slug = "";
      template.name = "";
      template.description = "";
      template.is_active = 0;
      template.position = 0;
    } else if (selectedTable === "site_schemas") {
      template.schema_key = "";
      template.schema_type = "WebSite";
      template.schema_data = {};
      template.is_active = 1;
    }

    setEditingRecord(template);
    setFocusMode(false);
    setActiveField(null);
    setImportJson("");
  };

  const handleImportJson = () => {
    if (!importJson.trim()) {
      toast.error("Please paste JSON first");
      return;
    }
    try {
      const data = JSON.parse(importJson);
      if (!editingRecord) return;

      const updatedRecord = { ...editingRecord, ...data, id: editingRecord.id };

      setEditingRecord(updatedRecord);
      setImportJson("");
      toast.success("Data imported successfully. Review the fields below.");
    } catch (err: any) {
      toast.error("Invalid JSON: " + err.message);
    }
  };

  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});

  const handleSave = async (record: DbRecord) => {
    const errors: Record<string, string> = {};
    Object.entries(record).forEach(([key, value]) => {
      if (typeof value === 'string' && (value.trim().startsWith('{') || value.trim().startsWith('['))) {
        try {
          JSON.parse(value);
        } catch (e: any) {
          errors[key] = e.message;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setJsonErrors(errors);
      toast.error("Please fix JSON formatting errors before saving");
      return;
    }

    if (record.id === 0) {
      try {
        const res = await fetch(`${envConfig.apiUrl}/api/admin/data/${selectedTable}`, {
          method: "POST",
          headers: adminHeaders(),
          body: JSON.stringify(record),
        });
        const result = await res.json();
        if (result.success) {
          toast.success("Record created");
          setEditingRecord(null);
          setJsonErrors({});
          fetchRecords();
        } else {
          toast.error(result.message || "Creation failed");
        }
      } catch (err) {
        toast.error("Error creating record");
      }
    } else {
      handleUpdate(record);
    }
  };

  return (
    <div className="min-h-screen bg-surface p-6 md:p-10 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-hero mb-2">DB Data Viewer</h1>
            <p className="text-text-muted">Manage and update your database records with ease.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-xl hover:bg-blue-hover transition-all font-bold text-sm shadow-sm"
            >
              <Plus size={18} />
              Create New
            </button>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-subtle group-focus-within:text-blue transition-colors">
                <Database size={18} />
              </div>
              <select
                value={selectedTable}
                onChange={(e) => {
                  setSelectedTable(e.target.value);
                  setExpandedRow(null);
                  setActiveField(null);
                }}
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all appearance-none min-w-[180px] cursor-pointer"
              >
                {TABLES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-subtle">
                <Filter size={14} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-subtle">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder={`Filter by ${selectedTable === "site_schemas" ? "schema_key" : "slug"}...`}
              value={slugFilter}
              onChange={(e) => setSlugFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all shadow-sm"
            />
          </div>
          <button
            onClick={fetchRecords}
            disabled={loading}
            className="btn-primary w-full md:w-auto h-[48px]"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Refresh"}
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-label w-16">ID</th>
                  <th className="px-6 py-4 text-label">{selectedTable === "site_schemas" ? "Schema Key" : "Slug"}</th>
                  <th className="px-6 py-4 text-label">Preview</th>
                  <th className="px-6 py-4 text-label text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {records.length > 0 ? (
                  records.map((record) => (
                    <React.Fragment key={record.id}>
                      <tr className="hover:bg-blue-light/30 transition-colors group">
                        <td className="px-6 py-4 font-mono text-xs text-text-muted">{record.id}</td>
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-2">
                            {record.slug || record.schema_key || "-"}
                            {(record.how_to || record.faq || record.schema_data || record.how_it_works || record.features) && (
                              <button
                                onClick={() => setExpandedRow(expandedRow === record.id ? null : record.id)}
                                className="text-[10px] bg-purple-light text-purple px-1.5 py-0.5 rounded uppercase font-bold hover:bg-purple hover:text-white transition-colors"
                              >
                                {expandedRow === record.id ? "Hide" : "JSON"}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate text-sm text-text-muted italic">
                            {record.title || record.name || record.schema_type || "No preview"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingRecord(record);
                                setFocusMode(false);
                                setActiveField(null);
                              }}
                              className="p-2 hover:bg-blue-light text-blue rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                            onClick={() => handleCopy(record.id)}
                            disabled={isCopying}
                            className="p-2 hover:bg-purple-light text-purple rounded-lg transition-colors"
                            title="Duplicate"
                          >
                            <Copy size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(record, null, 2))}
                            className="p-2 hover:bg-green-chip/50 text-green-text rounded-lg transition-colors"
                            title="Copy to Clipboard"
                          >
                            <Clipboard size={18} />
                          </button>
                          </div>
                        </td>
                      </tr>
                      {expandedRow === record.id && (
                        <tr className="bg-surface/30">
                          <td colSpan={4} className="px-10 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {Object.entries(record).map(([key, value]) => {
                                if (typeof value === 'object' && value !== null || (typeof value === 'string' && (value.startsWith('{') || value.startsWith('[')))) {
                                  let displayValue = value;
                                  if (typeof value === 'string') {
                                    try { displayValue = JSON.parse(value); } catch(e) {}
                                  }
                                  return (
                                    <div key={key} className="space-y-2 group/json">
                                      <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-bold text-text-subtle uppercase tracking-widest">{key}</label>
                                        <button
                                          onClick={() => startJsonEdit(record, key)}
                                          className="text-[10px] flex items-center gap-1 text-blue font-bold opacity-0 group-hover/json:opacity-100 transition-opacity uppercase"
                                        >
                                          <Edit3 size={12} /> Edit JSON
                                        </button>
                                      </div>
                                      <pre className="bg-card border border-border p-3 rounded-lg text-xs font-mono overflow-x-auto max-h-60 shadow-inner">
                                        {JSON.stringify(displayValue, null, 2)}
                                      </pre>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-text-muted">
                      {loading ? (
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="animate-spin text-blue" size={32} />
                          <span>Fetching records...</span>
                        </div>
                      ) : (
                        "No records found."
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`bg-card w-full ${focusMode ? 'max-w-5xl' : 'max-w-3xl'} max-h-[90vh] rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col animate-in zoom-in-95 duration-200`}>
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-light text-blue rounded-lg">
                  <Edit3 size={20} />
                </div>
                <h2 className="text-xl font-bold">
                  {activeField ? `Edit JSON: ${activeField}` : `Edit Record #${editingRecord.id}`}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                {!activeField && (
                  <button
                    onClick={() => setFocusMode(!focusMode)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${focusMode ? 'bg-blue text-white border-blue' : 'bg-surface text-text-muted border-border hover:border-blue/50'}`}
                  >
                    {focusMode ? "Show All Fields" : "Edit Content Only"}
                  </button>
                )}
                {selectedTable === "seo_content" && (
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${previewMode ? 'bg-purple text-white border-purple' : 'bg-surface text-text-muted border-border hover:border-purple/50'}`}
                  >
                    {previewMode ? "Exit Preview" : "Visual Preview"}
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingRecord(null);
                    setFocusMode(false);
                    setActiveField(null);
                    setPreviewMode(false);
                  }}
                  className="p-2 hover:bg-surface rounded-full transition-colors text-text-subtle"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {previewMode ? (
                <div className="space-y-8 p-8 bg-white dark:bg-slate-950 rounded-3xl border border-border shadow-inner max-w-4xl mx-auto">
                  <div className="space-y-4 border-b border-border pb-8">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Preview Mode
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {editingRecord.h1 || editingRecord.title || "No Title Set"}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                      {editingRecord.h2 || editingRecord.description || "No description set."}
                    </p>
                  </div>

                  {editingRecord.intro && (
                    <div className="relative">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-emerald-500/30" />
                      <p className="pl-6 text-slate-600 dark:text-slate-400 italic leading-relaxed">
                        {editingRecord.intro}
                      </p>
                    </div>
                  )}

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <MarkdownContent content={editingRecord.body_content || ""} />
                  </div>

                  {editingRecord.faq && (
                    <div className="pt-8 border-t border-border space-y-6">
                      <h2 className="text-2xl font-black">FAQ Preview</h2>
                      <div className="space-y-4">
                        {(() => {
                          try {
                            const faqs = typeof editingRecord.faq === 'string' ? JSON.parse(editingRecord.faq) : editingRecord.faq;
                            return Array.isArray(faqs) ? faqs.map((f: any, i: number) => (
                              <div key={i} className="p-4 bg-surface rounded-xl border border-border">
                                <p className="font-bold text-sm mb-1">Q: {f.q}</p>
                                <p className="text-sm text-text-muted">A: {f.a}</p>
                              </div>
                            )) : null;
                          } catch(e) { return <p className="text-red-500 text-xs">Invalid FAQ JSON</p>; }
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
              {!activeField && (
                <div className="bg-blue-light/10 p-5 rounded-2xl border border-blue/20">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-blue uppercase tracking-wider flex items-center gap-2">
                      <Clipboard size={14} />
                      Bulk JSON Import
                    </label>
                    <span className="text-[10px] text-text-muted bg-surface px-2 py-0.5 rounded-full border border-border">
                      Paste full object to auto-fill fields
                    </span>
                  </div>
                  <textarea
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder='Paste your JSON data here...'
                    className="w-full bg-card border border-border rounded-xl p-3 font-mono text-xs min-h-[100px] focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all shadow-inner"
                  />
                  <button
                    onClick={handleImportJson}
                    className="mt-3 w-full bg-blue text-white py-2.5 rounded-xl hover:bg-blue-hover transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                  >
                    Apply JSON Data to Form
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {Object.keys(editingRecord)
                  .filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at')
                  .filter(k => !focusMode || k === getContentField() || k === 'slug' || k === 'schema_key')
                  .map(key => (
                  <div key={key} className="space-y-1.5">
                    <div className="flex items-center justify-between pl-1">
                      <label className="text-xs font-bold text-text-subtle uppercase tracking-wider">{key}</label>
                      <div className="flex items-center gap-2">
                        {jsonErrors[key] && (
                          <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 rounded uppercase animate-pulse">
                            Invalid JSON: {jsonErrors[key]}
                          </span>
                        )}
                        {(typeof editingRecord[key] === 'object' || (typeof editingRecord[key] === 'string' && (editingRecord[key].startsWith('{') || editingRecord[key].startsWith('[')))) && (
                          <button
                            onClick={() => {
                              try {
                                const parsed = typeof editingRecord[key] === 'string' ? JSON.parse(editingRecord[key]) : editingRecord[key];
                                setEditingRecord({...editingRecord, [key]: JSON.stringify(parsed, null, 2)});
                                setJsonErrors(prev => {
                                  const n = {...prev};
                                  delete n[key];
                                  return n;
                                });
                              } catch(e) {
                                toast.error("Cannot format invalid JSON");
                              }
                            }}
                            className="text-[10px] text-blue font-bold hover:underline"
                          >
                            Format JSON
                          </button>
                        )}
                        {typeof editingRecord[key] === 'object' && !jsonErrors[key] && (
                          <span className="text-[10px] text-purple font-bold bg-purple-light px-1.5 rounded">JSON VALIDATED</span>
                        )}
                      </div>
                    </div>
                    {key === getContentField() || (typeof editingRecord[key] === 'object' || (typeof editingRecord[key] === 'string' && (editingRecord[key].startsWith('{') || editingRecord[key].startsWith('[')))) ? (
                      <textarea
                        value={typeof editingRecord[key] === 'object' ? JSON.stringify(editingRecord[key], null, 2) : editingRecord[key] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingRecord({...editingRecord, [key]: val});

                          try {
                            JSON.parse(val);
                            setJsonErrors(prev => {
                              const n = {...prev};
                              delete n[key];
                              return n;
                            });
                          } catch (err: any) {
                          }
                        }}
                        className={`w-full bg-surface border rounded-xl p-3 font-mono text-sm focus:ring-2 focus:ring-blue/20 outline-none transition-all ${jsonErrors[key] ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-border focus:border-blue'} ${focusMode && key === getContentField() ? 'min-h-[400px]' : 'min-h-[120px]'}`}
                      />
                    ) : (
                      <input
                        type={typeof editingRecord[key] === 'number' ? 'number' : 'text'}
                        value={editingRecord[key] || ""}
                        onChange={(e) => setEditingRecord({...editingRecord, [key]: e.target.value})}
                        className="w-full bg-surface border border-border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none"
                      />
                    )}
                  </div>
                ))}
                </div>
              </>
            )}
          </div>

            <div className="p-6 border-t border-border flex items-center justify-between bg-surface/30">
              <div className="flex items-center gap-4">
                {editingRecord.slug && selectedTable === "seo_content" && (
                  <a
                    href={`/tools/${editingRecord.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-blue hover:text-blue-hover transition-colors font-black uppercase tracking-wider group"
                  >
                    <span>View Live Page</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingRecord(null);
                    setPreviewMode(false);
                  }}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave(editingRecord)}
                  className="btn-primary"
                >
                  <Save size={18} />
                  {editingRecord.id === 0 ? "Create Record" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in-95 {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation-duration: 200ms;
          animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          animation-fill-mode: forwards;
        }
        .fade-in { animation-name: fade-in; }
        .zoom-in-95 { animation-name: zoom-in-95; }
      `}</style>
    </div>
  );
}
