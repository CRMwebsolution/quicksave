import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as GROK_PROVIDERS } from "./server-DKJpR30c.mjs";
import { i as signIn, n as SiteHeader, t as Button } from "./site-header-D0lzySGA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CkzD9TpV.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "grid flex-1 place-items-center px-5 pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-medium tracking-tight",
						children: "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Optional. Anyfile never stores what you export."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-2",
						children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							className: "w-full",
							onClick: () => void signIn(provider.providerId, { callbackURL: "/" }),
							children: ["Continue with ", provider.label]
						}, provider.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-6 inline-block text-sm text-subtle hover:text-fg",
						children: "Back to export"
					})
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
