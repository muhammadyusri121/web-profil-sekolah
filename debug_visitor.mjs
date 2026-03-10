import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const stat = await prisma.visitorStatistic.findUnique({ where: { path: 'homepage' } });
    console.log('--- STATISTIC ---');
    console.log(stat);

    const logs = await prisma.visitorLog.count();
    console.log('--- LOG COUNT ---');
    console.log(logs);

    try {
        const res = await fetch('http://localhost:3000/api/visitor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: 'homepage' })
        });
        const data = await res.json();
        console.log('--- API POST RESPONSE ---');
        console.log(data);

        const resGet = await fetch('http://localhost:3000/api/visitor?path=homepage');
        const dataGet = await resGet.json();
        console.log('--- API GET RESPONSE ---');
        console.log(dataGet);

    } catch (err) {
        console.log("Local API is not running or unreachable", err.message);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
