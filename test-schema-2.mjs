import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function test() {
    try {
        console.log('Testing connection...');
        const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        const tables = res.rows.map(r => r.table_name);
        console.log('All Tables:', tables.join(', '));
        
        const target = 'EducationPersonnel';
        if (tables.includes(target)) {
            console.log(`Table ${target} EXISTS.`);
        } else {
            console.log(`Table ${target} DOES NOT EXIST.`);
            // Check for case-insensitive match
            const match = tables.find(t => t.toLowerCase() === target.toLowerCase());
            if (match) {
                console.log(`Found a similar table: ${match}`);
            }
        }
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await pool.end();
    }
}

test();
