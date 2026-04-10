const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://smanka_database:Smanka297213@76.13.22.32:5431/profil_db?schema=public' });

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
