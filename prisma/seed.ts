import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient();


//change
async function main() {
 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("prisma seed finished");
    await prisma.$disconnect();
  });