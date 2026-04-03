const { query } = require('./lib/db');

async function checkHero() {
  try {
    console.log('Checking all tables...');
    const tables = await query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables found:', tables.rows.map(r => r.table_name));

    console.log('\nChecking HeroContent table columns...');
    const columns = await query("SELECT column_name FROM information_schema.columns WHERE table_name = 'HeroContent'");
    console.log('Columns in HeroContent:', columns.rows.map(r => r.column_name));

    console.log('\nChecking rows in HeroContent...');
    const result = await query('SELECT * FROM "HeroContent"');
    console.log('Total rows found:', result.rowCount);
    console.log('Data sample:', JSON.stringify(result.rows[0], null, 2));

    console.log('\nChecking with is_active = true filter...');
    const activeResult = await query('SELECT * FROM "HeroContent" WHERE is_active = true');
    console.log('Active rows found:', activeResult.rowCount);
  } catch (err) {
    console.error('Error during check:', err.message);
  } finally {
    process.exit(0);
  }
}

checkHero();
