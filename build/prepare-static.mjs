import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const publicDir = resolve(root, "public");

await mkdir(publicDir, { recursive: true });
await rm(resolve(publicDir, "assets"), { recursive: true, force: true });
await cp(resolve(root, "assets"), resolve(publicDir, "assets"), { recursive: true });
await copyFile(resolve(root, "index.html"), resolve(publicDir, "portfolio.html"));
await copyFile(resolve(root, "styles.css"), resolve(publicDir, "styles.css"));
await copyFile(resolve(root, "script.js"), resolve(publicDir, "script.js"));
