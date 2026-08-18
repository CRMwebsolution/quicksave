export type FormatKind = "text" | "pdf" | "raster" | "svg";
export type FormatGroup = "Document" | "Data" | "Code" | "Image" | "Other";

export type FileFormat = {
  id: string;
  ext: string;
  label: string;
  mime: string;
  kind: FormatKind;
  group: FormatGroup;
};

export const FORMATS: FileFormat[] = [
  { id: "txt", ext: "txt", label: "Plain text", mime: "text/plain;charset=utf-8", kind: "text", group: "Document" },
  { id: "md", ext: "md", label: "Markdown", mime: "text/markdown;charset=utf-8", kind: "text", group: "Document" },
  { id: "pdf", ext: "pdf", label: "PDF", mime: "application/pdf", kind: "pdf", group: "Document" },
  { id: "html", ext: "html", label: "HTML", mime: "text/html;charset=utf-8", kind: "text", group: "Document" },
  { id: "rtf", ext: "rtf", label: "Rich text", mime: "application/rtf", kind: "text", group: "Document" },

  { id: "csv", ext: "csv", label: "CSV", mime: "text/csv;charset=utf-8", kind: "text", group: "Data" },
  { id: "tsv", ext: "tsv", label: "TSV", mime: "text/tab-separated-values;charset=utf-8", kind: "text", group: "Data" },
  { id: "json", ext: "json", label: "JSON", mime: "application/json;charset=utf-8", kind: "text", group: "Data" },
  { id: "xml", ext: "xml", label: "XML", mime: "application/xml;charset=utf-8", kind: "text", group: "Data" },
  { id: "yaml", ext: "yaml", label: "YAML", mime: "text/yaml;charset=utf-8", kind: "text", group: "Data" },
  { id: "toml", ext: "toml", label: "TOML", mime: "application/toml;charset=utf-8", kind: "text", group: "Data" },

  { id: "js", ext: "js", label: "JavaScript", mime: "text/javascript;charset=utf-8", kind: "text", group: "Code" },
  { id: "ts", ext: "ts", label: "TypeScript", mime: "text/typescript;charset=utf-8", kind: "text", group: "Code" },
  { id: "jsx", ext: "jsx", label: "JSX", mime: "text/javascript;charset=utf-8", kind: "text", group: "Code" },
  { id: "tsx", ext: "tsx", label: "TSX", mime: "text/typescript;charset=utf-8", kind: "text", group: "Code" },
  { id: "py", ext: "py", label: "Python", mime: "text/x-python;charset=utf-8", kind: "text", group: "Code" },
  { id: "rb", ext: "rb", label: "Ruby", mime: "text/x-ruby;charset=utf-8", kind: "text", group: "Code" },
  { id: "go", ext: "go", label: "Go", mime: "text/x-go;charset=utf-8", kind: "text", group: "Code" },
  { id: "rs", ext: "rs", label: "Rust", mime: "text/x-rust;charset=utf-8", kind: "text", group: "Code" },
  { id: "java", ext: "java", label: "Java", mime: "text/x-java;charset=utf-8", kind: "text", group: "Code" },
  { id: "c", ext: "c", label: "C", mime: "text/x-c;charset=utf-8", kind: "text", group: "Code" },
  { id: "cpp", ext: "cpp", label: "C++", mime: "text/x-c++;charset=utf-8", kind: "text", group: "Code" },
  { id: "cs", ext: "cs", label: "C#", mime: "text/x-csharp;charset=utf-8", kind: "text", group: "Code" },
  { id: "php", ext: "php", label: "PHP", mime: "text/x-php;charset=utf-8", kind: "text", group: "Code" },
  { id: "sh", ext: "sh", label: "Shell", mime: "text/x-sh;charset=utf-8", kind: "text", group: "Code" },
  { id: "sql", ext: "sql", label: "SQL", mime: "application/sql;charset=utf-8", kind: "text", group: "Code" },
  { id: "css", ext: "css", label: "CSS", mime: "text/css;charset=utf-8", kind: "text", group: "Code" },
  { id: "scss", ext: "scss", label: "SCSS", mime: "text/x-scss;charset=utf-8", kind: "text", group: "Code" },

  { id: "png", ext: "png", label: "PNG", mime: "image/png", kind: "raster", group: "Image" },
  { id: "jpg", ext: "jpg", label: "JPEG", mime: "image/jpeg", kind: "raster", group: "Image" },
  { id: "webp", ext: "webp", label: "WebP", mime: "image/webp", kind: "raster", group: "Image" },
  { id: "gif", ext: "gif", label: "GIF", mime: "image/gif", kind: "raster", group: "Image" },
  { id: "bmp", ext: "bmp", label: "BMP", mime: "image/bmp", kind: "raster", group: "Image" },
  { id: "ico", ext: "ico", label: "Icon", mime: "image/x-icon", kind: "raster", group: "Image" },
  { id: "svg", ext: "svg", label: "SVG", mime: "image/svg+xml;charset=utf-8", kind: "svg", group: "Image" },

  { id: "log", ext: "log", label: "Log", mime: "text/plain;charset=utf-8", kind: "text", group: "Other" },
  { id: "env", ext: "env", label: "Env", mime: "text/plain;charset=utf-8", kind: "text", group: "Other" },
  { id: "ini", ext: "ini", label: "INI", mime: "text/plain;charset=utf-8", kind: "text", group: "Other" },
  { id: "conf", ext: "conf", label: "Config", mime: "text/plain;charset=utf-8", kind: "text", group: "Other" },
  { id: "diff", ext: "diff", label: "Diff", mime: "text/x-diff;charset=utf-8", kind: "text", group: "Other" },
];

