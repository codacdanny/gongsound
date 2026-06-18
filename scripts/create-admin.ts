import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || "admin@gongsound.com";
  const password = process.argv[3] || "admin123";
  const name = process.argv[4] || "Admin";

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        role: "admin",
      },
    });
    console.log(`✅ Admin user created:
Email: ${user.email}
Name: ${user.name}
Role: ${user.role}`);
  } catch (error: any) {
    if (error.code === "P2002") {
      console.error(`❌ User with email ${email} already exists`);
    } else {
      console.error("❌ Error creating user:", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
