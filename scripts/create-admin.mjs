// Create (or update) an admin user.
// Usage:
//   node scripts/create-admin.mjs <email> <password> [name]
//
// Loads DATABASE_URL from .env.local so it targets the same DB as the app.
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Minimal .env.local loader (Prisma/Node don't read it automatically).
try {
  for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {}

const [email, password, name = "Admin"] = process.argv.slice(2);

if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password> [name]");
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hash, name, role: "admin" },
    create: { email, password: hash, name, role: "admin" },
  });
  console.log(`✅ Admin ready: ${user.email} (id ${user.id})`);
} catch (err) {
  console.error("❌ Failed:", err.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
