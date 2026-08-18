import { Link } from "@tanstack/react-router";
import { ArrowDownToLine } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex items-center gap-4 px-5 py-4 sm:px-8">
      <Link to="/" className="flex items-center gap-2.5 text-fg no-underline">
        <span className="grid size-8 place-items-center rounded-sm bg-raised shadow-[var(--shadow-border)]">
          <ArrowDownToLine className="size-3.5" strokeWidth={2.2} />
        </span>
        <span className="text-[15px] font-medium tracking-tight">Anyfile</span>
      </Link>
    </header>
  );
}
