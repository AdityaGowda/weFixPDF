export type CompressionLevel = "high" | "medium" | "low";

export interface ToolConfig {
  service: string;
  isMulti: boolean;
  maxFiles: number;
  acceptedTypes: string[];
  maxFileSizeMb: number;
  verb: string;
  result: string;
}
