const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://smanka_database:Smanka297213@76.13.22.32:5431/profil_db?schema=public' });

async function run() {
  try {
    console.log('Starting migration...');

    // 1. Rename ipHash to ip in VisitorLog
    await pool.query('ALTER TABLE "VisitorLog" RENAME COLUMN "ipHash" TO "ip"');
    console.log('Renamed ipHash to ip in VisitorLog');

    // 2. Remove path and country from VisitorLog
    await pool.query('ALTER TABLE "VisitorLog" DROP COLUMN "path"');
    await pool.query('ALTER TABLE "VisitorLog" DROP COLUMN "country"');
    console.log('Dropped path and country from VisitorLog');

    // 3. Remove path from VisitorStatistic
    // First, let's make sure we keep only one record if there are multiple (though we saw only one)
    await pool.query('ALTER TABLE "VisitorStatistic" DROP COLUMN "path"');
    console.log('Dropped path from VisitorStatistic');

    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    await pool.end();
  }
}
run();
