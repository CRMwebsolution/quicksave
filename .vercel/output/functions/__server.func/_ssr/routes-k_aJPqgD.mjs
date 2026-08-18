import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { a as FileUp, c as Check, i as Image$1, o as Download, r as Search, s as ChevronDown, t as X } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, r as cn, t as Button } from "./site-header-D0lzySGA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-k_aJPqgD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-sm bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-[var(--shadow-border-hover)] focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-10 shrink-0 items-center rounded-full bg-raised shadow-[var(--shadow-border)] transition-[background-color,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 data-[state=checked]:bg-accent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-muted transition-transform duration-150 data-[state=checked]:translate-x-4 data-[state=checked]:bg-accent-fg" })
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full resize-none rounded-md bg-transparent px-4 py-4 font-mono text-sm leading-relaxed text-fg outline-none placeholder:text-subtle disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
var FORMATS = [
	{
		id: "txt",
		ext: "txt",
		label: "Plain text",
		mime: "text/plain;charset=utf-8",
		kind: "text",
		group: "Document"
	},
	{
		id: "md",
		ext: "md",
		label: "Markdown",
		mime: "text/markdown;charset=utf-8",
		kind: "text",
		group: "Document"
	},
	{
		id: "pdf",
		ext: "pdf",
		label: "PDF",
		mime: "application/pdf",
		kind: "pdf",
		group: "Document"
	},
	{
		id: "html",
		ext: "html",
		label: "HTML",
		mime: "text/html;charset=utf-8",
		kind: "text",
		group: "Document"
	},
	{
		id: "rtf",
		ext: "rtf",
		label: "Rich text",
		mime: "application/rtf",
		kind: "text",
		group: "Document"
	},
	{
		id: "csv",
		ext: "csv",
		label: "CSV",
		mime: "text/csv;charset=utf-8",
		kind: "text",
		group: "Data"
	},
	{
		id: "tsv",
		ext: "tsv",
		label: "TSV",
		mime: "text/tab-separated-values;charset=utf-8",
		kind: "text",
		group: "Data"
	},
	{
		id: "json",
		ext: "json",
		label: "JSON",
		mime: "application/json;charset=utf-8",
		kind: "text",
		group: "Data"
	},
	{
		id: "xml",
		ext: "xml",
		label: "XML",
		mime: "application/xml;charset=utf-8",
		kind: "text",
		group: "Data"
	},
	{
		id: "yaml",
		ext: "yaml",
		label: "YAML",
		mime: "text/yaml;charset=utf-8",
		kind: "text",
		group: "Data"
	},
	{
		id: "toml",
		ext: "toml",
		label: "TOML",
		mime: "application/toml;charset=utf-8",
		kind: "text",
		group: "Data"
	},
	{
		id: "js",
		ext: "js",
		label: "JavaScript",
		mime: "text/javascript;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "ts",
		ext: "ts",
		label: "TypeScript",
		mime: "text/typescript;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "jsx",
		ext: "jsx",
		label: "JSX",
		mime: "text/javascript;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "tsx",
		ext: "tsx",
		label: "TSX",
		mime: "text/typescript;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "py",
		ext: "py",
		label: "Python",
		mime: "text/x-python;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "rb",
		ext: "rb",
		label: "Ruby",
		mime: "text/x-ruby;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "go",
		ext: "go",
		label: "Go",
		mime: "text/x-go;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "rs",
		ext: "rs",
		label: "Rust",
		mime: "text/x-rust;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "java",
		ext: "java",
		label: "Java",
		mime: "text/x-java;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "c",
		ext: "c",
		label: "C",
		mime: "text/x-c;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "cpp",
		ext: "cpp",
		label: "C++",
		mime: "text/x-c++;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "cs",
		ext: "cs",
		label: "C#",
		mime: "text/x-csharp;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "php",
		ext: "php",
		label: "PHP",
		mime: "text/x-php;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "sh",
		ext: "sh",
		label: "Shell",
		mime: "text/x-sh;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "sql",
		ext: "sql",
		label: "SQL",
		mime: "application/sql;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "css",
		ext: "css",
		label: "CSS",
		mime: "text/css;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "scss",
		ext: "scss",
		label: "SCSS",
		mime: "text/x-scss;charset=utf-8",
		kind: "text",
		group: "Code"
	},
	{
		id: "png",
		ext: "png",
		label: "PNG",
		mime: "image/png",
		kind: "raster",
		group: "Image"
	},
	{
		id: "jpg",
		ext: "jpg",
		label: "JPEG",
		mime: "image/jpeg",
		kind: "raster",
		group: "Image"
	},
	{
		id: "webp",
		ext: "webp",
		label: "WebP",
		mime: "image/webp",
		kind: "raster",
		group: "Image"
	},
	{
		id: "gif",
		ext: "gif",
		label: "GIF",
		mime: "image/gif",
		kind: "raster",
		group: "Image"
	},
	{
		id: "bmp",
		ext: "bmp",
		label: "BMP",
		mime: "image/bmp",
		kind: "raster",
		group: "Image"
	},
	{
		id: "ico",
		ext: "ico",
		label: "Icon",
		mime: "image/x-icon",
		kind: "raster",
		group: "Image"
	},
	{
		id: "svg",
		ext: "svg",
		label: "SVG",
		mime: "image/svg+xml;charset=utf-8",
		kind: "svg",
		group: "Image"
	},
	{
		id: "log",
		ext: "log",
		label: "Log",
		mime: "text/plain;charset=utf-8",
		kind: "text",
		group: "Other"
	},
	{
		id: "env",
		ext: "env",
		label: "Env",
		mime: "text/plain;charset=utf-8",
		kind: "text",
		group: "Other"
	},
	{
		id: "ini",
		ext: "ini",
		label: "INI",
		mime: "text/plain;charset=utf-8",
		kind: "text",
		group: "Other"
	},
	{
		id: "conf",
		ext: "conf",
		label: "Config",
		mime: "text/plain;charset=utf-8",
		kind: "text",
		group: "Other"
	},
	{
		id: "diff",
		ext: "diff",
		label: "Diff",
		mime: "text/x-diff;charset=utf-8",
		kind: "text",
		group: "Other"
	}
];
var FORMAT_GROUPS = [
	"Document",
	"Data",
	"Code",
	"Image",
	"Other"
];
var PINNED_FORMAT_IDS = [
	"txt",
	"md",
	"pdf",
	"png",
	"jpg",
	"csv",
	"json",
	"html",
	"py",
	"sh"
];
var BY_ID = new Map(FORMATS.map((f) => [f.id, f]));
var BY_EXT = new Map(FORMATS.map((f) => [f.ext, f]));
function formatById(id) {
	return BY_ID.get(id);
}
function formatByExt(ext) {
	return BY_EXT.get(ext.toLowerCase().replace(/^\./, ""));
}
function sanitizeFilename(raw) {
	let s = raw.trim().replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, " ");
	s = s.replace(/^\.+/, "").replace(/\.+$/, "");
	if (!s) return "untitled";
	return s.slice(0, 120);
}
function stripMatchingExtension(name, ext) {
	const re = new RegExp(`\\.${ext.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
	return name.replace(re, "");
}
function buildFilename(name, ext) {
	return `${sanitizeFilename(stripMatchingExtension(name, ext))}.${ext.replace(/^\./, "").replace(/[^a-zA-Z0-9]+/g, "").slice(0, 12) || "txt"}`;
}
function suggestNameFromText(text) {
	return (text.split(/\r?\n/).map((l) => l.trim()).find(Boolean) ?? "").replace(/^[#/>*\-\s]+/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase().slice(0, 48) || "untitled";
}
function detectExtInName(name) {
	const match = name.trim().match(/^(.*)\.([a-zA-Z0-9]{1,12})$/);
	if (!match?.[1] || !match[2]) return null;
	if (!match[1].trim()) return null;
	return {
		base: match[1],
		ext: match[2].toLowerCase()
	};
}
function customFormat(ext) {
	const safe = ext.replace(/^\./, "").replace(/[^a-zA-Z0-9]+/g, "").slice(0, 12) || "txt";
	return {
		id: `custom-${safe}`,
		ext: safe,
		label: `.${safe}`,
		mime: "application/octet-stream",
		kind: "text",
		group: "Other"
	};
}
function isImageFile(file) {
	if (file.type.startsWith("image/")) return true;
	return /\.(png|jpe?g|gif|webp|bmp|ico|svg)$/i.test(file.name);
}
function byteLabel(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
var LETTER_W = 612;
var LETTER_H = 792;
var PDF_SCALE = 2;
var MAX_RASTER = 8192;
var MAX_TEXT_IMAGE_HEIGHT = 14e3;
var PAPER = {
	light: {
		bg: "#f4f3ee",
		fg: "#1a1a1c",
		muted: "#6d6d76"
	},
	dark: {
		bg: "#111113",
		fg: "#e8e6e1",
		muted: "#8b8b94"
	}
};
function triggerDownload(blob, filename) {
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.rel = "noopener";
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 2500);
}
async function buildExport(input) {
	const filename = buildFilename(input.name, input.format.ext);
	return {
		blob: await encodeBlob(input),
		filename
	};
}
async function encodeBlob(input) {
	const { format, text, image, paper } = input;
	if (image) switch (format.kind) {
		case "pdf": return imageToPdf(image, paper);
		case "svg": return imageToSvg(image);
		case "raster": return convertImage(image, format);
		case "text": return new Blob([await imageToDataUrl(image, "image/png")], { type: format.mime });
	}
	switch (format.kind) {
		case "pdf": return textToPdf(text, paper, input.name);
		case "svg": return textToSvg(text, paper);
		case "raster": return textToRaster(text, format, paper);
		case "text": return new Blob([prepareText(text, format.ext)], { type: format.mime });
	}
}
function prepareText(text, ext) {
	if (ext === "json") try {
		return `${JSON.stringify(JSON.parse(text), null, 2)}\n`;
	} catch {
		return ensureTrailingNewline(text);
	}
	if (ext === "rtf") return textToRtf(text);
	if (ext === "html" && !/<\/?[a-z][\s\S]*>/i.test(text)) return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Export</title>
</head>
<body>
<pre>${escapeXml(text)}</pre>
</body>
</html>
`;
	return ensureTrailingNewline(text);
}
function ensureTrailingNewline(text) {
	return text.endsWith("\n") ? text : `${text}\n`;
}
function textToRtf(text) {
	return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Courier New;}}\\f0\\fs22 ${text.replace(/\\/g, "\\\\").replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "\\par\n").replace(/[^\x00-\x7F]/g, (ch) => `\\u${ch.charCodeAt(0)}?`)}}`;
}
async function waitForFonts() {
	if (typeof document === "undefined" || !document.fonts) return;
	try {
		await Promise.race([document.fonts.ready, new Promise((resolve) => window.setTimeout(resolve, 800))]);
	} catch {}
}
function wrapLines(ctx, text, maxWidth) {
	const lines = [];
	const rawLines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
	for (const raw of rawLines) {
		const source = raw.replace(/\t/g, "  ");
		if (source === "") {
			lines.push("");
			continue;
		}
		if (ctx.measureText(source).width <= maxWidth) {
			lines.push(source);
			continue;
		}
		const tokens = source.split(/(\s+)/);
		let current = "";
		const flush = () => {
			if (current) lines.push(current);
			current = "";
		};
		const pushFitting = (chunk) => {
			if (ctx.measureText(chunk).width <= maxWidth) {
				current = current ? `${current}${chunk}` : chunk;
				if (ctx.measureText(current).width > maxWidth) {
					const overflow = chunk;
					current = current.slice(0, current.length - overflow.length);
					flush();
					current = overflow;
				}
				return;
			}
			flush();
			let buf = "";
			for (const ch of chunk) {
				const trial = buf + ch;
				if (buf && ctx.measureText(trial).width > maxWidth) {
					lines.push(buf);
					buf = ch;
				} else buf = trial;
			}
			current = buf;
		};
		for (const token of tokens) {
			if (!token) continue;
			const trial = current + token;
			if (current && ctx.measureText(trial).width > maxWidth) {
				flush();
				pushFitting(token.trimStart() || token);
			} else pushFitting(token);
		}
		flush();
	}
	return lines;
}
function createPageCanvas(width, height, bg) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is not available");
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, width, height);
	return canvas;
}
async function canvasToBlob(canvas, type, quality) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("Could not encode the image")), type, quality);
	});
}
async function blobToUint8(blob) {
	return new Uint8Array(await blob.arrayBuffer());
}
async function textToPdf(text, paper, title = "untitled") {
	await waitForFonts();
	const colors = PAPER[paper];
	const width = LETTER_W * PDF_SCALE;
	const height = LETTER_H * PDF_SCALE;
	const margin = 108;
	const fontSize = 22;
	const lineHeight = 30;
	const footerY = 1528;
	const maxWidth = 1008;
	const measure = createPageCanvas(width, height, colors.bg).getContext("2d");
	if (!measure) throw new Error("Canvas is not available");
	measure.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`;
	const lines = wrapLines(measure, text || " ", maxWidth);
	const linesPerPage = Math.max(1, Math.floor(1388 / lineHeight));
	const pageCount = Math.max(1, Math.ceil(lines.length / linesPerPage));
	const pages = [];
	for (let p = 0; p < pageCount; p++) {
		const canvas = createPageCanvas(width, height, colors.bg);
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas is not available");
		ctx.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`;
		ctx.fillStyle = colors.fg;
		ctx.textBaseline = "top";
		lines.slice(p * linesPerPage, (p + 1) * linesPerPage).forEach((line, i) => {
			ctx.fillText(line, margin, margin + i * lineHeight);
		});
		ctx.font = `18px "IBM Plex Mono", ui-monospace, monospace`;
		ctx.fillStyle = colors.muted;
		ctx.textAlign = "right";
		ctx.fillText(`${p + 1} / ${pageCount}`, 1116, footerY);
		ctx.textAlign = "left";
		ctx.fillText(sanitizePdfLabel(title), margin, footerY);
		const jpeg = await canvasToBlob(canvas, "image/jpeg", .92);
		pages.push({
			jpeg: await blobToUint8(jpeg),
			width,
			height
		});
	}
	return jpegsToPdf(pages);
}
function sanitizePdfLabel(name) {
	return name.replace(/\.[a-z0-9]+$/i, "").slice(0, 40) || "untitled";
}
async function imageToPdf(image, paper) {
	const colors = PAPER[paper];
	const width = LETTER_W * PDF_SCALE;
	const height = LETTER_H * PDF_SCALE;
	const scale = Math.min(1080 / image.naturalWidth, 1440 / image.naturalHeight, 1);
	const dw = image.naturalWidth * scale;
	const dh = image.naturalHeight * scale;
	const canvas = createPageCanvas(width, height, colors.bg);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is not available");
	ctx.drawImage(image, (width - dw) / 2, (height - dh) / 2, dw, dh);
	return jpegsToPdf([{
		jpeg: await blobToUint8(await canvasToBlob(canvas, "image/jpeg", .92)),
		width,
		height
	}]);
}
function concatBytes(parts) {
	const encoder = new TextEncoder();
	const arrays = parts.map((p) => typeof p === "string" ? encoder.encode(p) : p);
	const total = arrays.reduce((sum, a) => sum + a.length, 0);
	const out = new Uint8Array(total);
	let offset = 0;
	for (const a of arrays) {
		out.set(a, offset);
		offset += a.length;
	}
	return out;
}
function jpegsToPdf(pages) {
	const encoder = new TextEncoder();
	const chunks = [];
	const offsets = [0];
	let pos = 0;
	const push = (data) => {
		const bytes = typeof data === "string" ? encoder.encode(data) : data;
		chunks.push(bytes);
		pos += bytes.length;
	};
	push("%PDF-1.4\n%ÿÿÿÿ\n");
	const n = pages.length;
	const catalogNum = 1;
	const pagesNum = 2;
	const pageNums = pages.map((_, i) => 3 + i * 3);
	const contentNums = pages.map((_, i) => 4 + i * 3);
	const imageNums = pages.map((_, i) => 5 + i * 3);
	const writeObj = (num, payload) => {
		offsets[num] = pos;
		if (typeof payload === "string") {
			push(`${num} 0 obj\n${payload}\nendobj\n`);
			return;
		}
		push(`${num} 0 obj\n${payload.dict}\nstream\n`);
		push(payload.stream);
		push("\nendstream\nendobj\n");
	};
	writeObj(catalogNum, `<< /Type /Catalog /Pages ${pagesNum} 0 R >>`);
	writeObj(pagesNum, `<< /Type /Pages /Count ${n} /Kids [${pageNums.map((p) => `${p} 0 R`).join(" ")}] >>`);
	for (let i = 0; i < n; i++) {
		const page = pages[i];
		const content = `q ${LETTER_W} 0 0 ${LETTER_H} 0 0 cm /Im${i} Do Q`;
		const contentBytes = encoder.encode(content);
		writeObj(pageNums[i], `<< /Type /Page /Parent ${pagesNum} 0 R /MediaBox [0 0 ${LETTER_W} ${LETTER_H}] /Contents ${contentNums[i]} 0 R /Resources << /XObject << /Im${i} ${imageNums[i]} 0 R >> >> >>`);
		writeObj(contentNums[i], {
			dict: `<< /Length ${contentBytes.length} >>`,
			stream: contentBytes
		});
		writeObj(imageNums[i], {
			dict: `<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpeg.length} >>`,
			stream: page.jpeg
		});
	}
	const xrefPos = pos;
	const maxObj = 2 + n * 3;
	push(`xref\n0 ${maxObj + 1}\n`);
	push("0000000000 65535 f \n");
	for (let i = 1; i <= maxObj; i++) push(`${String(offsets[i] ?? 0).padStart(10, "0")} 00000 n \n`);
	push(`trailer << /Size ${maxObj + 1} /Root ${catalogNum} 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`);
	const pdf = concatBytes(chunks);
	const copy = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);
	return new Blob([copy], { type: "application/pdf" });
}
function textToSvg(text, paper) {
	const colors = PAPER[paper];
	const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
	const lineHeight = 20;
	const pad = 40;
	const width = 860;
	const height = Math.max(200, 80 + lines.length * lineHeight);
	const tspans = lines.map((line, i) => {
		const y = 56 + i * lineHeight;
		return `<tspan x="${pad}" y="${y}">${escapeXml(line || " ")}</tspan>`;
	}).join("");
	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${colors.bg}"/>
  <text font-family="ui-monospace, 'IBM Plex Mono', monospace" font-size="14" fill="${colors.fg}">${tspans}</text>
</svg>
`;
	return new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
}
async function imageToSvg(image) {
	const b64 = await blobToDataUrl(await rasterizeImage(image, "image/png"));
	const w = image.naturalWidth;
	const h = image.naturalHeight;
	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image href="${b64}" width="${w}" height="${h}"/>
</svg>
`;
	return new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
}
async function textToRaster(text, format, paper) {
	await waitForFonts();
	const colors = PAPER[paper];
	const pad = 48;
	const fontSize = 15;
	const lineHeight = 22;
	const contentWidth = 820;
	const width = 916;
	const probe = createPageCanvas(width, 64, colors.bg).getContext("2d");
	if (!probe) throw new Error("Canvas is not available");
	probe.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`;
	const lines = wrapLines(probe, text || " ", contentWidth);
	const height = Math.min(MAX_TEXT_IMAGE_HEIGHT, Math.max(160, 96 + lines.length * lineHeight));
	const visibleLines = Math.floor((height - 96) / lineHeight);
	const canvas = createPageCanvas(width, height, colors.bg);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is not available");
	ctx.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`;
	ctx.fillStyle = colors.fg;
	ctx.textBaseline = "top";
	lines.slice(0, visibleLines).forEach((line, i) => {
		ctx.fillText(line, pad, pad + i * lineHeight);
	});
	return encodeCanvas(canvas, format);
}
async function convertImage(image, format) {
	return encodeCanvas(drawSource(image), format);
}
function fitDimensions(width, height, max) {
	if (width <= max && height <= max) return {
		w: width,
		h: height
	};
	const scale = max / Math.max(width, height);
	return {
		w: Math.max(1, Math.round(width * scale)),
		h: Math.max(1, Math.round(height * scale))
	};
}
function drawSource(image, max = MAX_RASTER) {
	const { w, h } = fitDimensions(image.naturalWidth, image.naturalHeight, max);
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is not available");
	ctx.drawImage(image, 0, 0, w, h);
	return canvas;
}
async function rasterizeImage(image, mime) {
	return canvasToBlob(drawSource(image), mime, mime === "image/jpeg" || mime === "image/webp" ? .92 : void 0);
}
async function encodeCanvas(canvas, format) {
	if (format.ext === "bmp") {
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas is not available");
		return encodeBmp(ctx.getImageData(0, 0, canvas.width, canvas.height));
	}
	if (format.ext === "gif") {
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas is not available");
		return encodeGif(ctx.getImageData(0, 0, canvas.width, canvas.height));
	}
	if (format.ext === "ico") {
		const sized = document.createElement("canvas");
		const edge = Math.min(256, Math.max(canvas.width, canvas.height, 16));
		sized.width = edge;
		sized.height = edge;
		const ctx = sized.getContext("2d");
		if (!ctx) throw new Error("Canvas is not available");
		const scale = Math.min(edge / canvas.width, edge / canvas.height);
		const dw = canvas.width * scale;
		const dh = canvas.height * scale;
		ctx.clearRect(0, 0, edge, edge);
		ctx.drawImage(canvas, (edge - dw) / 2, (edge - dh) / 2, dw, dh);
		return pngToIco(await (await canvasToBlob(sized, "image/png")).arrayBuffer(), edge, edge);
	}
	if (format.ext === "jpg" || format.ext === "jpeg") {
		const flattened = document.createElement("canvas");
		flattened.width = canvas.width;
		flattened.height = canvas.height;
		const ctx = flattened.getContext("2d");
		if (!ctx) throw new Error("Canvas is not available");
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, flattened.width, flattened.height);
		ctx.drawImage(canvas, 0, 0);
		return canvasToBlob(flattened, "image/jpeg", .92);
	}
	return canvasToBlob(canvas, format.ext === "webp" ? "image/webp" : "image/png", format.ext === "webp" ? .92 : void 0);
}
function encodeBmp(imageData) {
	const { width, height, data } = imageData;
	const rowSize = Math.ceil(width * 3 / 4) * 4;
	const pixelSize = rowSize * height;
	const fileSize = 54 + pixelSize;
	const buf = new ArrayBuffer(fileSize);
	const view = new DataView(buf);
	const bytes = new Uint8Array(buf);
	view.setUint16(0, 19778, true);
	view.setUint32(2, fileSize, true);
	view.setUint32(10, 54, true);
	view.setUint32(14, 40, true);
	view.setInt32(18, width, true);
	view.setInt32(22, height, true);
	view.setUint16(26, 1, true);
	view.setUint16(28, 24, true);
	view.setUint32(34, pixelSize, true);
	for (let y = 0; y < height; y++) {
		const srcY = height - 1 - y;
		const rowStart = 54 + y * rowSize;
		for (let x = 0; x < width; x++) {
			const i = (srcY * width + x) * 4;
			const p = rowStart + x * 3;
			bytes[p] = data[i + 2] ?? 0;
			bytes[p + 1] = data[i + 1] ?? 0;
			bytes[p + 2] = data[i] ?? 0;
		}
	}
	return new Blob([buf], { type: "image/bmp" });
}
function encodeGif(imageData) {
	const { width, height, data } = imageData;
	const indexed = new Uint8Array(width * height);
	const palette = /* @__PURE__ */ new Uint8Array(768);
	for (let i = 0; i < 256; i++) {
		palette[i * 3] = (i >> 5 & 7) * 36;
		palette[i * 3 + 1] = (i >> 2 & 7) * 36;
		palette[i * 3 + 2] = (i & 3) * 85;
	}
	for (let i = 0; i < width * height; i++) {
		const r = data[i * 4] ?? 0;
		const g = data[i * 4 + 1] ?? 0;
		const b = data[i * 4 + 2] ?? 0;
		const ri = Math.min(7, Math.round(r / 36));
		const gi = Math.min(7, Math.round(g / 36));
		const bi = Math.min(3, Math.round(b / 85));
		indexed[i] = ri << 5 | gi << 2 | bi;
	}
	const out = [];
	const pushStr = (s) => {
		for (let i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
	};
	const push16 = (n) => {
		out.push(n & 255, n >> 8 & 255);
	};
	pushStr("GIF89a");
	push16(width);
	push16(height);
	out.push(247, 0, 0);
	for (let i = 0; i < palette.length; i++) out.push(palette[i]);
	out.push(44, 0, 0, 0, 0);
	push16(width);
	push16(height);
	out.push(0, 8);
	const bits = [];
	let acc = 0;
	let nbits = 0;
	const write9 = (value) => {
		acc |= (value & 511) << nbits;
		nbits += 9;
		while (nbits >= 8) {
			bits.push(acc & 255);
			acc >>= 8;
			nbits -= 8;
		}
	};
	write9(256);
	let sinceClear = 0;
	for (let i = 0; i < indexed.length; i++) {
		write9(indexed[i]);
		sinceClear += 1;
		if (sinceClear === 126 && i < indexed.length - 1) {
			write9(256);
			sinceClear = 0;
		}
	}
	write9(257);
	if (nbits > 0) bits.push(acc & 255);
	for (let i = 0; i < bits.length;) {
		const size = Math.min(255, bits.length - i);
		out.push(size);
		for (let j = 0; j < size; j++) out.push(bits[i + j]);
		i += size;
	}
	out.push(0, 59);
	return new Blob([new Uint8Array(out)], { type: "image/gif" });
}
function pngToIco(png, width, height) {
	const pngBytes = new Uint8Array(png);
	const header = /* @__PURE__ */ new ArrayBuffer(22);
	const view = new DataView(header);
	view.setUint16(0, 0, true);
	view.setUint16(2, 1, true);
	view.setUint16(4, 1, true);
	view.setUint8(6, width >= 256 ? 0 : width);
	view.setUint8(7, height >= 256 ? 0 : height);
	view.setUint8(8, 0);
	view.setUint8(9, 0);
	view.setUint16(10, 1, true);
	view.setUint16(12, 32, true);
	view.setUint32(14, pngBytes.length, true);
	view.setUint32(18, 22, true);
	return new Blob([header, pngBytes], { type: "image/x-icon" });
}
function escapeXml(value) {
	return value.replace(/[&<>"']/g, (ch) => {
		if (ch === "&") return "&amp;";
		if (ch === "<") return "&lt;";
		if (ch === ">") return "&gt;";
		if (ch === "\"") return "&quot;";
		return "&apos;";
	});
}
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read file"));
		reader.readAsDataURL(blob);
	});
}
async function imageToDataUrl(image, mime) {
	return blobToDataUrl(await rasterizeImage(image, mime));
}
function loadImageElement(src) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image"));
		image.src = src;
	});
}
var DEFAULT_FORMAT = formatById("txt");
function ExporterApp() {
	const [text, setText] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [format, setFormat] = (0, import_react.useState)(DEFAULT_FORMAT);
	const [query, setQuery] = (0, import_react.useState)("");
	const [browseAll, setBrowseAll] = (0, import_react.useState)(false);
	const [image, setImage] = (0, import_react.useState)(null);
	const [paper, setPaper] = (0, import_react.useState)("light");
	const [clearAfter, setClearAfter] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const pasteRef = (0, import_react.useRef)(null);
	const nameRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const dragDepth = (0, import_react.useRef)(0);
	const nameTouched = (0, import_react.useRef)(false);
	const hasContent = Boolean(image) || text.trim().length > 0;
	const lineCount = text ? text.replace(/\r\n/g, "\n").split("\n").length : 0;
	const byteCount = image ? image.file.size : new Blob([text]).size;
	const filenamePreview = `${(name.trim() || (image ? baseName(image.file.name) : "untitled")).replace(/[/\\?%*:|"<>]/g, "-")}.${format.ext}`;
	const visualFormat = format.kind === "pdf" || format.kind === "raster" || format.kind === "svg";
	const showCatalog = browseAll || query.trim().length > 0;
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase().replace(/^\./, "");
		if (!q) return FORMATS;
		return FORMATS.filter((f) => f.ext.includes(q) || f.label.toLowerCase().includes(q) || f.group.toLowerCase().includes(q));
	}, [query]);
	const customFromQuery = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase().replace(/^\./, "");
		if (!q || !/^[a-z0-9]{1,12}$/.test(q)) return null;
		if (formatByExt(q)) return null;
		return customFormat(q);
	}, [query]);
	const resetWorkspace = (0, import_react.useCallback)(() => {
		if (image) URL.revokeObjectURL(image.url);
		setImage(null);
		setText("");
		setName("");
		nameTouched.current = false;
		window.setTimeout(() => pasteRef.current?.focus(), 40);
	}, [image]);
	const adoptImage = (0, import_react.useCallback)(async (file) => {
		const url = URL.createObjectURL(file);
		try {
			const element = await loadImageElement(url);
			if (image) URL.revokeObjectURL(image.url);
			setImage({
				file,
				url,
				image: element
			});
			setText("");
			if (!nameTouched.current) setName(baseName(file.name));
			const fromName = formatByExt(file.name.split(".").pop() ?? "");
			if (fromName?.group === "Image") setFormat(fromName);
		} catch {
			URL.revokeObjectURL(url);
			toast.error("Could not read that image");
		}
	}, [image]);
	const adoptTextFile = (0, import_react.useCallback)(async (file) => {
		const content = await file.text();
		if (image) URL.revokeObjectURL(image.url);
		setImage(null);
		setText(content);
		if (!nameTouched.current) setName(baseName(file.name));
		const fromName = formatByExt(file.name.split(".").pop() ?? "");
		if (fromName) setFormat(fromName);
	}, [image]);
	const adoptFile = (0, import_react.useCallback)(async (file) => {
		if (isImageFile(file)) await adoptImage(file);
		else await adoptTextFile(file);
	}, [adoptImage, adoptTextFile]);
	const handleExport = (0, import_react.useCallback)(async () => {
		if (!hasContent || busy) return;
		setBusy(true);
		try {
			const resolvedName = name.trim() || (image ? baseName(image.file.name) : suggestNameFromText(text));
			const { blob, filename } = await buildExport({
				format,
				name: resolvedName,
				text,
				image: image?.image ?? null,
				paper
			});
			triggerDownload(blob, filename);
			setDone(true);
			toast.success(`${filename} downloaded`);
			if (clearAfter) resetWorkspace();
			else nameRef.current?.select();
		} catch (err) {
			const message = err instanceof Error ? err.message : "Export failed";
			toast.error(message);
		} finally {
			setBusy(false);
			window.setTimeout(() => setDone(false), 1400);
		}
	}, [
		busy,
		clearAfter,
		format,
		hasContent,
		image,
		name,
		paper,
		resetWorkspace,
		text
	]);
	(0, import_react.useEffect)(() => {
		pasteRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
				event.preventDefault();
				handleExport();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [handleExport]);
	(0, import_react.useEffect)(() => {
		const onDragEnter = (event) => {
			if (!event.dataTransfer?.types.includes("Files")) return;
			dragDepth.current += 1;
			setDragging(true);
		};
		const onDragLeave = () => {
			dragDepth.current = Math.max(0, dragDepth.current - 1);
			if (dragDepth.current === 0) setDragging(false);
		};
		const onDragOver = (event) => {
			if (!event.dataTransfer?.types.includes("Files")) return;
			event.preventDefault();
		};
		const onDrop = (event) => {
			event.preventDefault();
			dragDepth.current = 0;
			setDragging(false);
			const file = event.dataTransfer?.files?.[0];
			if (file) adoptFile(file);
		};
		window.addEventListener("dragenter", onDragEnter);
		window.addEventListener("dragleave", onDragLeave);
		window.addEventListener("dragover", onDragOver);
		window.addEventListener("drop", onDrop);
		return () => {
			window.removeEventListener("dragenter", onDragEnter);
			window.removeEventListener("dragleave", onDragLeave);
			window.removeEventListener("dragover", onDragOver);
			window.removeEventListener("drop", onDrop);
		};
	}, [adoptFile]);
	const onPaste = async (event) => {
		const items = event.clipboardData?.items;
		if (!items) return;
		for (const item of items) if (item.type.startsWith("image/")) {
			const file = item.getAsFile();
			if (file) {
				event.preventDefault();
				await adoptImage(file);
				return;
			}
		}
	};
	const onNameChange = (value) => {
		nameTouched.current = true;
		const detected = detectExtInName(value);
		if (detected) {
			const known = formatByExt(detected.ext);
			setFormat(known ?? customFormat(detected.ext));
			setName(detected.base);
			return;
		}
		setName(value);
	};
	const selectFormat = (item) => {
		setFormat(item);
		setQuery("");
		setBrowseAll(false);
	};
	const shortcut = isMac() ? "⌘↵" : "Ctrl+Enter";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-28 sm:px-6 lg:pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 max-w-xl sm:mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-medium tracking-[-0.03em] text-fg text-balance sm:text-4xl",
					children: "Paste. Name. Download."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted text-pretty",
					children: "Drop in text or an image, pick a file type, export. Nothing is stored here."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid flex-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 lg:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "filename-mobile",
									children: "File name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex overflow-hidden rounded-sm bg-surface shadow-[var(--shadow-border)] focus-within:shadow-[var(--shadow-border-hover)] focus-within:ring-2 focus-within:ring-ring/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "filename-mobile",
										value: name,
										onChange: (event) => onNameChange(event.target.value),
										placeholder: "untitled",
										autoComplete: "off",
										spellCheck: false,
										className: "h-11 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center pr-3 font-mono text-sm text-subtle",
										children: [".", format.ext]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1",
								children: PINNED_FORMAT_IDS.map((id) => {
									const item = formatById(id);
									if (!item) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatChip, {
										format: item,
										active: format.id === item.id,
										onSelect: () => selectFormat(item)
									}, item.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileCatalog, {
								query,
								onQuery: setQuery,
								onBrowseAll: setBrowseAll,
								filtered,
								customFromQuery,
								format,
								onSelect: selectFormat,
								showCatalog
							}),
							visualFormat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-1.5",
								children: ["light", "dark"].map((theme) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPaper(theme),
									className: cn("h-10 rounded-sm text-sm capitalize", paper === theme ? "bg-accent text-accent-fg" : "bg-surface text-muted shadow-[var(--shadow-border)]"),
									children: [theme, " paper"]
								}, theme))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex min-h-56 flex-col rounded-xl bg-surface p-2 shadow-[var(--shadow-border)] sm:min-h-80 lg:min-h-[32rem]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 px-3 pb-1 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-subtle",
									children: image ? "Image" : "Source"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className: "h-8 px-2 text-subtle",
										onClick: () => fileRef.current?.click(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-3.5" }), "Open"]
									}), (hasContent || name) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className: "h-8 px-2 text-subtle",
										onClick: resetWorkspace,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Clear"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								className: "sr-only",
								onChange: (event) => {
									const file = event.target.files?.[0];
									if (file) adoptFile(file);
									event.target.value = "";
								}
							}),
							image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-bg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image.url,
									alt: "Ready to export",
									className: "max-h-[28rem] max-w-full object-contain outline outline-1 -outline-offset-1 outline-fg/10"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-3 left-3 rounded-sm bg-bg/80 px-2 py-1 font-mono text-xs text-muted",
									children: [
										image.image.naturalWidth,
										" × ",
										image.image.naturalHeight
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								ref: pasteRef,
								value: text,
								onChange: (event) => {
									const next = event.target.value;
									setText(next);
									if (!nameTouched.current && next.trim()) setName(suggestNameFromText(next));
								},
								onPaste,
								spellCheck: false,
								placeholder: "Paste text, a screenshot, or drop a file.",
								className: "min-h-48 flex-1 sm:min-h-72 lg:min-h-[28rem]"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden flex-col rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] lg:sticky lg:top-6 lg:flex lg:max-h-[calc(100dvh-5.5rem)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden space-y-5 lg:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "filename",
										children: "File name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex overflow-hidden rounded-sm bg-raised shadow-[var(--shadow-border)] focus-within:shadow-[var(--shadow-border-hover)] focus-within:ring-2 focus-within:ring-ring/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											ref: nameRef,
											id: "filename",
											value: name,
											onChange: (event) => onNameChange(event.target.value),
											placeholder: "untitled",
											autoComplete: "off",
											spellCheck: false,
											className: "h-11 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center pr-3 font-mono text-sm text-subtle",
											children: [".", format.ext]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "format-search",
											children: "Format"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "format-search",
												value: query,
												onChange: (event) => setQuery(event.target.value),
												placeholder: "Search or type an extension",
												className: "pl-9",
												autoComplete: "off",
												spellCheck: false
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1.5",
											children: PINNED_FORMAT_IDS.map((id) => {
												const item = formatById(id);
												if (!item) return null;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatChip, {
													format: item,
													active: format.id === item.id,
													onSelect: () => selectFormat(item)
												}, item.id);
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setBrowseAll((open) => !open),
											className: "inline-flex h-8 items-center gap-1 text-xs font-medium text-subtle hover:text-fg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform duration-150", showCatalog && "rotate-180") }), showCatalog ? "Hide formats" : "All formats"]
										}),
										showCatalog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "max-h-44 space-y-3 overflow-y-auto pr-0.5",
											children: [
												customFromQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mb-1.5 text-xs font-medium uppercase tracking-wide text-subtle",
													children: "Custom"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatChip, {
													format: customFromQuery,
													active: format.ext === customFromQuery.ext,
													onSelect: () => selectFormat(customFromQuery)
												})] }),
												FORMAT_GROUPS.map((group) => {
													const items = filtered.filter((f) => f.group === group);
													if (items.length === 0) return null;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mb-1.5 text-xs font-medium uppercase tracking-wide text-subtle",
														children: group
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap gap-1.5",
														children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatChip, {
															format: item,
															active: format.id === item.id,
															onSelect: () => selectFormat(item)
														}, item.id))
													})] }, group);
												}),
												filtered.length === 0 && !customFromQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-subtle",
													children: "No matching format. Type a custom extension."
												})
											]
										})
									]
								})]
							}),
							visualFormat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Paper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-1.5",
									children: ["light", "dark"].map((theme) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPaper(theme),
										className: cn("h-10 rounded-sm text-sm capitalize transition-[box-shadow,background-color] duration-150", paper === theme ? "bg-accent text-accent-fg" : "bg-raised text-muted shadow-[var(--shadow-border)] hover:text-fg"),
										children: theme
									}, theme))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-3 border-t border-border pt-4 lg:mt-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 text-sm text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-mono text-xs tabular-nums text-subtle",
											children: filenamePreview
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 font-mono text-xs tabular-nums text-subtle",
											children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "size-3" }), byteLabel(byteCount)]
											}) : `${lineCount} ${lineCount === 1 ? "line" : "lines"} · ${byteLabel(byteCount)}`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "lg",
										className: "hidden h-12 w-full lg:inline-flex",
										disabled: !hasContent || busy,
										onClick: () => void handleExport(),
										children: [
											done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }),
											busy ? "Exporting…" : done ? "Exported" : "Export",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-auto font-mono text-xs opacity-60",
												children: shortcut
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex min-h-11 items-center justify-between gap-3 text-sm text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear after export" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: clearAfter,
											onCheckedChange: (value) => setClearAfter(Boolean(value))
										})]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-sm lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "lg",
					className: "h-12 w-full",
					disabled: !hasContent || busy,
					onClick: () => void handleExport(),
					children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), busy ? "Exporting…" : done ? "Exported" : `Export ${filenamePreview}`]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setClearAfter((value) => !value),
					className: "mt-2 w-full text-center text-xs text-subtle",
					children: clearAfter ? "Clears after export" : "Keeps content after export"
				})]
			}),
			dragging && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-0 z-40 grid place-items-center bg-bg/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface px-8 py-6 text-center shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-medium tracking-tight",
						children: "Drop to load"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Text or image — then name and export"
					})]
				})
			})
		]
	});
}
function MobileCatalog({ query, onQuery, onBrowseAll, filtered, customFromQuery, format, onSelect, showCatalog }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onBrowseAll((open) => !open),
		className: "inline-flex h-8 items-center gap-1 text-xs font-medium text-subtle hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform duration-150", showCatalog && "rotate-180") }), showCatalog ? "Hide formats" : "All formats"]
	}), showCatalog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: query,
				onChange: (event) => onQuery(event.target.value),
				placeholder: "Search or type an extension",
				className: "pl-9",
				autoComplete: "off",
				spellCheck: false
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-40 space-y-3 overflow-y-auto",
			children: [customFromQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatChip, {
				format: customFromQuery,
				active: format.ext === customFromQuery.ext,
				onSelect: () => onSelect(customFromQuery)
			}), FORMAT_GROUPS.map((group) => {
				const items = filtered.filter((f) => f.group === group);
				if (items.length === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-xs font-medium uppercase tracking-wide text-subtle",
					children: group
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatChip, {
						format: item,
						active: format.id === item.id,
						onSelect: () => onSelect(item)
					}, item.id))
				})] }, group);
			})]
		})]
	})] });
}
function FormatChip({ format, active, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("h-8 rounded-sm px-2.5 font-mono text-xs transition-[background-color,color] duration-150", active ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
		children: [".", format.ext]
	});
}
function baseName(filename) {
	return filename.replace(/\.[a-zA-Z0-9]{1,12}$/, "");
}
function isMac() {
	if (typeof navigator === "undefined") return false;
	return /Mac|iPhone|iPad/.test(navigator.userAgent);
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex flex-1 flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExporterApp, {})
		})]
	});
}
//#endregion
export { Home as component };
