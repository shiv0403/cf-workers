import { readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jobsPath = join(__dirname, "workers");
const jobFiles = readdirSync(jobsPath);

console.log("Importing workers...");
const imports = jobFiles.map((file) => import(join(jobsPath, file)));
await Promise.all(imports);
console.log("All workers loaded");
