import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function test() {
    try {
        console.log('Testing connection...');
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('Tables found:', tables.rows.map(r => r.table_name));
        
        for (const table of tables.rows.map(r => r.table_name)) {
            const columns = await pool.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = $1
            `, [table]);
            console.log(`Columns for ${table}:`, columns.rows.map(c => c.column_name));
        }
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await pool.end();
    }
}

test();
