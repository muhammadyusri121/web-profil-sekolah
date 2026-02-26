import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Mulai mengambil data EducationPersonnel dari database...");
  
  const personnel = await prisma.educationPersonnel.findMany({
    orderBy: {
      sort_order: 'asc', // mengurutkan berdasarkan sort_order sesuai schema
    }
  });

  console.log("\n--- HASIL DATA EDUCATION PERSONNEL ---");
  console.log(`Total Data: ${personnel.length}`);
  console.table(personnel); 
  console.log("--------------------------------------\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("Gagal mengambil data:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
