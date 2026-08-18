import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="grid flex-1 place-items-center px-5 pb-16">
        <div className="w-full max-w-sm rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
          <h1 className="text-xl font-medium tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted">Optional. Anyfile never stores what you export.</p>
          <div className="mt-6 space-y-2">
            {authEnabled ? (
              GROK_PROVIDERS.map((provider) => (
                <Button
                  key={provider.providerId}
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => void signIn(provider.providerId, { callbackURL: "/" })}
                >
                  Continue with {provider.label}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted">Sign-in is disabled.</p>
            )}
          </div>
          <Link to="/" className="mt-6 inline-block text-sm text-subtle hover:text-fg">
            Back to export
          </Link>
        </div>
      </main>
    </div>
  );
}
