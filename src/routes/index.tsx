import { createFileRoute } from "@tanstack/react-router";
import { ExporterApp } from "@/components/exporter/exporter-app";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <ExporterApp />
      </main>
    </div>
  );
}