export const FORMAT_GROUPS: FormatGroup[] = ["Document", "Data", "Code", "Image", "Other"];

export const PINNED_FORMAT_IDS = ["txt", "md", "pdf", "png", "jpg", "csv", "json", "html", "py", "sh"] as const;

const BY_ID = new Map(FORMATS.map((f) => [f.id, f]));
const BY_EXT = new Map(FORMATS.map((f) => [f.ext, f]));

export function formatById(id: string): FileFormat | undefined {
  return BY_ID.get(id);
}

export function formatByExt(ext: string): FileFormat | undefined {
  return BY_EXT.get(ext.toLowerCase().replace(/^\./, ""));
}

export function sanitizeFilename(raw: string): string {
  let s = raw.trim().replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, " ");
  s = s.replace(/^\.+/, "").replace(/\.+$/, "");
  if (!s) return "untitled";
  return s.slice(0, 120);
}

export function stripMatchingExtension(name: string, ext: string): string {
  const re = new RegExp(`\\.${ext.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
  return name.replace(re, "");
}

export function buildFilename(name: string, ext: string): string {
  const clean = sanitizeFilename(stripMatchingExtension(name, ext));
  const safeExt = ext.replace(/^\./, "").replace(/[^a-zA-Z0-9]+/g, "").slice(0, 12) || "txt";
  return `${clean}.${safeExt}`;
}

export function suggestNameFromText(text: string): string {
  const line = text.split(/\r?\n/).map((l) => l.trim()).find(Boolean) ?? "";
  const cleaned = line
    .replace(/^[#/>*\-\s]+/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 48);
  return cleaned || "untitled";
}

export function detectExtInName(name: string): { base: string; ext: string } | null {
  const match = name.trim().match(/^(.*)\.([a-zA-Z0-9]{1,12})$/);
  if (!match?.[1] || !match[2]) return null;
  if (!match[1].trim()) return null;
  return { base: match[1], ext: match[2].toLowerCase() };
}

export function customFormat(ext: string): FileFormat {
  const safe = ext.replace(/^\./, "").replace(/[^a-zA-Z0-9]+/g, "").slice(0, 12) || "txt";
  return {
    id: `custom-${safe}`,
    ext: safe,
    label: `.${safe}`,
    mime: "application/octet-stream",
    kind: "text",
    group: "Other",
  };
}

export function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  return /\.(png|jpe?g|gif|webp|bmp|ico|svg)$/i.test(file.name);
}

export function byteLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
