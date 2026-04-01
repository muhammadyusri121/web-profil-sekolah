import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function test() {
    try {
        console.log('Testing connection to:', process.env.DATABASE_URL);
        const res = await pool.query('SELECT current_database(), current_schema()');
        console.log('Connected to:', res.rows[0]);
        
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('Tables found:', tables.rows.map(r => r.table_name));
        
        const data = await pool.query('SELECT * FROM "EducationPersonnel" LIMIT 1');
        console.log('Data found:', data.rows);
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await pool.end();
    }
}

test();
