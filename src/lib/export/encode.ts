import { buildFilename, formatByExt, type FileFormat } from "./formats";

export type PaperTheme = "light" | "dark";

export type ExportInput = {
  format: FileFormat;
  name: string;
  text: string;
  image: HTMLImageElement | null;
  paper: PaperTheme;
};

const LETTER_W = 612;
const LETTER_H = 792;
const PDF_SCALE = 2;
const MAX_RASTER = 8192;
const MAX_TEXT_IMAGE_HEIGHT = 14000;

const PAPER: Record<PaperTheme, { bg: string; fg: string; muted: string }> = {
  light: { bg: "#f4f3ee", fg: "#1a1a1c", muted: "#6d6d76" },
  dark: { bg: "#111113", fg: "#e8e6e1", muted: "#8b8b94" },
};

export function triggerDownload(blob: Blob, filename: string): void {
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

export async function buildExport(input: ExportInput): Promise<{ blob: Blob; filename: string }> {
  const filename = buildFilename(input.name, input.format.ext);
  const blob = await encodeBlob(input);
  return { blob, filename };
}

async function encodeBlob(input: ExportInput): Promise<Blob> {
  const { format, text, image, paper } = input;

  if (image) {
    switch (format.kind) {
      case "pdf":
        return imageToPdf(image, paper);
      case "svg":
        return imageToSvg(image);
      case "raster":
        return convertImage(image, format);
      case "text":
        return new Blob([await imageToDataUrl(image, "image/png")], { type: format.mime });
    }
  }

  switch (format.kind) {
    case "pdf":
      return textToPdf(text, paper);
    case "svg":
      return textToSvg(text, paper);
    case "raster":
      return textToRaster(text, format, paper);
    case "text":
      return new Blob([prepareText(text, format.ext)], { type: format.mime });
  }
}

function prepareText(text: string, ext: string): string {
  if (ext === "json") {
    try {
      return `${JSON.stringify(JSON.parse(text), null, 2)}\n`;
    } catch {
      return ensureTrailingNewline(text);
    }
  }
  if (ext === "rtf") return textToRtf(text);
  if (ext === "html" && !/<\/?[a-z][\s\S]*>/i.test(text)) {
    return `<!doctype html>
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
  }
  return ensureTrailingNewline(text);
}

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function textToRtf(text: string): string {
  const escaped = text
    .replace(/\\/g, "\\\\")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n/g, "\\par\n")
    .replace(/[^\x00-\x7F]/g, (ch) => `\\u${ch.charCodeAt(0)}?`);
  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Courier New;}}\\f0\\fs22 ${escaped}}`;
}

async function waitForFonts(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return;
  try {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => window.setTimeout(resolve, 800)),
    ]);
  } catch {
    /* use fallback stack */
  }
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const lines: string[] = [];
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

    const pushFitting = (chunk: string) => {
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
        } else {
          buf = trial;
        }
      }
      current = buf;
    };

    for (const token of tokens) {
      if (!token) continue;
      const trial = current + token;
      if (current && ctx.measureText(trial).width > maxWidth) {
        flush();
        pushFitting(token.trimStart() || token);
      } else {
        pushFitting(token);
      }
    }
    flush();
  }

  return lines;
}

function createPageCanvas(width: number, height: number, bg: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  return canvas;
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode the image"))),
      type,
      quality,
    );
  });
}

