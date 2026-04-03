const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://school_admin_user:q8xLq7hE_cMPgeSfQux6Q@202.52.147.214:5433/database_profil_sekolah_db';

async function investigate() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database.');

    // 1. List all tables and case variations
    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const tableNames = tables.rows.map(r => r.table_name);
    console.log('Tables in public schema:', tableNames);

    const heroTableNames = tableNames.filter(name => name.toLowerCase().includes('hero'));
    console.log('Hero-related tables:', heroTableNames);

    for (const tableName of heroTableNames) {
      console.log(`\nInvestigating table: "${tableName}"`);
      
      // 2. Column names
      const cols = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`);
      console.log(`Columns in ${tableName}:`, cols.rows.map(r => r.column_name));

      // 3. Row count
      const countRes = await client.query(`SELECT COUNT(*) FROM "${tableName}"`);
      console.log(`Row count in ${tableName}:`, countRes.rows[0].count);

      // 4. Data sample
      if (parseInt(countRes.rows[0].count) > 0) {
        const dataRes = await client.query(`SELECT * FROM "${tableName}" LIMIT 1`);
        console.log(`Data sample from ${tableName}:`, JSON.stringify(dataRes.rows[0], null, 2));
      }
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

investigate();
