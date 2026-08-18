import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Download,
  FileUp,
  ImageIcon,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { buildExport, loadImageElement, triggerDownload, type PaperTheme } from "@/lib/export/encode";
import {
  FORMATS,
  FORMAT_GROUPS,
  PINNED_FORMAT_IDS,
  byteLabel,
  customFormat,
  detectExtInName,
  formatByExt,
  formatById,
  isImageFile,
  suggestNameFromText,
  type FileFormat,
} from "@/lib/export/formats";
import { cn } from "@/lib/utils";

const DEFAULT_FORMAT = formatById("txt")!;

type ImagePayload = {
  file: File;
  url: string;
  image: HTMLImageElement;
};

export function ExporterApp() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [format, setFormat] = useState<FileFormat>(DEFAULT_FORMAT);
  const [query, setQuery] = useState("");
  const [browseAll, setBrowseAll] = useState(false);
  const [image, setImage] = useState<ImagePayload | null>(null);
  const [paper, setPaper] = useState<PaperTheme>("light");
  const [clearAfter, setClearAfter] = useState(true);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [dragging, setDragging] = useState(false);

  const pasteRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const nameTouched = useRef(false);

  const hasContent = Boolean(image) || text.trim().length > 0;
  const lineCount = text ? text.replace(/\r\n/g, "\n").split("\n").length : 0;
  const byteCount = image ? image.file.size : new Blob([text]).size;
  const filenamePreview = `${(name.trim() || (image ? baseName(image.file.name) : "untitled")).replace(/[/\\?%*:|"<>]/g, "-")}.${format.ext}`;
  const visualFormat = format.kind === "pdf" || format.kind === "raster" || format.kind === "svg";
  const showCatalog = browseAll || query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\./, "");
    if (!q) return FORMATS;
    return FORMATS.filter(
      (f) =>
        f.ext.includes(q) ||
        f.label.toLowerCase().includes(q) ||
        f.group.toLowerCase().includes(q),
    );
  }, [query]);

  const customFromQuery = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\./, "");
    if (!q || !/^[a-z0-9]{1,12}$/.test(q)) return null;
    if (formatByExt(q)) return null;
    return customFormat(q);
  }, [query]);

  const resetWorkspace = useCallback(() => {
    if (image) URL.revokeObjectURL(image.url);
    setImage(null);
    setText("");
    setName("");
    nameTouched.current = false;
    window.setTimeout(() => pasteRef.current?.focus(), 40);
  }, [image]);

  const adoptImage = useCallback(
    async (file: File) => {
      const url = URL.createObjectURL(file);
      try {
        const element = await loadImageElement(url);
        if (image) URL.revokeObjectURL(image.url);
        setImage({ file, url, image: element });
        setText("");
        if (!nameTouched.current) setName(baseName(file.name));
        const fromName = formatByExt(file.name.split(".").pop() ?? "");
        if (fromName?.group === "Image") setFormat(fromName);
      } catch {
        URL.revokeObjectURL(url);
        toast.error("Could not read that image");
      }
    },
    [image],
  );

  const adoptTextFile = useCallback(
    async (file: File) => {
      const content = await file.text();
      if (image) URL.revokeObjectURL(image.url);
      setImage(null);
      setText(content);
      if (!nameTouched.current) setName(baseName(file.name));
      const fromName = formatByExt(file.name.split(".").pop() ?? "");
      if (fromName) setFormat(fromName);
    },
    [image],
  );

  const adoptFile = useCallback(
    async (file: File) => {
      if (isImageFile(file)) await adoptImage(file);
      else await adoptTextFile(file);
    },
    [adoptImage, adoptTextFile],
  );

  const handleExport = useCallback(async () => {
    if (!hasContent || busy) return;
    setBusy(true);
    try {
      const resolvedName =
        name.trim() || (image ? baseName(image.file.name) : suggestNameFromText(text));
      const { blob, filename } = await buildExport({
        format,
        name: resolvedName,
        text,
        image: image?.image ?? null,
        paper,
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
  }, [busy, clearAfter, format, hasContent, image, name, paper, resetWorkspace, text]);

  useEffect(() => {
    pasteRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        void handleExport();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleExport]);

  useEffect(() => {
    const onDragEnter = (event: DragEvent) => {
      if (!event.dataTransfer?.types.includes("Files")) return;
      dragDepth.current += 1;
      setDragging(true);
    };
    const onDragLeave = () => {
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    };
    const onDragOver = (event: DragEvent) => {
      if (!event.dataTransfer?.types.includes("Files")) return;
      event.preventDefault();
    };
    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      dragDepth.current = 0;
      setDragging(false);
      const file = event.dataTransfer?.files?.[0];
      if (file) void adoptFile(file);
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

  const onPaste = async (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          event.preventDefault();
          await adoptImage(file);
          return;
        }
      }
    }
  };

  const onNameChange = (value: string) => {
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

  const selectFormat = (item: FileFormat) => {
    setFormat(item);
    setQuery("");
    setBrowseAll(false);
  };

  const shortcut = isMac() ? "⌘↵" : "Ctrl+Enter";

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-28 sm:px-6 lg:pb-10">
      <div className="mb-6 max-w-xl sm:mb-8">
        <h1 className="text-3xl font-medium tracking-[-0.03em] text-fg text-balance sm:text-4xl">
          Paste. Name. Download.
        </h1>
        <p className="mt-2 text-sm text-muted text-pretty">
          Drop in text or an image, pick a file type, export. Nothing is stored here.
        </p>
      </div>

      <div className="grid flex-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="space-y-2">
            <Label htmlFor="filename-mobile">File name</Label>
            <div className="flex overflow-hidden rounded-sm bg-surface shadow-[var(--shadow-border)] focus-within:shadow-[var(--shadow-border-hover)] focus-within:ring-2 focus-within:ring-ring/40">
              <Input
                id="filename-mobile"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="untitled"
                autoComplete="off"
                spellCheck={false}
                className="h-11 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <span className="flex items-center pr-3 font-mono text-sm text-subtle">.{format.ext}</span>
            </div>
          </div>
          <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1">
            {PINNED_FORMAT_IDS.map((id) => {
              const item = formatById(id);
              if (!item) return null;
              return (
                <FormatChip
                  key={item.id}
                  format={item}
                  active={format.id === item.id}
                  onSelect={() => selectFormat(item)}
                />
              );
            })}
          </div>
          <MobileCatalog
            query={query}
            onQuery={setQuery}
            onBrowseAll={setBrowseAll}
            filtered={filtered}
            customFromQuery={customFromQuery}
            format={format}
            onSelect={selectFormat}
            showCatalog={showCatalog}
          />
          {visualFormat && (
            <div className="grid grid-cols-2 gap-1.5">
              {(["light", "dark"] as const).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setPaper(theme)}
                  className={cn(
                    "h-10 rounded-sm text-sm capitalize",
                    paper === theme
                      ? "bg-accent text-accent-fg"
                      : "bg-surface text-muted shadow-[var(--shadow-border)]",
                  )}
                >
                  {theme} paper
                </button>
              ))}
            </div>
          )}
        </div>

        <section className="flex min-h-56 flex-col rounded-xl bg-surface p-2 shadow-[var(--shadow-border)] sm:min-h-80 lg:min-h-[32rem]">
          <div className="flex items-center justify-between gap-3 px-3 pb-1 pt-2">
            <p className="text-xs font-medium tracking-wide text-subtle">
              {image ? "Image" : "Source"}
            </p>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-subtle"
                onClick={() => fileRef.current?.click()}
              >
                <FileUp className="size-3.5" />
                Open
              </Button>
              {(hasContent || name) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-subtle"
                  onClick={resetWorkspace}
                >
                  <X className="size-3.5" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void adoptFile(file);
              event.target.value = "";
            }}
          />

          {image ? (
            <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-bg">
              <img
                src={image.url}
                alt="Ready to export"
                className="max-h-[28rem] max-w-full object-contain outline outline-1 -outline-offset-1 outline-fg/10"
              />
              <div className="absolute bottom-3 left-3 rounded-sm bg-bg/80 px-2 py-1 font-mono text-xs text-muted">
                {image.image.naturalWidth} × {image.image.naturalHeight}
              </div>
            </div>
          ) : (
            <Textarea
              ref={pasteRef}
              value={text}
              onChange={(event) => {
                const next = event.target.value;
                setText(next);
                if (!nameTouched.current && next.trim()) {
                  setName(suggestNameFromText(next));
                }
              }}
              onPaste={onPaste}
              spellCheck={false}
              placeholder="Paste text, a screenshot, or drop a file."
              className="min-h-48 flex-1 sm:min-h-72 lg:min-h-[28rem]"
            />
          )}
        </section>

        <aside className="hidden flex-col rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] lg:sticky lg:top-6 lg:flex lg:max-h-[calc(100dvh-5.5rem)]">
          <div className="hidden space-y-5 lg:block">
            <div className="space-y-2">
              <Label htmlFor="filename">File name</Label>
              <div className="flex overflow-hidden rounded-sm bg-raised shadow-[var(--shadow-border)] focus-within:shadow-[var(--shadow-border-hover)] focus-within:ring-2 focus-within:ring-ring/40">
                <Input
                  ref={nameRef}
                  id="filename"
                  value={name}
                  onChange={(event) => onNameChange(event.target.value)}
                  placeholder="untitled"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-11 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <span className="flex items-center pr-3 font-mono text-sm text-subtle">.{format.ext}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format-search">Format</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
                <Input
                  id="format-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search or type an extension"
                  className="pl-9"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PINNED_FORMAT_IDS.map((id) => {
                  const item = formatById(id);
                  if (!item) return null;
                  return (
                    <FormatChip
                      key={item.id}
                      format={item}
                      active={format.id === item.id}
                      onSelect={() => selectFormat(item)}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setBrowseAll((open) => !open)}
                className="inline-flex h-8 items-center gap-1 text-xs font-medium text-subtle hover:text-fg"
              >
                <ChevronDown className={cn("size-3.5 transition-transform duration-150", showCatalog && "rotate-180")} />
                {showCatalog ? "Hide formats" : "All formats"}
              </button>
              {showCatalog && (
                <div className="max-h-44 space-y-3 overflow-y-auto pr-0.5">
                  {customFromQuery && (
                    <div>
                      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-subtle">
                        Custom
                      </p>
                      <FormatChip
                        format={customFromQuery}
                        active={format.ext === customFromQuery.ext}
                        onSelect={() => selectFormat(customFromQuery)}
                      />
                    </div>
                  )}
                  {FORMAT_GROUPS.map((group) => {
                    const items = filtered.filter((f) => f.group === group);
                    if (items.length === 0) return null;
                    return (
                      <div key={group}>
                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-subtle">
                          {group}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((item) => (
                            <FormatChip
                              key={item.id}
                              format={item}
                              active={format.id === item.id}
                              onSelect={() => selectFormat(item)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {filtered.length === 0 && !customFromQuery && (
                    <p className="text-sm text-subtle">No matching format. Type a custom extension.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {visualFormat && (
            <div className="mt-5 space-y-2">
              <Label>Paper</Label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["light", "dark"] as const).map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setPaper(theme)}
                    className={cn(
                      "h-10 rounded-sm text-sm capitalize transition-[box-shadow,background-color] duration-150",
                      paper === theme
                        ? "bg-accent text-accent-fg"
                        : "bg-raised text-muted shadow-[var(--shadow-border)] hover:text-fg",
                    )}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 space-y-3 border-t border-border pt-4 lg:mt-auto">
            <div className="flex items-center justify-between gap-3 text-sm text-muted">
              <span className="truncate font-mono text-xs tabular-nums text-subtle">
                {filenamePreview}
              </span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-subtle">
                {image ? (
                  <span className="inline-flex items-center gap-1">
                    <ImageIcon className="size-3" />
                    {byteLabel(byteCount)}
                  </span>
                ) : (
                  `${lineCount} ${lineCount === 1 ? "line" : "lines"} · ${byteLabel(byteCount)}`
                )}
              </span>
            </div>

            <Button
              type="button"
              size="lg"
              className="hidden h-12 w-full lg:inline-flex"
              disabled={!hasContent || busy}
              onClick={() => void handleExport()}
            >
              {done ? <Check className="size-4" /> : <Download className="size-4" />}
              {busy ? "Exporting…" : done ? "Exported" : "Export"}
              <span className="ml-auto font-mono text-xs opacity-60">{shortcut}</span>
            </Button>

            <label className="flex min-h-11 items-center justify-between gap-3 text-sm text-muted">
              <span>Clear after export</span>
              <Switch checked={clearAfter} onCheckedChange={(value) => setClearAfter(Boolean(value))} />
            </label>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-sm lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button
          type="button"
          size="lg"
          className="h-12 w-full"
          disabled={!hasContent || busy}
          onClick={() => void handleExport()}
        >
          {done ? <Check className="size-4" /> : <Download className="size-4" />}
          {busy ? "Exporting…" : done ? "Exported" : `Export ${filenamePreview}`}
        </Button>
        <button
          type="button"
          onClick={() => setClearAfter((value) => !value)}
          className="mt-2 w-full text-center text-xs text-subtle"
        >
          {clearAfter ? "Clears after export" : "Keeps content after export"}
        </button>
      </div>

      {dragging && (
        <div className="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-bg/70">
          <div className="rounded-xl bg-surface px-8 py-6 text-center shadow-[var(--shadow-border)]">
            <p className="text-lg font-medium tracking-tight">Drop to load</p>
            <p className="mt-1 text-sm text-muted">Text or image — then name and export</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileCatalog({
  query,
  onQuery,
  onBrowseAll,
  filtered,
  customFromQuery,
  format,
  onSelect,
  showCatalog,
}: {
  query: string;
  onQuery: (value: string) => void;
  onBrowseAll: (value: boolean | ((open: boolean) => boolean)) => void;
  filtered: FileFormat[];
  customFromQuery: FileFormat | null;
  format: FileFormat;
  onSelect: (item: FileFormat) => void;
  showCatalog: boolean;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onBrowseAll((open) => !open)}
        className="inline-flex h-8 items-center gap-1 text-xs font-medium text-subtle hover:text-fg"
      >
        <ChevronDown className={cn("size-3.5 transition-transform duration-150", showCatalog && "rotate-180")} />
        {showCatalog ? "Hide formats" : "All formats"}
      </button>
      {showCatalog && (
        <div className="mt-2 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
            <Input
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder="Search or type an extension"
              className="pl-9"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div className="max-h-40 space-y-3 overflow-y-auto">
            {customFromQuery && (
              <FormatChip
                format={customFromQuery}
                active={format.ext === customFromQuery.ext}
                onSelect={() => onSelect(customFromQuery)}
              />
            )}
            {FORMAT_GROUPS.map((group) => {
              const items = filtered.filter((f) => f.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group}>
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-subtle">{group}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <FormatChip
                        key={item.id}
                        format={item}
                        active={format.id === item.id}
                        onSelect={() => onSelect(item)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FormatChip({
  format,
  active,
  onSelect,
}: {
  format: FileFormat;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "h-8 rounded-sm px-2.5 font-mono text-xs transition-[background-color,color] duration-150",
        active ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
      )}
    >
      .{format.ext}
    </button>
  );
}

function baseName(filename: string): string {
  return filename.replace(/\.[a-zA-Z0-9]{1,12}$/, "");
}

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad/.test(navigator.userAgent);
}
