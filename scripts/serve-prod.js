/**
 * Preview server strategy for the z.ai sandbox.
 *
 * The sandbox boot hook runs `npm run dev` on port 3000. Dev mode compiles
 * on demand and was the main source of the "insanely laggy" preview. This
 * script instead serves the optimized production build (already compiled
 * in .next/standalone) and falls back to real dev mode only when no build
 * exists. Workflow after code changes: `npm run build` once, reboot or
 * rerun `npm run dev` — the preview is then instant.
 */
const { existsSync } = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone", "server.js");

if (existsSync(standalone)) {
  console.log("> Serving production build (.next/standalone) on :3000");
  const child = spawn(process.execPath, [standalone], {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production", PORT: "3000", HOSTNAME: "0.0.0.0" },
  });
  const forwarded = ["SIGTERM", "SIGINT", "SIGHUP"];
  for (const sig of forwarded) {
    process.on(sig, () => {
      try { child.kill(sig); } catch { /* already gone */ }
    });
  }
  child.on("exit", (code) => process.exit(code ?? 0));
} else {
  console.log("> No production build found — falling back to next dev");
  const child = spawn("npx", ["next", "dev", "-p", "3000"], {
    stdio: "inherit",
    shell: true,
  });
  child.on("exit", (code) => process.exit(code ?? 0));
}