async function blobToUint8(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

export async function textToPdf(text: string, paper: PaperTheme): Promise<Blob> {
  await waitForFonts();
  const colors = PAPER[paper];
  const width = LETTER_W * PDF_SCALE;
  const height = LETTER_H * PDF_SCALE;
  const margin = 54 * PDF_SCALE;
  const fontSize = 11 * PDF_SCALE;
  const lineHeight = 15 * PDF_SCALE;
  const usableBottom = height - margin;
  const maxWidth = width - margin * 2;

  const measure = createPageCanvas(width, height, colors.bg).getContext("2d");
  if (!measure) throw new Error("Canvas is not available");
  measure.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`;
  const lines = wrapLines(measure, text || " ", maxWidth);
  const linesPerPage = Math.max(1, Math.floor((usableBottom - margin) / lineHeight));
  const pageCount = Math.max(1, Math.ceil(lines.length / linesPerPage));

  const pages: { jpeg: Uint8Array; width: number; height: number }[] = [];
  for (let p = 0; p < pageCount; p++) {
    const canvas = createPageCanvas(width, height, colors.bg);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available");
    ctx.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillStyle = colors.fg;
    ctx.textBaseline = "top";
    const slice = lines.slice(p * linesPerPage, (p + 1) * linesPerPage);
    slice.forEach((line, i) => {
      ctx.fillText(line, margin, margin + i * lineHeight);
    });
    const jpeg = await canvasToBlob(canvas, "image/jpeg", 0.92);
    pages.push({ jpeg: await blobToUint8(jpeg), width, height });
  }

  return jpegsToPdf(pages);
}


export async function imageToPdf(image: HTMLImageElement, paper: PaperTheme): Promise<Blob> {
  const colors = PAPER[paper];
  const width = LETTER_W * PDF_SCALE;
  const height = LETTER_H * PDF_SCALE;
  const margin = 36 * PDF_SCALE;
  const maxW = width - margin * 2;
  const maxH = height - margin * 2;
  const scale = Math.min(maxW / image.naturalWidth, maxH / image.naturalHeight, 1);
  const dw = image.naturalWidth * scale;
  const dh = image.naturalHeight * scale;
  const canvas = createPageCanvas(width, height, colors.bg);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");
  ctx.drawImage(image, (width - dw) / 2, (height - dh) / 2, dw, dh);
  const jpeg = await canvasToBlob(canvas, "image/jpeg", 0.92);
  return jpegsToPdf([{ jpeg: await blobToUint8(jpeg), width, height }]);
}

function concatBytes(parts: Array<Uint8Array | string>): Uint8Array {
  const encoder = new TextEncoder();
  const arrays = parts.map((p) => (typeof p === "string" ? encoder.encode(p) : p));
  const total = arrays.reduce((sum, a) => sum + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
}

function jpegsToPdf(pages: { jpeg: Uint8Array; width: number; height: number }[]): Blob {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0];
  let pos = 0;

  const push = (data: Uint8Array | string) => {
    const bytes = typeof data === "string" ? encoder.encode(data) : data;
    chunks.push(bytes);
    pos += bytes.length;
  };

  push("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");

  const n = pages.length;
  const catalogNum = 1;
  const pagesNum = 2;
  const pageNums = pages.map((_, i) => 3 + i * 3);
  const contentNums = pages.map((_, i) => 4 + i * 3);
  const imageNums = pages.map((_, i) => 5 + i * 3);

  const writeObj = (num: number, payload: string | { dict: string; stream: Uint8Array }) => {
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
  writeObj(
    pagesNum,
    `<< /Type /Pages /Count ${n} /Kids [${pageNums.map((p) => `${p} 0 R`).join(" ")}] >>`,
  );

  for (let i = 0; i < n; i++) {
    const page = pages[i]!;
    const content = `q ${LETTER_W} 0 0 ${LETTER_H} 0 0 cm /Im${i} Do Q`;
    const contentBytes = encoder.encode(content);
    writeObj(
      pageNums[i]!,
      `<< /Type /Page /Parent ${pagesNum} 0 R /MediaBox [0 0 ${LETTER_W} ${LETTER_H}] /Contents ${contentNums[i]} 0 R /Resources << /XObject << /Im${i} ${imageNums[i]} 0 R >> >> >>`,
    );
    writeObj(contentNums[i]!, {
      dict: `<< /Length ${contentBytes.length} >>`,
      stream: contentBytes,
    });
    writeObj(imageNums[i]!, {
      dict: `<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpeg.length} >>`,
      stream: page.jpeg,
    });
  }

  const xrefPos = pos;
  const maxObj = 2 + n * 3;
  push(`xref\n0 ${maxObj + 1}\n`);
  push("0000000000 65535 f \n");
  for (let i = 1; i <= maxObj; i++) {
    push(`${String(offsets[i] ?? 0).padStart(10, "0")} 00000 n \n`);
  }
  push(`trailer << /Size ${maxObj + 1} /Root ${catalogNum} 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`);

  const pdf = concatBytes(chunks);
  const copy = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer;
  return new Blob([copy], { type: "application/pdf" });
}

function textToSvg(text: string, paper: PaperTheme): Blob {
  const colors = PAPER[paper];
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const lineHeight = 20;
  const pad = 40;
  const width = 860;
  const height = Math.max(200, pad * 2 + lines.length * lineHeight);
  const tspans = lines
    .map((line, i) => {
      const y = pad + 16 + i * lineHeight;
      return `<tspan x="${pad}" y="${y}">${escapeXml(line || " ")}</tspan>`;
    })
    .join("");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${colors.bg}"/>
  <text font-family="ui-monospace, 'IBM Plex Mono', monospace" font-size="14" fill="${colors.fg}">${tspans}</text>
</svg>
`;
  return new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
}

