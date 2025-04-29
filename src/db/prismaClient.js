import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Optionally handle cleanup (disconnect) when the app shuts down
process.on("exit", async () => {
  await prisma.$disconnect();
});

export default prisma;
