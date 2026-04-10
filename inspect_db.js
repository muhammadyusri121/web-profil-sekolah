require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL is not defined in .env file');
  process.exit(1);
}

async function run() {
  try {
    const res = await pool.query('SELECT * FROM "VisitorStatistic"');
    console.log('VisitorStatistic rows:', res.rows);
    const logs = await pool.query('SELECT * FROM "VisitorLog" LIMIT 5');
    console.log('VisitorLog sample:', logs.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}
run();