async function imageToSvg(image: HTMLImageElement): Promise<Blob> {
  const png = await rasterizeImage(image, "image/png");
  const b64 = await blobToDataUrl(png);
  const w = image.naturalWidth;
  const h = image.naturalHeight;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image href="${b64}" width="${w}" height="${h}"/>
</svg>
`;
  return new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
}

async function textToRaster(text: string, format: FileFormat, paper: PaperTheme): Promise<Blob> {
  await waitForFonts();
  const colors = PAPER[paper];
  const pad = 48;
  const fontSize = 15;
  const lineHeight = 22;
  const contentWidth = 820;
  const width = contentWidth + pad * 2;

  const probe = createPageCanvas(width, 64, colors.bg).getContext("2d");
  if (!probe) throw new Error("Canvas is not available");
  probe.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`;
  const lines = wrapLines(probe, text || " ", contentWidth);
  const height = Math.min(MAX_TEXT_IMAGE_HEIGHT, Math.max(160, pad * 2 + lines.length * lineHeight));
  const visibleLines = Math.floor((height - pad * 2) / lineHeight);

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

async function convertImage(image: HTMLImageElement, format: FileFormat): Promise<Blob> {
  return encodeCanvas(drawSource(image), format);
}

function fitDimensions(width: number, height: number, max: number): { w: number; h: number } {
  if (width <= max && height <= max) return { w: width, h: height };
  const scale = max / Math.max(width, height);
  return { w: Math.max(1, Math.round(width * scale)), h: Math.max(1, Math.round(height * scale)) };
}

function drawSource(image: HTMLImageElement, max = MAX_RASTER): HTMLCanvasElement {
  const { w, h } = fitDimensions(image.naturalWidth, image.naturalHeight, max);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");
  ctx.drawImage(image, 0, 0, w, h);
  return canvas;
}

async function rasterizeImage(image: HTMLImageElement, mime: string): Promise<Blob> {
  return canvasToBlob(drawSource(image), mime, mime === "image/jpeg" || mime === "image/webp" ? 0.92 : undefined);
}

async function encodeCanvas(canvas: HTMLCanvasElement, format: FileFormat): Promise<Blob> {
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
    const png = await canvasToBlob(sized, "image/png");
    return pngToIco(await png.arrayBuffer(), edge, edge);
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
    return canvasToBlob(flattened, "image/jpeg", 0.92);
  }
  const mime = format.ext === "webp" ? "image/webp" : "image/png";
  return canvasToBlob(canvas, mime, format.ext === "webp" ? 0.92 : undefined);
}

function encodeBmp(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelSize = rowSize * height;
  const fileSize = 54 + pixelSize;
  const buf = new ArrayBuffer(fileSize);
  const view = new DataView(buf);
  const bytes = new Uint8Array(buf);

  view.setUint16(0, 0x4d42, true);
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

function encodeGif(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const indexed = new Uint8Array(width * height);
  const palette = new Uint8Array(256 * 3);

  for (let i = 0; i < 256; i++) {
    palette[i * 3] = ((i >> 5) & 7) * 36;
    palette[i * 3 + 1] = ((i >> 2) & 7) * 36;
    palette[i * 3 + 2] = (i & 3) * 85;
  }

  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4] ?? 0;
    const g = data[i * 4 + 1] ?? 0;
    const b = data[i * 4 + 2] ?? 0;
    const ri = Math.min(7, Math.round(r / 36));
    const gi = Math.min(7, Math.round(g / 36));
    const bi = Math.min(3, Math.round(b / 85));
    indexed[i] = (ri << 5) | (gi << 2) | bi;
  }

  const out: number[] = [];
  const pushStr = (s: string) => {
    for (let i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
  };
  const push16 = (n: number) => {
    out.push(n & 0xff, (n >> 8) & 0xff);
  };

  pushStr("GIF89a");
  push16(width);
  push16(height);
  out.push(0xf7, 0, 0);
  for (let i = 0; i < palette.length; i++) out.push(palette[i]!);
  out.push(0x2c, 0, 0, 0, 0);
  push16(width);
  push16(height);
  out.push(0, 8);

  const bits: number[] = [];
  let acc = 0;
  let nbits = 0;
  const write9 = (value: number) => {
    acc |= (value & 0x1ff) << nbits;
    nbits += 9;
    while (nbits >= 8) {
      bits.push(acc & 0xff);
      acc >>= 8;
      nbits -= 8;
    }
  };

  write9(256);
  let sinceClear = 0;
  for (let i = 0; i < indexed.length; i++) {
    write9(indexed[i]!);
    sinceClear += 1;
    if (sinceClear === 126 && i < indexed.length - 1) {
      write9(256);
      sinceClear = 0;
    }
  }
  write9(257);
  if (nbits > 0) bits.push(acc & 0xff);

  for (let i = 0; i < bits.length; ) {
    const size = Math.min(255, bits.length - i);
    out.push(size);
    for (let j = 0; j < size; j++) out.push(bits[i + j]!);
    i += size;
  }
  out.push(0, 0x3b);

  return new Blob([new Uint8Array(out)], { type: "image/gif" });
}

function pngToIco(png: ArrayBuffer, width: number, height: number): Blob {
  const pngBytes = new Uint8Array(png);
  const header = new ArrayBuffer(22);
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

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return "\u0026amp;";
    if (ch === "<") return "\u0026lt;";
    if (ch === ">") return "\u0026gt;";
    if (ch === '"') return "\u0026quot;";
    return "\u0026apos;";
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(blob);
  });
}

async function imageToDataUrl(image: HTMLImageElement, mime: string): Promise<string> {
  return blobToDataUrl(await rasterizeImage(image, mime));
}

export function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not read that image"));
    image.src = src;
  });
}

export function guessFormatFromFilename(name: string): FileFormat | undefined {
  const match = name.match(/\.([a-zA-Z0-9]{1,12})$/);
  if (!match?.[1]) return undefined;
  return formatByExt(match[1]);
}
